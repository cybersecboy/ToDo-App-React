import React, { useState, useEffect } from 'react'
import todoimg from '../images/todoimg.png';

const getLocalItems = () => {
    let data = localStorage.getItem('todoData');
    // console.log(data);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
const ToDoFinal = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleBtn,setToggleBtn]= useState(true);
    const [isEditItem,setIsEditItem]=useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('Please fill the data');
        }else if(inputData && !toggleBtn){
            setItems(items.map((elem)=>{
                if(elem.id===isEditItem){
                    return {...elem, name:inputData}
                }
                return elem;
            }));
            setToggleBtn(true);
            setInputData('');
            setIsEditItem(null);           
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const deleteItem = (id) => {
        setItems(items.filter((val) => {
            return val.id !== id;
        }));
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('todoData', JSON.stringify(items));
    }, [items])

    const editItem = (id) => {
        let newEditItem=items.find(elem=>elem.id===id);
        // console.log(newEditItem);
        setToggleBtn(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todoimg} alt="todologo" />
                        <figcaption>Add your List here 🤟</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍️ Add items ...' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggleBtn?<i className='fa fa-plus add-btn' title='Add item' onClick={addItem}></i>:<i className='far fa-edit add-btn' title='Update item' onClick={addItem}></i>
                        }
                    </div>
                    <div className='showItems'>
                        {
                            items.map((elem) => {
                                return <div className='eachItem' key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' title='Edit item' onClick={() => editItem(elem.id)}></i>
                                        <i className='far fa-trash-alt add-btn' title='Delete item' onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoFinal;