import { Note } from "./Note";

const OtherNotes = ({ notes, dispatch }) => {
  return (
    <>
      <h2>Other Notes</h2>
      <div className="grid grid--res">
        {notes
          .filter((note) => !note.isPinned !== false)
          .map((note) => (
            <Note key={note.id} note={note} dispatch={dispatch} />
          ))}
      </div>
    </>
  );
};

export { OtherNotes };
