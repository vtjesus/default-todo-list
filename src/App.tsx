/* eslint-disable import/no-absolute-path */
import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoTitle, type FilterValue, type ListOfTodos, type TodoId, type Todo as TodoType } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mocksData: ListOfTodos = [
  {
    id: '1',
    title: 'Вивчити Typescript',
    completed: false
  },
  {
    id: '2',
    title: 'Створити більше проектів за допомогою Typescript',
    completed: false
  },
  {
    id: '3',
    title: 'Частіше розмовляти та писати англійською',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mocksData)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (

    <div className='todoapp'>
      <Header
      onAddTodo={handleAddTodo}
      />
      <Todos
      onToggleCompleteTodo={handleCompleted}
      onRemoveTodo={handleRemove}
      todos={filteredTodos}/>
      <Footer
        completedCount={completedCount}
        filterSelected={filterSelected}
        activeCount={activeCount}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>
  )
}

export default App
