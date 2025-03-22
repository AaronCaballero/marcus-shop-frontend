import ProductsPage from './products/page';

export default function Home() {
  return (
    <div>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center mt-20 p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <div className='flex flex-col gap-10 items-center'>
            <h2 className='font-bold text-6xl text-blue-600'>Marcus Shop</h2>

            <p>Your Bicycle &amp; future all &apos;type of products&apos; shop</p>
          </div>
        </main>
      </div>

      <ProductsPage />
    </div>
  );
}
