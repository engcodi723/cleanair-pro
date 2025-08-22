
import Link from 'next/link';

const Header = () => {
  const menuItems = [
    { href: '/', label: '메인' },
    { href: '/services', label: '서비스 소개' },
    { href: '/pricing', label: '가격 안내' },
    { href: '/booking', label: '예약 문의' },
    { href: '/portfolio', label: '시공 사례' },
    { href: '/reviews', label: '고객 후기' },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <Link href="/">CleanAir</Link>
        </div>
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="hover:text-blue-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="md:hidden">
          {/* Mobile menu icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
