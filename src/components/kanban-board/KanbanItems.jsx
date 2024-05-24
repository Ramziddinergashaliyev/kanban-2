import React from "react";

function KanbanItems({ setChangeStatus, STATUS_ITEMS, el }) {
  let time = el.createdAt.split("T")[1].slice(0, 5);
  return (
    <div>
      <div className="kanban__item">
        <p>{el.title}</p>
        <p className="kanban__commit">{el.desc}</p>
        <div className="kanban__status">
          <select
            onChange={(e) => setChangeStatus({ ...el, status: e.target.value })}
            value={el.status}
            name=""
            id=""
          >
            {STATUS_ITEMS?.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default KanbanItems;
