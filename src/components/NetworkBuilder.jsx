import React, { useState } from 'react'
import { useNetwork } from '../context/NetworkContext'
import EgoForm from './EgoForm'
import FamilyMemberForm from './FamilyMemberForm'
import FamilyMemberList from './FamilyMemberList'
import { Plus, Eye, Trash2, Users } from 'lucide-react'

const NetworkBuilder = ({ onViewNetwork }) => {
  const { state, clearNetwork } = useNetwork()
  const [showAddForm, setShowAddForm] = useState(false)

  const hasEgoInfo = state.ego.name && state.ego.age && state.ego.gender
  const hasFamilyMembers = state.familyMembers.length > 0

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Build Your Ego-Network
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create a comprehensive map of your family network. Start by adding your information as the central node (ego), 
          then add family members with their relationships to you.
        </p>
      </div>

      {/* Ego Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-primary-600 font-bold">You</span>
          </div>
          Your Information (Ego)
        </h3>
        <EgoForm />
      </div>

      {/* Family Members */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Family Members ({state.familyMembers.length})
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Family Member</span>
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <FamilyMemberForm onClose={() => setShowAddForm(false)} />
          </div>
        )}

        <FamilyMemberList />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={clearNetwork}
          className="btn-secondary flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All Data</span>
        </button>

        <button
          onClick={onViewNetwork}
          disabled={!hasEgoInfo || !hasFamilyMembers}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            hasEgoInfo && hasFamilyMembers
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>View Network Visualization</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Progress</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Your information</span>
            <div className={`w-4 h-4 rounded-full ${hasEgoInfo ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Family members added</span>
            <div className={`w-4 h-4 rounded-full ${hasFamilyMembers ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkBuilder
