// components/Header.js
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-3">
        <Image src="/logo.svg" alt="DeepBit Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-brand-dark">Drill AI Intelligence Platform</h1>
      </div>
    </header>
  );
};

export default Header;
