import React, { RefObject, useRef } from 'react';
import { motion, useScroll,useTransform } from 'framer-motion';

interface LiComponentProps {
  reference: RefObject<HTMLDivElement>;
}

const LiComponent: React.FC<LiComponentProps> = ({reference}) => {

    const refL = useRef(null);

    const {scrollYProgress} = useScroll(
        {
            target: refL,
            offset:["center end", "center center"]
        }
    );

    const newPathLength = useTransform(scrollYProgress, value => value *2);

  return (
    <>
      <figure ref={refL} className='absolute left-0 stroke-black'>
        <svg width="75" height="75" viewBox='0 0 100 100' className='-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'>
          <circle cx="75" cy="50" r="20" className='stroke-primary stroke-1 fill-none' />
          <motion.circle cx="75" cy="50" r="20" className='stroke-[5px] fill-white' style={{
            pathLength: newPathLength
          }} />
          <circle cx="75" cy="50" r="10" className='animate-pulse stroke-1 fill-green-500' />
        </svg>
      </figure>
    </>
  );
};

export default LiComponent;