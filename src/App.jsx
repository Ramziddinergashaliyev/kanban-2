import React, { memo } from "react";
import KanbanBoard from "./components/kanban-board/KanbanBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <KanbanBoard />
      <ToastContainer />
    </>
  );
};

export default memo(App);
