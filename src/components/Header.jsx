import React from 'react'
import { Users, Eye } from 'lucide-react'

const Header = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-gray-900" viewBox="0 0 32 32" fill="currentColor">
                <circle cx="16" cy="16" r="4" fill="#000000" stroke="#000000" strokeWidth="2"/>
                <circle cx="8" cy="8" r="2" fill="#000000"/>
                <circle cx="24" cy="8" r="2" fill="#000000"/>
                <circle cx="8" cy="24" r="2" fill="#000000"/>
                <circle cx="24" cy="24" r="2" fill="#000000"/>
                <circle cx="16" cy="6" r="2" fill="#000000"/>
                <circle cx="26" cy="16" r="2" fill="#000000"/>
                <circle cx="16" cy="26" r="2" fill="#000000"/>
                <circle cx="6" cy="16" r="2" fill="#000000"/>
                <line x1="16" y1="16" x2="8" y2="8" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="24" y2="8" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="8" y2="24" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="24" y2="24" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="16" y2="6" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="26" y2="16" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="16" y2="26" stroke="#000000" strokeWidth="1"/>
                <line x1="16" y1="16" x2="6" y2="16" stroke="#000000" strokeWidth="1"/>
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Ego-Network Builder</h1>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Inspired by KINMATRIX
            </span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('builder')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'builder'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Build Network</span>
            </button>
            
            <button
              onClick={() => setCurrentView('visualization')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'visualization'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Visualize</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

