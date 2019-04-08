import axios from "axios";
import * as actionTypes from "../constants/ActionTypes";

export function getTodos() {
    return function (dispatch) {
        axios.get("http://localhost:49520/api/todos")
            .then(response => {
                return dispatch({
                    type: actionTypes.GET_TODOS,
                    todoList: response.data
                });
            })
    }
}

export const addTodo = (content) => {
    return (dispatch) => {
        return axios.post("http://localhost:49520/api/todos/CreateNewTodo", { content })
            .then(response => {
                dispatch({
                    type: actionTypes.ADD_TODO,
                    todoList: response.data
                })
            })
    }
}

export const deleteTodo = id => {
    return (dispatch) => {
        return axios.delete("http://localhost:49520/api/todos/DeleteTodo/" + id)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_TODO,
                    id: id
                })
            })
    }
}