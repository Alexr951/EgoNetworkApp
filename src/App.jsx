import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NetworkBuilder from './components/NetworkBuilder'
import NetworkVisualization from './components/NetworkVisualization'
import { NetworkProvider } from './context/NetworkContext'

function App() {
  const [currentView, setCurrentView] = useState('builder') // 'builder' or 'visualization'

  return (
    <NetworkProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <main className="container mx-auto px-4 py-8">
          {currentView === 'builder' ? (
            <NetworkBuilder onViewNetwork={() => setCurrentView('visualization')} />
          ) : (
            <NetworkVisualization onBackToBuilder={() => setCurrentView('builder')} />
          )}
        </main>
      </div>
    </NetworkProvider>
  )
}

export default App

