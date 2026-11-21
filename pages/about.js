import React from 'react';
import Link from 'next/link';

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
const LeafIcon = (p) => (
  <Icon {...p}>
    <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
    <path d="M5 19c3-5 6-8 10-10" />
  </Icon>
);
const PersonIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
  </Icon>
);
const UsersIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5a3 3 0 010 6M18 14c2 .8 3 2.8 3 6" />
  </Icon>
);
const WaveIcon = (p) => (
  <Icon {...p}>
    <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />
  </Icon>
);
const EyeIcon = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const SunIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);
const ArrowIcon = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

/* ---------- Content ---------- */
const offerings = [
  {
    title: 'Personal Yoga',
    image: '/images/temp3rm.png',
    alt: 'Personal Yoga',
    Glyph: PersonIcon,
    description:
      'Personalized yoga sessions to suit your individual goals and preferences.',
  },
  {
    title: 'Group Classes',
    image: '/images/greatone.jpg',
    alt: 'Group Classes',
    Glyph: UsersIcon,
    description:
      'Join a community of like-minded individuals and practice together.',
  },
  {
    title: 'Meditation Workshops',
    image: '/images/yogagif.gif',
    alt: 'Meditation Workshops',
    Glyph: WaveIcon,
    description: 'Enhance mindfulness with our guided meditation sessions.',
  },
];

/* ---------- Page ---------- */
const About = () => {
  return (
    <main className="bg-canvas text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
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
            Our story
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-brand sm:text-6xl md:text-7xl">
            About Aum Yoga
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            A journey to balance, peace, and a healthier you.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
            <img
              src="/images/eventone.jpg"
              alt="Yoga Pose"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-5 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-surface text-brand shadow-sm">
            <LeafIcon className="h-6 w-6" />
          </span>
        </div>

        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <LeafIcon className="h-5 w-5" />
            What guides us
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
            Our philosophy
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            At Aum Yoga, our mission is to empower individuals to find balance
            in their lives. We draw from the rich traditions of ancient yoga
            practices and blend them with modern techniques to nurture both
            mind and body.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section className="border-y border-[var(--color-border)] bg-surface px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              <SunIcon className="h-5 w-5" />
              Programs and services
            </p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
              What we offer
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Discover a range of programs and services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-canvas motion-safe:transition-colors hover:border-[var(--color-primary)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-raised)]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-brand backdrop-blur-sm">
                    <item.Glyph className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="md:order-2">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6">
            <img
              src="/images/yoga-pose.svg"
              alt="Vision"
              loading="lazy"
              className="mx-auto max-h-96 w-full object-contain"
            />
          </div>
        </div>

        <div className="md:order-1">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <EyeIcon className="h-5 w-5" />
            Where we are headed
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
            Our vision
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            To create a sanctuary where individuals can connect with their true
            selves. At Aum Yoga, we aspire to inspire healthier lifestyles
            through holistic practices and nurturing environments.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-forest)] px-6 py-16 text-center text-[var(--color-on-forest)] md:py-24">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-primary)] text-[var(--color-primary)]">
          <LotusIcon className="h-7 w-7" />
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
          Ready to begin your journey?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 opacity-80 md:text-lg">
          Take the first step toward a healthier and happier you. Join us
          today!
        </p>
        <Link
          href="/events"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-surface px-7 py-3 text-lg font-semibold text-ink hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Join now
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
};

export default About;