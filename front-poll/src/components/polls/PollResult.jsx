import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { FaVoteYea, FaUser, FaChartBar } from 'react-icons/fa'
import { formatDate } from '../../utils/dataUtils'
import { motion } from 'framer-motion'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const PollResults = ({ poll }) => {
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!poll) return
    
    setIsLoading(true)
    const data = {
      labels: poll.options.map(option => option.text),
      datasets: [
        {
          label: 'Votes',
          data: poll.options.map(option => option.votes),
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(16, 185, 129, 0.8)',
          ],
          borderColor: [
            'rgba(99, 102, 241, 1)',
            'rgba(14, 165, 233, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(16, 185, 129, 1)',
          ],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }
    
    setChartData(data)
    setIsLoading(false)
  }, [poll])

  if (!poll || !poll.options) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)
  const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const votes = context.raw
            const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0
            return ` ${votes} votes (${percentage}%)`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          color: '#6B7280',
          precision: 0
        }
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center">
          <FaChartBar className="text-white text-xl mr-3" />
          <h3 className="text-xl font-semibold text-white">Poll Results</h3>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="h-80 mb-8">
            {chartData && <Bar data={chartData} options={options} />}
          </div>
        )}
        
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
              <FaVoteYea className="inline" />
            </span>
            Votes Breakdown
          </h4>
          <div className="space-y-4">
            {sortedOptions.map((option, index) => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
              return (
                <div key={option._id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-800 truncate">{option.text}</span>
                    <span className="font-medium text-indigo-600 whitespace-nowrap ml-2">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.votes} vote{option.votes !== 1 ? 's' : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
          <div className="flex items-center bg-indigo-50 rounded-lg p-3">
            <FaVoteYea className="text-indigo-500 mr-2" />
            <span className="font-medium">Total votes: <span className="text-indigo-600">{totalVotes}</span></span>
          </div>
          <div className="flex items-center bg-purple-50 rounded-lg p-3">
            <FaUser className="text-purple-500 mr-2" />
            <span className="font-medium">By: <span className="text-purple-600">{poll.creator?.username || 'Anonymous'}</span></span>
          </div>
          {poll.endDate && (
            <div className="flex items-center bg-amber-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-medium">
                {new Date(poll.endDate) < new Date() ? 'Ended' : 'Ends'}: <span className="text-amber-600">{formatDate(poll.endDate)}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PollResults