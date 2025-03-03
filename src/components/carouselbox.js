import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import loveCare from '@images/lovecare.png';
import health from '@images/health.png';
import share from '@images/sharing.png';
import track from '@images/track.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';

const items = [loveCare, health, share, track];

export default function carouselBox() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-full flex items-center aspect-auto justify-center">
                <Image src={items[index]} alt="images" className="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
