import user from "@/models/user";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const MyAccount = () => {
  const userData = {
    name: "Akash Gupta",
    email: "akash.gupta@example.com",
    membership: "Premium",
    joinedDate: "March 15, 2023",
    sessionsCompleted: 25,
  };

  const [email , setEmail ] = useState('');
  const [name , setName] = useState('')
  const router = useRouter();

  useEffect(()=>{

    const t = localStorage.getItem('token')
    const handleFetchUserData = async ()=>{
      const data = await fetch(`api/getuser`,  
      { method: "POST", headers:{
        "content-type":"application/json",   
      } ,  
      body: JSON.stringify({ token: t})})
      let u = await data.json();

      if(u){

          setEmail(u.user[0].email)
          setName(u.user[0].name)
      }

    }
    if(t){
      handleFetchUserData()
    }else{
      router.push('/')
    }
  },[])

  const handleEditProfile = () => {
    router.push(`/edit-profile?email=${email}&name=${name}`);
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
     
        <div className="flex items-center gap-6">
          <FaUserCircle className="text-7xl text-green-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {name}!
            </h1>
            <p className="text-gray-600 text-lg">{email}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700">Account Details</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 text-lg">Membership</span>
              <span className="font-semibold text-green-600">
                {userData.membership}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 text-lg">Joined Date</span>
              <span className="font-semibold">{userData.joinedDate}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 text-lg">Sessions Completed</span>
              <span className="font-semibold text-green-500">
                {userData.sessionsCompleted}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <button
            onClick={handleEditProfile}
            className="flex items-center justify-center bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition">
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
            <button className="flex items-center justify-center bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition">
              <FaCalendarAlt className="mr-2" />
              View Session History
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need help? <a href="/support" className="text-green-500">Contact Support</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
