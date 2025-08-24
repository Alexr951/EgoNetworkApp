import React, { createContext, useContext, useReducer, useEffect } from 'react'

const NetworkContext = createContext()

const initialState = {
  ego: {
    id: 'ego',
    name: '',
    age: '',
    gender: '',
    relationship: 'self'
  },
  familyMembers: [],
  nextId: 1
}

const networkReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EGO':
      return {
        ...state,
        ego: { ...state.ego, ...action.payload }
      }
    
    case 'ADD_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: [...state.familyMembers, { ...action.payload, id: state.nextId }],
        nextId: state.nextId + 1
      }
    
    case 'UPDATE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.map(member =>
          member.id === action.payload.id ? { ...member, ...action.payload } : member
        )
      }
    
    case 'REMOVE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.filter(member => member.id !== action.payload)
      }
    
    case 'CLEAR_NETWORK':
      return initialState
    
    case 'LOAD_NETWORK':
      return {
        ...state,
        ...action.payload
      }
    
    default:
      return state
  }
}

export const NetworkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(networkReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedNetwork = localStorage.getItem('egoNetwork')
    if (savedNetwork) {
      try {
        const parsed = JSON.parse(savedNetwork)
        dispatch({ type: 'LOAD_NETWORK', payload: parsed })
      } catch (error) {
        console.error('Error loading network from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('egoNetwork', JSON.stringify(state))
  }, [state])

  const value = {
    state,
    dispatch,
    setEgo: (egoData) => dispatch({ type: 'SET_EGO', payload: egoData }),
    addFamilyMember: (memberData) => dispatch({ type: 'ADD_FAMILY_MEMBER', payload: memberData }),
    updateFamilyMember: (memberData) => dispatch({ type: 'UPDATE_FAMILY_MEMBER', payload: memberData }),
    removeFamilyMember: (id) => dispatch({ type: 'REMOVE_FAMILY_MEMBER', payload: id }),
    clearNetwork: () => dispatch({ type: 'CLEAR_NETWORK' })
  }

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  )
}

export const useNetwork = () => {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }
  return context
}

