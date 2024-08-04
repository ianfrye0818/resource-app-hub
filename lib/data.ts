import { IoScan } from 'react-icons/io5';
import { FcDocument } from 'react-icons/fc';
import { MdOutlineCelebration } from 'react-icons/md';
import { GiVote } from 'react-icons/gi';
import { IoQrCode } from 'react-icons/io5';

import { AIModelSelect, LinkCardProps, Models } from './types';

export const getPrompt = (cleanedDocument: string) => {
  return `
does the document below look like it's a resume, if not - please return only the text 'not a resume';
otherwise,
if it is a resume, can you please parse it into a json object with the following format do not include any special characters or formatting:
    {
      name: string;
      summary: string;
      skills: string[];
      education: { school: string; degree: string }[];
      workHistory: {
        company: string;
        startDate: string;
        endDate: string;
        title: string;
        duties: string[];
      }[];
    }


Please clean up any grammatical errors and ensure that the resume and summary sound professional.
${cleanedDocument}
`;
};

export const MAX_REQUESTS_PER_MIN = 10;
export const MAX_REQUESTS_PER_DAY = 1000;

export const ErrorMessages = {
  DailyRateLimit: 'Daily rate limit exceeded',
  NotResume: 'Not a resume!',
  RateLimit: 'Rate limit exceeded',
  MinuteRateLimit: 'Rate limit exceeded',
  Unknown: 'An unknown error occurred',
  invalid: 'Invalid Resume or Filetype',
  NoFile: 'No file provided',
  InvalidModel: 'Invalid AI Model Type',
};

export const LinkCardItems: LinkCardProps[] = [
  {
    title: 'AI Resume Formatter',
    linkIcon: FcDocument,
    description: 'App for formatting resumes to TR format',
    href: '/resume-parser',
  },
  {
    title: 'QR Code Generator',
    linkIcon: IoQrCode,
    iconColor: '#ff0066bb',
    description: 'App for generating QR codes',
    href: '/qr-generator',
  },
  {
    title: 'Praise Pal',
    linkIcon: MdOutlineCelebration,
    description: 'App for sharing kudos with co-workers',
    href: 'https://www.praise-pal.com',
    newWindow: true,
    iconColor: '#ff9900',
  },
  {
    title: 'Pulse Vote',
    linkIcon: GiVote,
    description: 'App for real-time voting',
    href: 'https://www.pulse-vote.com',
    newWindow: true,
    iconColor: '#0066ff',
  },
];

export const ModelList: AIModelSelect[] = [
  {
    label: 'Gemini',
    value: Models.GEMINI,
  },
  {
    label: 'Claude',
    value: Models.CLAUDE,
  },
  {
    label: 'ChatGPT',
    value: Models.CHATGPT,
  },
];
