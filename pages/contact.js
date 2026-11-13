import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const[name , setName] = useState('')
  const[email , setEmail] = useState('')
  const[message , setMessage] = useState('')

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

const handleSubmit= async (e)=>{
  e.preventDefault()

  const data = {name , email , message}
  const res = await fetch("api/message", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

let response  = await res.json()

    if(response){
    setName('')
    setEmail('')
    setMessage('')

toast.success('Your message has been sent successfully', {
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
      <div className='text-4xl lg:text-7xl text-center mt-4'>Contact Us</div>

      <div className="line flex justify-center text-center items-center">
        <span className='bg-gray-500 w-10 h-1 mt-1 mx-2'></span>
        <p className='font-semibold'>get in touch</p>
        <span className='bg-gray-500 w-10 h-1 mt-1 mx-2'></span>
        
      </div>

      <div className="main my-10 pb-10 overflow-hidden mx-2">

        <form onSubmit={handleSubmit} method='POST' className="w-full max-w-lg m-auto">

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Full Name
              </label>
              <input value={name} onChange={handleChange} name='name' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="your name" />
             
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Email
              </label>
              <input value={email} onChange={handleChange} name='email' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="your email" />
              
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Message
              </label>
              <textarea value={message} onChange={handleChange} name='message' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" placeholder="enter your message for me" />
              
            </div>

            <div  class=" w-full md:w-1/3 px-3 m-auto mt-6 md:mb-0 text-center items-center">
              <button className=" p-3 text-white font-semibold cursor-pointer
      rounded-lg text-lg " type="submit"  style={{ 'backgroundColor': '#111827' }} >Contact Me</button>
            </div>

          </div>
        </form>

      </div>

    </>
  )
}

export default Contact