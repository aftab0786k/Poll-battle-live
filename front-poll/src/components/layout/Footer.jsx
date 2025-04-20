import { Link } from 'react-router-dom'
import { MdHowToVote } from 'react-icons/md'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Logo and Brand */}
          <div className="flex flex-col mb-8 lg:mb-0">
            <Link to="/" className="flex items-center group">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                <MdHowToVote className="h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                PollBattle
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              The ultimate platform for real-time polling and interactive surveys.
            </p>
          </div>
          
          {/* Links and Social */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full lg:w-auto">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">Quick Links</h3>
              <Link 
                to="/" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Home
              </Link>
              <Link 
                to="/create-poll" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Create Poll
              </Link>
              <Link 
                to="/login" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Login
              </Link>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">Legal</h3>
              <Link 
                to="/privacy" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Terms of Service
              </Link>
              <Link 
                to="/contact" 
                className="text-white/80 hover:text-amber-300 transition-colors duration-200 text-sm md:text-base"
              >
                Contact Us
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-300 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-300 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-300 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
              <p className="text-sm text-white/60 mt-2">
                Follow us for updates
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/70">
            &copy; {currentYear} PollBattle. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-white/50">
            Made with <span className="text-amber-400">❤️</span> for real-time interaction
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer