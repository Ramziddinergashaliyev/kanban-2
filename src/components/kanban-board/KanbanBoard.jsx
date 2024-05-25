import React, { useRef, useState, useEffect, useCallback } from "react";
import KanbanBlock from "./KanbanBlog";
import KanbanItem from "./KanbanItems";
import { toast } from "react-toastify";

const status__Data = [];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban")) || []
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);
  const [addBtn, setAddBtn] = useState(false);
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("status")) || status__Data
  );

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);

  useEffect(() => {
    if (changeStatus && data) {
      setData((prevData) => {
        let index = prevData.findIndex((el) => el.id === changeStatus.id);
        const newData = [...prevData];
        newData.splice(index, 1, changeStatus);
        return newData;
      });
    }
  }, [changeStatus]);

  const filterByStatus = (statusTitle) => {
    return data
      .filter((el) => el.status === statusTitle)
      .map((el) => (
        <KanbanItem
          key={el.id}
          el={el}
          setChangeStatus={setChangeStatus}
          STATUS_ITEMS={status}
          setData={setData}
        />
      ));
  };

  const memoFilterStatus = useCallback(
    (statusTitle) => {
      return filterByStatus(statusTitle);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();

    const titleTrim = title.current.value.trim();
    const descTrim = desc.current.value.trim();

    if (!titleTrim || !descTrim) {
      toast.error("Malumot kiriting iltimos!");
      return;
    }

    const titleExam = data.some((word) => {
      return (
        word.title.toLowerCase() === title.current.value.toLowerCase() &&
        word.desc.toLowerCase() === desc.current.value.toLowerCase()
      );
    });

    if (titleExam) {
      toast.info("Bu nom hozirda band !!!");
      title.current.value = "";
      desc.current.value = "";
      setAddBtn(false);
      return;
    }

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

  const statusCreate = (e) => {
    e.preventDefault();

    if (status.length < 4) {
      const newStatus = {
        id: new Date().getTime(),
        title: info.toLowerCase(),
      };
      setStatus((prevStatus) => [...prevStatus, newStatus]);
      setInfo("");
      setAddBtn(false);
    } else {
      setAddBtn(false);
      toast.info("Limitingiz tugadi premium sotib olishingiz mumkun");
    }
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
              onSubmit={statusCreate}
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
                required
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
            <input ref={title} type="text" required placeholder="Title" />
            <input ref={desc} type="text" required placeholder="Description" />
            <button type="submit">Create</button>
          </form>
          <div className="kanban__wrapper">
            {status.length ? (
              <KanbanBlock
                statusItems={status}
                items={memoFilterStatus}
                setSelectStatus={setSelectedStatus}
                setStatus={setStatus}
              />
            ) : (
              <div onClick={() => setAddBtn(true)} className="kanban__info">
                <h1>Kuningizni Samalariroq otkazing</h1>
                <button>Boshlash</button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
