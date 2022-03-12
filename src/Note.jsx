import { useState } from "react";

const Note = ({
  note: { id, title, notes, isPinned, createdAt, color },
  dispatch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", notes: "" });

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };
  const handlePin = (id) => {
    dispatch({ type: "TOGGLE_PIN", payload: id });
  };
  const handleEdit = (id) => {
    setIsEditing(true);
    setFormData((prev) => ({ ...prev, title: title, notes: notes }));
  };
  const handleSave = () => {
    dispatch({
      type: "SAVE_NOTE",
      payload: { id: id, title: formData.title, notes: formData.notes },
    });
    setIsEditing(false);
  };

  const changeHandler = (e, type) => {
    if (type === "notes") setFormData({ ...formData, notes: e.target.value });
    if (type === "title") setFormData({ ...formData, title: e.target.value });
  };

  return (
    <div
      className={`card card--badge ${color === "default" ? "" : "bg-" + color}`}
    >
      {!isEditing ? (
        <button
          className="btn icon--btn icon--badge pin--btn"
          onClick={() => {
            handlePin(id);
          }}
        >
          <i
            className={`fas fa-thumbtack ${isPinned ? "pin-filled" : "pin"}`}
            aria-hidden="true"
          ></i>
        </button>
      ) : (
        ""
      )}
      <div className="card--info">
        {isEditing ? (
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              changeHandler(e, "title");
            }}
            required
          />
        ) : (
          <p className="card--title">{title}</p>
        )}
      </div>
      {isEditing ? (
        <textarea
          value={formData.notes}
          onChange={(e) => {
            changeHandler(e, "notes");
          }}
          required
        />
      ) : (
        <p className="card--description">{notes}</p>
      )}

      <div className="card--footer">
        <div className="card--created">
          {isEditing ? (
            <button
              className="btn btn--information"
              onClick={() => handleSave()}
            >
              Save
            </button>
          ) : (
            <>
              <p>{createdAt.split(",")[0]}</p>
              <p>{createdAt.split(",")[1]}</p>
            </>
          )}
        </div>
        <div className="card--btn--icons">
          {isEditing ? (
            <button
              className="btn btn--information"
              onClick={() => setIsEditing(false)}
            >
              cancel
            </button>
          ) : (
            <>
              <button
                className="btn icon--btn"
                onClick={() => {
                  handleEdit(id);
                }}
              >
                <i className="fas fa-edit" aria-hidden="true"></i>
              </button>
              <button
                className="btn icon--btn"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="color--container">
        <button
          className="bg-green"
          onClick={() =>
            dispatch({
              type: "COLOR_CHANGE",
              payload: { id: id, color: "green" },
            })
          }
        ></button>
        <button
          className="bg-red"
          onClick={() =>
            dispatch({
              type: "COLOR_CHANGE",
              payload: { id: id, color: "red" },
            })
          }
        ></button>
        <button
          className="bg-blue"
          onClick={() =>
            dispatch({
              type: "COLOR_CHANGE",
              payload: { id: id, color: "blue" },
            })
          }
        ></button>
        <button
          className="bg-yellow"
          onClick={() =>
            dispatch({
              type: "COLOR_CHANGE",
              payload: { id: id, color: "yellow" },
            })
          }
        ></button>
      </div>
    </div>
  );
};

export { Note };
