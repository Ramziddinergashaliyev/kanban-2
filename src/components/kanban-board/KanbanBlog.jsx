import React, { memo } from "react";

function KanbanBlog({ status__items, setSelectStatus, items }) {
  return status__items?.map((el) => (
    <div key={el} className={`kanban__box ${el}`}>
      <div className="kanban__heading">
        <p>
          {el} to start / {items(el).length}
        </p>
      </div>
      <div className="kanban__block">
        {items(el).length ? items(el) : <p>Empty</p>}
      </div>
      <button onClick={() => setSelectStatus(el)} className="kanban__add_btn">
        Add item
      </button>
    </div>
  ));
}

export default memo(KanbanBlog);
