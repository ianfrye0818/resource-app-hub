import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import { parseResumeToJson } from './parse-resume-to-json';
import { ErrorMessages } from './data';
import { AIModel } from './ai-model';

export async function collectResumeText(buffer: Buffer, fileName: string, model: AIModel) {
  let data: string;
  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    const parsedData = await mammoth.extractRawText({ buffer });
    data = parsedData.value;
  } else if (fileName.endsWith('.pdf')) {
    const parsed = await pdfParse(buffer);
    data = parsed.text;
  } else {
    throw new Error(ErrorMessages.invalid);
  }

  return parseResumeToJson(data, model);
}
