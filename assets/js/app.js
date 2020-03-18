// DECLARACION VARIABLES
const listaTweets = document.querySelector("#to-do-list");

(() => {
  document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();
    const toDo = document.getElementById("to-do").value;
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "delete-to-do";
    botonBorrar.innerText = "X";
    const li = document.createElement("li");
    li.innerHTML = toDo;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
    handleAddTodo(toDo);
    document.getElementById("formulario").children[0].value = "";
  });

  listaTweets.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "delete-to-do") {
      let toDoList = handleGetTodo();
      listaTweets.node;
      let value = e.target.parentElement.innerText;
      value = value.substring(0, value.length - 2);
      toDoList = toDoList.filter((item) => {
        return item !== value;
      });
      localStorage.setItem("to-do", JSON.stringify(toDoList));
      e.target.parentElement.remove();
      alert("Elemento Eliminado");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    let toDoList = handleGetTodo();
    toDoList.forEach((item) => {
      const botonBorrar = document.createElement("a");
      botonBorrar.classList = "delete-to-do";
      botonBorrar.innerText = "X";
      const li = document.createElement("li");
      li.innerHTML = item;
      li.appendChild(botonBorrar);
      listaTweets.appendChild(li);
    });
  });
})();

// FUNCIONES

function handleAddTodo(toDo) {
  let toDoList = handleGetTodo();
  toDoList.push(toDo);
  localStorage.setItem("to-do", JSON.stringify(toDoList));
}

function handleGetTodo() {
  let toDoList;
  if (localStorage.getItem("to-do") === null) {
    toDoList = [];
  } else {
    toDoList = JSON.parse(localStorage.getItem("to-do"));
  }
  return toDoList;
}
