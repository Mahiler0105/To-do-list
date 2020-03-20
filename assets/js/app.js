// DECLARACION VARIABLES
const listaTweets = document.querySelector("#to-do-list");
(() => {
  document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();
    const toDo = document.getElementById("to-do").value;

    const botonEditar = document.createElement("a");
    botonEditar.classList = "edit-to-do";
    botonEditar.innerText = "EDIT";

    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "delete-to-do";
    botonBorrar.innerText = "X";

    const text = document.createElement("input");
    text.classList = "do";
    text.setAttribute("disabled", "disabled");
    text.value = toDo;

    const div = document.createElement("div");
    div.classList = "div-button";

    const li = document.createElement("li");

    li.appendChild(text);
    li.appendChild(div);
    div.appendChild(botonBorrar);
    div.appendChild(botonEditar);

    listaTweets.appendChild(li);

    handleAddTodo(toDo);
    document.getElementById("formulario").children[0].value = "";
  });

  listaTweets.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "delete-to-do") {
      let toDoList = handleGetTodo();
      let value = e.target.parentElement.previousSibling.value;
      console.log(value);

      toDoList = toDoList.filter((item) => {
        return item !== value;
      });

      localStorage.setItem("to-do", JSON.stringify(toDoList));
      e.target.parentElement.parentElement.remove();
      alert("Elemento Eliminado");
    } else if (e.target.className == "edit-to-do") {
      const input = e.target.parentElement.previousSibling;
      e.target.classList.add("save");

      e.target.innerText = "SAVE";

      input.removeAttribute("disabled");

      console.log(input);
    } else if (e.target.className == "edit-to-do save") {
      const text = e.target.parentElement.previousSibling.value;
      const container = e.target.parentElement.parentElement.parentElement;
      const input = e.target.parentElement.previousSibling;

      let toDoList = handleGetTodo();
      let cont = 0;
      for (var i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i].firstChild.value === text) {
          cont = i;
        }
      }
      toDoList[cont] = text;
      localStorage.setItem("to-do", JSON.stringify(toDoList));
      e.target.classList.remove("save");
      e.target.innerText = "EDIT";
      input.setAttribute("disabled", "disabled");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    let toDoList = handleGetTodo();
    toDoList.forEach((item) => {
      const botonBorrar = document.createElement("a");
      botonBorrar.classList = "delete-to-do";
      botonBorrar.innerText = "X";

      const botonEditar = document.createElement("a");
      botonEditar.classList = "edit-to-do";
      botonEditar.innerText = "EDIT";

      const text = document.createElement("input");
      text.classList = "do";
      text.setAttribute("disabled", "disabled");
      // text.removeAttribute("disabled");
      text.value = item;

      const div = document.createElement("div");
      div.classList = "div-button";

      const li = document.createElement("li");

      li.appendChild(text);
      li.appendChild(div);

      div.appendChild(botonBorrar);
      div.appendChild(botonEditar);
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
