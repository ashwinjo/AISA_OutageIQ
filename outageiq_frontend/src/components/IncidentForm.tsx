import React, { useState } from 'react'
import { Search, Loader } from 'lucide-react'

interface IncidentFormProps {
  onSubmit: (incidentId: string) => void
  isLoading: boolean
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, isLoading }) => {
  const [incidentId, setIncidentId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (incidentId.trim()) {
      onSubmit(incidentId.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="mb-4">
        <label htmlFor="incidentId" className="block text-gray-700 text-sm font-bold mb-2">
          Incident ID
        </label>
        <input
          type="text"
          id="incidentId"
          value={incidentId}
          onChange={(e) => setIncidentId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Incident ID"
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Search className="w-5 h-5 mr-2" />
        )}
        {isLoading ? 'Generating...' : 'Generate RCA Document'}
      </button>
    </form>
  )
}

export default IncidentForm
