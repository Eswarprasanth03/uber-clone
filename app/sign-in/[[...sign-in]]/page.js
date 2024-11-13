import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <div>
        <Image 
          src='/login.jpg'

          objectPosition='relative'
          width={900} 
          height={1000} 
          className="object-contain h-full w-full" 
          alt="Uber Banner" 
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
