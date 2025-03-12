'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const centerItems = [
    { href: '/#', label: 'Home', icon: '/home.svg' },
    { href: '/products', label: 'Products', icon: 'shopping-bag.svg' },
    { href: '/cart', label: 'Cart', icon: 'shopping-cart.svg' },
  ];

  const rightItems = [{ href: '/admin', label: 'Admin', icon: 'options.svg' }];

  return (
    <div className='p-5 fixed top-0 left-0 right-0 nav-bar-bg z-999999'>
      <nav className='fixed top-0 left-0 right-0 bg-white shadow-md m-5 rounded-md'>
        <div className='px-6'>
          <div className='flex items-center justify-center h-16'>
            <div className='flex-1 flex items-center'>
              <Link
                href='/'
                className='text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300'
              >
                Marcus Shop
              </Link>
            </div>

            <div className='flex gap-x-4 absolute left-1/2 transform -translate-x-1/2'>
              {centerItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  px-3 py-2 rounded-md text-sm font-medium
                  ${
                    pathname.includes(item.href)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  transition duration-300
                `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className='flex-1 flex justify-end items-center gap-x-4'>
              {rightItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  px-3 py-2 rounded-md text-sm font-medium
                  ${
                    pathname.includes(item.href)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  transition duration-300
                `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
