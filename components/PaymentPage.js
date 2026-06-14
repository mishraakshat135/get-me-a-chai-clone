"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import patreon_banner from '@/public/assets/patreon_banner.gif'
import cat from '@/public/assets/cat.png'
import avatar from '@/public/assets/avatar.gif'
import { initiate, fetchuser, fetchpayments } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import Razorpay from 'razorpay'
import {useSearchParams, useRouter, notFound} from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const PaymentPage = ({ username }) => {

    const {data:session} = useSession()

    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })

    const [currentUser, setcurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.replace(`/${username}`)
        }
    }, [searchParams])

    // router.push(`/${username}`)

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentuser(u)
        let dbpayments = await fetchpayments(username)
        console.log("pay:", dbpayments)

        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        console.log("to_username=", username)
        let a = await initiate(amount, username, paymentform)
        console.log("KEY:", process.env.NEXT_PUBLIC_KEY_ID);
        console.log("KEY2:", process.env.KEY_ID);

        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get me a chai",

            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": a.id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "+919876543210"
            // },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }



        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }



    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />
            <button id="rzp-button1">Pay</button>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />




            <div className="cover w-full bg-red-50 text-white relative">

                <img className="-mt-5 object-cover w-full h-38 md:h-97.5" src={currentUser.coverpic} />

                <div className="absolute -bottom-10 right-[36%] md:right-[46%]">
                    <img className="rounded-2xl border-2 border-white" width={110} height={110} src={currentUser.profilepic} />
                </div>


            </div>
            <div className="info flex flex-col gap-2 justify-center items-center text-white my-15  ">
                <div className="font-bold text-lg">
                    @{username}
                </div>
                <div className="text-slate-400">
                    Lets help {username} to get a chai
                </div>
                <div className="text-slate-400">
                    {payments.length} Payments . raised ₹{payments.reduce((sum,p)=> (sum + Number(p.amount)/100), 0)}
                </div>
                <div className="payment flex flex-col md:flex-row gap-3 w-4/5 mt-11" >
                    <div className="supporters  md:w-1/2 bg-slate-900 rounded-lg p-10">
                        <h2 className="text-2xl font-bold my-5">Supporters</h2>
                        <ul className="mx-5  ">
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className="my-4 text- flex gap-2 jitems-center">
                                    <img width={33} src={avatar.src} />
                                    <span>{p.name} donated ₹<span className="font-bold">{Number.parseInt(p.amount) / 100}</span> with a message "{p.message}"</span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="makePayment md:w-1/2 bg-slate-900 rounded-lg p-10">
                        <h2 className="text-white text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            <div>
                                <input onChange={handleChange} value={paymentform.name} name="name" className="w-full p-3 rounded-lg bg-slate-800  " placeholder="Enter Name" />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name="message" className="w-full p-3 rounded-lg bg-slate-800  " placeholder="Enter Message" />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" className="w-full p-3 rounded-lg bg-slate-800  " placeholder="Enter Amount" />

                            <button disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1} onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="disabled:from-purple-100 text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">Pay</button>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage