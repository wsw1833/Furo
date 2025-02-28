'use client';
import Image from 'next/image';
import animals from '@images/animals.png';
import icon from '@images/icon.png';
import scroll from '@images/scroll.png';
import metamask from '@images/metamask.png';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  function connectHandler() {
    //metamask wallet connection (server component)
    router.push('/profile');
  }

  return (
    <div className="flex overflow-none">
      <div className="flex flex-col w-[50%] mt-18 px-12">
        <div className="flex flex-row items-center justify-start gap-2">
          <Image
            lazy="true"
            src={icon}
            alt="icon"
            width={78}
            height={78}
          ></Image>
          <div className="text-5xl font-semibold">Petify</div>
        </div>
        <p className="line-clamp-2 mt-10 text-6xl leading-auto font-bold leading-20">
          Pawprints in the Blockchain
        </p>
        <p className="line-clamp-2 mt-8 text-4xl font-medium w-[60%] leading-12">
          Revolutionizing Pet Care with Soulbound
        </p>
        <div className="flex flex-row items-center justify-start gap-2 mt-6">
          <p className="text-base font-medium text-[#484848]">
            Powered By Scroll.
          </p>
          <Image src={scroll} alt="icon" width={32} height={32}></Image>
        </div>
        <button
          onClick={connectHandler}
          className="bg-[#FFC65C] mt-16 w-[50%] h-auto py-2 font-medium rounded-[12px] text-lg flex gap-4 items-center justify-center"
        >
          Connect With Metamask
          <Image
            lazy="true"
            src={metamask}
            alt="metamask logo"
            width={32}
            height={32}
          ></Image>
        </button>
      </div>
      <Image
        className="w-[50%] max-h-200 md:min-h-180 md:max-w-full"
        src={animals}
        alt="animal picture"
        lazy="true"
      ></Image>
    </div>
  );
}
