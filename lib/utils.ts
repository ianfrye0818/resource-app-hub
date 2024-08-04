import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ErrorMessages } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkIfValidresume(parsedJson: any) {
  if (
    !parsedJson.name ||
    !parsedJson.summary ||
    !parsedJson.skills ||
    !parsedJson.education ||
    !parsedJson.workHistory
  ) {
    throw new Error(ErrorMessages.NotResume);
  }
}

export function getFormattedDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear().toString().slice(-2);

  return `${month}/${day}/${year}`;
}

export function cleanJsonString(jsonString: string) {
  return jsonString.replace(/```json|```/g, '');
}

export function capitalizeFirstLetter(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
