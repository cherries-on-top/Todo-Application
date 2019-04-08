import React, { Component } from 'react';
//import logo from "../images/vegait-logo.svg";
//import icon from "../icons/icon-calendar.svg";
import icon2 from "../icons/icon-plus.svg";
import PopupAddTodo from "../containers/PopupAddTodo";
import quotes from "../quotes";
import Modal from "react-modal";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggleModal = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const pickedQuote = quotes[Math.floor(Math.random() * quotes.length)];

        return (
            <div className="App">
                <header className="header">
                    <div className="wrap">
                        <span className="btn-icon">
                            <img src={icon2} className="icon icon-plus js-modal-init" alt="Add New Item" onClick={this.toggleModal} />
                        </span>
                        <Modal isOpen={this.state.isOpen} onRequestClose={this.toggleModal} shouldCloseOnOverlayClick={true} ariaHideApp={false}>
                            <PopupAddTodo />
                        </Modal>

                        <div className="header-blockquote">
                            <h1 className="header-quote">
                                {pickedQuote.quoteText}
                            </h1>
                            <div className="header-cite">- {pickedQuote.author}</div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;




