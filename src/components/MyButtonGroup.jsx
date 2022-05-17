import React from 'react'
import { updateFilterStatus } from '../store/todoSlice'
import {useDispatch, useSelector} from 'react-redux'

const MyButtonGroup = () => {

const dispatch = useDispatch()
const activeBtn = useSelector(state => state.todo.filterStatus)

const btns = [
        {name: 'All', st: 'all'},
        {name: 'Active', st: false},
        {name: 'Complited', st: true}
    ]

const updateFilter = (val) => {
    dispatch(updateFilterStatus(val))
}

const groupOfBtns = btns.map((item, index) => {
    return <button 
            key={item.name + index}
            onClick={() => updateFilter(item.st)}
            className={item.st === activeBtn ? "sort-btn active" : "sort-btn"}
            value={item.st}
            >
            {item.name}
        </button>
})

  return (
    <div className='btnGroup'>{groupOfBtns}</div>
  )
}

export default MyButtonGroup
