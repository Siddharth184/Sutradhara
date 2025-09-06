// import React, { useEffect, useState } from 'react'
// import { dummyPlans } from '../assets/assets'
// import Loading from './Loading'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// const Credits = () => {
//   const [plans, setPlans] = useState([])
//   const [loading, setLoading] = useState(true)
//   const {axios , token}  = useAppContext()
  
//   const fetchPlans = async () => {
//     // setPlans(dummyPlans)
//     // setLoading(false)
//     try {
//       const { data } = await axios.get('/api/credits/plan', {headers: {Authorization: token}})
//       if(data.success){
//         setPlans(data.plans)
//       }else{
//         toast.error(data.message || 'Failed to fetch plans')
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   const PurchasePlan = async (planId) => {
//     try {
//       const { data } = await axios.post('/api/credits/purchase', {planId},  {headers: {Authorization: token}})
//       if(data.success){
//         window.location.href = data.url
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//        toast.error(error.message)
//     }

//   }

//   useEffect(() => {
//     fetchPlans()
//   }, [])

//   if (loading) return <Loading />

//   return (
//     <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6'>
//       <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-32 text-gray-800 dark:text-white'>
//         Credits Plans
//       </h2>

//       <div className='flex flex-wrap justify-center gap-8'>
//         {plans.map((plan) => (
//           <div
//             key={plan._id || plan.name}
//             className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//               plan._id === 'pro'
//                 ? 'bg-purple-50 dark:bg-purple-900'
//                 : 'bg-white dark:bg-transparent'
//             }`}
//           >
//             <div className='flex-1'>
//               <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
//                 {plan.name}
//               </h3>
//               <p className='text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4'>
//                 ${plan.price}
//                 <span className='text-base font-normal text-gray-600 dark:text-purple-200'>{' '} / {plan.credits} credits </span>
//               </p>
//               <ul className=' list-disc list-inside text-sm text-gray-700 dark:text-purple-200 space-y-1'>
//                 {plan.features.map((feature, index) =>(
//                   <li key={index}>{feature}</li>
//                 ) )}
//               </ul>
//             </div>
//             <button 
//               type="button" onClick={()=> toast.promise(PurchasePlan(plan._id), {loading: 'Porcessing...'})}
//               className='mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer'>
//               Buy Now
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Credits

import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Credits = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios, token } = useAppContext()

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get('/api/credits/plan', {
        headers: { Authorization: token },
      })
      if (data.success) {
        setPlans(data.plans)
      } else {
        toast.error(data.message || 'Failed to fetch plans')
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const PurchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        '/api/credits/purchase',
        { planId },
        { headers: { Authorization: token } }
      )
      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white tracking-tight">
        💎 Choose Your Credit Plan
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {plans.map((plan) => (
          <div
            key={plan._id || plan.name}
            className={`relative flex flex-col rounded-2xl shadow-lg border transition-all duration-300 ${
              plan._id === 'pro'
                ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white scale-105 shadow-2xl border-transparent'
                : 'bg-white dark:bg-purple-900/20 dark:border-purple-700 border-gray-200 hover:shadow-xl'
            }`}
          >
            {plan._id === 'pro' && (
              <span className="absolute -top-3 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div className="flex-1 p-8">
              <h3
                className={`text-2xl font-bold mb-3 ${
                  plan._id === 'pro'
                    ? 'text-white'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-3xl font-extrabold mb-6 ${
                  plan._id === 'pro'
                    ? 'text-white'
                    : 'text-purple-600 dark:text-purple-300'
                }`}
              >
                ${plan.price}
                <span className="block text-sm font-medium opacity-80 mt-1">
                  {plan.credits} Credits
                </span>
              </p>

              <ul
                className={`space-y-2 text-sm leading-relaxed ${
                  plan._id === 'pro'
                    ? 'text-purple-100'
                    : 'text-gray-700 dark:text-purple-200'
                }`}
              >
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6">
              <button
                type="button"
                onClick={() =>
                  toast.promise(PurchasePlan(plan._id), {
                    loading: 'Processing...',
                  })
                }
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  plan._id === 'pro'
                    ? 'bg-white text-purple-700 hover:bg-gray-100'
                    : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
