import { useState } from 'react';
import Link from 'next/link';

const poses = [
  {
    title: 'Yogamudrasana',
    description: 'A seated forward bend that encourages relaxation, flexibility, and focus.',
    image: '/images/one_updated.jpeg',
  },
  {
    title: 'Omkarasana',
    description: 'A grounding posture that develops balance, strength, and steady breath.',
    image: '/images/three_back_removed.png',
  },
  {
    title: 'Garudasana',
    description: 'A balancing pose that opens the shoulders and brings attention to the present.',
    image: '/images/two_back_removed.png',
  },
  {
    title: 'Adho Mukha Svanasana',
    description: 'A full-body stretch that builds strength and supports mobility.',
    image: '/images/four_back_removed.png',
  },
];

const courses = [
  {
    title: 'General Yoga',
    image: '/images/generalyogamorning.png',
    description:
      'Build flexibility and strength through a balanced mix of asana, breathing, and relaxation. Suitable for a range of experience levels.',
  },
  {
    title: 'Fat Loss Yoga',
    image: '/images/fatlossmorning.png',
    description:
      'Dynamic sequences pair movement and breath to support stamina, mobility, and a consistent fitness practice.',
  },
  {
    title: 'One-to-one Guidance',
    image: '/images/one_to_one_counselling.jpg',
    description:
      'A focused session shaped around your goals, experience, and questions about building a sustainable practice.',
  },
];

export default function Intro() {
  const [activeCourse, setActiveCourse] = useState(0);
  const course = courses[activeCourse];

  return (
    <main className="bg-canvas text-ink">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Move with intention
        </p>
        <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">
          Yoga is for everyone
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {poses.map((pose) => (
            <article
              key={pose.title}
              className="group overflow-hidden rounded border border-[var(--color-border)] bg-surface"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[var(--color-surface-raised)]">
                <img
                  src={pose.image}
                  alt={pose.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{pose.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {pose.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-surface px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Find your rhythm
          </p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Explore our courses
            </h2>
            <Link
              href="/events"
              className="font-semibold text-brand underline underline-offset-4"
            >
              All classes
            </Link>
          </div>
          <div
            className="mb-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Yoga courses"
          >
            {courses.map((item, index) => (
              <button
                key={item.title}
                id={`course-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeCourse === index}
                aria-controls="course-panel"
                onClick={() => setActiveCourse(index)}
                className={`rounded border px-4 py-2 text-sm font-semibold ${activeCourse === index
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                  : 'border-[var(--color-border)] bg-transparent text-ink hover:bg-canvas'
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div
            id="course-panel"
            role="tabpanel"
            aria-labelledby={`course-tab-${activeCourse}`}
            className="grid overflow-hidden rounded border border-[var(--color-border)] bg-canvas md:grid-cols-[minmax(0,0.9fr)_1.1fr]"
          >
            <div className="aspect-[4/3] min-h-56 bg-[var(--color-surface-raised)] md:aspect-auto">
              <img
                src={course.image}
                alt={`${course.title} practice`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center p-6 sm:p-10">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                {course.title}
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-muted">
                {course.description}
              </p>
              <Link
                href="/events"
                className="mt-7 inline-flex items-center rounded bg-[var(--color-primary)] px-5 py-3 font-semibold text-[var(--color-on-primary)] hover:opacity-90"
              >
                Find a class{' '}
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20">
        <div className="overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          <img
            src="/images/standing_teacher.jpg"
            alt="Aum Yoga instructor"
            loading="lazy"
            className="max-h-[34rem] w-full object-cover object-top"
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Guidance for your practice
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Meet your trainer
          </h2>
          <h3 className="mt-6 text-xl font-semibold">Aryan Vedanta</h3>
          <p className="mt-3 leading-7 text-muted">
            A certified yoga trainer with over 10 years of experience in
            mindfulness, flexibility, and holistic health. His practice includes
            Hatha Yoga, Vinyasa Flow, and meditation.
          </p>
          <p className="mt-3 leading-7 text-muted">
            The aim is simple: help each person build a healthier, more balanced
            practice at their own pace.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-forest)] px-5 py-14 text-center text-[var(--color-on-forest)] sm:px-8 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          A small step, a steady practice
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
          Find a class that fits your day.
        </h2>
        <Link
          href="/events"
          className="mt-7 inline-flex rounded bg-surface px-6 py-3 font-semibold text-ink hover:opacity-90"
        >
          Browse classes
        </Link>
      </section>
    </main>
  );
}