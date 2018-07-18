function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = document.createElement("li");
    liElement.textContent = item.name;
    ulElement.appendChild(liElement);
  });
  return ulElement;
}

function alphabeticCompare(a, b) {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
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