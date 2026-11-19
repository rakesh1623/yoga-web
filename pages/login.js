import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router.query]);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get('content-type') || '';
      const response = contentType.includes('application/json')
        ? await res.json()
        : { error: `Login server returned HTTP ${res.status}` };
      setLoading(false);

      if (response.success) {
        localStorage.setItem('token', response.token);
        setEmail('');
        setPassword('');
        toast.success('Successfully logged in', {
          position: 'top-center',
          autoClose: 1000,
        });
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        toast.error(response.error || 'Invalid Credentials', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error('Unable to reach the login service', {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };

  return (
    <main className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-10 text-ink">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-md rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="my-5 text-center text-3xl font-bold">Welcome back</h1>
        <div className="logimg flex justify-center items-center">
          <img src="/images/logo2.png" className="h-28 w-auto object-contain" alt="Aum Yoga" />
        </div>
        <form onSubmit={handleSubmit} method="POST" className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={handleChange}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forgetpassword"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button
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
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don&apos;t have an account?{' '}
          <Link
            href="/signUp"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
