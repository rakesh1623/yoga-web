import React, { useEffect } from 'react'
import Link from 'next/link'
import order from '@/models/order'
import dbConnect from '@/lib/dbConnect'
import { useRouter } from 'next/router'
import { FiCheckCircle, FiPackage, FiMapPin, FiCalendar, FiShoppingBag } from 'react-icons/fi'

const myOrder = ({ order, clearCart }) => {

  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
      return
    }
    clearCart()
    // run once when the page loads, not on every re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const products = order?.products || {}
  const status = String(order?.status || 'pending').toLowerCase()
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Date unavailable'

  if (!order) {
    return (
      <main className="min-h-[65vh] bg-canvas px-4 py-16 text-ink sm:px-6">
        <div className="mx-auto max-w-xl rounded border border-[var(--color-border)] bg-surface p-8 text-center shadow-sm">
          <FiPackage className="mx-auto text-5xl text-brand" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-semibold">Order not found</h1>
          <p className="mt-3 text-muted">This order may have been removed or the link is invalid.</p>
          <Link href="/orders" className="mt-6 inline-flex rounded bg-[var(--color-primary)] px-5 py-3 font-semibold text-[var(--color-on-primary)] hover:opacity-90">
            View my orders
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[65vh] bg-canvas px-4 py-10 text-ink sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 overflow-hidden rounded border border-[var(--color-border)] bg-surface shadow-sm">
          <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)]">
                <FiCheckCircle className="text-3xl" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Booking confirmed</p>
                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Thank you, {order.name}</h1>
                <p className="mt-2 text-sm leading-6 text-muted">Your yoga session order has been placed successfully.</p>
              </div>
            </div>
            <div className="md:text-right">
              <span className="inline-flex rounded-full border border-[var(--color-border)] bg-canvas px-4 py-2 text-sm font-semibold capitalize text-brand">
                {status}
              </span>
              <p className="mt-2 text-xs text-muted">Order #{order.orderId}</p>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.75fr)]">
          <section className="rounded border border-[var(--color-border)] bg-surface shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Order summary</p>
                <h2 className="mt-1 text-xl font-semibold">Your sessions</h2>
              </div>
              <FiShoppingBag className="text-2xl text-brand" aria-hidden="true" />
            </div>

            <div className="divide-y divide-[var(--color-border)] px-5 sm:px-7">
              {Object.keys(products).map((key) => (
                <div key={key} className="flex items-center justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-ink">{products[key].name}</h3>
                    <p className="mt-1 text-sm text-muted">Quantity: {products[key].qty}</p>
                  </div>
                  <p className="shrink-0 font-semibold">₹{products[key].price * products[key].qty}</p>
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between border-t border-[var(--color-border)] px-5 py-5 sm:px-7">
              <span className="font-semibold text-muted">Amount paid</span>
              <span className="text-2xl font-bold">₹{order.amount}</span>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded border border-[var(--color-border)] bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
                <FiMapPin className="text-xl text-brand" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Delivery address</h2>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">{order.address}</p>
            </section>

            <section className="rounded border border-[var(--color-border)] bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
                <FiCalendar className="text-xl text-brand" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Order details</h2>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-muted">Placed on</dt><dd className="text-right font-semibold">{orderDate}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Email</dt><dd className="max-w-[180px] break-all text-right font-semibold">{order.email}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Payment</dt><dd className="font-semibold capitalize">{status === 'completed' ? 'Paid' : 'Pending'}</dd></div>
              </dl>
            </section>

            <Link href="/orders" className="flex w-full items-center justify-center rounded border border-[var(--color-border)] bg-surface px-5 py-3 font-semibold hover:bg-canvas">
              View all orders
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  try {
    await dbConnect()
    const o = context.query.id
      ? await order.findById(context.query.id).lean()
      : null

    return {
      props: { order: o ? JSON.parse(JSON.stringify(o)) : null },
    }
  } catch (error) {
    console.error('Order page MongoDB error:', error)
    return { props: { order: null } }
  }
}

export default myOrder