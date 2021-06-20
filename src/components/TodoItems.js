/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import "./TodoItems.css";
import classNames from "classnames";
import checkImg from "../img/check.svg";
import checkCompleteImg from "../img/checkComplete.svg";
import PropTypes  from 'prop-types'

class TodoItems extends Component {
  render() {
    const { item, onClick } = this.props;
    const url = item.isComplete === true ? checkImg : checkCompleteImg;

    return (
      <div
        className={classNames("todoItems", {
          "todoItems-complete": item.isComplete,
        })}
      >
        <img onClick={onClick} src={url} width={25} height={25} alt="image" />
        {<p>{item.title}</p>}
      </div>
    );
  }
}

TodoItems.propTypes = {
  item: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired
}

export default TodoItems;
