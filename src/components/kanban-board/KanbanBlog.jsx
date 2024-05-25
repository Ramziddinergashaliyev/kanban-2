import React from "react";
import { memo } from "react";

function KanbanBlog({ statusItems, items, setSelectStatus, setStatus }) {
  const handleDelete = (id) => {
    if (confirm("Malumotlar Ochirilsinmi")) {
      setStatus((prev) => prev.filter((el) => el.id !== id));
    }
  };

  return statusItems.map((statusItem) => (
    <div key={statusItem.id} className={`kanban__box ${statusItem.title}`}>
      <div className="kanban__heading">
        <p>
          {statusItem.title} / {items(statusItem.title).length}
        </p>
      </div>
      <div className="kanban__block">
        {items(statusItem.title).length ? (
          items(statusItem.title)
        ) : (
          <div>
            <p className="kanban__block__empty">No items found</p>
            <button
              onClick={() => handleDelete(statusItem.id)}
              className="kanban__block__delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => setSelectStatus(statusItem.title)}
        className="kanban__add_btn"
      >
        Add item
      </button>
    </div>
  ));
}

export default memo(KanbanBlog);
