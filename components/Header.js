import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component
import { UserButton } from '@clerk/nextjs';

function Header() {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/taxi.png'
        },
        {
            id: 2,
            name: 'Package',
            icon: '/box.png'
        }
    ];

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex justify-between items-center'>
            <div className='flex items-center gap-12'>
                <Image src='/logo.png' width={70} height={70} alt='Logo' />
                
                {headerMenu.map((item) => (
                    <div key={item.id} className='flex items-center'>
                        <Image src={item.icon} width={17} height={17} alt={`${item.name} icon`} />
                        <span className='ml-2'>{item.name}</span>
                    </div>
                ))}
            </div>
            
            <UserButton />
        </div>
    );
}

export default Header;
