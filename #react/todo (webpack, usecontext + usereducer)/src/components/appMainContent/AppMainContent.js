import { useEffect, useContext, useReducer } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { addToLocalStorage } from "../../utils";

import Homepage from "../pages/Homepage";
import ListPage from "../pages/ListPage";

import reducer from "../../reducer";
import dataContext from "../../context";
const { Provider } = dataContext;

const AppMainContent = (props) => {
  const context = useContext(dataContext);
  const [data, dispatch] = useReducer(reducer, context);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("ikcTodo")) {
      const lsData = JSON.parse(localStorage.getItem("ikcTodo"));
      dispatch({ type: "ADD_DATA_FROM_LS", payload: lsData });
    }
  }, []);

  useEffect(() => {
    addToLocalStorage("ikcTodo", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Provider value={{ data, dispatch }}><Homepage /></Provider>} />
        <Route path="/:listID" element={<Provider value={{ data, dispatch }}><ListPage /></Provider>} />
      </Routes>
    </>
  );
};
export default AppMainContent;