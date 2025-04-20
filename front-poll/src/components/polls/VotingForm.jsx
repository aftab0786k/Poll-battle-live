import React, { useState } from 'react'
import { FaCheckCircle, FaVoteYea } from 'react-icons/fa'
import { motion } from 'framer-motion'

const VotingForm = ({ options = [], onVote, disabled }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption) {
      onVote(selectedOption)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={option._id || index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <input
              type="radio"
              id={`option-${option._id || index}`}
              name="poll-option"
              value={option._id}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={disabled}
              className="absolute opacity-0 h-0 w-0"
            />
            <label
              htmlFor={`option-${option._id || index}`}
              className={`block p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedOption === option._id
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-indigo-300 bg-white'
              } ${
                disabled ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selectedOption === option._id
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedOption === option._id && <FaCheckCircle className="h-4 w-4" />}
                </div>
                <span className="text-gray-800 font-medium">{option.text}</span>
              </div>
            </label>
          </motion.div>
        ))}
      </div>

      <motion.button
        type="submit"
        disabled={!selectedOption || disabled}
        whileHover={(!selectedOption || disabled) ? {} : { scale: 1.02 }}
        whileTap={(!selectedOption || disabled) ? {} : { scale: 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
          !selectedOption || disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
        }`}
      >
        <div className="flex items-center justify-center">
          <FaVoteYea className="mr-3" />
          {disabled ? 'Processing...' : 'Submit Vote'}
        </div>
      </motion.button>

      {disabled && (
        <div className="text-center text-sm text-gray-500 mt-2">
          You've already voted in this poll
        </div>
      )}
    </motion.form>
  )
}

export default VotingForm