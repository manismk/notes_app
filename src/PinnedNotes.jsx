import { Note } from "./Note";

const PinnedNotes = ({ notes, dispatch }) => {
  return (
    <>
      <h2>Pinned Notes</h2>
      <div className="grid grid--res">
        {notes
          .filter((note) => note.isPinned)
          .map((note) => (
            <Note key={note.id} note={note} dispatch={dispatch} />
          ))}
      </div>
    </>
  );
};

export { PinnedNotes };
