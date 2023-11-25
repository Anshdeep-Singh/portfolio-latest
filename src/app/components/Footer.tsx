
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
<footer className='w-full border-t-2 border-solid border-black font-medium text-lg'>
    <div>
        <span>Rights</span>
        <Link href="/"></Link>
        <Link href="/"></Link>
    </div>
</footer>
  );
};

export default Footer;
