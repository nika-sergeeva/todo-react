import React, {useState} from 'react'


const MyButtonGroup = (props) => {

    const btns = [
        {name: 'All', st: 'all'},
        {name: 'Active', st: false},
        {name: 'Complited', st: true}
    ]

const [activeBtn, setActiveBtn] = useState(0)

const groupOfBtns = btns.map((item, i) => {
    return <button 
            key={item.name + i}
            onClick={() => {setActiveBtn(i); props.handleClick(item.st)}}
            className={i === activeBtn? "sort-btn active" : "sort-btn"}
            >
            {item.name}
        </button>
})

  return (
    <div className='btnGroup'>{groupOfBtns}</div>
  )
}

export default MyButtonGroup