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

export default function CarouselBox() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="w-fit h-fit flex items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-fit h-fit max-w-xs p-0 items-center justify-center"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="lg:w-full lg:h-full md:w-30 md:h-30 w-max h-max flex items-center aspect-auto justify-center">
                <Image
                  src={items[index]}
                  alt="images"
                  priority
                  className="pl-0"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
