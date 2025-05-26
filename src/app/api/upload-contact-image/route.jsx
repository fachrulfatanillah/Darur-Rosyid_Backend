import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";

// agar Next.js tidak memproses body secara default
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  // Baca buffer dari request
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = path.join(process.cwd(), "public", "images", "kontak", fileName);

  await writeFile(filePath, buffer);

  // Return path yang bisa digunakan langsung di <img src="/images/kontak/..." />
  return NextResponse.json({ imageUrl: `/images/kontak/${fileName}` });
}