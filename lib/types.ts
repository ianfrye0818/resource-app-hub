export interface LinkCardProps {
  title: string;
  description?: string;
  linkIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: number;
  iconWidth?: number;
  href: string;
  newWindow?: boolean;
  iconColor?: string;
}

export enum Models {
  GEMINI = 'gemini',
  CLAUDE = 'claude',
  // OPENAI = 'openai',
}
