import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";

const InitialState = Record({
    todoList: []
});

const initialState = new InitialState();

const todos = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
           return state.set("todoList", state.todoList.push({
                content: action.todoList
            }))

        case actionTypes.DELETE_TODO:
            return state.set("todoList", state.todoList.filter(todo =>
                todo.id !== action.id))

        case actionTypes.GET_TODOS:
            return state.set("todoList", action.todoList)

        default: return state
    }
}

export default todos;