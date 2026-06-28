
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SessionWrapper from "@/components/SessionWrapper"
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Get-Me-A-Chai-Fund your projects",
  description: "This website is a funding website for creators",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
          >
      <body className={inter.className} >
       
        <SessionWrapper>
          <Navbar />
        <div className=" min-h-screen    bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]">
        

        
        {children}
        <Analytics />
        <Footer />
        </div>
        </SessionWrapper> 
        
        </body>
    </html>
  );
}
