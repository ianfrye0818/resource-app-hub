import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
// import Anthropic from '@anthropic-ai/sdk';
import { Models } from './types';
import OpenAI from 'openai';

export interface AIModel {
  generateContent(prompts: string[]): Promise<string>;
}

export class GoogleGeminiAi implements AIModel {
  private model: GenerativeModel;

  constructor() {
    const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    this.model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateContent(prompts: string[]): Promise<string> {
    const response = await this.model.generateContent(prompts);
    return response.response.text();
  }
}

// export class ClaudeAISonnet implements AIModel {
//   private model: Anthropic;

//   constructor() {
//     this.model = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
//   }

//   async generateContent(prompts: string[]): Promise<string> {
//     const resp = await this.model.messages.create({
//       model: 'claude-3-5-sonnet-20240620',
//       max_tokens: 1024,
//       messages: [{ role: 'user', content: prompts[0] }],
//     });

//     return resp.content[0].type === 'text' ? resp.content[0].text : '';
//   }
// }

export class OpenAI4O implements AIModel {
  private model: OpenAI;

  constructor() {
    this.model = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  async generateContent(prompts: string[]): Promise<string> {
    const completion = await this.model.chat.completions.create({
      messages: [{ role: 'user', content: prompts[0] }],
      model: 'gpt-4o-mini',
    });

    return completion.choices[0].message.content || '';
  }
}

export function getAIModel(type: Models = Models.GEMINI): AIModel {
  switch (type) {
    case Models.GEMINI:
      return new GoogleGeminiAi();
    // case Models.CLAUDE:
    //   return new ClaudeAISonnet();
    case Models.CHATGPT:
      return new OpenAI4O();
    default:
      throw new Error('Invalid AI Model Type');
  }
}
