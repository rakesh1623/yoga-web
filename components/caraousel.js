import React from 'react';
import Link from 'next/link';

const Carousel = () => {
  return (
    <section className="relative isolate flex min-h-[68vh] items-center overflow-hidden bg-[var(--color-forest)] px-6 py-20 text-white sm:min-h-[74vh]">
      <img
        src="/images/eventone.jpg"
        alt="Yoga practice at sunset"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" aria-hidden="true" />
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">A practice for every body</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">Aum Yoga</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
          Make room for movement, breath, and a little more balance in your everyday life.
        </p>
        <Link href="/events" className="mt-8 inline-flex items-center rounded bg-white px-6 py-3 font-semibold text-[#20392b] hover:bg-[#e7eee5]">
          Explore classes <span className="ml-3" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Carousel;
