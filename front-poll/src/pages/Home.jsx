import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { HiOutlinePlus, HiRefresh } from 'react-icons/hi'
import { MdHowToVote } from 'react-icons/md'
import PollList from '../components/polls/PollList'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const fetchPolls = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await axios.get('/api/polls/active')
      setPolls(res.data)
    } catch (err) {
      setError('Failed to load polls. Please try again later.')
      console.error('Error fetching polls:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPolls()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 text-white p-8 md:p-12 rounded-2xl shadow-2xl mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent mix-blend-overlay" />
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-flex rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <MdHowToVote className="h-16 w-16 text-white/90 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Engage with Interactive <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">Live Polls</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 font-medium text-white/90 max-w-2xl mx-auto">
              Discover real-time opinions, create stunning polls, and make data-driven decisions. Perfect for teams, educators, and community leaders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/create-poll" 
                className="btn transform transition-all hover:scale-105 bg-white/20 backdrop-blur-lg hover:bg-white/30 border border-white/30 rounded-xl text-lg font-semibold px-8 py-4 flex items-center justify-center"
              >
                <HiOutlinePlus className="mr-2 text-xl" />
                Create Poll
              </Link>
              {!user && (
                <Link 
                  to="/register" 
                  className="btn transform transition-all hover:scale-105 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-xl text-lg font-semibold px-8 py-4"
                >
                  Unlock Premium Features
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Polls Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Active Polls
              </h2>
              <p className="text-gray-600 mt-1">Real-time updates on current discussions</p>
            </div>
            <button 
              onClick={fetchPolls} 
              className="btn btn-outline border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg px-5 py-2.5 flex items-center self-end"
              disabled={loading}
            >
              <HiRefresh className={`mr-2 text-lg ${loading ? 'animate-spin' : 'hover:rotate-180 transition-transform'}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <PollList 
            polls={polls} 
            loading={loading} 
            error={error} 
            emptyMessage={
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗳️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active polls yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Be the trendsetter! Create the first poll and spark the conversation.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Home