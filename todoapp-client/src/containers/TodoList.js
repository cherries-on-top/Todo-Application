import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../actions/todoActions";

class TodoList extends Component {

  componentDidMount() {
    this.props.getTodos();
  }

  handleClick = (id) => (event) => {
    setTimeout(() => this.props.deleteTodo(id), 1000);
  }

  render() {
    const { todoList } = this.props;
    const todoList1 = todoList && todoList.length ? (
      todoList.map(todo => {
        return (
          <div key={todo.id}>
            <div className="item-row">
              <label className="check-flag">
                <span className="check-flag-label">{todo.content}</span>
                <span className="checkbox">
                  <input className="checkbox-native" type="checkbox" onClick={this.handleClick(todo.id)} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24">
                      <path
                        className="checkmark-icon"
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                      />
                    </svg>
                  </span>
                </span>
              </label>
            </div>
          </div>
        )
      })
    ) : (
        <div className="item-row">
          <label className="check-flag">
            <span className="check-flag-label">No todos!</span>
          </label>
        </div>
      );
    return (
      <div>{todoList1}</div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todos.todoList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => {
      dispatch(deleteTodo(id))
    },
    getTodos: () => {
      dispatch(getTodos())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
