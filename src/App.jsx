import { useState } from 'react'
import Home from './views/home'
import TodoApp from './views/todoApp'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<TodoApp />} />

      </Routes>
    </div>
  )
}

export default App
