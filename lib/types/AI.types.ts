export enum Models {
  GEMINI = 'gemini',
  CLAUDE = 'claude',
  CHATGPT = 'chatgpt',
}

export type AIModelSelect = {
  label: string;
  value: Models;
};
