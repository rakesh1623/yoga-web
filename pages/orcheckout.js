import React from 'react'
import Head from 'next/head'
import { useState } from 'react'
const orcheckout = () => {

    const [show , setShow] = useState(false)
    const handleShow = ()=>{
        setShow(!show)
    }
    return (
        <>
            <Head>
                <title>Akash Yoga | Checkout</title>
            </Head>
            
            <div className="main flex space-x-20 flex-col  md:flex-row items-center justify-center  mx-40 ">
                <div className="left flex flex-col space-y-4 my-10">
                {/* <button onClick={handleShow} type="button" className="text-newhara hover:text-white border border-newhara hover:bg-newhara focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 ">{show ? 'Hide QR' : 'Show QR'}</button> */}
                     <img className="h-[600px]  object-contain" src="images/qr.jpeg" alt="" />

                </div>
                <div className="right flex flex-col justify-center items-center">
                    <div className="imageList w-fit  grid  grid-cols-3 gap-3">
                        <img className=' relative -top-8 w-56' src="images/newscan2.jpeg" alt="" />
                        <img className='relative top-2  w-56' src="images/newpay2.jpeg" alt="" />
                        <img className='  w-56' src="images/newsend2.jpeg" alt="" />

                    </div>
                    {/* <div className="phone ">
                        <button className='text-center text-xl bg-newhara text-white px-8 py-3 mt-8 rounded-lg shadow-2xl shadow-gray-500' >9800353945</button>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default orcheckout