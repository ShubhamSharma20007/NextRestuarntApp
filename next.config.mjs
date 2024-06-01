/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        domains:['plus.unsplash.com','i.pinimg.com','https://www.dominos.co.in','cdn.vectorstock.com','www.dominos.co.in','res.cloudinary.com']
    },
    // env: {
    //     NEXT_PUBLIC_CLOUDINARY_NAME:'dpeipucrq',
    //     NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:'ml_default'
    //   }
};

export default nextConfig;
