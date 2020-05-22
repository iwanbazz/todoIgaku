import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, addTodo } from "../actions/query";

import TodoItem from "./TodoItem";

export default class Todos extends Component {
  componentDidMount() {
    this.props.dispatch(getTodos());
  }

  render() {
    const dispatch = this.props.dispatch;
    let queryText;

    const { fetchInProgress, allTodos } = this.props.store;

    const TodoItems = allTodos.map(
      (todo) =>
        todo && (
          <TodoItem
            key={todo.id}
            id={todo.id}
            checked={todo.completed}
            action={todo.action}
            dispatch={dispatch}
          />
        )
    );

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTodo(queryText.value));
            queryText.value = "";
          }}
        >
          <input
            type="text"
            placeholder="Add new todo..."
            ref={(node) => {
              queryText = node;
            }}
          />{" "}
          <input type="submit" value="add" />
        </form>
        {fetchInProgress ? <p>Fetch in progress...</p> : null}
        {TodoItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};
export const TodosContainer = connect(mapStateToProps)(Todos);
