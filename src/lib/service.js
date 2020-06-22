import axios from 'axios';

export const saveTodo = (todo) => {
    return axios.post('http://localhost:3030/api/todos',todo)
}

export const loadTodos = () => {
    return axios.get('http://localhost:3030/api/todos')
}

export const destroyTodo = (id) => {
    return axios.delete(`http://localhost:3030/api/todos/${id}`)
}

export const updateTodo = (todo) => {
    return axios.put(`http://localhost:3030/api/todos/${todo.id}`,todo);
}