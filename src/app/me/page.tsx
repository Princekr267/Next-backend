'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function Me() {

  const router = useRouter()
  const [data, setData] = useState("")
  const [user, setUser] = useState("there")

  const getUserDetails = async() => {
    const res = await axios.post("/api/users/me")
    console.log(res.data.data.username);
    setData(res.data.data._id)
    setUser(res.data.data.username)

  }

  const logout = async () => {
    try{
      await axios.get("/api/users/logout")
      toast.success("Logout Success")
      router.push("/login")

    } catch(err:any){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><button className="btn btn-primary btn-outline" onClick={logout}>Logout</button></li>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
      
        <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
        <div className="hero-content w-full max-w-6xl text-neutral-content">
          <div className="w-full text-center">
            <h1 className="mb-5 text-5xl font-bold">Hello {user}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
              <button className="btn btn-info" onClick={getUserDetails}>Get User Details</button>
              <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-12">
                <img
                  alt="Tailwind CSS hero component"
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className="max-w-sm rounded-lg shadow-2xl"
                />
                <div className="min-w-64 text-center lg:w-80 lg:text-left">
                  <h2 className="text-4xl font-bold">Profile</h2>
                  <h3 className="mt-3 whitespace-nowrap text-xl">{data === "" ? "No data for display" : <Link href={`/me/${data}`} >{data}</Link>}</h3>
                </div>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Me