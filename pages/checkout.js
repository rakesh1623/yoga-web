import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Checkout = ({cart,subTotal} ) => {
  const [email , setEmail ] = useState('');
  const [name , setName ] = useState('');
  const [phone , setPhone ] = useState('');
  const [city , setCity ] = useState('');
  const [state , setState ] = useState('');
  const [address , setAdress ] = useState('');
  const [pin , setPin] = useState('');

  const [payNowButton, setPayNowButton] = useState(true);
  const router = useRouter()
  useEffect(()=>{

    const t = localStorage.getItem('token')
    const handleFetchUserData = async ()=>{
      const data = await fetch('api/getuser',  
      { method: "POST", headers:{
        "content-type":"application/json",   
      } ,  
      body: JSON.stringify({ token: localStorage.getItem('token') })})
      let u = await data.json();
        setEmail(u.user[0].email)
    }
    if(t){
      handleFetchUserData()
    }else{
      router.push('/')
    }
  },[])


  useEffect(() => {
   
    if (
      name.trim() &&
      phone.trim() &&
      city.trim() &&
      state.trim() &&
      address.trim() &&
      pin.trim().length === 6
    ) {
      setPayNowButton(false);
    } else {
      setPayNowButton(true);
    }
  }, [name, phone, city, state, address, pin]);

    const handleValueChange =(e) =>{

      if(e.target.name == 'name'){
        setName(e.target.value)
      } 
      if(e.target.name == 'email'){
        setName(e.target.value)
      } 
      if(e.target.name == 'phone'){
        setPhone(e.target.value)
      } 
      if(e.target.name == 'city'){
        setCity(e.target.value)
      } 
      if(e.target.name == 'state'){
        setState(e.target.value)
      } 
      if(e.target.name == 'address'){
        setAdress(e.target.value)
      }
      if(e.target.name == 'pin'){
        setPin(e.target.value)
      }
    }
  
    const makePayment = async () => {
      setName('')
      setEmail('')
      setAdress('')
      setCity('')
      setState('')
      setPhone('')
      const res = await initializeRazorpay();
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
      let oid = Math.floor(Math.random() * Date.now());
      const d = {cart , subTotal , oid , email , name , phone , address }
      const data = await fetch("api/razorpay", 
      { method: "POST", headers:{
        "content-type":"application/json",   
      } ,
      body: JSON.stringify(d)
    })
  
      let order = await data.json();
      var options = {
        key: "rzp_test_lQ258mLYnIGbsQ", 
        name: "Aum Yoga",
        currency:order.currency ,
        amount: order.amount,
        order_id: order.id,
        description: "Thankyou for your test donation",
        image: "images/paylogo.png",
        description: "Test Transaction",
        handler: async function (response) {
        
          const verifyPayment = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });
          const verifyResult = await verifyPayment.json();
          if (verifyResult.success) {
            const updateOrder = await fetch("/api/update-order-status", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                orderId: oid,
                status: "completed",
              }),
            });
        
            const updateResult = await updateOrder.json();
        
            if (updateResult.success) {
              alert("Payment Successful! Your order status has been updated.");
              router.push("/order?id=" + order.o);
            } else {
              alert("Payment was successful, but we couldn't update the order status. Please contact support."+updateResult.message);
            }
          
          } else {
            alert("Payment Verification Failed! Contact support.");
          }
        },
        prefill: { 
          "name": "Aum Yoga", 
          "email": "rakesh@example.com", 
          "contact": "9000090000" 
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#16a34a"
      },
  
      
    };
    const paymentObject = await new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(`Payment failed! Reason: ${response.error.reason}`);
      router.push('/cart');
    });
    paymentObject.open();
    };
  
    const initializeRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
  
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
  
        document.body.appendChild(script);
      });
    };

  return (
    <>
      <Head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head>

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">"Discover Peace and Balance: Your Journey to Inner Harmony Begins Here.".</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className='font-bold text-2xl mb-3'>Enter Your Details</h1>
            <div className="flex flex-wrap -m-2">

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input onChange={handleValueChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input onChange={handleValueChange}  value={email} type="email" disabled={true} id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea onChange={handleValueChange} value={address} id="message" name="address" className="w-full resize-none bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3  leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="Phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input onChange={handleValueChange} value={phone} type="tel" id="Phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
                  <input onChange={handleValueChange} value={city} type="text" id="City" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="State" className="leading-7 text-sm text-gray-600">State</label>
                  <input onChange={handleValueChange} value={state} type="text" id="State" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="pin" className="leading-7 text-sm text-gray-600">PIN</label>
                  <input value={pin} onChange={handleValueChange} type="tel" id="pin" name="pin" maxLength={6} className=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
             
            </div>
            <h1 className='font-bold text-2xl mb-3 mt-10'>Review your cart</h1>
          
            {Object.keys(cart).map((k) => {
                        

                            return <li key={k} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex  sm:justify-start">

                                <div className="sm:ml-4 sm:flex sm:w-full  sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{cart[k].name}</h2>
                                       
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100 text-xl">
                                            <h1>{cart[k].qty}</h1>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p>Total : </p>
                                            
                                            <p className="text-md">₹{cart[k].price*cart[k].qty}</p>

                                        </div>
                                    </div>
                                </div>
                                
                            </li>
                        })}
                        <div className='flex justify-end space-x-4 mr-4 -mt-3'>
                          <h1 className='text-right text-lg font-semibold '>Grand Total :</h1>
                          <span className='font-bold text-lg'>₹{subTotal}</span>
                        </div>
                        <button disabled={payNowButton} onClick={makePayment}  className="flex disabled:bg-gray-500 mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-5">Pay Now</button>
           
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
