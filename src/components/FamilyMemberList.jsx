import React, { useState } from 'react'
import { useNetwork } from '../context/NetworkContext'
import { Edit, Trash2, User, Users } from 'lucide-react'

const FamilyMemberList = () => {
  const { state, removeFamilyMember, updateFamilyMember } = useNetwork()
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (member) => {
    setEditingId(member.id)
    setEditForm({
      name: member.name,
      age: member.age,
      gender: member.gender,
      relationship: member.relationship
    })
  }

  const handleSaveEdit = () => {
    updateFamilyMember({ ...editForm, id: editingId })
    setEditingId(null)
    setEditForm({})
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      removeFamilyMember(id)
    }
  }

  const getRelationshipColor = (relationship) => {
    const colors = {
      'father': 'bg-blue-100 text-blue-800',
      'mother': 'bg-pink-100 text-pink-800',
      'son': 'bg-green-100 text-green-800',
      'daughter': 'bg-purple-100 text-purple-800',
      'brother': 'bg-indigo-100 text-indigo-800',
      'sister': 'bg-rose-100 text-rose-800',
      'husband': 'bg-blue-100 text-blue-800',
      'wife': 'bg-pink-100 text-pink-800',
      'spouse': 'bg-purple-100 text-purple-800',
      'partner': 'bg-purple-100 text-purple-800',
      'grandfather': 'bg-amber-100 text-amber-800',
      'grandmother': 'bg-amber-100 text-amber-800',
      'uncle': 'bg-cyan-100 text-cyan-800',
      'aunt': 'bg-cyan-100 text-cyan-800',
      'cousin': 'bg-emerald-100 text-emerald-800'
    }
    return colors[relationship] || 'bg-gray-100 text-gray-800'
  }

  if (state.familyMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No family members added yet</h3>
        <p className="text-gray-600">Start building your network by adding family members above.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {state.familyMembers.map((member) => (
        <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
          {editingId === member.id ? (
            // Edit form
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  className="input-field"
                  placeholder="Age"
                  min="0"
                  max="120"
                />
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="input-field"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <select
                  value={editForm.relationship}
                  onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
                  className="input-field"
                >
                  <option value="">Relationship</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="husband">Husband</option>
                  <option value="wife">Wife</option>
                  <option value="spouse">Spouse</option>
                  <option value="partner">Partner</option>
                  <option value="grandfather">Grandfather</option>
                  <option value="grandmother">Grandmother</option>
                  <option value="uncle">Uncle</option>
                  <option value="aunt">Aunt</option>
                  <option value="cousin">Cousin</option>
                </select>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            // Display member info
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{member.age} years old</span>
                    <span>•</span>
                    <span className="capitalize">{member.gender}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(member.relationship)}`}>
                  {member.relationship.charAt(0).toUpperCase() + member.relationship.slice(1).replace('-', ' ')}
                </span>
                
                <button
                  onClick={() => handleEdit(member)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FamilyMemberList

