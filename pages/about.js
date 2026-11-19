import React from "react";

const About = () => {
  return (
    <section className="bg-canvas px-6 py-16 text-ink">
      <div className="container mx-auto max-w-7xl">

        <h1 className="text-center text-5xl font-bold text-brand">About Aum Yoga</h1>
        <p className="text-center mt-4 text-gray-700 text-2xl">
          A journey to balance, peace, and a healthier you.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-2 mt-16">
          <div className="md:w-1/2">
            <img
              src="/images/eventone.jpg"
              alt="Yoga Pose"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-semibold text-gray-800">Our Philosophy</h2>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              At Aum Yoga, our mission is to empower individuals to find
              balance in their lives. We draw from the rich traditions of
              ancient yoga practices and blend them with modern techniques to
              nurture both mind and body.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center text-4xl font-bold text-gray-800">What We Offer</h2>
          <p className="text-center mt-4 text-xl text-gray-700">
            Discover a range of programs and services tailored to your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="/images/temp3rm.png"
                alt="Personal Yoga"
                className="h-40 w-40 mx-auto rounded-full shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Personal Yoga</h3>
              <p className="mt-2 text-gray-600">
                Personalized yoga sessions to suit your individual goals and
                preferences.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="/images/greatone.jpg"
                alt="Group Classes"
                className="h-40 w-40 mx-auto rounded-full shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Group Classes</h3>
              <p className="mt-2 text-gray-600">
                Join a community of like-minded individuals and practice
                together.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="/images/yogagif.gif"
                alt="Meditation Workshops"
                className="h-40 w-40 mx-auto rounded-full shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">
                Meditation Workshops
              </h3>
              <p className="mt-2 text-gray-600">
                Enhance mindfulness with our guided meditation sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-semibold text-gray-800">Our Vision</h2>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              To create a sanctuary where individuals can connect with their
              true selves. At Aum Yoga, we aspire to inspire healthier
              lifestyles through holistic practices and nurturing
              environments.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/sitting_teacher.png"
              alt="Vision"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-green-700">
            Ready to Begin Your Journey?
          </h2>
          <p className="mt-4 text-xl text-gray-700">
            Take the first step toward a healthier and happier you. Join us
            today!
          </p>
          <a
            href="/events"
            className="mt-6 inline-block rounded bg-[var(--color-primary)] px-8 py-3 text-lg font-semibold text-[var(--color-on-forest)] shadow-md transition hover:opacity-90"
          >
            Join Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
