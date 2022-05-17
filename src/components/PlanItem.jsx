import { Reorder } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteItem, updateItem} from '../store/todoSlice'

const PlanItem = ({id, checked, text, todo}) => {

  const dispatch = useDispatch()

  return (
        <Reorder.Item 
        as="div" 
        value={todo}
        whileTap={{
              boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
        }}
        whileDrag={{
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
      }}        
        >
        <div className="plan-box">
                    <div className="round">
                        <input 
                        type="checkbox"
                        id={id}
                        className={`plan-btn ${checked ? "checked" : "unchecked" }`} 
                        onChange={() => dispatch(updateItem({id}))} 
                        checked={checked}
                         />
                            <label htmlFor={id}></label>
                    </div>
         
              <div className={`plan-text ${checked ? "checked" : "unchecked" }`}>{text}</div>
                <button className="plan-delete" onClick={() => dispatch(deleteItem({id})) }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                </button>
      </div>
      </Reorder.Item>
     )
}

export default PlanItem