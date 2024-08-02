'use client';
import { useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvvas from 'html2canvas';
import { Button } from '@/components/ui/button';

interface QRResultProps {
  searchParams: { qrCodeValue: string };
}

const QRResult = ({ searchParams }: QRResultProps) => {
  const { qrCodeValue } = searchParams;

  const qrCoderef = useRef<HTMLDivElement | null>(null);

  const handleCopy = async () => {
    try {
      const canvas = await html2canvvas(qrCoderef.current as HTMLElement);
      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = imageData;
      link.click();
    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };
  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
      <div ref={qrCoderef}>
        <QRCode
          value={qrCodeValue}
          size={128}
        />
      </div>
      <p>{qrCodeValue}</p>
      <div className='space-x-4'>
        <Button variant={'outline'}>Go back</Button>
        <Button onClick={handleCopy}>Download Code</Button>
      </div>
    </div>
  );
};

export default QRResult;
