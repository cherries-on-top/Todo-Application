import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";

class PopupAddTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ""
        }
    }

    handleSubmit = (e) => {
        console.log(this.state.content);
    }

    handleClick = () => {
        this.props.addTodo(this.state.content);
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    submitClasses() {
        let classes = this.state.content.length === 0 ? "btn empty" : "btn";
        return classes;
    }

    render() {
        return (
            <div className="modal-wrap js-modal" >
                <div className="modal js-modal-inner">
                    <h2>Create new todo:</h2>
                    <form onSubmit={this.handleSubmit} >
                        <div className="field-wrap">
                            <input className="field" name="content" value={this.state.content} type="text" required onChange={this.handleChange} />
                        </div>
                        <div className="btn-wrap align-right">
                            <input className={this.submitClasses()} type="submit" value="Create" onClick={this.handleClick} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (content) => {
            dispatch(addTodo(content))
        }
    }
}

export default connect(null, mapDispatchToProps)(PopupAddTodo);

