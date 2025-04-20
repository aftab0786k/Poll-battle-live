import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { HiOutlineMenuAlt3, HiX, HiOutlineUserCircle, HiOutlineLogout } from 'react-icons/hi'
import { MdHowToVote } from 'react-icons/md'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                <MdHowToVote className="h-7 w-7 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                PollBattle
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                Home
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/create-poll" 
                    className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Create Poll
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center ml-2 space-x-2">
                    <div className="flex items-center px-4 py-2 rounded-lg bg-white/5 text-white">
                      <HiOutlineUserCircle className="h-5 w-5 mr-2 text-amber-300" />
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 rounded-lg text-white/90 hover:text-red-300 hover:bg-white/10 transition-all duration-200"
                    >
                      <HiOutlineLogout className="h-5 w-5 mr-2" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <HiX className="block h-7 w-7" />
              ) : (
                <HiOutlineMenuAlt3 className="block h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-b from-indigo-800 to-purple-900 shadow-xl rounded-b-lg animate-fade-in">
          <div className="px-4 pt-3 pb-5 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/create-poll" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Create Poll
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="border-t border-white/10 mt-3 pt-3 space-y-2">
                  <div className="px-4 py-3 rounded-lg bg-white/5 text-white font-medium">
                    <div className="flex items-center">
                      <HiOutlineUserCircle className="h-5 w-5 mr-3 text-amber-300" />
                      <span>{user.username}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-3 rounded-lg text-red-300 hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    <HiOutlineLogout className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold hover:from-amber-300 hover:to-amber-400 transition-all duration-300 text-center mt-2 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar