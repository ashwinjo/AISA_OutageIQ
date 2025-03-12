import React, { useState } from 'react'
import { AlertTriangle, Loader } from 'lucide-react'
import IncidentForm from './components/IncidentForm'
import RCAReport from './components/RCAReport'

function App() {
  const [rcaReport, setRcaReport] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateRCA = async (incidentId: string) => {
    setIsLoading(true)
    setRcaReport(null)
    try {
      const response = await fetch(`http://localhost:5678/webhook/outageiq?incident_id=${incidentId}&role=oncall`)
      if (!response.ok) {
        throw new Error('Failed to fetch RCA report')
      }
      const data = await response.text()
      setRcaReport(data)
    } catch (error) {
      console.error('Error fetching RCA report:', error)
      setRcaReport('Error: Failed to generate RCA report. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-indigo-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-800">OutageIQ</h1>
        </div>
        <h2 className="text-xl text-gray-600">AI Powered Outage RCA Report Generator</h2>
      </header>
      <main className="w-full max-w-2xl">
        <IncidentForm onSubmit={handleGenerateRCA} isLoading={isLoading} />
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : (
          rcaReport && <RCAReport markdown={rcaReport} />
        )}
      </main>
    </div>
  )
}

export default App
