
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
      setAllOrders(res.orders)
    }

    if (!localStorage.getItem('token')) {
      router.push('/')
    } else {
      fetchOrders()
    }
  }, [])
  return (
    <>
      <h1 className='text-center text-xl md:text-4xl mt-10'>Your Orders</h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Amount</th>
                    <th scope="col" className="px-6 py-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((item) => {

                    return <tr key={item._id} className="border-b transition duration-300 ease-in-out ">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">₹{item.amount}</td>
                      <Link href={'/order?id='+ item._id} ><td className="whitespace-nowrap underline text-blue-600 font-semibold px-6 py-4">details</td></Link>
                    </tr>

                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Orders