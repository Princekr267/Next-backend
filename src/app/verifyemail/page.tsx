'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link'


function VerifyEmail() {
    // const router = useRouter()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const VerifyUserEmail = async () => {
        try{
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            setError(false)
        } catch(err:any){
            setError(true)
            console.log(err.message.data)
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

    //     const {query} = router;
    //     const urlTokentwo = query.token
    })

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            VerifyUserEmail()
        }
    }, [token])
    
    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>
            {token ? `${token}` : "no token"}
        </h2>
        {
            verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2>Error</h2>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail