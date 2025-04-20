import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import { useToast } from '../contexts/ToastContext'
import PollForm from '../components/polls/PollForm'

const CreatePoll = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createPoll } = useSocket()
  const { showToast } = useToast()

  const handleSubmit = async (pollData) => {
    if (!user) {
      showToast('You must be logged in to create a poll', 'error')
      return
    }
    
    setLoading(true)
    
    try {
      const res = await axios.post('http://localhost:5000/api/polls', 
        pollData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      
      // Notify socket subscribers about the new poll
      createPoll(res.data)
      
      showToast('Poll created successfully!', 'success')
      navigate(`/polls/${res.data._id}`)
    } catch (err) {
      console.error('Error creating poll:', err)
      showToast(
        err.response?.data?.message || 'Failed to create poll',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Create a New Poll
              </h1>
              <p className="mt-3 text-lg text-indigo-100 max-w-2xl mx-auto">
                Ask a question, add options, and share with others to gather opinions in real-time.
              </p>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="px-6 py-8 sm:p-10">
            <PollForm 
              onSubmit={handleSubmit} 
              loading={loading}
              submitButtonStyle="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              cancelButtonStyle="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200"
            />
          </div>
          
          {/* Premium Features Banner */}
          {!user && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200 px-6 py-4 sm:px-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-800">
                    <Link to="/login" className="underline hover:text-amber-600">
                      Sign in
                    </Link> to save and manage your polls
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Premium Tips Section */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Real-time Results</h3>
                  <p className="mt-1 text-sm text-gray-500">Watch votes come in live as participants respond</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Private Polls</h3>
                  <p className="mt-1 text-sm text-gray-500">Make polls visible only to selected participants</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Secure Voting</h3>
                  <p className="mt-1 text-sm text-gray-500">Prevent duplicate votes with authentication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePoll