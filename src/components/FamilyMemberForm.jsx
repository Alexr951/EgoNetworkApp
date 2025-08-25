import React, { useState } from 'react'
import { useNetwork } from '../context/NetworkContext'
import { X, Save } from 'lucide-react'

const FamilyMemberForm = ({ onClose }) => {
  const { addFamilyMember } = useNetwork()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    relationship: ''
  })

  const relationshipOptions = [
    // Immediate family
    { category: 'Immediate Family', options: [
      'father', 'mother', 'son', 'daughter', 'brother', 'sister',
      'husband', 'wife', 'spouse', 'partner'
    ]},
    // Extended family
    { category: 'Extended Family', options: [
      'grandfather', 'grandmother', 'grandson', 'granddaughter',
      'uncle', 'aunt', 'nephew', 'niece', 'cousin'
    ]},
    // In-laws
    { category: 'In-Laws', options: [
      'father-in-law', 'mother-in-law', 'brother-in-law', 'sister-in-law',
      'son-in-law', 'daughter-in-law'
    ]},
    // Step family
    { category: 'Step Family', options: [
      'stepfather', 'stepmother', 'stepson', 'stepdaughter',
      'stepbrother', 'stepsister'
    ]},
    // Other
    { category: 'Other', options: [
      'adoptive parent', 'adopted child', 'foster parent', 'foster child',
      'guardian', 'other relative'
    ]}
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addFamilyMember(formData)
    setFormData({
      name: '',
      age: '',
      gender: '',
      relationship: ''
    })
    onClose()
  }

  const isFormValid = formData.name && formData.age && formData.gender && formData.relationship

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">Add Family Member</h4>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="0"
            max="120"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship to You *
          </label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select relationship</option>
            {relationshipOptions.map((category, index) => (
              <optgroup key={index} label={category.category}>
                {category.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isFormValid
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>
    </form>
  )
}

export default FamilyMemberForm

