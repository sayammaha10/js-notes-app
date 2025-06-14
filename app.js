const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create-btn");

createBtn.addEventListener("click", () => {
  let paragraph = document.createElement("p");
  paragraph.className = "input-box";
  paragraph.setAttribute("contenteditable", "true");

  let img = document.createElement("img");
  img.src = "./images/delete.png";

  notesContainer.appendChild(paragraph).appendChild(img);
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    storeData();
  } else if (e.target.tagName === "P") {
    let inputBox = document.querySelectorAll(".input-box");
    inputBox.forEach((item) => {
      item.onkeyup = function () {
        storeData();
      };
    });
  }
});

function storeData() {
  localStorage.setItem("Notes", notesContainer.innerHTML);
}

function loadData() {
  notesContainer.innerHTML = localStorage.getItem("Notes");
}

loadData();

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const br = document.createElement("br");
    range.deleteContents();
    range.insertNode(br);
    range.setStartAfter(br);
    event.preventDefault();
  }
});
