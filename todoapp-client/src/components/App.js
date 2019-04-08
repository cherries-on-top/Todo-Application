import React, { Component } from "react";
import "../App.css";
import Header from "./Header";
import TodoList from "../containers/TodoList";
import Footer from "./Footer";

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <TodoList />
        <Footer />
      </div>
    );
  }
}

export default App;
