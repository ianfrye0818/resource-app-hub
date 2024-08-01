import { collectResumeText } from '@/lib/collect-resume-text';
import { generateResume } from '@/lib/generate-resume-output';
import { isError } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.replaceAll(' ', '_');
    const resumeData = await collectResumeText(buffer, fileName);
    const formattedResume = await generateResume(resumeData);
    return new Response(formattedResume, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (isError(error) && error.message === 'not a resume') {
      return NextResponse.json({ error: 'Not a resume' }, { status: 400 });
    }
    if (isError(error) && error.message === 'Unsupported file type') {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET request');
  return NextResponse.json({ message: 'Hello, world!' });
}
