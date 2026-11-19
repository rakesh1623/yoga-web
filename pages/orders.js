
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchOrders = async () => {

      const data = await fetch("api/myorders",

        {
          method: "POST", headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify({ token: localStorage.getItem('token') })
        })

      let res = await data.json();
      setAllOrders(res.orders || [])
    }

    if (!localStorage.getItem('token')) {
      router.push('/')
    } else {
      fetchOrders()
    }
  }, [])
  return (
    <>
      <main className="min-h-[65vh] bg-canvas px-4 py-12 text-ink sm:px-6">
        <h1 className="mb-8 text-center text-3xl font-semibold md:text-4xl">Your Orders</h1>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full overflow-hidden rounded border border-[var(--color-border)] bg-surface text-left text-sm">
                  <thead className="border-b border-[var(--color-border)] bg-[var(--color-forest)] font-semibold text-[var(--color-on-forest)]">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Amount</th>
                      <th scope="col" className="px-6 py-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((item) => {

                      return <tr key={item._id} className="border-b border-[var(--color-border)] transition hover:bg-[var(--color-canvas)]">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">₹{item.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4"><Link href={'/order?id=' + item._id} className="font-semibold text-brand underline underline-offset-2">View details</Link></td>
                      </tr>

                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default Orders