import React,{useEffect} from 'react'
import {useSelector} from 'react-redux'
import {todosSelector} from '../store/reducers/todosSlice'
import {markComplete, removeTodo, getTodos} from '../store/reducers/todosSlice'
import {useDispatch} from 'react-redux'
import TodoForm from './TodoForm'
const Todos = () => {
    

    const todos = useSelector(todosSelector)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch])

    const toggleTodoCompleted = id => {
        dispatch(markComplete(id));
    }

    const deleteSingleTodo = id => {
        dispatch(removeTodo(id))
    }

    return (
        <div className='todo-list'>
            <TodoForm />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>{todo.title}
                    <input type="checkbox" checked={todo.completed} onChange={toggleTodoCompleted.bind(this, todo.id)} />
                    <button onClick={deleteSingleTodo.bind(this, todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todos
