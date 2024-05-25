import React from "react";
import { memo } from "react";

const KanbanBlock = ({ statusItems, items, setSelectStatus, setStatus }) => {
  const handleDelete = (id) => {
    if (confirm("Malumotlar Ochirilsinmi")) {
      setStatus((prev) => prev.filter((el) => el.id !== id));
    }
  };

  return statusItems.map((status) => (
    <div key={status.id} className={`kanban__box ${status.title}`}>
      <div className="kanban__heading">
        <p>
          {status.title} / {items(status.title).length}
        </p>
      </div>
      <div className="kanban__block">
        {items(status.title).length ? (
          items(status.title)
        ) : (
          <div>
            <p className="kanban__block__empty">No items found</p>
            <button
              onClick={() => handleDelete(status.id)}
              className="kanban__block__delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => setSelectStatus(status.title)}
        className="kanban__add_btn"
      >
        Add item
      </button>
    </div>
  ));
};

export default memo(KanbanBlock);
