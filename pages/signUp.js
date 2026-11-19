import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router.query]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'otp') setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (step === 1) {
      const data = { name, email };
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      setLoading(false);
      if (response.success) {
        setStep(2);
        toast.success('OTP sent to your email!', {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {

        toast.error(response.message || response.msg || response.error || 'Failed to send OTP', {
          position: 'top-center',
        });
      }
    } else if (step === 2) {
      const data = { name, email, otp, password };
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      setLoading(false);

      if (response.success) {
        localStorage.setItem('token', response.token); // Store the token
        toast.success('Account created successfully!', {
          position: 'top-center',
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push('/'); // Redirect to home
        }, 900);
      } else {
        alert('OTP verification failed');
      }
    }
  };

  return (
    <main className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-10 text-ink">
      <ToastContainer />
      <div className="w-full max-w-md rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="my-5 text-center text-3xl font-bold">Create your account</h1>
        <div className="logimg flex justify-center items-center">
          <img src="/images/logo2.png" className="h-28 w-auto object-contain" alt="Aum Yoga" />
        </div>
        <form onSubmit={handleSubmit} method="POST" className="mt-6">
          {step === 1 && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                  Name
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={handleChange}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={handleChange}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-800">
                OTP
              </label>
              <input
                name="otp"
                value={otp}
                onChange={handleChange}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          )}

          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : step === 1 ? 'Sign Up' : 'Verify OTP'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
