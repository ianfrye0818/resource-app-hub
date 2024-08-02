import DropZoneComponent from '@/components/pages-and-sections/DropZoneComponent';

export default function ResumeParserPage() {
  return (
    <section className='flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24'>
      <div className='w-full max-w-md space-y-6'>
        <div className='grid gap-2'>
          <h1 className='text-3xl font-bold tracking-tighter text-center'>Upload Your Document</h1>
          <p className='text-muted-foreground text-center'>
            Drag and drop your file or click to browse.
          </p>
        </div>
        {/* Drop Zone Component */}
        <DropZoneComponent />
        <div className='grid gap-2'>
          <p className='text-center text-muted-foreground'>
            Accepted file types: .docx, .doc, .pdf
          </p>
        </div>
      </div>
    </section>
  );
}
