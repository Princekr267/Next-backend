'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const[buttonDisabled, setButtonDisabled] = useState(false)
  const[loading, setLoading] = useState(false)

  const onSignup = async () => {
    try{
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      router.push('/login')


    } catch(err:any){
      console.log("Signup failed");
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? <span className="loading loading-dots loading-md"></span> : "Signup"}</h1>
      {/* <hr />
      <label htmlFor="username">Username</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white'
      type="text" id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder='Username' />
      
      <label htmlFor="email">Email</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white'
      type="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder='Email' />
      
      <label htmlFor="password">Password</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white'
      type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder='Password' /> */}
      
      


      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Signup</legend>

        <label className="label text-black">Username</label>
        <input type="text" className="input text-black" placeholder="Enter Username" id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />

        <label className="label log-color">Email</label>
        <input type="email" className="input text-black" placeholder="Enter your email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />

        <label className="label log-color">Password</label>
        <input type="password" className="input text-black" placeholder="Password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />

        <button onClick={onSignup}
        className='p-2 btn btn-neutral'>
          {buttonDisabled ? "Fill the form" : "Signup"}
        </button>
      
      </fieldset>
        <Link className='label p-2' href={"/login"} >Already have account? Login</Link> 
      </div>

    </div>
  )
}

export default Signup