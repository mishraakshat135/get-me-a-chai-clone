import PaymentPage from '@/components/PaymentPage'
import {notFound} from 'next/navigation'
import React from 'react'
import User from '@/models/User'
import connectDB from '@/db/connectdb'


const Username=async ({ params })=> {


    const {username} = await params
    await connectDB()
    const u = await User.findOne({username})

    if (!u)
    {
        notFound()
    }


    
    
    return (
    <>
        <PaymentPage username={username} />
    </>
    )
}
export default Username

export async function generateMetadata({params})
{

    const {username} = await params
    return{
        title: `Support ${username}- Get Me A Chai`
    }
}