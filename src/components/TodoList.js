/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import tickImg from "../img/tick.svg";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      filterItem: "All",
      todoItems: [
        { title: "Learn code", isComplete: true },
        { title: "Play game", isComplete: true },
        { title: "Cook", isComplete: false },
      ],
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.changeInputAddItem = this.changeInputAddItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  // ================================== Click item and changing it =============================
  onItemClick = (index) => {
    let todoItemsUpdate = this.state.todoItems;
    todoItemsUpdate[index].isComplete = !todoItemsUpdate[index].isComplete;
    this.setState({
      todoItems: todoItemsUpdate,
    });
  };

  // ============================== Update input when change value ===============================
  changeInputAddItem = (event) => {
    this.setState({
      newItem: event.target.value,
    });
  };

  // ================================ Add item when click enter ==================================
  addNewItem = (event) => {
    let newItem = this.state.newItem;
    newItem.trim();

    // =========================== Click enter and newItem don't empty ===========================
    if (event.keyCode === 13 && newItem !== "") {
      this.setState({
        todoItems: [
          { title: this.state.newItem, isComplete: false },
          ...this.state.todoItems,
        ],
        newItem: "",
      });
    }
  };

  // ============================== Handle click chooses all item ===============================
  AllItemsClick = () => {
    // create array equal todoItem
    let todoItemsUpdate = this.state.todoItems;
    // Amount item isComplete === false - unfinished
    let countItemFalse = 0;

    // Change item unfinished to is complete
    for (let i = 0; i < todoItemsUpdate.length; i++) {
      if (todoItemsUpdate[i].isComplete === false) {
        todoItemsUpdate[i].isComplete = !todoItemsUpdate[i].isComplete;
        countItemFalse += 1;
      }
    }

    // If all item finished - change
    if (countItemFalse === 0) {
      for (let i = 0; i < todoItemsUpdate.length; i++) {
        todoItemsUpdate[i].isComplete = !todoItemsUpdate[i].isComplete;
      }
    }

    this.setState({
      todoItems: todoItemsUpdate,
    });
  };

  // =============================== HANDLE CLICK FILTER ====================================
  handleClickFilter = (e) => {
    this.setState({
      filterItem: e.target.value,
    });
  };

  render() {
    const { newItem, filterItem, todoItems } = this.state;

    // ====================================== FILTER LIST =======================================
    let todoItemsFilter = [];
    if (filterItem === "All") {
      todoItemsFilter = todoItems;
    } else if (filterItem === "Active") {
      todoItemsFilter = todoItems.filter((item) => item.isComplete === false);
    } else if (filterItem === "Completed") {
      todoItemsFilter = todoItems.filter((item) => item.isComplete === true);
    }

    return (
      <div className="TodoList">
        {/* ========================================HEADER======================================= */}
        <div className="header">
          <img
            src={tickImg}
            width={30}
            height={30}
            alt="image"
            onClick={this.AllItemsClick}
          />
          <input
            type="text"
            value={newItem}
            onChange={this.changeInputAddItem}
            onKeyUp={this.addNewItem}
            placeholder="What needs to be done?"
          />
        </div>
        {/* =======================================LIST ITEM====================================== */}
        {todoItemsFilter.length > 0 &&
          todoItemsFilter.map((item, index) => (
            <TodoItems
              key={index}
              item={item}
              onClick={() => this.onItemClick(index)}
            />
          ))}
        {/* ========================================FOOTER========================================= */}
        <div className="footer">
          <input
            type="button"
            className="button-filter"
            value="All"
            onClick={this.handleClickFilter}
          />
          <input
            type="button"
            className="button-filter"
            value="Active"
            onClick={this.handleClickFilter}
          />
          <input
            type="button"
            className="button-filter"
            value="Completed"
            onClick={this.handleClickFilter}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
