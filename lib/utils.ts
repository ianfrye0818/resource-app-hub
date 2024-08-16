import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ErrorMessages } from './data';
import { User } from './types';
import { CustomError } from './CustomError';

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
    throw CustomError.create(ErrorMessages.NotResume);
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

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0;
export const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (isObjEmpty(user)) {
    return null;
  }
  return user as User;
};

export const isError = (error: any): error is Error => error instanceof Error;
