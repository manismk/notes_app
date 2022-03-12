import { Nav } from "./Nav";

import { NoteForm } from "./NoteForm";
import "./styles.css";
import { useNotes } from "./notes-context";
import { NotesContainer } from "./NotesContainer";

export default function App() {
  const { state, dispatch } = useNotes();

  return (
    <div className="App">
      <Nav />
      <NoteForm dispatch={dispatch} />
      <NotesContainer notes={state.notes} dispatch={dispatch} />
    </div>
  );
}
