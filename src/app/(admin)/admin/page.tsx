import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <span>Admin page</span>
        </main>

        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
          <Link
            href='/'
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          >
            <Image
              aria-hidden
              src='/home.svg'
              alt='Home icon'
              width={16}
              height={16}
            />
            <span className='icon-[ion--home]'></span>
            Home
          </Link>
        </footer>
      </div>
    </div>
  );
}
