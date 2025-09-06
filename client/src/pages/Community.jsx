// import React, { useEffect, useState } from 'react'
// import { dummyPublishedImages } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// const Community = () => {

//   const [images, setImages] = useState([])
//   const [loading, setLoading] = useState(true)
//   const {axios} = useAppContext()

//   const fetchImage = async () => {
//     // setImages(dummyPublishedImages)
//     // setLoading(false)
//   try {
//     const { data } = await axios.get('/api/user/published-images')
//    if(data.success){
//   setImages(data.images || [])
// } else {
//   toast.error(data.message)
// }
//   } catch (error) {
//     setImages([])
//     toast.error(error.message)
//   }
//   setLoading(false)
// }

//   useEffect(() => {
//     fetchImage()
//   },[])


//  return (
//   <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll '>
//     <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100 '>Community Images</h2>

//     {loading ? (
//       <p className="text-center text-gray-500 dark:text-purple-300">Loading...</p>
//     ) : Array.isArray(images) && images.length > 0 ? (
//       <div className='flex flex-wrap max-sm:justify-center gap-5'>
//         {images.map((item, index) => (
//           <a
//             key={item._id || index}
//             href={item.imageUrl}
//             target='_blank'
//             rel='noreferrer'
//             className='relative group block rounded-lg overflow-hidden border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300'
//           >
//             <img
//               src={item.imageUrl}
//               alt=""
//               className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
//             />
//             <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300'>
//               Created by {item.userName}
//             </p>
//           </a>
//         ))}
//       </div>
//     ) : (
//       <p className='text-center text-gray-600 dark:text-purple-200 mt-10'>NO Images Available</p>
//     )}
//   </div>
// )
// }

// export default Community


import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Community = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios } = useAppContext()

  const fetchImage = async () => {
    try {
      const { data } = await axios.get('/api/user/published-images')
      if (data.success) {
        setImages(data.images || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      setImages([])
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="p-6 pt-12 xl:px-16 2xl:px-24 w-full mx-auto h-full overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">
        🌍 Community Showcase
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-opacity-75"></div>
        </div>
      ) : Array.isArray(images) && images.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((item, index) => (
            <a
              key={item._id || index}
              href={item.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-purple-900/20 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="absolute bottom-3 left-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                👤 {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-12 text-lg font-medium">
          No images available yet. 🚀
        </p>
      )}
    </div>
  )
}

export default Community
