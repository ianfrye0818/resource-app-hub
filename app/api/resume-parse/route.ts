import { getAIModel } from '@/lib/ai-model';
import { collectResumeText } from '@/lib/collect-resume-text';
import { ErrorMessages } from '@/lib/data';
import { isError } from '@/lib/errors';
import { generateResume } from '@/lib/generate-resume-output';
import { rateLimit } from '@/lib/rate-limit';
import { Models } from '@/lib/types';

import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const url = new URL(req.url);
  const type = url.searchParams.get('type');

  if (Object.values(Models).indexOf(type as Models) === -1) {
    return NextResponse.json({ error: ErrorMessages.InvalidModel }, { status: 400 });
  }
  const AiModel = getAIModel(type as Models);
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: ErrorMessages.NoFile }, { status: 400 });
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.replaceAll(' ', '_');
    const resumeData = await rateLimit(
      async () => await collectResumeText(buffer, fileName, AiModel)
    )();
    const formattedResume = await generateResume(resumeData);
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
