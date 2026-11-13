
import Link from 'next/link';
import React from 'react';
import product from '@/models/product';
import dbConnect from '@/lib/dbConnect';

const Events = ({ products }) => {
    return (
        <main className="min-h-screen bg-[#faf8f3] text-[#263b2f]">

            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
                <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#e9e5d5] rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#dce8dc] rounded-full blur-3xl opacity-60" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <span className="inline-block rounded-full border border-[#c8d4c6] px-5 py-2 text-xs tracking-[0.25em] uppercase text-[#647b64] font-semibold mb-7">
                        Find Your Inner Balance
                    </span>

                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
                        Make Space for
                        <span className="block italic text-[#8b9d78]">
                            Yourself.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg leading-8 text-[#718071]">
                        Discover thoughtfully designed yoga programs that
                        bring movement, mindfulness and balance into your
                        everyday life.
                    </p>

                    <div className="mt-9 flex justify-center items-center gap-3 text-sm text-[#718071]">
                        <span className="w-10 h-px bg-[#a9b69e]" />
                        Explore Our Programs
                        <span className="w-10 h-px bg-[#a9b69e]" />
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="px-5 sm:px-8 lg:px-12 pb-24">
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <p className="text-xs tracking-[0.25em] uppercase text-[#8b9d78] font-semibold mb-3">
                                Our Offerings
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl">
                                Choose Your Practice
                            </h2>
                        </div>

                        <p className="text-sm text-[#879083]">
                            Find a program that feels right for you.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 rounded-3xl bg-white border border-[#e9e6dc]">
                            <p className="font-serif text-2xl">
                                New experiences are coming soon.
                            </p>
                            <p className="text-[#879083] mt-3">
                                Please check back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
                            {products.map((item) => (
                                <article
                                    key={item.slug}
                                    className="group bg-white rounded-2xl overflow-hidden border border-[#ebe8df] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden aspect-[4/4.2] bg-[#eeeae0]">
                                        <img
                                            src={item.img}
                                            alt={item.title || "Yoga class"}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                                        <span className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#536c54]">
                                            Yoga Program
                                        </span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 md:p-7">
                                        <h3 className="font-serif text-2xl text-[#263b2f] group-hover:text-[#849875] transition-colors duration-300">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-[#899187] line-clamp-2">
                                            {item.desc || "Explore this yoga program and begin your journey towards a healthier, more balanced lifestyle."}
                                        </p>

                                        <div className="mt-7 pt-5 border-t border-[#eeeae2]">
                                            <Link
                                                href={`product/${item.slug}`}
                                                className="flex items-center justify-between group/link"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#536c54]">
                                                    Explore Program
                                                </span>

                                                <span className="w-10 h-10 rounded-full bg-[#edf1e8] flex items-center justify-center text-[#536c54] group-hover/link:bg-[#536c54] group-hover/link:text-white transition-all duration-300">
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
            <section className="bg-[#344c3b] px-6 py-16 md:py-20 text-center text-white">
                <p className="text-xs tracking-[0.3em] uppercase text-[#c2d0b7] mb-5">
                    Your Journey Starts Here
                </p>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">
                    A healthier you begins with one step.
                </h2>

                <p className="mt-5 max-w-xl mx-auto text-sm md:text-base leading-7 text-[#d0d9cc]">
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
