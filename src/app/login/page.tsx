'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Login() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const[buttonDisabled, setButtonDisabled] = useState(false)
  const[loading, setLoading] = useState(false)

  const onLogin = async () => {
    try{
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data);
      router.push('/me')

    } catch(err:any){
      console.log("Login failed", err.response?.data);
      toast.error(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? <span className="loading loading-dots loading-md"></span> : "Login"}</h1>
  
      <div className=''>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-black">Login</legend>

        <label className="label log-color">Email</label>
        <input type="email" className="input text-black" placeholder="Email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />

        <label className="label log-color">Password</label>
        <input type="password" className="input text-black" placeholder="Password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />

        <button onClick={onLogin} className='btn btn-neutral mt-4'>
          {buttonDisabled ? "Fill the form" : "Login"}
        </button>
      
      </fieldset>
        <p className="label p-2"><Link className='self-center' href={"/signup"} >Don't have account? Signup</Link></p>
      </div>

    </div>
  )
}

export default Login