import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


const cart = ({ cart, addToCart, removeFromCart, clearCart, removeItemFromCart, subTotal }) => {

    const router = useRouter();
    const[caryqty , setCartQty] = useState(1);

    const handleItemAdd = () => {
        
        addToCart(k, 1, cart[k].price, 'yoga-morning')
    }
    useEffect(()=>{

        if(!localStorage.getItem('token')){
            router.push('/')
          }

    },[])
    return (
        <>
            <style jsx>{`
            @layer utilities {
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              } 
    `}</style>

            <div className="h-fit bg-white pt-20">
                
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                    <div className="rounded-lg md:w-2/3 h-fit ">

                        {Object.keys(cart).length == 0 &&
                            <div className='text-center text-3xl font-semibold '>
                                Your cart is empty!
                            </div> 
                        }
                   
                        {Object.keys(cart).map((k) => {
                            return <li key={k} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex  sm:justify-start">

                                <div className="sm:ml-4 sm:flex sm:w-full  sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{cart[k].name}</h2>
                                        
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name) }} className="cursor-pointer select-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input onChange={()=>{setCartQty(cart[k].qty)}} className="h-8 w-8 border bg-white text-center select-none text-xs outline-none" type="number"
                                                value={cart[k].qty} />
                                            <span onClick={()=>{addToCart(k, 1, 499, 'yoga-morning')}} className="cursor-pointer select-none rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                            {/* <span onClick={() => { addToCart(k, 1, 499, 'yoga-morning')  }} className="cursor-pointer select-none rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span> */}
                                            <svg onClick={() => { removeItemFromCart(k, 1, cart[k].price, cart[k].name) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 ml-5 cursor-pointer duration-150 hover:text-red-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p>Amount : </p>
                                            <p className="text-md">₹{cart[k].price}</p>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        })}

                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">₹{subTotal}</p>
                        </div>
                        
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">₹{subTotal}</p>
                            </div>
                        </div>
                        <button onClick={clearCart} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Clear Cart</button>
                        <Link href={'/checkout'}> <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button></Link>
                    </div>
                </div>
            </div>


            
        </>
    )
}

export default cart