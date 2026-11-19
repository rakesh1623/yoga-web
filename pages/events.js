
import Link from 'next/link';
import React from 'react';
import product from '@/models/product';
import dbConnect from '@/lib/dbConnect';

const Events = ({ products }) => {
    return (
        <main className="min-h-screen bg-canvas text-ink">

            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
                <div className="relative max-w-5xl mx-auto text-center">
                    <span className="mb-7 inline-block rounded border border-[var(--color-border)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Find Your Inner Balance
                    </span>

                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
                        Make Space for
                        <span className="block italic text-brand">
                            Yourself.
                        </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg">
                        Discover thoughtfully designed yoga programs that
                        bring movement, mindfulness and balance into your
                        everyday life.
                    </p>

                    <div className="mt-9 flex items-center justify-center gap-3 text-sm text-muted">
                        <span className="h-px w-10 bg-[var(--color-border)]" />
                        Explore Our Programs
                        <span className="h-px w-10 bg-[var(--color-border)]" />
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="px-5 sm:px-8 lg:px-12 pb-24">
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                                Our Offerings
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl">
                                Choose Your Practice
                            </h2>
                        </div>

                        <p className="text-sm text-muted">
                            Find a program that feels right for you.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="rounded border border-[var(--color-border)] bg-surface py-20 text-center">
                            <p className="font-serif text-2xl">
                                New experiences are coming soon.
                            </p>
                            <p className="mt-3 text-muted">
                                Please check back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
                            {products.map((item) => (
                                <article
                                    key={item.slug}
                                    className="group overflow-hidden rounded border border-[var(--color-border)] bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/4.2] overflow-hidden bg-[var(--color-canvas)]">
                                        <img
                                            src={item.img}
                                            alt={item.title || "Yoga class"}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                                        <span className="absolute left-5 top-5 rounded bg-surface/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand backdrop-blur-sm">
                                            Yoga Program
                                        </span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 md:p-7">
                                        <h3 className="font-serif text-2xl text-ink transition-colors duration-300 group-hover:text-brand">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">
                                            {item.desc || "Explore this yoga program and begin your journey towards a healthier, more balanced lifestyle."}
                                        </p>

                                        <div className="mt-7 border-t border-[var(--color-border)] pt-5">
                                            <Link
                                                href={`product/${item.slug}`}
                                                className="flex items-center justify-between group/link"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                                                    Explore Program
                                                </span>

                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-canvas)] text-brand transition-all duration-300 group-hover/link:bg-[var(--color-primary)] group-hover/link:text-[var(--color-on-primary)]">
                                                    →
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
            <section className="bg-[var(--color-forest)] px-6 py-16 text-center text-[var(--color-on-forest)] md:py-20">
                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Your Journey Starts Here
                </p>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">
                    A healthier you begins with one step.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
                    Take a moment for yourself. Find your practice,
                    embrace the process and let wellness become a way of life.
                </p>
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
