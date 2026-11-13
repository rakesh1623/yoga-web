import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import product from '@/models/product';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dbConnect from "@/lib/dbConnect";

// Configure DNS before MongoDB connection
const Post = ({ user, addToCart, productOne }) => {

  const [Itemprice, setItemPrice] = useState()
  const [session, setSession] = useState('')
  const [able, setAble] = useState(false)
  const router = useRouter()
  const { slugs } = router.query
  // console.log(slugs);


  useEffect(() => {
    // let list = document.querySelectorAll('.yogaPrice');
    // let token = localStorage.getItem('token')

    // console.log(able)
    if (typeof window !== "undefined") {
      let token = localStorage.getItem('token');
      setAble(!!token);
    }

    // for (let i = 0; i < list.length; i++) {


    //   list[i].onclick = function () {
    //     if(token){

    //       setAble(true)
    //     }
    //     let j = 0;
    //     while (j < list.length) {
    //       list[j++].className = 'yogaPrice relative flex w-full max-w-[20rem] flex-col rounded-xl  bg-clip-border p-3 text-black cursor-pointer bg-white shadow-md'
    //     }
    //     list[i].className = 'yogaPrice relative flex w-full max-w-[20rem] flex-col rounded-xl  bg-clip-border p-3 text-black bg-green-100 cursor-pointer shadow-md'
    //   }
    // }
  }, [])


  // const handlePrice =()=>{

  // }


  // const handleOneSession =()=>{

  //   console.log("one session is clicked");
  // }

  const handleSessionSelect = (selectedSession) => {
    setSession(selectedSession);
    // Your existing code for updating the UI based on the selected session
  };


  const handleItemAdd = () => {

    let selectedPrice;
    console.log(session);
    switch (session) {
      case 'one':
        selectedPrice = productOne.price;
        break;
      case 'four':
        selectedPrice = productOne.fourPrice;
        break;
      case 'six':
        selectedPrice = productOne.sixPrice;
        break;
      case 'twelve':
        selectedPrice = productOne.twelvePrice;
        break;
      default:
        selectedPrice = 0; // Default price or handle error
    }

    console.log(selectedPrice);

    toast.success('Item added to cart', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    addToCart(slugs, 1, selectedPrice, productOne.title);
  }

  const sessionClass = (sessionType) => session === sessionType ? 'yogaPrice relative flex w-full max-w-[20rem] flex-col rounded-xl  bg-clip-border p-3 text-black bg-green-100 cursor-pointer shadow-md' : 'yogaPrice relative flex w-full max-w-[20rem] flex-col rounded-xl  bg-clip-border p-3 text-black cursor-pointer bg-white shadow-md';

  return (
    <>

      <section className="text-gray-600 body-font overflow-hidden">
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
        <div className="container px-5 py-24 mx-auto">

          <div className="lg:w-4/5 mx-auto flex flex-wrap ">
            <img alt="ecommerce" className="border-2 border-black lg:w-1/2 w-full lg:h-fit h-64 rounded" src={productOne.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Aum Yoga</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productOne.title}</h1>

              <p className="leading-relaxed">{productOne.desc}</p>


              <h1 className='mt-5 text-lg font-bold'>Note</h1>
              <p className="leading-relaxed font-bold bg-yellow-100 px-3 py-2 rounded-lg">{productOne.note}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-3 m-auto w-fit my-10">
                <div className={sessionClass('one')}>


                  <div onClick={() => handleSessionSelect('one')} className=" ">
                    <div className="relative cursor-pointer pb-4 m-0 mb-4 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-black uppercase">
                        One Month
                      </p>
                      <h1 className="flex justify-center gap-1 mt-3 font-sans antialiased font-normal tracking-normal text-black text-7xl">
                        <span className="mt-2 text-xl">₹{productOne.price}</span>
                        {/* <span className="self-end text-xl">/session</span> */}
                      </h1>
                    </div>

                  </div>
                </div>


                {productOne.fourPrice > 0 && <div className={sessionClass('four')}>

                  <div onClick={() => handleSessionSelect('four')} className="">
                    <div className="relative pb-4 m-0 mb-4 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-black uppercase">
                        4 Month
                      </p>
                      <h1 className="flex justify-center gap-1 mt-3 font-sans antialiased font-normal tracking-normal text-black text-7xl">
                        <span className={` mt-2 text-xl`}>₹{productOne.fourPrice}</span>
                        {/* <span className="self-end text-xl">/Month</span> */}
                      </h1>
                    </div>

                  </div>

                </div>}

                {productOne.sixPrice > 0 && <div className={sessionClass('six')}>

                  <div onClick={() => handleSessionSelect('six')} className="">
                    <div className="relative pb-4 m-0 mb-4 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-black uppercase">
                        6 Month
                      </p>
                      <h1 className="flex justify-center gap-1 mt-3 font-sans antialiased font-normal tracking-normal text-black text-7xl">
                        <span className="mt-2 text-xl">₹{productOne.sixPrice}</span>
                        {/* <span className="self-end text-xl">/6 Month</span> */}
                      </h1>
                    </div>

                  </div>

                </div>}
                {productOne.twelvePrice > 0 && <div className={sessionClass('twelve')}>

                  <div onClick={() => handleSessionSelect('twelve')} className="">
                    <div className="relative pb-4 m-0 mb-4 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-black uppercase">
                        12 Month
                      </p>
                      <h1 className="flex justify-center gap-1 mt-3 font-sans antialiased font-normal tracking-normal text-black text-7xl">
                        <span className="mt-2 text-xl">₹{productOne.twelvePrice}</span>
                        {/* <span className="self-end text-xl">/12 Month</span> */}
                      </h1>
                    </div>

                  </div>

                </div>}
              </div>
              {user.value && <button disabled={!able} onClick={handleItemAdd} className=" disabled:bg-indigo-300 mx-auto w-fit items-center justify-center flex text-white bg-newhara border-0 py-2 px-6 focus:outline-none hover:bg-newhara/70 rounded">Add to Cart</button>}
              {!user.value && <button onClick={() => {
                router.push('/login')
              }} className=" disabled:bg-indigo-300 mx-auto w-fit items-center justify-center flex text-white bg-newhara border-0 py-2 px-6 focus:outline-none hover:bg-newhara/70 rounded">Proceed to login</button>}
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

// export async function getServerSideProps(context) {

//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI)
//   }

//   let productOne = await product.findOne({ slug: context.query.slugs })

//   // console.log("pro : " + productOne)
//   return {
//     props: { productOne: JSON.parse(JSON.stringify(productOne)) },
//   }
// }


// export async function getServerSideProps(context) {
//   try {
//     // Fix Node.js DNS resolution
//     const dns = require('dns');
//     dns.setServers(['8.8.8.8']);

//     // Connect to MongoDB
//     if (mongoose.connection.readyState !== 1) {
//       await mongoose.connect(process.env.MONGO_URI);
//     }

//     const productOne = await product.findOne({
//       slug: context.query.slugs
//     }).lean();

//     if (!productOne) {
//       return {
//         notFound: true
//       };
//     }

//     return {
//       props: {
//         productOne: JSON.parse(JSON.stringify(productOne))
//       }
//     };

//   } catch (error) {
//     console.error('MongoDB Error:', error);

//     throw error;
//   }
// }

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const productOne = await product.findOne({ slug: context.query.slugs }).lean();
    if (!productOne) return { notFound: true };
    return { props: { productOne: JSON.parse(JSON.stringify(productOne)) } };
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw error; // shows Next's 500 page instead of crashing on missing props
  }
}
export default Post