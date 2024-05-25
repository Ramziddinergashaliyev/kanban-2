import React, { useRef, useState, useEffect, useCallback } from "react";
import { DATA } from "@/static";
import KanbanBlog from "./KanbanBlog";
import KanbanItems from "./KanbanItems";

const STATUS_ITEMS = [
  { id: 1, title: "ready" },
  { id: 2, title: "working" },
  { id: 3, title: "stuck" },
  { id: 4, title: "done" },
];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || DATA
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);
  const [addBtn, setAddBtn] = useState(false);
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("status-data")) || STATUS_ITEMS
  );

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("status-data", JSON.stringify(status));
  }, [status]);

  useEffect(() => {
    if (changeStatus) {
      let index = data.findIndex((el) => el.id === changeStatus.id);
      data.splice(index, 1, changeStatus);
      setData([...data]);
    }
  }, [changeStatus]);

  const filterByStatus = (status) => {
    return data
      .filter((el) => el.status === status)
      .map((el) => (
        <KanbanItems
          key={el.id}
          el={el}
          setChangeStatus={setChangeStatus}
          STATUS_ITEMS={STATUS_ITEMS}
          setData={setData}
        />
      ));
  };

  const memoFilterStatus = useCallback(
    (status) => {
      return filterByStatus(status);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    const date = new Date();
    const newItem = {
      id: date.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => [...prev, newItem]);
    setSelectedStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  const boxCreate = (e) => {
    e.preventDefault();
    const newStatus = {
      id: new Date().getTime(),
      title: info,
    };
    setStatus((prevStatus) => [...prevStatus, newStatus]);
    setInfo("");
    setAddBtn(false);
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button onClick={() => setAddBtn(true)} className="kanban__btn">
              Add
            </button>
            <form
              onSubmit={boxCreate}
              className={`kanban__header__form ${addBtn ? "show__add" : ""}`}
            >
              <h1
                onClick={() => setAddBtn(false)}
                className="kanban__header__close"
              >
                X
              </h1>
              <h1 className="kanban__header__form__title">Add Column</h1>
              <input
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                type="text"
              />
              <button type="submit">Create</button>
            </form>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p className="kanban__form__text">Create {selectedStatus}</p>
            <div
              onClick={() => setSelectedStatus(null)}
              className="kanban__form__close"
            >
              <h1>X</h1>
            </div>
            <input ref={title} type="text" />
            <input ref={desc} type="text" />
            <button type="submit">Create</button>
          </form>
          <div className="kanban__wrapper">
            {status.length ? (
              <KanbanBlog
                statusItems={status}
                items={memoFilterStatus}
                setSelectStatus={setSelectedStatus}
                setStatus={setStatus}
              />
            ) : (
              <div onClick={() => setAddBtn(true)} className="kanban__info">
                <h1>Kuningizni Samalariroq otkazing</h1>
                <button>Boshlash</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
