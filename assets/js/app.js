// DECLARACION VARIABLES
const listaTweets = document.querySelector("#to-do-list");
(() => {
  document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    const toDo = document.getElementById("to-do").value;
    toDo === ""
      ? alert("Escribe algo")
      : (() => {
          listaTweets.appendChild(getLi(toDo));
          handleAddTodo(toDo);
          document.getElementById("formulario").children[0].value = "";
        })();
  });

  listaTweets.addEventListener("click", (e) => {
    e.preventDefault();
    let val = e.target.parentElement.previousSibling;

    let toDoList = handleGetTodo();
    switch (e.target.className) {
      case "delete-to-do":
        toDoList = toDoList.filter((item) => {
          return item !== val.value;
        });
        localStorage.setItem("to-do", JSON.stringify(toDoList));
        e.target.parentElement.parentElement.remove();
        alert("Elemento eliminado");
        break;
      case "edit-to-do":
        const sv = document.querySelectorAll(".save");
        sv.forEach((item) => {
          item.classList.remove("save");
          item.innerHTML = "EDIT";
          item.parentElement.previousSibling.setAttribute(
            "disabled",
            "disabled"
          );
          item.parentElement.previousSibling.classList.remove("do-focus");
        });
        e.target.classList.add("save");
        e.target.innerText = "SAVE";
        val.removeAttribute("disabled");
        val.classList.add("do-focus");
        break;
      case "edit-to-do save":
        const text = val.value;
        const container = e.target.parentElement.parentElement.parentElement;
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
        val.setAttribute("disabled", "disabled");
        val.classList.remove("do-focus");
        break;
      default:
        console.log(e.target);

        break;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    let toDoList = handleGetTodo();
    toDoList.forEach((item) => {
      listaTweets.appendChild(getLi(item));
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

function getLi(item) {
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "delete-to-do";
  botonBorrar.innerText = "X";
  const botonEditar = document.createElement("a");
  botonEditar.classList = "edit-to-do";
  botonEditar.innerText = "EDIT";
  const text = document.createElement("input");
  text.classList = "do";
  text.setAttribute("disabled", "disabled");
  text.value = item;
  const div = document.createElement("div");
  div.classList = "div-button";
  const li = document.createElement("li");
  li.appendChild(text);
  li.appendChild(div);
  div.appendChild(botonBorrar);
  div.appendChild(botonEditar);
  return li;
}
