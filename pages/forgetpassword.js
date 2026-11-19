import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import product from '@/models/product';
import user from '@/models/user';
import mongoose from "mongoose";
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgetpassword = ({ user }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [change, setChange] = useState(false)

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

            const res = await fetch("api/resetPassword", {
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
                toast.error('Unable to send password reset link', {
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
            const res = await fetch("api/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: email, password: password, cpassword: cpassword }),
            });
            let response = await res.json()
            if (response) {
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
                toast.error('Unable to change your password', {
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
                        <input
                            id='password'
                            type="password"
                            name='password'
                            onChange={handleChange}
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <label
                            htmlFor="cpassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            id='cpassword'
                            type="password"
                            name='cpassword'
                            onChange={handleChange}
                            value={cpassword}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />

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

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let u = await user.findOne({ token: context.query.token })

    return {
        props: { user: JSON.parse(JSON.stringify(u)) },
    }
}


export default Forgetpassword