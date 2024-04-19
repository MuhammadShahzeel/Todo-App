let button = document.getElementById("button");
let input = document.getElementById("floatingInput");
let showList = document.getElementById("show-list");
let popup = document.getElementById("popup");
let popupInput = document.getElementById("popupInput");
let doneButton = document.getElementById("done");
let closeButton = document.getElementById("closeButton");
let listItemBeingEdited;
let textNodeBeingEdited;

input.addEventListener("input", () => {
  button.disabled = !input.value.trim();
});

button.addEventListener("click", () => {
  if (!input.value.trim()) return;
  let list = document.createElement("li");
  list.classList.add("list");

  let textDiv = document.createElement("div");
  textDiv.classList.add("textDiv");

  let textNode = document.createTextNode(input.value.trim());
  textDiv.appendChild(textNode);
  list.appendChild(textDiv);

  showList.appendChild(list);

  let iconsBox = document.createElement("div");
  iconsBox.classList.add("icons-box");
  list.appendChild(iconsBox);

  let editIcon = document.createElement("i");
  editIcon.classList.add("bx", "bxs-edit-alt");
  editIcon.setAttribute("title", "edit");
  iconsBox.appendChild(editIcon);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bx", "bxs-trash-alt");
  deleteIcon.setAttribute("title", "delete");
  iconsBox.appendChild(deleteIcon);

  input.value = "";
  button.disabled = true;
  updateLocalStorage();
});

showList.addEventListener("click", (e) => {
  if (e.target.classList.contains("bxs-trash-alt")) {
    let listItem = e.target.closest(".list");
    listItem.remove();
    updateLocalStorage();
  } else if (e.target.classList.contains("bxs-edit-alt")) {
    popup.style.display = "flex";
    listItemBeingEdited = e.target.closest(".list");
    textNodeBeingEdited = listItemBeingEdited
      .querySelector(".textDiv")
      .textContent.trim();
    popupInput.value = textNodeBeingEdited;
  }
});

doneButton.addEventListener("click", () => {
  let editedText = popupInput.value.trim();
  if (!editedText) return;
  listItemBeingEdited.querySelector(".textDiv").textContent = editedText;
  popup.style.animation =
    "slideUpPopup 0.3s cubic-bezier(0.68, -0.55, 0.265, 1) forwards"; // Adjust the duration here
  setTimeout(() => {
    popup.style.display = "none";
    popup.style.animation = "";
  }, 300);
  updateLocalStorage();
  popupInput.value = "";
});

popupInput.addEventListener("input", () => {
  doneButton.disabled = !popupInput.value.trim();
});

function updateLocalStorage() {
  localStorage.setItem("data", showList.innerHTML);
}

function showTask() {
  showList.innerHTML = localStorage.getItem("data");
}

closeButton.addEventListener("click", () => {
  popup.style.animation =
    "slideUpPopup 0.3s cubic-bezier(0.68, -0.55, 0.265, 1) forwards"; // Adjust the duration here
  setTimeout(() => {
    popup.style.display = "none";
    popup.style.animation = "";
  }, 300);
});

showTask();
