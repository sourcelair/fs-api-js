function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = document.createElement("li");
    const spanElement = document.createElement("span");
    spanElement.textContent = item.name;
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
  container.appendChild(ulElement);
}

module.exports.render = renderInput;
