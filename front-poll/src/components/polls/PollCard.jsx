import { Link } from 'react-router-dom'
import { FaUser, FaVoteYea, FaClock } from 'react-icons/fa'
import { formatDistanceToNow } from '../../utils/dataUtils'
import React from 'react'
import { motion } from 'framer-motion'

const PollCard = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)
  const createdTimeAgo = formatDistanceToNow(new Date(poll.createdAt))
  const topOptions = poll.options.slice(0, 2)

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white truncate">
            <Link to={`/polls/${poll._id}`}>
              {poll.title}
            </Link>
          </h3>
          {!poll.isActive && (
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              Closed
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {poll.description && (
          <p className="text-gray-600 mb-6 line-clamp-2">{poll.description}</p>
        )}

        <div className="space-y-3 mb-6">
          {topOptions.map((option) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
            return (
              <div key={option._id} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 truncate">{option.text}</span>
                  <span className="font-medium text-indigo-600 whitespace-nowrap ml-2">
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {option.votes} vote{option.votes !== 1 ? 's' : ''}
                </div>
              </div>
            )
          })}
          
          {poll.options.length > 2 && (
            <div className="text-center pt-2">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                +{poll.options.length - 2} more options
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm mb-6">
          <div className="flex flex-col items-center bg-indigo-50 rounded-lg p-2">
            <FaUser className="text-indigo-500 mb-1" />
            <span className="text-gray-700 text-center">{poll.creator?.username || 'Anonymous'}</span>
          </div>
          <div className="flex flex-col items-center bg-purple-50 rounded-lg p-2">
            <FaVoteYea className="text-purple-500 mb-1" />
            <span className="text-gray-700">{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col items-center bg-amber-50 rounded-lg p-2">
            <FaClock className="text-amber-500 mb-1" />
            <span className="text-gray-700">{createdTimeAgo}</span>
          </div>
        </div>

        <Link 
          to={`/polls/${poll._id}`}
          className="block w-full py-3 px-4 text-center font-medium rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default PollCard