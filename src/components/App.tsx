import React from 'react'

interface AppProps {
  title?: string
}

const App: React.FC<AppProps> = ({ title = 'JapApp' }) => {
  return (
    <div className="app">
      <h1>{title}</h1>
    </div>
  )
}

export default App
