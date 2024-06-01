"use client"
import React from 'react'

import { usePathname } from 'next/navigation'
const Footer = () => {
  const path =  usePathname()
  return (
    <>
     {
      path !== "/login" && path !== "/register" &&(
        <footer className="footer footer-center  p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2024 - All right reserved by Delivery App</p>
        </aside>
      </footer>
      )
     }
    </>
  )
}

export default Footer