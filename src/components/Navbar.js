import React from 'react'
import {useSelector} from 'react-redux'
import {todosSelector} from '../store/reducers/todosSlice'

const Navbar = () => {
    const todos = useSelector(todosSelector);

    return (
        <div className="navbar">
            <h1>My Redux App</h1>
            <ul>Home</ul>
            <ul>About</ul>
            <ul>Total todos: {todos.length}</ul>
        </div>
    )
}

export default Navbar
