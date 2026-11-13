import React, { useEffect } from 'react'
import mongoose from 'mongoose'
import order from '@/models/order'
import { useRouter } from 'next/router'

const myOrder = ({ order, clearCart }) => {

  const router = useRouter()

  useEffect(()=>{
    clearCart()
    
    if (!localStorage.getItem('token')) {
      router.push('/')
    }

   
  },[])

  const products = order.products

  return (
    <section className="text-gray-600 body-font overflow-x-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Aum Yoga</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id : <span>{order.orderId}</span></h1>
            <p className='text-green-700 font-bold'>Your order has been successfully placed</p>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium ">
                        <tr>
                          <th scope="col" className="px-6 py-4">Name</th>
                          <th scope="col" className="px-6 py-4">Quantity</th>
                          <th scope="col" className="px-6 py-4">Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {Object.keys(products).map((key) => {

                          return <tr key={key} className="border-b transition duration-300 ease-in-out">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{products[key].name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{products[key].qty}</td>
                            <td className="whitespace-nowrap px-6 py-4">₹{products[key].price * products[key].qty}</td>

                          </tr>

                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹{order.amount}</span>

            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="images/orderconfirm.avif" />

        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let o = await order.findById(context.query.id)
  return {
    props: { order: JSON.parse(JSON.stringify(o)) },
  }
}

export default myOrder