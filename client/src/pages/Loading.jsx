// import React, { useEffect } from 'react'
// import {  useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'

// const Loading = () => {

//   const navigate =useNavigate()
//   const { fetchUser } = useAppContext()

//   useEffect(()=>{
//     const timeout = setTimeout(()=>{
//       fetchUser()
//       navigate('/')
//     },8000)
//     return ()=> clearTimeout(timeout)
//   },[navigate])

//   return (
//     <div className='bg-gradient-to-b from-[#531B81] to-[#29184B] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
//       <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin'></div>
//     </div>
//   )
// }

// export default Loading

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {
  const navigate = useNavigate()
  const { fetchUser } = useAppContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser()
      navigate('/')
    }, 8000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#4A148C] via-[#6A1B9A] to-[#12005E] text-white">
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-500 rounded-full animate-spin-slow"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-xl font-medium tracking-wide animate-pulse">
        Preparing your experience...
      </p>
    </div>
  )
}

export default Loading
