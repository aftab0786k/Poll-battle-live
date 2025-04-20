import PollCard from './PollCard'
import React from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { FiAlertCircle } from 'react-icons/fi'
import { BsInbox } from 'react-icons/bs'

const PollList = ({ polls, loading, error, emptyMessage }) => {
  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <div className="flex flex-col items-center">
          <ImSpinner8 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading polls...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8">
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <FiAlertCircle className="h-8 w-8 text-red-500 mr-4" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Error loading polls</h3>
              <p className="mt-1 text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!Array.isArray(polls) || polls.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <div className="flex justify-center">
            <BsInbox className="h-12 w-12 text-indigo-400" />
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-800">No polls available</h3>
          <p className="mt-2 text-gray-600">
            {emptyMessage || 'Create the first poll to get started!'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {polls.map(poll => (
        <div 
          key={poll._id} 
          className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <PollCard poll={poll} />
        </div>
      ))}
    </div>
  )
}

export default PollList