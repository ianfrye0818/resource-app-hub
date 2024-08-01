import { collectResumeText } from '@/lib/collect-resume-text';
import { ErrorMessages } from '@/lib/data';
import { generateResume } from '@/lib/generate-resume-output';
import { rateLimit } from '@/lib/rate-limit';
import { isError } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: ErrorMessages.NoFile }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.replaceAll(' ', '_');
    const resumeData = await collectResumeText(buffer, fileName);
    const formattedResume = await rateLimit(() => generateResume(resumeData))();
    return new Response(formattedResume, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      status: 200,
    });
  } catch (error) {
    console.error(['resume-parser POST error'], error);
    if (
      isError(error) &&
      (error.message === ErrorMessages.DailyRateLimit ||
        error.message === ErrorMessages.MinuteRateLimit ||
        error.message === ErrorMessages.RateLimit)
    ) {
      return NextResponse.json({ error: ErrorMessages.RateLimit }, { status: 429 });
    }
    if (isError(error) && error.message === ErrorMessages.NotResume) {
      return NextResponse.json({ error: ErrorMessages.NotResume }, { status: 400 });
    }
    return NextResponse.json({ error: ErrorMessages.Unknown }, { status: 500 });
  }
}
