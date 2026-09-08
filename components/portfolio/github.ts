export type ContribDay = { date: string; count: number; level: number };

// Pull the last year of contributions from the public jogruber proxy (no auth
// needed). Fails soft to an empty list so the page still renders if it's down.
export async function getContributions(user: string): Promise<ContribDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { next: { revalidate: 21600 }, signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { contributions?: ContribDay[] };
    return json.contributions ?? [];
  } catch {
    return [];
  }
}
