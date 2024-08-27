
import { Route, Routes } from 'react-router-dom'
import Todo from './Screens/Todo'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Todo/>}/>
      </Routes>
    </div>
  )
}

export default App