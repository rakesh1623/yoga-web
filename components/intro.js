import { useRef, useState } from 'react';
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
const MountainIcon = (p) => (
  <Icon {...p}>
    <path d="M3 19l6-10 4 6 2-3 6 7H3z" />
  </Icon>
);
const BalanceIcon = (p) => (
  <Icon {...p}>
    <path d="M12 4v16M5 20h14M5 8h14" />
    <path d="M7 8l-3 6a3 3 0 006 0L7 8zM17 8l-3 6a3 3 0 006 0l-3-6z" />
  </Icon>
);
const WaveIcon = (p) => (
  <Icon {...p}>
    <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />
  </Icon>
);
const SunIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);
const FlameIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3c1 3 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z" />
  </Icon>
);
const PersonIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5a3 3 0 010 6M18 14c2 .8 3 2.8 3 6" />
  </Icon>
);
const AwardIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" />
  </Icon>
);
const ArrowIcon = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

/* ---------- Content ---------- */
const poses = [
  {
    title: 'Yogamudrasana',
    description:
      'A seated forward bend that encourages relaxation, flexibility, and focus.',
    image: '/images/one_updated.jpeg',
    focus: 'Relaxation',
    Glyph: LotusIcon,
  },
  {
    title: 'Omkarasana',
    description:
      'A grounding posture that develops balance, strength, and steady breath.',
    image: '/images/three_back_removed.png',
    focus: 'Strength',
    Glyph: MountainIcon,
  },
  {
    title: 'Garudasana',
    description:
      'A balancing pose that opens the shoulders and brings attention to the present.',
    image: '/images/two_back_removed.png',
    focus: 'Balance',
    Glyph: BalanceIcon,
  },
  {
    title: 'Adho Mukha Svanasana',
    description:
      'A full-body stretch that builds strength and supports mobility.',
    image: '/images/four_back_removed.png',
    focus: 'Mobility',
    Glyph: WaveIcon,
  },
];

const courses = [
  {
    title: 'General Yoga',
    short: 'Balanced asana, breath, and rest',
    image: '/images/generalyogamorning.png',
    Glyph: SunIcon,
    description:
      'Build flexibility and strength through a balanced mix of asana, breathing, and relaxation. Suitable for a range of experience levels.',
  },
  {
    title: 'Fat Loss Yoga',
    short: 'Dynamic, breath-led sequences',
    image: '/images/fatlossmorning.png',
    Glyph: FlameIcon,
    description:
      'Dynamic sequences pair movement and breath to support stamina, mobility, and a consistent fitness practice.',
  },
  {
    title: 'One-to-one Guidance',
    short: 'A session built around you',
    image: '/images/one_to_one_counselling.jpg',
    Glyph: PersonIcon,
    description:
      'A focused session shaped around your goals, experience, and questions about building a sustainable practice.',
  },
];

const styles = ['Hatha Yoga', 'Vinyasa Flow', 'Meditation'];

/* ---------- Page ---------- */
export default function Intro() {
  const [activeCourse, setActiveCourse] = useState(0);
  const tabRefs = useRef([]);
  const course = courses[activeCourse];
  const [feature, ...rest] = poses;

  // Arrow-key navigation for the course tabs
  const onTabKeyDown = (e, index) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + courses.length) % courses.length;
    setActiveCourse(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <main className="bg-canvas text-ink">
      {/* ---------- Poses ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <LotusIcon className="h-5 w-5" />
            Move with intention
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
            Yoga is for everyone
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Featured pose */}
          <article className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface lg:col-span-2">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--color-surface-raised)]">
              <img
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-raised)] px-3 py-1 text-xs font-semibold text-brand">
                <feature.Glyph className="h-4 w-4" />
                {feature.focus}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-md leading-7 text-muted">
                {feature.description}
              </p>
            </div>
          </article>

          {/* Remaining poses as horizontal rows */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            {rest.map((pose) => (
              <article
                key={pose.title}
                className="group flex flex-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface"
              >
                <div className="w-2/5 shrink-0 overflow-hidden bg-[var(--color-surface-raised)] sm:w-1/3">
                  <img
                    src={pose.image}
                    alt={pose.title}
                    loading="lazy"
                    className="h-full min-h-40 w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-surface-raised)] px-3 py-1 text-xs font-semibold text-brand">
                    <pose.Glyph className="h-4 w-4" />
                    {pose.focus}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold sm:text-2xl">
                    {pose.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                    {pose.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Courses ---------- */}
      <section className="border-y border-[var(--color-border)] bg-surface px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                <WaveIcon className="h-5 w-5" />
                Find your rhythm
              </p>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
                Explore our courses
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
            >
              All classes
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
            {/* Tab list */}
            <div
              className="flex flex-col gap-3"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Yoga courses"
            >
              {courses.map((item, index) => {
                const active = activeCourse === index;
                return (
                  <button
                    key={item.title}
                    ref={(el) => (tabRefs.current[index] = el)}
                    id={`course-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="course-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveCourse(index)}
                    onKeyDown={(e) => onTabKeyDown(e, index)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] motion-safe:transition-colors ${active
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                        : 'border-[var(--color-border)] bg-canvas text-ink hover:border-[var(--color-primary)]'
                      }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${active
                          ? 'bg-black/10'
                          : 'bg-[var(--color-surface-raised)] text-brand'
                        }`}
                    >
                      <item.Glyph className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-semibold">{item.title}</span>
                      <span
                        className={`mt-0.5 block text-sm ${active ? 'opacity-80' : 'text-muted'
                          }`}
                      >
                        {item.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div
              id="course-panel"
              role="tabpanel"
              aria-labelledby={`course-tab-${activeCourse}`}
              className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-canvas"
            >
              <div className="aspect-[16/9] bg-[var(--color-surface-raised)]">
                <img
                  key={course.image}
                  src={course.image}
                  alt={`${course.title} practice`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                <div className="max-w-xl">
                  <h3 className="flex items-center gap-3 font-serif text-2xl font-semibold sm:text-3xl">
                    <course.Glyph className="h-7 w-7 text-brand" />
                    {course.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">
                    {course.description}
                  </p>
                </div>
                <Link
                  href="/events"
                  className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-on-primary)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                >
                  Find a class
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trainer ---------- */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
            <img
              src="/images/standing_teacher.jpg"
              alt="Aum Yoga instructor"
              loading="lazy"
              className="max-h-[34rem] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-surface px-5 py-3 shadow-sm sm:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-brand">
              <AwardIcon className="h-5 w-5" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold">10+ years</span>
              <span className="text-muted">Certified trainer</span>
            </span>
          </div>
        </div>

        <div className="pt-4 md:pt-0">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <PersonIcon className="h-5 w-5" />
            Guidance for your practice
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
            Meet your trainer
          </h2>
          <h3 className="mt-6 text-xl font-semibold">Aryan Vedanta</h3>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            A certified yoga trainer with over 10 years of experience in
            mindfulness, flexibility, and holistic health. His practice includes
            Hatha Yoga, Vinyasa Flow, and meditation.
          </p>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            The aim is simple: help each person build a healthier, more balanced
            practice at their own pace.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {styles.map((s) => (
              <li
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-surface px-4 py-2 text-sm font-medium"
              >
                <LotusIcon className="h-4 w-4 text-brand" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[var(--color-forest)] px-5 py-16 text-center text-[var(--color-on-forest)] sm:px-8 md:py-20">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-primary)] text-[var(--color-primary)]">
          <LotusIcon className="h-7 w-7" />
        </span>
        <p className="mt-5 text-sm font-semibold text-[var(--color-primary)]">
          A small step, a steady practice
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
          Find a class that fits your day.
        </h2>
        <Link
          href="/events"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-surface px-7 py-3 font-semibold text-ink hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Browse classes
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}