import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { HiOutlinePlus, HiOutlineChartBar, HiClipboardList } from 'react-icons/hi'
import { useAuth } from '../contexts/AuthContext'
import PollList from '../components/polls/PollList'

const Dashboard = () => {
  const { user, getUserStats } = useAuth()
  const [activeTab, setActiveTab] = useState('created')
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    pollsCreated: 0,
    pollsVoted: 0,
    totalVotesReceived: 0
  })

  const fetchStats = async () => {
    const userStats = await getUserStats()
    if (userStats) {
      setStats(userStats)
    }
  }

  const fetchPolls = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const endpoint = activeTab === 'created' 
        ? 'http://localhost:5000/api/polls/user/created' 
        : 'http://localhost:5000/api/polls/user/voted'
      
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      
      setPolls(res.data)
    } catch (err) {
      setError('Failed to load polls. Please try again later.')
      console.error('Error fetching polls:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchPolls()
      fetchStats()
    }
  }, [activeTab, user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
            Your Poll Dashboard
          </h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Polls Created Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <HiOutlineChartBar className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-medium opacity-90">Total Polls Created</h3>
                  <p className="text-3xl font-bold">{stats.pollsCreated}</p>
                </div>
              </div>
            </div>

            {/* Polls Voted Card */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <HiClipboardList className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-medium opacity-90">Polls Voted On</h3>
                  <p className="text-3xl font-bold">{stats.pollsVoted}</p>
                </div>
              </div>
            </div>

            {/* Votes Received Card */}
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <HiOutlineChartBar className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-medium opacity-90">Total Votes Received</h3>
                  <p className="text-3xl font-bold">{stats.totalVotesReceived}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs and Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1.5">
              <button
                onClick={() => setActiveTab('created')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'created'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Polls
              </button>
              <button
                onClick={() => setActiveTab('voted')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'voted'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Polls I Voted On
              </button>
            </div>
            
            <Link 
              to="/create-poll" 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <HiOutlinePlus className="inline-block mr-2 -mt-1" />
              Create New Poll
            </Link>
          </div>
        </div>

        {/* Poll List Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          <PollList 
            polls={polls} 
            loading={loading} 
            error={error} 
            emptyMessage={
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {activeTab === 'created' ? '📋' : '🗳️'}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === 'created'
                    ? "No polls created yet"
                    : "No votes cast yet"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {activeTab === 'created'
                    ? "Get started by creating your first interactive poll!"
                    : "Explore active polls and make your voice heard!"}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard