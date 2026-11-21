import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import product from '@/models/product';
import user from '@/models/user';
import dbConnect from "@/lib/dbConnect";
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Forgetpassword = ({ user }) => {
    const router = useRouter()
    const resetToken = router.query.token
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [change, setChange] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {

        if (user) {

            if (user.token) {
                setChange(true);
                setEmail(user.email)
            }
        }

    }, [])

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        if (e.target.name == 'cpassword') {
            setCpassword(e.target.value)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {

            const res = await fetch("/api/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: email }),
            });

            let response = await res.json()
            if (response.success) {
                setEmail('')
                toast.success('Password reset link has been sent successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.msg || 'Unable to send password reset link', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } else {
            alert("Email is incorrect")
        }
    }

    const handlePass = async (e) => {
        e.preventDefault()

        if ((password == cpassword) && password.length > 3 && cpassword.length > 3) {
            const res = await fetch("/api/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: email, password: password, cpassword: cpassword, resetToken }),
            });
            let response = await res.json()
            if (response.success) {
                setPassword('')
                setCpassword('')
                toast.success('Your password has been changed successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {
                toast.error(response.msg || 'Unable to change your password', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            alert("Password did't match")
        }
    }

    return (

        <>

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

            <main className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-10 text-ink">
                <div className="w-full max-w-md rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm sm:p-8">
                    <h1 className='text-center my-5 text-3xl font-bold'>Forgot Password</h1>
                    <div className="logimg flex justify-center items-center">

                        <img src="/images/logo2.png" className="h-28 w-auto object-contain" alt="Aum Yoga" />
                    </div>
                    {!change && <form className="mt-6" method='POST' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                onChange={handleChange}
                                value={email}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>


                        <div className="mt-2">
                            <button onClick={handleSubmit} type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Send Verification Mail
                            </button>
                        </div>

                    </form>}

                    {change && (<form className="mt-6" method='POST' onSubmit={handlePass}>


                        <p>Your password reset link has been sent to  <span>{email}</span></p>

                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <div className="relative mt-2">
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                onChange={handleChange}
                                value={password}
                                className="block w-full rounded-md border bg-white px-4 py-2 pr-12 text-gray-700 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                title={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                            </button>
                        </div>
                        <label
                            htmlFor="cpassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <div className="relative mt-2">
                            <input
                                id='cpassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='cpassword'
                                onChange={handleChange}
                                value={cpassword}
                                className="block w-full rounded-md border bg-white px-4 py-2 pr-12 text-gray-700 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((visible) => !visible)}
                                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                {showConfirmPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                            </button>
                        </div>

                        <div className="mt-2">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Password Reset
                            </button>
                        </div>
                    </form>)
                    }

                    <p className="mt-4 text-sm text-center text-gray-700">
                        Back to Login!{" "}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </main>
        </>
    )
}


export async function getServerSideProps(context) {

    await dbConnect()

    const u = context.query.token
        ? await user.findOne({ token: context.query.token }).lean()
        : null

    return {
        props: { user: JSON.parse(JSON.stringify(u)) },
    }
}


export default Forgetpassword