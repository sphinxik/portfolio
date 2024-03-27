import { useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import dataContext from "../../context";

import "./tasksForm.scss";

const TasksForm = ({ listID }) => {
  const context = useContext(dataContext);
  const inputRef = useRef();

  let placeholder = "Enter list name here...";
  let btnText = "Add list";
  let actionAddItem = "ADD_LIST";

  if(listID) {
    placeholder = "Enter task here...";
    btnText = "Add task";
    actionAddItem = "ADD_LIST_ITEM";
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    const taskTitle = inputRef.current.value;

    if (taskTitle) {
      const newItem = {
        id: uuidv4(),
        title: taskTitle,
        completed: false
      }

      if(!listID) {
        newItem.tasks = [];
      }

      context.dispatch({type: actionAddItem, payload: {item: newItem, listID: listID}});

      e.target.reset();
      inputRef.current.focus();
    }
  };

  return (
    <form className="tasks-form" onSubmit={onSubmitForm}>
      <input ref={inputRef} className="tasks-form__input" type="text" placeholder={placeholder} />
      <button className="tasks-form__btn" type="submit">{btnText}</button>
    </form>
  );
};
export default TasksForm;
