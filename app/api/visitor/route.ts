import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const ALLOWED = new Set(["anyone", "recruiter", "dev", "founder", "designer"]);

export async function POST(req: Request) {
  let body: { audience?: string; ts?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const audience = typeof body.audience === "string" ? body.audience : null;
  if (!audience || !ALLOWED.has(audience)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const entry = {
    audience,
    ts: typeof body.ts === "number" ? body.ts : Date.now(),
    ua: req.headers.get("user-agent") ?? "",
    ref: req.headers.get("referer") ?? "",
  };

  // Local-first: append to a JSONL file when running on a writeable filesystem.
  // On serverless platforms (Vercel) writes go to /tmp which is ephemeral.
  // Swap this for Supabase/Postgres/anything you actually want persistence on.
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "visitors.jsonl"),
      JSON.stringify(entry) + "\n",
      "utf8",
    );
  } catch {
    // Read-only filesystem; don't break the request, just log.
    console.log("[visitor]", entry);
  }

  return Response.json({ ok: true });
}
