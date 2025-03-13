'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center m-10'>
      <p>© Marcus Shop 2025</p>

      <p>-</p>

      <a
        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
        href='https://github.com/AaronCaballero/'
        target='_blank'
      >
        <Image
          aria-hidden
          src='/globe.svg'
          alt='Globe icon'
          width={16}
          height={16}
        />
        Createt by Aaron
      </a>
    </footer>
  );
}
