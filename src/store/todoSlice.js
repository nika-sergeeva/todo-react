import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const starter = [
    { id: 5,
      value: "Complete online Javascript course",
      checked: true
    },
    { id: 4,
      value: "10 minutes meditation",
      checked: false
    },
    { id: 3,
      value: "Read for 1 hour",
      checked: false
    },
    { id: 2,
      value: "Pick up groceries",
      checked: false
    },
    { id: 1,
      value: "Complete Todo App on Frontend Mentor",
      checked: true
    }
    ]

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: starter || JSON.parse(localStorage.getItem("persistroot")),
        filterStatus: 'all',
    },
    reducers: {
        addNewPost(state, action) {
            state.todo.push({
                id: nanoid(),
                checked: false,
                value: action.payload.todos,
            })
        },
        deleteItem(state, action){
          state.todo = state.todo.filter(item => item.id !== action.payload.id)
        },
        updateItem(state, action){
          const toggleTodo = state.todo.find(todo => todo.id === action.payload.id)
          toggleTodo.checked = !toggleTodo.checked
        },
        clearAllCompleted(state, action){
          state.todo = state.todo.filter(item => !item.checked)
        },
        reorderList(state, action){
          const smth = action.payload
          state.todo = smth
        },
        updateFilterStatus(state, action){
          const status = action.payload
           state.filterStatus = status
        },
    },
})

export const { deleteItem, updateItem, addNewPost, clearAllCompleted, reorderList, updateFilterStatus } = todoSlice.actions

export default todoSlice.reducer