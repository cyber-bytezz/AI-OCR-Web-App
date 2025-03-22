import { NextRequest, NextResponse } from 'next/server';
import { createWriteStream, mkdirSync } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    // 1) Extract the file from FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2) Convert file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3) Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    mkdirSync(uploadDir, { recursive: true });

    // 4) Create a unique filename
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // 5) Write file to disk
    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      writeStream.write(buffer);
      writeStream.end(() => resolve());
      writeStream.on('error', (err) => reject(err));
    });

    // 6) Return the path for the OCR route
    return NextResponse.json({ filePath: `/uploads/${fileName}` });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
