// 

import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const containerRef = useRef(null)

  const { selectedChat, theme, user, axios, token, setUser } = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!user) return toast('Login to send message')

      setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: prompt, timestamp: Date.now(), isImage: false },
      ])

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChat._id, prompt, isPublished },
        { headers: { Authorization: token } }
      )

      if (data.success) {
        setMessages((prev) => [...prev, data.reply])

        // decrease credits
        setUser((prev) => ({
          ...prev,
          credits: prev.credits - (mode === 'image' ? 2 : 1),
        }))
      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPrompt('')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-10 xl:px-20 max-md:mt-14 2xl:pr-40 bg-gradient-to-b from-[#fafafa] to-[#f3f0f7] dark:from-[#1E1A29] dark:to-[#120F1C] rounded-xl shadow-inner">

      {/* Chat messages */}
      <div
        ref={containerRef}
        className="flex-1 mb-4 overflow-y-auto custom-scrollbar px-2"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-primary">
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt="Logo"
              className="w-full max-w-56 sm:max-w-72 drop-shadow-lg"
            />
            <p className="mt-4 text-3xl sm:text-5xl font-light text-center text-gray-400 dark:text-white">
              Ask me anything ✨
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Typing dots animation */}
        {loading && (
          <div className="flex items-center gap-2 px-4 py-2 my-2 bg-white dark:bg-[#2A1E3D] rounded-xl shadow-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce delay-150" />
            <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-white animate-bounce delay-300" />
          </div>
        )}
      </div>

      {/* Publish toggle for images */}
      {mode === 'image' && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            className="cursor-pointer accent-purple-600"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish generated image to community
        </label>
      )}

      {/* Prompt input */}
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-[#2A1E3D] border border-gray-200 dark:border-[#80609F]/30 rounded-full w-full max-w-2xl px-3 py-2 mx-auto flex items-center gap-3 shadow-md"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm px-2 py-1 rounded-md outline-none bg-gray-100 dark:bg-[#3A2D54] dark:text-white"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="flex-1 w-full text-sm px-2 py-1 outline-none bg-transparent dark:text-white placeholder-gray-400"
          type="text"
          placeholder="Type your prompt here..."
          required
        />

        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="Send"
            className="w-7 h-7 cursor-pointer transition-transform hover:scale-110"
          />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
