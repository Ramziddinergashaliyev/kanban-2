import React, { useRef, useState } from "react";
import { DATA } from "@/static";
import KanbanBlog from "./KanbanBlog";
import { useCallback } from "react";
import KanbanItems from "./KanbanItems";
import { useEffect } from "react";

/**
 * ready
 * working
 * stuck
 * done
 */

const STATUS_ITEMS = ["ready", "working", "stuck", "done"];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || DATA
  );
  const [selectedstatus, setSelectStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (changeStatus) {
      let index = data?.findIndex((el) => el.id === changeStatus.id);
      data?.splice(index, 1, changeStatus);
      setData([...data]);
    }
  }, [changeStatus]);

  const filterByStatus = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <KanbanItems
          setChangeStatus={setChangeStatus}
          key={el.id}
          STATUS_ITEMS={STATUS_ITEMS}
          el={el}
        />
      ));
  };

  let memoFilterStatus = useCallback(
    (status) => {
      return filterByStatus(status);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    let date = new Date();
    let timeZoneGMT = (hour) =>
      new Date(date.getTime() + hour * 60 * 60 * 1000);
    let newItems = {
      id: date.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedstatus,
      createdAt: timeZoneGMT(5).toISOString(),
    };
    console.log(newItems);
    setData((prev) => [...prev, newItems]);

    setSelectStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedstatus ? "show" : ""}`}
          >
            <p>Create {selectedstatus}</p>
            <input ref={title} type="text" />
            <input ref={desc} type="text" />
            <button>Create</button>
          </form>
          <div className="kanban__wrapper">
            <KanbanBlog
              status__items={STATUS_ITEMS}
              items={memoFilterStatus}
              setSelectStatus={setSelectStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
