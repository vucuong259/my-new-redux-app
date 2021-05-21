import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//reducer Thunk
export const getTodos = createAsyncThunk('todos/todosFetched', async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
    return response.data
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.allTodos.unshift(action.payload)
            },
            prepare(title) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false
                    }
                }
            }
        },
        markComplete(state, action){
            state.allTodos.map(todo => {
                    if(todo.id === action.payload){
                        todo.completed = !todo.completed
                    }
                    return todo
                }
            )
        },
        removeTodo(state, action){
            state.allTodos = state.allTodos.filter(todo => {
                return todo.id !== action.payload;
            })
        },
        // todosFetched(state, action) {
        //     state.allTodos = action.payload
        // },
        

    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [getTodos.pending]: (state, action) => {
          console.log('fetching todos from backend ....')
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log('Done');
            state.allTodos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            console.log('failed to get tod')
        },
      }
})

// Async action creator, action and reducer dispatch
// export const getTodos = () =>  async dispatch => {
//         try {
//             const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
//             dispatch(todosFetched(response.data))
//         } catch (error) {
//             console.log(error);
//         }
//     }

// Reducer

const todosReducer = todosSlice.reducer

// Selectors
export const todosSelector = state => state.todosReducer.allTodos

// Action export
export const {addTodo, markComplete, removeTodo} = todosSlice.actions

export default todosReducer