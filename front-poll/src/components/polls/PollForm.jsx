import React, { useState } from 'react'
import { HiPlus, HiTrash, HiOutlineInformationCircle } from 'react-icons/hi'

const PollForm = ({ onSubmit, loading, submitButtonStyle, cancelButtonStyle }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState({})

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index) => {
    if (options.length <= 2) return
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    let optionErrors = false
    const nonEmptyOptions = options.filter(opt => opt.trim() !== '')
    
    if (nonEmptyOptions.length < 2) {
      newErrors.options = 'At least two options are required'
      optionErrors = true
    }
    
    const uniqueOptions = new Set(options.map(opt => opt.trim().toLowerCase()))
    if (uniqueOptions.size !== nonEmptyOptions.length) {
      newErrors.options = 'All options must be unique'
      optionErrors = true
    }
    
    if (optionErrors) {
      newErrors.optionsList = options.map(opt => 
        opt.trim() === '' ? 'Option cannot be empty' : ''
      )
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const nonEmptyOptions = options.filter(opt => opt.trim() !== '')
    
    const pollData = {
      title: title.trim(),
      description: description.trim(),
      options: nonEmptyOptions,
      endDate: endDate ? new Date(endDate).toISOString() : null
    }
    
    onSubmit(pollData)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const minDate = today.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Poll Title <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="title"
            className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          {errors.title && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <HiOutlineInformationCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        <p className="mt-1 text-xs text-gray-500">
          {title.length}/100 characters
        </p>
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          id="description"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border min-h-[100px]"
          placeholder="Add context or details about your poll..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500">
          {description.length}/500 characters
        </p>
      </div>

      {/* Options Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Poll Options <span className="text-red-500">*</span> <span className="text-gray-500">(minimum 2)</span>
        </label>
        {errors.options && <p className="text-sm text-red-600 mb-2">{errors.options}</p>}
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border ${
                    errors.optionsList && errors.optionsList[index] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  maxLength={100}
                />
                {errors.optionsList && errors.optionsList[index] && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <HiOutlineInformationCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeOption(index)}
                className={`ml-2 p-2 rounded-full ${
                  options.length <= 2 ? 'text-gray-300' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
                disabled={options.length <= 2}
                title="Remove option"
              >
                <HiTrash className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addOption}
          className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <HiPlus className="h-4 w-4 mr-1" />
          Add Option
        </button>
      </div>

      {/* End Date Field */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          Poll End Date <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="date"
          id="endDate"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={minDate}
        />
        <p className="mt-1 text-xs text-gray-500">
          If no end date is set, the poll will remain active until manually closed.
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className={cancelButtonStyle || "inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={submitButtonStyle || "inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Poll...
            </>
          ) : (
            'Create Poll'
          )}
        </button>
      </div>
    </form>
  )
}

export default PollForm