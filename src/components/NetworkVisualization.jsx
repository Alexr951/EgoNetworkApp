import React, { useState, useMemo } from 'react'
import { useNetwork } from '../context/NetworkContext'
import { ArrowLeft, Download, Eye, EyeOff, RotateCcw } from 'lucide-react'

const NetworkVisualization = ({ onBackToBuilder }) => {
  const { state } = useNetwork()
  const [showLabels, setShowLabels] = useState(true)

  // Calculate positions for static layout
  const layout = useMemo(() => {
    const nodes = []
    const links = []

    // Add ego node at center
    if (state.ego.name) {
      nodes.push({
        id: state.ego.id,
        name: state.ego.name,
        age: state.ego.age,
        gender: state.ego.gender,
        relationship: 'self',
        isEgo: true,
        x: 300, // Center of SVG
        y: 300,
        radius: 25 // Larger node for ego
      })
    }

    // Position family members in a circle around ego
    const centerX = 300
    const centerY = 300
    const radius = 150 // Distance from center
    const angleStep = (2 * Math.PI) / Math.max(state.familyMembers.length, 1)
    
    state.familyMembers.forEach((member, index) => {
      const angle = index * angleStep
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      nodes.push({
        id: member.id,
        name: member.name,
        age: member.age,
        gender: member.gender,
        relationship: member.relationship,
        isEgo: false,
        x: x,
        y: y,
        radius: 20
      })

      // Create link from ego to family member
      links.push({
        source: { x: centerX, y: centerY },
        target: { x: x, y: y }
      })
    })

    return { nodes, links }
  }, [state])

  const getNodeColor = (node) => {
    const genderColors = {
      'male': '#8b5cf6', // Purple
      'female': '#f59e0b', // Yellow
      'other': '#10b981' // Green
    }
    return genderColors[node.gender] || '#6b7280'
  }

  const downloadNetwork = () => {
    const dataStr = JSON.stringify(layout, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ego-network.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!state.ego.name || state.familyMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Network Data</h2>
        <p className="text-gray-600 mb-6">Please add your information and family members to visualize your network.</p>
        <button
          onClick={onBackToBuilder}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Builder</span>
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Ego-Network Visualization
          </h2>
          <p className="text-gray-600">
            Static visualization of your family network with clear nodes and edges.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="btn-secondary flex items-center space-x-2"
          >
            {showLabels ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showLabels ? 'Hide' : 'Show'} Labels</span>
          </button>
          
          <button
            onClick={downloadNetwork}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Data</span>
          </button>
          
          <button
            onClick={onBackToBuilder}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Builder</span>
          </button>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{layout.nodes.length}</div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{layout.links.length}</div>
          <div className="text-sm text-gray-600">Relationships</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {state.familyMembers.filter(m => m.gender === 'male').length}
          </div>
          <div className="text-sm text-gray-600">Male Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {state.familyMembers.filter(m => m.gender === 'female').length}
          </div>
          <div className="text-sm text-gray-600">Female Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-500">
            {state.familyMembers.filter(m => m.gender === 'other').length}
          </div>
          <div className="text-sm text-gray-600">Other Members</div>
        </div>
      </div>

      {/* Static Network Graph */}
      <div className="card p-0 overflow-hidden">
        <div className="h-[600px] w-full bg-white">
          <svg width="100%" height="100%" viewBox="0 0 600 600">
            {/* Draw edges first (behind nodes) */}
            {layout.links.map((link, index) => (
              <line
                key={`link-${index}`}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                stroke="#374151"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            
            {/* Draw nodes */}
            {layout.nodes.map((node) => (
              <g key={node.id}>
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={getNodeColor(node)}
                  stroke="#374151"
                  strokeWidth="2"
                />
                
                {/* Node label */}
                {showLabels && (
                  <text
                    x={node.x}
                    y={node.y + node.radius + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#1f2937"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.name} ({node.age})
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Male</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Female</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Other</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-700">You (Ego) - Larger node</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkVisualization

