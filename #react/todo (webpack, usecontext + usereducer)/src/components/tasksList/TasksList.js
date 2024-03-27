import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TbArrowNarrowLeft } from "react-icons/tb";

import AppBannerTitle from '../appBannerTitle/AppBannerTitle';
import TasksItem from "../tasksItem/TasksItem";
import TasksForm from "../tasksForm/TasksForm";

import dataContext from "../../context";

import "./tasksList.scss";

const TasksList = (props) => {
  const context = useContext(dataContext);
  const [tasks, setTasks] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("My lists");
  const { listID } = useParams();
  const noContentText = listID ? "There are no tasks yet..." : "There are no lists yet...";

  useEffect(() => {
    if(listID) {
      const list = context.data.find(item => item.id === listID);

      if(list) {
        setTasks(list.tasks);
        setBannerTitle(list.title);
      }
    } else {
      setTasks(context.data);
    }
  }, [context.data]);

  const renderTasks = () => {
    return tasks.map((task) => <TasksItem key={task.id} listID={listID} {...task} />);
  };

  const content = tasks.length ? renderTasks() : noContentText;

  return (
    <>
      <AppBannerTitle title={bannerTitle} />

      <div className="tasks-wrapper">
        {
          listID ? <Link to={'/'} className="tasks-gohome__btn">
                     <TbArrowNarrowLeft />
                     <span>Back to lists</span>
                   </Link> : null
        }
        
        <div className="tasks">{content}</div>
        <TasksForm listID={listID} />
      </div>
    </>
  );
};

export default TasksList;
