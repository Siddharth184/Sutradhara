// import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import moment from 'moment';
// import toast from 'react-hot-toast';

// const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
//   const {
//     chats,
//     setSelectedChat,
//     theme,
//     setTheme,
//     user,
//     navigate,
//     createNewChat,
//     axios,
//     setChats,
//     fetchUserChats,
//     setToken,
//     token,
//   } = useAppContext();

//   const [search, setSearch] = useState('');

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     toast.success('Logged out successfully');
//   };

//   const deleteChat = async (e, chatId) => {
//     try {
//       e.stopPropagation();
//       const confirmDelete = window.confirm('Are you sure 😲😲');
//       if (!confirmDelete) return;

//       const { data } = await axios.post(
//         '/api/chat/delete',
//         { chatId },
//         { headers: { Authorization: token } }
//       );

//       if (data.success) {
//         setChats((prev) => prev.filter((chat) => chat._id !== chatId));
//         await fetchUserChats();
//         toast.success(data.messages);
//       }
//     } catch (error) {
//       toast.error(error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80606F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${
//         !isMenuOpen && 'max-md:-translate-x-full'
//       }`}
//     >
//       {/* LOGO */}
//       <img
//         src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
//         alt=""
//         className="w-full max-w-48"
//       />

//       {/* New chat Button */}
//       <button
//         onClick={createNewChat}
//         className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
//       >
//         <span className="mr-2 text-xl">+</span> New Chat
//       </button>

//       {/* Search Bar */}
//       <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
//         <img src={assets.search_icon} className="w-4 not-dark:invert" alt="" />
//         <input
//           onChange={(e) => setSearch(e.target.value)}
//           value={search}
//           type="text"
//           placeholder="Search Conversations"
//           className="text-xs placeholder:text-gray-400 outline-none"
//         />
//       </div>

//       {/* Recent Chat */}
//       {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

//       <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
//         {chats
//           .filter((chat) =>
//             (chat.messages.length > 0
//               ? chat.messages[0].content
//               : chat.name
//             )
//               .toLowerCase()
//               .includes(search.toLowerCase())
//           )
//           .map((chat) => (
//             <div
//               key={chat._id}
//               onClick={() => {
//                 navigate('/');
//                 setSelectedChat(chat);
//                 setIsMenuOpen(false);
//               }}
//               className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
//             >
//               <div>
//                 <p className="truncate w-full">
//                   {chat.messages.length > 0
//                     ? chat.messages[0].content.slice(0, 32)
//                     : chat.name}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
//                   {moment(chat.updatedAt).fromNow()}
//                 </p>
//               </div>
//               <img
//                 src={assets.bin_icon}
//                 className="hidden group-hover:block w-4 cursor-pointer not-dark:invert"
//                 alt=""
//                 onClick={(e) =>
//                   toast.promise(deleteChat(e, chat._id), {
//                     loading: 'Deleting...',
//                   })
//                 }
//               />
//             </div>
//           ))}
//       </div>

//       {/* Community Image */}
//       <div
//         onClick={() => {
//           navigate('/community');
//           setIsMenuOpen(false);
//         }}
//         className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
//       >
//         <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" alt="" />
//         <div className="flex flex-col text-sm">
//           <p>Community Images</p>
//         </div>
//       </div>

//       {/* Credit Purchases Option */}
//       <div
//         onClick={() => {
//           navigate('/credits');
//           setIsMenuOpen(false);
//         }}
//         className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
//       >
//         <img src={assets.diamond_icon} className="w-4.5 dark:invert" alt="" />
//         <div className="flex flex-col text-sm">
//           <p>Credits : {user?.credits ?? 0}</p>
//           <p className="text-xs text-gray-400">
//             Purchase credits to use QuickGPT
//           </p>
//         </div>
//       </div>

//       {/* Dark Mode Toggle */}
//       <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 justify-between dark:border-white/15 rounded-md">
//         <div className="flex items-center gap-2 text-sm">
//           <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="" />
//           <p>Dark Mode</p>
//         </div>
//         <label className="relative inline-flex cursor-pointer">
//           <input
//             onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//             type="checkbox"
//             className="sr-only peer"
//             checked={theme === 'dark'}
//           />
//           <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
//           <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
//         </label>
//       </div>

//       {/* User Account */}
//       <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
//         <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
//         <p className="flex-1 text-sm dark:text-primary truncate">
//           {user ? user.name : 'Login your account'}
//         </p>
//         {user && (
//           <img
//             onClick={logout}
//             src={assets.logout_icon}
//             className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
//             alt="logout"
//           />
//         )}
//       </div>

//       {/* Close Button for Mobile */}
//       <img
//         onClick={() => setIsMenuOpen(false)}
//         src={assets.close_icon}
//         className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
//         alt="close"
//       />
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import moment from 'moment';
import toast from 'react-hot-toast';

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUserChats,
    setToken,
    token,
  } = useAppContext();

  const [search, setSearch] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirmDelete = window.confirm('Are you sure 😲😲');
      if (!confirmDelete) return;

      const { data } = await axios.post(
        '/api/chat/delete',
        { chatId },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUserChats();
        toast.success(data.messages);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 bg-white dark:bg-[#0E0A1F] border-r border-gray-200 dark:border-gray-700 backdrop-blur-lg shadow-lg transition-all duration-500 max-md:absolute left-0 z-10 ${
        !isMenuOpen && 'max-md:-translate-x-full'
      }`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between">
        <img
          src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
          alt="logo"
          className="w-full max-w-44"
        />
        <img
          onClick={() => setIsMenuOpen(false)}
          src={assets.close_icon}
          className="w-6 h-6 cursor-pointer md:hidden dark:invert"
          alt="close"
        />
      </div>

      {/* New chat Button */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-8 text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-medium hover:shadow-lg transition-all"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search Bar */}
      <div className="flex items-center gap-2 px-3 py-2 mt-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
        <img src={assets.search_icon} className="w-4 dark:invert" alt="search" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
          className="w-full bg-transparent text-sm placeholder-gray-400 text-gray-800 dark:text-gray-200 outline-none"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && (
        <p className="mt-6 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Recent Chats
        </p>
      )}

      <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
        {chats
          .filter((chat) =>
            (chat.messages.length > 0 ? chat.messages[0].content : chat.name)
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                navigate('/');
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              className="p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer flex justify-between items-start hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all group"
            >
              <div>
                <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200 w-44">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer dark:invert"
                alt="delete"
                onClick={(e) =>
                  toast.promise(deleteChat(e, chat._id), {
                    loading: 'Deleting...',
                  })
                }
              />
            </div>
          ))}
      </div>

      {/* Community Image */}
      <div
        onClick={() => {
          navigate('/community');
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 px-3 py-2 mt-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
      >
        <img src={assets.gallery_icon} className="w-5 dark:invert" alt="gallery" />
        <p className="text-sm font-medium">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate('/credits');
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 px-3 py-2 mt-3 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
      >
        <img src={assets.diamond_icon} className="w-5 dark:invert" alt="credits" />
        <div className="flex flex-col text-sm">
          <p className="font-medium">Credits: {user?.credits ?? 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Purchase credits to use QuickGPT
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between px-3 py-2 mt-3 border border-gray-300 dark:border-gray-700 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 dark:invert" alt="theme" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 px-3 py-2 mt-3 border border-gray-300 dark:border-gray-700 rounded-lg">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="user" />
        <p className="flex-1 text-sm truncate dark:text-gray-200">
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
  <img
    onClick={logout}
    src={assets.logout_icon}
    className="h-5 cursor-pointer not-dark:invert opacity-50 group-hover:opacity-100 transition-opacity"
    alt="logout"
  />
)}
      </div>
    </div>
  );
};

export default Sidebar;
