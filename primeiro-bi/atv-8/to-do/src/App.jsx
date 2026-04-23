import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'To-do em React' }
  ])

  const [inputValue, setInputValue] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    
    if (inputValue.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: inputValue
    }

    setTasks([...tasks, newTask])

    setInputValue('')
  }

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  return (
    <>
      <div className="app-container">
        <h1>Minha Lista de Tarefas</h1>
        
        <form onSubmit={addTask} className="form-container">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-task"
          />
          <button type="submit" className="btn-add">
            Adicionar
          </button>
        </form>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-text">{task.text}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="btn-remove"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="empty-message">Nenhuma tarefa adicionada ainda!</p>
        )}
      </div>
    </>
  )
}

export default App
