import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import { parseResumeToJson } from './parse-resume-to-json';

export async function collectResumeText(buffer: Buffer, fileName: string) {
  let data: string;
  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    const parsedData = await mammoth.extractRawText({ buffer });
    data = parsedData.value;
  } else if (fileName.endsWith('.pdf')) {
    const parsed = await pdfParse(buffer);
    data = parsed.text;
  } else {
    throw new Error('Unsupported file type');
  }

  return parseResumeToJson(data);
}
