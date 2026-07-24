import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Rounded favicon for the v2 pages, generated from the profile photo.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await readFile(join(process.cwd(), "public", "image copy.png"));
  const src = `data:image/png;base64,${data.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 16,
        }}
      />
    ),
    { ...size },
  );
}
