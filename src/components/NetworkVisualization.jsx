import React, { useState, useCallback, useMemo } from 'react'
import { useNetwork } from '../context/NetworkContext'
import { ArrowLeft, Download, Eye, EyeOff, RotateCcw } from 'lucide-react'
import ForceGraph2D from 'react-force-graph-2d'

const NetworkVisualization = ({ onBackToBuilder }) => {
  const { state } = useNetwork()
  const [showLabels, setShowLabels] = useState(true)
  const [graphRef, setGraphRef] = useState()

  // Transform data for the force graph
  const graphData = useMemo(() => {
    const nodes = []
    const links = []

    // Add ego node
    if (state.ego.name) {
      nodes.push({
        id: state.ego.id,
        name: state.ego.name,
        age: state.ego.age,
        gender: state.ego.gender,
        relationship: 'self',
        isEgo: true,
        val: 20 // Larger node for ego
      })
    }

    // Add family member nodes
    state.familyMembers.forEach(member => {
      nodes.push({
        id: member.id,
        name: member.name,
        age: member.age,
        gender: member.gender,
        relationship: member.relationship,
        isEgo: false,
        val: 15
      })

      // Create link from ego to family member
      links.push({
        source: state.ego.id,
        target: member.id,
        relationship: member.relationship
      })
    })

    return { nodes, links }
  }, [state])

  const getNodeColor = (node) => {
    if (node.isEgo) return '#3b82f6' // Blue for ego
    
    const colors = {
      'father': '#1d4ed8',
      'mother': '#be185d',
      'son': '#059669',
      'daughter': '#7c3aed',
      'brother': '#3730a3',
      'sister': '#be123c',
      'husband': '#1d4ed8',
      'wife': '#be185d',
      'spouse': '#7c3aed',
      'partner': '#7c3aed',
      'grandfather': '#d97706',
      'grandmother': '#d97706',
      'uncle': '#0891b2',
      'aunt': '#0891b2',
      'cousin': '#047857'
    }
    return colors[node.relationship] || '#6b7280'
  }

  const getNodeLabel = (node) => {
    if (!showLabels) return ''
    return `${node.name} (${node.age})`
  }

  const handleNodeClick = useCallback((node) => {
    // Zoom to node
    const distance = 40
    const distRatio = 1 + distance/Math.hypot(node.x, node.y)
    
    graphRef.centerAt(node.x, node.y, 1000)
    graphRef.zoom(2.5, 1000)
  }, [graphRef])

  const resetView = () => {
    graphRef.centerAt(0, 0, 1000)
    graphRef.zoom(1, 1000)
  }

  const downloadNetwork = () => {
    const dataStr = JSON.stringify(graphData, null, 2)
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
            Interactive visualization of your family network. Click on nodes to zoom in, drag to move around.
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
            onClick={resetView}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset View</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{graphData.nodes.length}</div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{graphData.links.length}</div>
          <div className="text-sm text-gray-600">Relationships</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {state.familyMembers.filter(m => m.gender === 'male').length}
          </div>
          <div className="text-sm text-gray-600">Male Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-pink-600">
            {state.familyMembers.filter(m => m.gender === 'female').length}
          </div>
          <div className="text-sm text-gray-600">Female Members</div>
        </div>
      </div>

      {/* Network Graph */}
      <div className="card p-0 overflow-hidden">
        <div className="h-[600px] w-full">
          <ForceGraph2D
            ref={setGraphRef}
            graphData={graphData}
            nodeLabel={getNodeLabel}
            nodeColor={getNodeColor}
            nodeVal="val"
            linkColor={() => '#e5e7eb'}
            linkWidth={2}
            onNodeClick={handleNodeClick}
            cooldownTicks={100}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = getNodeLabel(node)
              const fontSize = node.isEgo ? 14 : 12
              ctx.font = `${fontSize}px Inter`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              
              // Draw node
              ctx.beginPath()
              ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false)
              ctx.fillStyle = getNodeColor(node)
              ctx.fill()
              
              // Draw border for ego
              if (node.isEgo) {
                ctx.strokeStyle = '#1e40af'
                ctx.lineWidth = 3
                ctx.stroke()
              }
              
              // Draw label
              if (showLabels && label) {
                ctx.fillStyle = '#1f2937'
                ctx.fillText(label, node.x, node.y + node.val + 15)
              }
            }}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-700">You (Ego)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-800 rounded-full"></div>
            <span className="text-sm text-gray-700">Father/Husband</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Mother/Wife</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Son</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Daughter</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Brother</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-rose-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Sister</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
            <span className="text-sm text-gray-700">Grandparent</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkVisualization

