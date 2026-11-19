import user from "@/models/user";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const MyAccount = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const router = useRouter();

  useEffect(() => {

    const t = localStorage.getItem('token')
    const handleFetchUserData = async () => {
      const data = await fetch(`api/getuser`,
        {
          method: "POST", headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ token: t })
        })
      let u = await data.json();

      if (u) {

        setEmail(u.user[0].email)
        setName(u.user[0].name)
      }

    }
    if (t) {
      handleFetchUserData()
    } else {
      router.push('/')
    }
  }, [])

  const handleEditProfile = () => {
    router.push(`/edit-profile?email=${email}&name=${name}`);
  };

  return (
    <section className="min-h-[65vh] bg-canvas px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-4xl rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm sm:p-8">

        <div className="flex items-center gap-6">
          <FaUserCircle className="text-6xl text-brand" />
          <div>
            <h1 className="text-2xl font-bold text-ink sm:text-3xl">
              Welcome, {name}!
            </h1>
            <p className="break-all text-muted">{email}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-ink">Account details</h2>
          <div className="mt-4 divide-y divide-[var(--color-border)] rounded border border-[var(--color-border)] px-4">
            <div className="flex flex-wrap justify-between gap-2 py-4">
              <span className="text-muted">Name</span>
              <span className="font-semibold">{name || 'Loading...'}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 py-4">
              <span className="text-muted">Email</span>
              <span className="break-all font-semibold">{email || 'Loading...'}</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-ink">Quick links</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center rounded bg-[var(--color-primary)] px-6 py-3 text-lg font-semibold text-[var(--color-on-forest)] shadow-sm hover:opacity-90">
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
            <Link href="/orders" className="flex items-center justify-center rounded border border-[var(--color-border)] px-6 py-3 text-lg font-semibold hover:bg-[var(--color-canvas)]">
              <FaCalendarAlt className="mr-2" />
              View orders
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted">
            Need help? <Link href="/contact" className="font-semibold text-brand underline underline-offset-2">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
