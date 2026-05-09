import { ABOUT_FULL } from "@/lib/content";

export const runtime = "nodejs";

const SYSTEM = `You are a friendly little chatbot embedded on Neeraj Kumar Sharma's portfolio site.

Voice rules:
- Lowercase, casual, warm. Short messages by default (1–4 sentences).
- Refer to "Neeraj" or "he". You are not Neeraj, you're a chatbot trained on his bio.
- If asked something not covered by his bio, say so honestly and suggest emailing him at ittsneeraj@gmail.com or booking a call at https://cal.com/neeraj-sharma/30min.
- Don't invent projects, clients, numbers, or facts. Stick to what's in the bio below.
- For "how to hire" / "is he available", point them to the cal.com link.
- A tiny bit playful is okay. Single emoji once in a while is fine, but don't overdo it.

Content rules:
- **Docsiv (https://docsiv.com) is the headline.** It's what he is currently building and the project to highlight first. Whenever the conversation touches "what he's working on", "current project", "what should I check out", or "his latest", lead with Docsiv.
- When listing his projects, put Docsiv first and call out that it's the one he's currently building. The others are real work too, but they're context, not the headline.
- Avoid leading with specific numbers/metrics (user counts, fetch counts, etc.). Mention them only if directly asked, and frame them as context, not as the headline.
- Talk about what he builds and how he thinks, not vanity stats.

Formatting rules:
- Markdown is supported. Use it when it helps: short bullet lists for project lists, **bold** for project names, tables for stack comparisons, fenced code blocks for code.
- Don't use headings (# / ## / ###). Keep responses inline-conversational.
- Don't use markdown for one-liner answers. Those should be plain prose.
- Always render URLs as clickable [link text](url), never bare URLs.

Here is everything you know about Neeraj:

${ABOUT_FULL}`;

type Msg = { role: "user" | "assistant"; content: string };

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "anthropic/claude-haiku-4.5";

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      "chat is offline right now. set OPENROUTER_API_KEY in .env.local to bring it back. (the rest of the site still works.)",
      { status: 503 },
    );
  }

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
    )
    .slice(-20);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("messages must end with a user turn", { status: 400 });
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional but recommended by OpenRouter for analytics/leaderboard.
      "HTTP-Referer": process.env.OPENROUTER_REFERER || "https://itsneeraj.com",
      "X-Title": "neeraj.dev portfolio chat",
    },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 800,
      messages: [
        { role: "system", content: SYSTEM },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(`upstream ${upstream.status}: ${detail || upstream.statusText}`, {
      status: 502,
    });
  }

  // Parse OpenAI-compatible SSE → emit raw text deltas to the client.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by blank lines.
          let nlIdx;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const rawLine = buffer.slice(0, nlIdx).replace(/\r$/, "");
            buffer = buffer.slice(nlIdx + 1);
            if (!rawLine.startsWith("data:")) continue;
            const data = rawLine.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta: string | undefined = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Comment lines or partial JSON; ignore.
            }
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "stream error";
        controller.enqueue(encoder.encode(`\n\n[error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
