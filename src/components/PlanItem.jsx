import React from 'react'

const PlanItem = (props) => {

  return (
        <div className="plan-box" onDragStart={(e) => props.dragStartHandler(e, props.todoItem)}
        onDragEnd={(e) => props.dragEndHandler(e)}
        onDragOver={(e) => props.dragOverHandler(e)}
        onDrop={(e) => props.dragDropHandler(e, props.todoItem)}
        draggable={true}>
                    <div className="round">
                        <input 
                        type="checkbox"
                        id={props.id}
                        className={`plan-btn ${props.checked ? "checked" : "unchecked" }`} 
                        onChange={() => props.updateItem(props.id)} 
                        checked={props.checked}
                         />
                            <label htmlFor={props.id}></label>
                    </div>
         
              <div className={`plan-text ${props.checked ? "checked" : "unchecked" }`}>{props.text}</div>
                <button className="plan-delete" onClick={(event) => props.deleteItem(event, props.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                </button>
      </div>
     )
}

export default PlanItem