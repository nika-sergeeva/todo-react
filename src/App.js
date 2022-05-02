import React, {useEffect, useState} from 'react';
import './App.css';
import MyInput from './components/MyInput'
import { nanoid } from 'nanoid'
import PlanItem from './components/PlanItem'
import MyButtonGroup from './components/MyButtonGroup';



function App() {

  //Dark Mode
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("mode")))
  
  function toggleMode(){
    setDarkMode(prevOne => !prevOne)
  }
  
  const modeIcon = darkMode? "icon-sun.svg" : "icon-moon.svg"
  
  useEffect(() => {
  localStorage.setItem("mode", JSON.stringify(darkMode))
}, [darkMode])

  //Starter
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todo")) || [
    { id: 5,
      order: 1,
      value: "Complite online Javascript course",
      checked: true
    },
    { id: 4,
      order: 2,
      value: "10 minutes meditation",
      checked: false
    },
    { id: 3,
      order: 3,
      value: "Read for 1 hour",
      checked: false
    },
    { id: 2,
      order: 4,
      value: "Pick up groceries",
      checked: false
    },
    { id: 1,
      order: 5,
      value: "Complite Todo App on Frontend Mentor",
      checked: true
    }
    ])


  //     for input state
  const [todos, setTodos] = useState('')

  //Create new TODOs
  const addNewPost = () => {
    if(todos) {
      const newTodo = {
        id: nanoid(),
        order: getOrder(), 
        checked: false,
        value: todos
      }
      setTodo([newTodo, ...todo])
      setTodos('')
    }
  }

  const getOrder = () =>{
   return todo.length + 1
  }

  //   Delete an item
  const deleteItem = (event, todoId) => {
    event.stopPropagation()
    setTodo(oldTodo => oldTodo.filter(todo => todo.id !== todoId))
    setTodo(oldTodo => oldTodo.map((item, index) => {
      return {...item, order: index+1}
    }))
  }

  //   Update checked
  const updateItem = (todoId) => {
    setTodo(oldTodo => oldTodo.map(todo => {
      return todo.id === todoId ? 
      {...todo, checked: !todo.checked} :
      todo
    }))

  }

  //   Clear All Complited
  const clearComplited = () => {
    setTodo(oldTodo => oldTodo.filter(todo => !todo.checked))
  }

  // to count the number of incomplited todos 
  const spelling = () => {
let uncompleted = todo.filter(item => !item.checked).length
return `${uncompleted} ${uncompleted <= 1 ? 'item' : 'items'} left`
   }

//save TODOs in local storage
useEffect(() => {
  localStorage.setItem("todo", JSON.stringify(todo))
}, [todo]) 

//Drag and Drop 
const [currentTodo, setCurrentTodo] = useState(null)

function dragStartHandler(e, todoItem){
  setCurrentTodo(todoItem)
}
function dragEndHandler(e){
  e.target.style.background = 'inherit'
}
function dragOverHandler(e){
  e.preventDefault()
}
function dragDropHandler(e, todoItem){
  e.preventDefault()
  setTodo(todo.map(item => {
    if(item.id === todoItem.id){
      return {...item, order: currentTodo.order}
    }
    if(item.id === currentTodo.id){
      return {...item, order: todoItem.order}
    }
    return item
  }))
}

const sortTodos = (a, b) => {
    if(a.order > b.order){
      return 1
    } else{
      return -1
    }
}

  //Main Todos
const [selectedSort, setSelectedSort] = useState(todo)
  //Sorting 
const filterTodo = (status) => {
  if(status === 'all'){
    setSelectedSort(todo)
  }else{
    let newT = [...todo].filter(item => item.checked === status)
    setSelectedSort(newT)
  }
 }

useEffect(() => {
  setSelectedSort(todo)
}, [todo])

//Umnount on changing width
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
                <button className='input-btn' onClick={addNewPost}></button>
                <MyInput
                value={todos}
                onChange={e => setTodos(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewPost()}
                />
            </div>
            <div className="todos">
                {selectedSort.sort(sortTodos).map(item => { 
                return <PlanItem 
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dragOverHandler={dragOverHandler}
                        dragDropHandler={dragDropHandler}
                        todoItem={item}
                        key={item.id} 
                        checked={item.checked} 
                        text={item.value} 
                        deleteItem={deleteItem}
                        updateItem={updateItem} 
                        id={item.id} 
                        />})}
            </div>
        {todo.length 
          ? <> <div className="filters">
              <h6 className="count"> {spelling()} </h6>
              {width > 513 && <MyButtonGroup handleClick={filterTodo} />}
              <button className='filters-btn' onClick={clearComplited}> Clear Complited </button>
            </div> 

            {width < 513 &&<div className='sorting-box'>
              <MyButtonGroup handleClick={filterTodo} />
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
