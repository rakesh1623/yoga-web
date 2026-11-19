import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)


    }
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    if (e.target.name == 'message') {
      setMessage(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const response = await res.json()
      if (!res.ok || response.success === false) {
        throw new Error(response.msg || response.message || 'Unable to send your message.')
      }
      setName('')
      setEmail('')
      setMessage('')
      toast.success('Your message has been sent successfully', { position: 'top-center' })
    } catch (error) {
      toast.error(error.message || 'Unable to send your message.', { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} pauseOnFocusLoss draggable pauseOnHover />
      <main className="min-h-[65vh] bg-canvas px-4 py-14 text-ink sm:px-6">
        <div className="text-center text-4xl font-semibold sm:text-5xl">Contact Us</div>

        <div className="mt-3 flex items-center justify-center text-center">
          <span className="mx-2 mt-1 h-px w-10 bg-[var(--color-border)]"></span>
          <p className="font-semibold text-muted">Get in touch</p>
          <span className="mx-2 mt-1 h-px w-10 bg-[var(--color-border)]"></span>

        </div>

        <div className="mx-auto my-10 max-w-3xl overflow-hidden rounded border border-[var(--color-border)] bg-surface px-5 py-8 shadow-sm sm:px-9">

          <form onSubmit={handleSubmit} method="POST" className="m-auto w-full max-w-xl">

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-ink">
                  Full Name
                </label>
                <input required value={name} onChange={handleChange} name="name" className="block w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink focus:border-[var(--color-primary)] focus:outline-none" id="contact-name" type="text" autoComplete="name" placeholder="Your name" />

              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-ink">
                  Email
                </label>
                <input required value={email} onChange={handleChange} name="email" className="block w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink focus:border-[var(--color-primary)] focus:outline-none" id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" />

              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-ink">
                  Message
                </label>
                <textarea required value={message} onChange={handleChange} name="message" rows={5} className="block w-full resize-y rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink focus:border-[var(--color-primary)] focus:outline-none" id="contact-message" placeholder="How can we help?" />

              </div>

              <div className="mt-6 text-center">
                <button disabled={loading} className="rounded bg-[var(--color-primary)] px-7 py-3 font-semibold text-[var(--color-on-forest)] hover:opacity-90 disabled:cursor-wait disabled:opacity-60" type="submit">{loading ? 'Sending...' : 'Send message'}</button>
              </div>

            </div>
          </form>

        </div>
      </main>

    </>
  )
}

export default Contact