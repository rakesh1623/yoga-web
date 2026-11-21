import Link from 'next/link';
import React from 'react';
import product from '@/models/product';
import dbConnect from '@/lib/dbConnect';

/* ---------- Icons (inline SVG, no extra dependency) ---------- */
const Icon = ({ children, className = 'h-5 w-5' }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        focusable="false"
    >
        {children}
    </svg>
);

const LotusIcon = (p) => (
    <Icon {...p}>
        <path d="M12 20c-3.5 0-7-2-8-6 3 0 5.5 1 8 3 2.5-2 5-3 8-3-1 4-4.5 6-8 6z" />
        <path d="M12 17c-2-2-3-5 0-11 3 6 2 9 0 11z" />
    </Icon>
);
const ArrowIcon = (p) => (
    <Icon {...p}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
);
const ChevronDownIcon = (p) => (
    <Icon {...p}>
        <path d="M6 9l6 6 6-6" />
    </Icon>
);
const LeafIcon = (p) => (
    <Icon {...p}>
        <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
        <path d="M5 19c3-5 6-8 10-10" />
    </Icon>
);
const CalendarIcon = (p) => (
    <Icon {...p}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 3v4M16 3v4" />
    </Icon>
);

/* ---------- Page ---------- */
const Events = ({ products }) => {
    return (
        <main className="min-h-screen bg-canvas text-ink">

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-28 md:pb-28">
                {/* Concentric rings, a quiet nod to a breath cycle */}
                <svg
                    viewBox="0 0 800 800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-[var(--color-border)]"
                    aria-hidden="true"
                    focusable="false"
                >
                    <circle cx="400" cy="400" r="120" />
                    <circle cx="400" cy="400" r="210" />
                    <circle cx="400" cy="400" r="300" />
                    <circle cx="400" cy="400" r="390" />
                </svg>

                <div className="relative mx-auto max-w-4xl text-center">
                    <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-surface px-5 py-2 text-sm font-medium text-muted">
                        <LotusIcon className="h-4 w-4 text-brand" />
                        Find your inner balance
                    </span>

                    <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                        Make space for
                        <span className="block text-brand">yourself.</span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg">
                        Discover thoughtfully designed yoga programs that
                        bring movement, mindfulness and balance into your
                        everyday life.
                    </p>

                    <a
                        href="#programs"
                        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3 font-semibold text-[var(--color-on-primary)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    >
                        Explore programs
                        <ChevronDownIcon className="h-4 w-4" />
                    </a>
                </div>
            </section>

            {/* Programs */}
            <section id="programs" className="scroll-mt-8 px-5 pb-24 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-10 flex flex-col gap-4 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                                <LeafIcon className="h-5 w-5" />
                                Our offerings
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl">
                                Choose your practice
                            </h2>
                        </div>

                        <p className="inline-flex items-center gap-2 text-sm text-muted">
                            <CalendarIcon className="h-4 w-4" />
                            {products.length > 0
                                ? `${products.length} ${products.length === 1 ? 'program' : 'programs'} available`
                                : 'Find a program that feels right for you.'}
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-border)] bg-surface px-6 py-20 text-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-canvas)] text-brand">
                                <LotusIcon className="h-8 w-8" />
                            </span>
                            <p className="mt-6 font-serif text-2xl">
                                New programs are coming soon.
                            </p>
                            <p className="mt-3 text-muted">
                                Please check back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
                            {products.map((item) => (
                                <article
                                    key={item.slug}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-primary)] motion-safe:transition-colors hover:border-[var(--color-primary)]"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3.4] overflow-hidden bg-[var(--color-canvas)]">
                                        <img
                                            src={item.img}
                                            alt={item.title || 'Yoga class'}
                                            loading="lazy"
                                            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-brand backdrop-blur-sm">
                                            <LotusIcon className="h-4 w-4" />
                                            Yoga program
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-6 md:p-7">
                                        <h3 className="font-serif text-2xl text-ink motion-safe:transition-colors group-hover:text-brand">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">
                                            {item.desc || 'Explore this yoga program and begin your journey towards a healthier, more balanced lifestyle.'}
                                        </p>

                                        <div className="mt-auto pt-6">
                                            {/* Stretched link makes the whole card clickable */}
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="flex items-center justify-between border-t border-[var(--color-border)] pt-5 outline-none after:absolute after:inset-0 after:content-['']"
                                            >
                                                <span className="font-semibold text-brand">
                                                    View program
                                                </span>

                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-canvas)] text-brand motion-safe:transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)]">
                                                    <ArrowIcon className="h-4 w-4" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[var(--color-forest)] px-6 py-16 text-center text-[var(--color-on-forest)] md:py-24">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-primary)] text-[var(--color-primary)]">
                    <LeafIcon className="h-7 w-7" />
                </span>

                <p className="mt-5 text-sm font-semibold text-[var(--color-primary)]">
                    Your journey starts here
                </p>

                <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl">
                    A healthier you begins with one step.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 opacity-80 md:text-base">
                    Take a moment for yourself. Find your practice,
                    embrace the process and let wellness become a way of life.
                </p>

                <a
                    href="#programs"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3 font-semibold text-ink hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                >
                    Choose a program
                    <ArrowIcon className="h-4 w-4" />
                </a>
            </section>

        </main>
    );
};

export async function getServerSideProps() {
    try {
        await dbConnect();

        const products = await product.find({}).lean();

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)),
            },
        };
    } catch (error) {
        console.error('MongoDB Error:', error);
        throw error;
    }
}

export default Events;