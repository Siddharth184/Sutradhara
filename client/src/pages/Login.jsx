import React, { useState } from 'react'

const Login = () => {
  const [mode, setMode] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // handle login/register API here
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-purple-700">User</span>{" "}
        {mode === "login" ? "Login" : "Sign Up"}
      </p>

      {mode === "signup" && (
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
            type="text"
            required
            autoFocus
          />
        </div>
      )}

      <div className="w-full">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
          type="email"
          required
          autoFocus={mode === "login"}
        />
      </div>

      <div className="w-full">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
          type="password"
          required
        />
      </div>

      <p className="mt-2 text-center w-full">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <span onClick={() => setMode("login")} className="text-purple-700 cursor-pointer">
              Click here
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span onClick={() => setMode("signup")} className="text-purple-700 cursor-pointer">
              Sign up
            </span>
          </>
        )}
      </p>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {mode === "signup" ? "Create Account" : "Login"}
      </button>
    </form>
  )
}

export default Login
