import React from 'react';
import Link from 'next/link';

import localFont from 'next/font/local'

const myFont = localFont({ src: '../public/verdana-font-family/verdana-bold.ttf' })

const Carousel = () => {
  return (
    <div
      style={{
        backgroundImage: "url('images/back_five.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        display: 'flex',

        alignItems: 'center',
        paddingBottom: '22rem',// Adjust as needed
      }}
      className="cmain  mb-10  h-fit flex flex-col md:flex-row space-y-4  justify-center items-center relative"
    >
      <div className="right  mt-8 flex  justify-center flex-col items-center text-center">
        <h1 style={{fontFamily: myFont.style.fontFamily,  textShadow: "1px 1px 1px #919191 ,1px 2px 1px #919191,1px 3px 1px #919191, 1px 4px 1px #919191,1px 5px 1px #919191, 1px 6px 1px #919191,1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)" }} className="text-4xl text-white md:text-7xl " > 
          AUMYOGA </h1>
        <p className="md:text-xl text-white/80  text-base px-3 md:px-20 pt-3 md:pt-1 mt-8 pb-6 md:pb-8">
          Yoga is not just exercise, but a holistic mind-body lifestyle philosophy.
        </p>
        <Link href={"/events"}><button
  type="button"
  data-te-ripple-init
  data-te-ripple-color="light"
  className="inline-block bg-gray-700 rounded-xl text-xl  bg-primary px-6 pb-2 pt-2.5  font-medium uppercase leading-normal text-white ">
  Get Started
</button></Link>
      </div>
      <div className="left flex w-full md:w-full lg:w-fit  justify-center items-center">
        <img className="w-2/3 rounded-full mt-6" src="images/yogagif.gif" alt="" />
      </div>

    </div>
  );
};

export default Carousel;
