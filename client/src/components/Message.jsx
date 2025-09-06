// import React, { useEffect } from 'react'
// import { assets } from '../assets/assets'
// import moment from 'moment'
// import Markdown from 'react-markdown'
// import Prism from 'prismjs'

// const Message = ({message}) => {

//   useEffect (()=>{
//     Prism.highlightAll()
//   },[message.content])

//   return (
//     <div>
//       {message.role === "user" ? (
//         <div className='flex items-start justify-end my-4 gap-2'>
//           <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl '>
//           <p className='text-sm dark:text-primary'>{message.content}</p>
//             <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
//           </div>
//           <img src={assets.user_icon} alt="" className='w-8 rounded-full'/>
//         </div>
//       )
//     :
//     (
//       <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4 '> 
//         {
//           message.isImage ? (
//             <img src={message.content} className='w-full max-w-md mt-2 rounded-b-md' />
//           ):(
//             <div className='text-sm dark:text-primary reset-tw'>
//               <Markdown>{message.content}</Markdown></div>
//           )
//         }
//         <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
//       </div>
//     )
//     }
//     </div>
//   )
// }

// export default Message

import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  const timeStamp = (
    <span className="text-xs text-gray-400 dark:text-[#B1A6C0] mt-1 self-end">
      {moment(message.timestamp).fromNow()}
    </span>
  )

  return (
    <div className="w-full flex">
      {message.role === 'user' ? (
        <div className="ml-auto flex items-end gap-3 my-3 max-w-2xl">
          <div className="flex flex-col bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-2xl rounded-br-sm shadow-md">
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
            {timeStamp}
          </div>
          <img
            src={assets.user_icon}
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
          />
        </div>
      ) : (
        <div className="mr-auto flex items-end gap-3 my-3 max-w-2xl">
          <img
            src={assets.bot_icon || assets.user_icon}
            alt="Bot"
            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
          />
          <div className="flex flex-col bg-white dark:bg-[#2A1E3D] border border-gray-200 dark:border-[#80609F]/30 p-3 rounded-2xl rounded-bl-sm shadow-sm">
            {message.isImage ? (
              <img
                src={message.content}
                alt="Generated"
                className="w-full max-w-md rounded-lg shadow-md mt-1"
              />
            ) : (
              <div className="text-sm dark:text-primary prose prose-sm max-w-none">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            {timeStamp}
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
