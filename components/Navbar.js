"use client"

import React, { useState } from 'react';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import SearchBar from "@/components/SearchBar"


const Navbar = () => {

    const [search, setSearch] = useState("")
    const router = useRouter();
    const [showdropdown, setShowdropdown] = useState(false)
    const { data: session } = useSession()
    //   if(session) {
    //     console.log(session)
    //     return <div className="text-white">

    //       Signed in as {session.user.email} <br/>
    //       <button onClick={() => signOut()}>Sign out</button>
    // </div>
    //   }


    return (


        <nav className="bg-gray-900 text-white flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-3  md:gap-0">
            <Link href={"/"}><div className="flex items-center logo text-lg font-bold shrink-0">
                <span>GetMeAChai</span>
                <img className='invertImg' src="/assets/tea.gif" width={44} alt="" />
            </div></Link>
            {/* <ul className="flex justify-between gap-4">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Sign Up</li>
            <li>Log In</li>

        </ul> */}
            
                <SearchBar />
            

            <div className='relative flex  items-center   gap-2'>
                {session && <>
                    <button onClick={() => setShowdropdown(!showdropdown)}
                        id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute right-0 top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link onClick={() => setShowdropdown(false)} href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link onClick={() => setShowdropdown(false)} href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div></>
                }

                {/* {session && <button className='text-white w-fit bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={() => { signOut() }}>Logout</button>} */}
                {!session && <Link href={"/login"}>
                    <button className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 '>Login</button></Link>}
            </div>
        </nav>
    )
}

export default Navbar