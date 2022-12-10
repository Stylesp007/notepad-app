const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note-button")
addNoteButton.addEventListener("click", () => addNote());

const getNote = () => {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}


const saveNote = (notes) => {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

const createNoteElement = (id, content) => {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value)
  })
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you wnat to delete this note?");

    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element; 
}

const addNote = () => {
  const notes = getNote();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNote(notes);
}
const deleteNote = (id, element) => {
  const notes = getNote().filter(note => note.id != id);

  saveNote(notes);
  notesContainer.removeChild(element);
}

const updateNote = (id, newContent) => {
  const notes = getNote();
  const targetNote = notes.filter(note => note.id == id)[0];


  targetNote.content = newContent;
  saveNote(notes);
}

getNote().forEach(note => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});
