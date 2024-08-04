import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkIfValidresume, cleanJsonString, getFormattedDate } from './utils';
import { ErrorMessages, getPrompt } from './data';
import { AIModel } from './ai-model';

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function parseResumeToJson(resumeText: string, aiModel: AIModel) {
  const cleanedDocument = resumeText.replace(/[^a-zA-Z0-9\s]/g, '');

  const prompt = getPrompt(cleanedDocument);

  const responseText = await aiModel.generateContent([prompt]);

  if (responseText.length === 0) {
    throw new Error(ErrorMessages.Unknown);
  }
  if (responseText.includes('not a resume')) {
    throw new Error(ErrorMessages.NotResume);
  }

  const cleanedResponse = cleanJsonString(responseText);

  const parsedJson = JSON.parse(cleanedResponse);

  parsedJson.todaysDate = getFormattedDate();
  checkIfValidresume(parsedJson);
  return parsedJson;
}
