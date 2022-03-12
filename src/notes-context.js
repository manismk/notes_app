import { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
const NotesContext = createContext();

const useGetLocalStorage = (data) => {
  const datas = localStorage.getItem(data);
  if (datas === null) return [];
  else return JSON.parse(datas);
};

const NotesProvider = ({ children }) => {
  const notesReducer = (state, action) => {
    switch (action.type) {
      case "ADD_NOTES":
        return {
          ...state,
          notes: [
            ...state.notes,
            {
              id: uuid(),
              title: action.payload.title,
              notes: action.payload.notes,
              createdAt: new Date().toLocaleString(),
              isPinned: action.payload.isPinned,
              color: "default",
            },
          ],
        };
      case "DELETE_NOTE":
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };
      case "TOGGLE_PIN":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload
              ? { ...note, isPinned: !note.isPinned }
              : { ...note }
          ),
        };
      case "SAVE_NOTE":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload.id
              ? {
                  ...note,
                  title: action.payload.title,
                  notes: action.payload.notes,
                }
              : { ...note }
          ),
        };
      case "COLOR_CHANGE":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload.id
              ? { ...note, color: action.payload.color }
              : { ...note }
          ),
        };
      default:
        return 0;
    }
  };
  const [state, dispatch] = useReducer(notesReducer, {
    notes: useGetLocalStorage("notes"),
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(state.notes));
  }, [state.notes]);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
