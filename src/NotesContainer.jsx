import { OtherNotes } from "./OtherNotes";
import { PinnedNotes } from "./PinnedNotes";
const NotesContainer = ({ notes, dispatch }) => {
  const hasPinnedNotes = notes.filter((note) => note.isPinned).length;
  const hasOtherNotes = notes.filter((note) => !note.isPinned).length;

  return (
    <>
      {hasPinnedNotes > 0 ? (
        <PinnedNotes notes={notes} dispatch={dispatch} />
      ) : (
        ""
      )}
      {hasOtherNotes > 0 ? (
        <OtherNotes notes={notes} dispatch={dispatch} />
      ) : (
        ""
      )}
    </>
  );
};

export { NotesContainer };
