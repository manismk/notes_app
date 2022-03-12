import { useState } from "react";

const NoteForm = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    isPinned: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTES",
      payload: {
        title: formData.title,
        notes: formData.notes,
        isPinned: formData.isPinned,
      },
    });
    setFormData({ title: "", notes: "", isPinned: false });
  };

  const handlePin = (e) => {
    e.preventDefault();

    setFormData({ ...formData, isPinned: !formData.isPinned });
  };

  const changeHandler = (e, type) => {
    if (type === "notes") setFormData({ ...formData, notes: e.target.value });
    if (type === "title") setFormData({ ...formData, title: e.target.value });
  };

  return (
    <form
      className="form--container"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <button
        className="btn icon--btn icon--badge pin--btn"
        onClick={(e) => {
          handlePin(e);
        }}
      >
        <i
          className={`fas fa-thumbtack ${
            formData.isPinned ? "pin-filled" : "pin"
          }`}
          aria-hidden="true"
        ></i>
      </button>

      <input
        type="text"
        placeholder="Add title Here"
        value={formData.title}
        onChange={(e) => {
          changeHandler(e, "title");
        }}
        required
      />
      <textarea
        placeholder="Add Notes Here"
        onChange={(e) => {
          changeHandler(e, "notes");
        }}
        value={formData.notes}
        required
      />
      <input
        className="btn btn--information  "
        type="submit"
        value="Add notes"
      />
    </form>
  );
};

export { NoteForm };
