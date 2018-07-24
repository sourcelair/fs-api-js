function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = document.createElement("li");
    liElement.classList.add("fs-api-entry");
    if (item.type === "file"){
      liElement.classList.add("fs-api-file");
    }
    else {
      liElement.classList.add("fs-api-directory");
    }
    const spanElement = document.createElement("span");
    spanElement.textContent = item.name;
    spanElement.classList.add("fs-api-entry-name");
    liElement.appendChild(spanElement);
    if (item.children) {
      renderInput(item.children, liElement);
    }
    ulElement.appendChild(liElement);
  });
  return ulElement;
}

function alphabeticCompare(a, b) {
  const firstName = a.name.toUpperCase();
  const secondName = b.name.toUpperCase();
  return firstName > secondName ? 1 : secondName > firstName ? -1 : 0;
}

function renderInput(input, container) {
  const dirItems = input.filter(inputEl => inputEl.type === "directory"),
        fileItems = input.filter(inputEl => inputEl.type === "file");
  dirItems.sort(alphabeticCompare);
  fileItems.sort(alphabeticCompare);
  const listItems = dirItems.concat(fileItems);
  ulElement = convertItemsToUnorderedList(listItems);
  ulElement.classList.add("fs-api-tree");
  container.appendChild(ulElement);
}

module.exports.render = renderInput;
