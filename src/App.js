import React, {useEffect, useState} from 'react'
import './App.css'
import MyInput from './components/MyInput'
import PlanItem from './components/PlanItem'
import MyButtonGroup from './components/MyButtonGroup'

import { Reorder } from 'framer-motion'

import {useDispatch, useSelector} from 'react-redux'
import { addNewPost, clearAllCompleted, reorderList } from './store/todoSlice'


function App() {

  //     for input state
const [todos, setTodos] = useState('')

  //Redux
const todo = useSelector(state => state.todo.todo) 
const dispatch = useDispatch()
const addTodo = () => {
  dispatch(addNewPost({todos}))
  setTodos('')
} 
const removeCompleted = () => {
  dispatch(clearAllCompleted())
}
const reorder = (smth) => {
  dispatch(reorderList(smth))
}

  //  Dark Mode
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("mode")))
  function toggleMode(){
    setDarkMode(prevOne => !prevOne)
  }
  const modeIcon = darkMode? "icon-sun.svg" : "icon-moon.svg"
  useEffect(() => {
  localStorage.setItem("mode", JSON.stringify(darkMode))
}, [darkMode])

   // to count the number of incomplited todos 
const spelling = () => {
let uncompleted = todo.filter(item => !item.checked).length
return `${uncompleted} ${uncompleted <= 1 ? 'item' : 'items'} left`
   }

//      Filters    ALL/Active/Completed
const filterStatus = useSelector((state) => state.todo.filterStatus)
const filteredTodoList = [...todo].filter((item) => {
  if(filterStatus === 'all'){
        return item
  }else if(filterStatus === true){
        return item.checked
  }else if(filterStatus === false){
    return !item.checked
  }
     return item
  })

//Unmount on changing width
const [width, setWidth] = useState(window.innerWidth)
useEffect(()=> {
 window.addEventListener("resize", function () {
    setWidth(window.innerWidth)
  })
}, [])

return (
    <div className="App">

<main className={darkMode ? "dark" : "light"}>
      <div className="container">

       <nav>
            <h1 className='heading'>Todo</h1>

            <img 
            className='switcher' 
            src={`/images/${modeIcon}`} 
            alt="theme switcher" 
            onClick={toggleMode} 
            />
        </nav>
            <div className='input-box'>
                <button className='input-btn' onClick={addTodo}></button>
                <MyInput
                value={todos}
                onChange={e => setTodos(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
            </div>
            <div className="todos">
              <Reorder.Group as="div" axys="y" values={todo} onReorder={reorder}> 
                {filteredTodoList.map(item => {  
                return <PlanItem 
                        value={item}
                        todo={item}
                        key={item.id} 
                        checked={item.checked} 
                        text={item.value} 
                        id={item.id} 
                        />})}
              </Reorder.Group>
            </div>
         {todo.length 
          ? <> <div className="filters">
              <h6 className="count"> {spelling()} </h6>
              {width > 513 && <MyButtonGroup  />} 
               <button className='filters-btn' onClick={removeCompleted}> Clear Complited </button>
            </div> 

            {width < 513 &&<div className='sorting-box'>
              <MyButtonGroup  />
            </div>}

            <small>Drag and drop to reorder list </small> </>
            :  <h2 className='ifBlank'>Add your first TODO!</h2>
            } 
            
            
      </div>
    </main>
      
    </div>
  );
}

export default App;

