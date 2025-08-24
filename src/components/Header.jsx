import React from 'react'
import { Users, Network } from 'lucide-react'

const Header = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Network className="h-8 w-8 text-primary-600" />
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
              <Network className="h-4 w-4" />
              <span>Visualize</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

