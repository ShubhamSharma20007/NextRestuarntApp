"use client"
import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'
const Caraousel = () => {
  return (
    <>
    <div className="carousel w-full ">
    <Carousel autoPlay  infiniteLoop interval={3000} axis={'horizontal'} showThumbs={false} labels={false} ariaLabel='false' >
                <div className='object-center h-[50vh]  md:h-[80vh] w-full'>
                    <img  className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1452967712862-0cca1839ff27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                
                </div>
                <div  className='object-center h-[50vh]    md:h-[80vh] w-full'>
                    <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1574172368358-4898a80133c7?q=80&w=1802&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  
                </div>
                <div className='object-center h-[50vh]  md:h-[80vh] w-full'>
                    <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1471477985614-a55f7db053db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                   
                </div>
                <div className='object-center h-[50vh]  md:h-[80vh] w-full'>
                    <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1504649346668-2cc86afaa2e1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                   
                </div>
            </Carousel>
        
  
</div>
    </>
  )
}

export default Caraousel