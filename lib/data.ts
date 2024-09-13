import { FcDocument } from 'react-icons/fc';
import { MdOutlineCelebration } from 'react-icons/md';
import { GiVote } from 'react-icons/gi';
import { IoQrCode } from 'react-icons/io5';

import { AIModelSelect, Models } from './types/AI.types';
import { LinkCardProps } from './types';
import { User2Icon } from 'lucide-react';

export const ErrorMessages = {
  DailyRateLimit: 'Daily rate limit exceeded',
  NotResume: 'Not a resume!',
  RateLimit: 'Rate limit exceeded',
  MinuteRateLimit: 'Rate limit exceeded',
  Unknown: 'An unknown error occurred',
  invalid: 'Invalid Resume or Filetype',
  NoFile: 'No file provided',
  InvalidModel: 'Invalid AI Model Type',
  Unathorized: 'You are not authorized to access this resource',
  RefreshToken: 'No refresh token found or invalid refresh token',
  UserNotFound: 'No user found',
  InvalidCredentials: 'Invalid credentials',
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
  {
    title: 'Ecolab Employee Manager',
    linkIcon: User2Icon,
    description: 'App for managing Ecolab Employees',
    href: '/ecolab/beeline-employees',
    iconColor: '#ffbb66bb',
  },
];

export const ModelList: AIModelSelect[] = [
  {
    label: 'Gemini',
    value: Models.GEMINI,
  },
  {
    label: 'ChatGPT',
    value: Models.CHATGPT,
  },
  {
    label: 'Claude',
    value: Models.CLAUDE,
  },
];
