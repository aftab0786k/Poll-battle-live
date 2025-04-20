import React, { useEffect, useState } from 'react'
import { useToast } from '../../contexts/ToastContext'
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamation } from 'react-icons/hi'
import { HiX } from 'react-icons/hi'

const Toast = () => {
  const { toast, hideToast } = useToast()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (toast.show) {
      setVisible(true)
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  if (!visible) return null

  const iconMap = {
    success: <HiCheckCircle className="h-6 w-6 text-white" />,
    error: <HiXCircle className="h-6 w-6 text-white" />,
    info: <HiInformationCircle className="h-6 w-6 text-white" />,
    warning: <HiExclamation className="h-6 w-6 text-white" />
  }

  const gradientMap = {
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500',
    info: 'bg-gradient-to-r from-blue-400 to-blue-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 sm:right-6 sm:bottom-6 ${
        toast.show ? 'animate-slide-in' : 'animate-fade-out'
      }`}
    >
      <div 
        className={`${gradientMap[toast.type]} rounded-lg shadow-2xl p-4 max-w-xs sm:max-w-md mx-4 sm:mx-0 backdrop-blur-sm relative overflow-hidden`}
      >
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-white/10 w-full h-1/3 rounded-t-lg" />
        
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {iconMap[toast.type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-white drop-shadow-md">{toast.message}</p>
          </div>
          <button 
            onClick={hideToast}
            className="ml-4 flex-shrink-0 inline-flex text-white/80 hover:text-white transition-colors duration-200"
          >
            <span className="sr-only">Close</span>
            <HiX className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast