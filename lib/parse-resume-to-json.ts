import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkIfValidresume, cleanJsonString, getFormattedDate } from './utils';
import { getPrompt } from './data';

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function parseResumeToJson(resumeText: string) {
  const cleanedDocument = resumeText.replace(/[^a-zA-Z0-9\s]/g, '');

  const prompt = getPrompt(cleanedDocument);

  const response = await model.generateContent([prompt]);

  const responseText = response.response.text();

  if (responseText.includes('not a resume')) {
    throw new Error('Not a resume!');
  }

  const cleanedResponse = cleanJsonString(responseText);

  const parsedJson = JSON.parse(cleanedResponse);

  parsedJson.todaysDate = getFormattedDate();
  checkIfValidresume(parsedJson);
  return parsedJson;
}
