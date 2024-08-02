import LinkCard from '@/components/cards/link-card';
import { LinkCardItems } from '@/lib/data';

export default function HomePage() {
  return <Page />;
}

function Page() {
  return (
    <section className='container mx-auto'>
      <div className='mt-[96px] flex gap-4 flex-wrap'>
        {LinkCardItems.map((item, index) => (
          <LinkCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
