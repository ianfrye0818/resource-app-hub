import { LinkCardProps } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card';
import Link from 'next/link';

const LinkCard = ({
  title,
  description,
  linkIcon: LinkIcon,
  iconSize = 60,
  iconWidth = 60,
  href,
}: LinkCardProps) => {
  return (
    <Link href={href}>
      <Card className='w-max flex flex-col gap-4 items-center p-6 hover:bg-gray-50 cursor-pointer'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className='flex flex-col gap-4 items-center'>
          <LinkIcon style={{ width: iconWidth, height: iconSize }} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default LinkCard;
