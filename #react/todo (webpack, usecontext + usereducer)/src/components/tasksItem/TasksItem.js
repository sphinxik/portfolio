import { useContext } from "react";
import { TbChecks, TbTrash } from "react-icons/tb";
import { Link } from 'react-router-dom';

import dataContext from "../../context";

import "./tasksItem.scss";

const TasksItem = ({ listID, id, completed, title }) => {
  const context = useContext(dataContext);

  let actionCompleteItem = "COMPLETE_LIST";
  let actionDeleteItem = "DELETE_LIST";

  if(listID) {
    actionCompleteItem = "COMPLETE_LIST_ITEM";
    actionDeleteItem = "DELETE_LIST_ITEM";
  }

  return (
    <div className={`tasks-item ${completed ? "_checked" : ""}`}>
      <button className="tasks-item__check" title="mark this task as completed" 
                                            onClick={() => context.dispatch({type: actionCompleteItem, payload: {itemID: id, listID: listID}})}>
        <TbChecks />
      </button>

      {
        listID ? <div className="tasks-item__title">{title}</div>
               : <Link to={'/' + id} className="tasks-item__title">{title}</Link>
      }

      <button className="tasks-item__btn" title="delete this task" 
                                          onClick={() => context.dispatch({type: actionDeleteItem, payload: {itemID: id, listID: listID}})}>
        <TbTrash />
      </button>
    </div>
  );
};
export default TasksItem;
