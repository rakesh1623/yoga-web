import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai'
// import Image from 'next/image';

const Navbar = ({ user, logout, cart }) => {


  const [dropdown, setDropdown] = useState(false);


  return (
    <>
      <div className="catch  flex flex-col justify-center md:space-x-16 md:flex-row">


        <a className="flex title-font justify-center md:justify-start font-medium items-center text-gray-900 mb-4 md:mb-0">

          <img src="/images/logo3.png" className='h-10 md:h-20 mr-3' alt="" />

          <span className="font-bold text-xl md:text-3xl">Aum Yoga</span>
        </a>
        <header className="text-gray-600 body-font border-b-2 sticky flex flex-col md:flex-row  top-0 z-10 bg-white">
          <div className=" mx-3 flex md:space-x-8 space-x-2  items-center text-base justify-center">
            <Link href="/"><button className="hover:cursor-pointer  w-fit text-base  lg:text-xl hover:text-gray-900 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Home</button></Link>
            <Link href="/about"><button className="hover:cursor-pointer  w-fit text-base  lg:text-xl hover:text-gray-900 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">About</button></Link>
            <Link href="/events"><button className="hover:cursor-pointer  w-fit text-base  lg:text-xl hover:text-gray-900 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Classes</button></Link>
            <Link href="/contact"><button className="hover:cursor-pointer  w-fit text-base  lg:text-xl hover:text-gray-900 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Contact</button></Link>

          </div>

          <div className="side justify-center mt-5 items-center flex space-x-3 ml-2">
            {!user.value && <Link href="/login"> <button className="inline-flex mb-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ">LOGIN
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            </Link>}

            {user.value && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
              <img src="/images/user.png" className='h-6 ' alt="" />
              {dropdown && <ul className=' w-36 absolute bg-emerald-600 text-white rounded-lg top-12 right-12 text-left px-3 py-2'>
                <Link href={'/myAccount'}><li className='hover:text-black hover:cursor-pointer'>My Account</li></Link>
                <Link href={'/orders'}><li className='hover:text-black hover:cursor-pointer'>Orders</li></Link>
                <li onClick={logout} className='hover:text-black hover:cursor-pointer'>Logout</li>
              </ul>}
            </div>}

            {user.value && <Link className='' href={'/cart'}> <div className="cartCount mb-3">
              <p className='relative top-3 left-4 bg-blue-700 text-white text-sm px-2 rounded-full -z-50' >{Object.keys(cart).length}</p>
              <AiOutlineShoppingCart className=' text-2xl ' />
            </div></Link>}
          </div>
        </header>
      </div>



    </>
  )
}

export default Navbar


