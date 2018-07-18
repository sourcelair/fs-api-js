function convertItemsToUnorderedList(listItems) {
  const ulList = document.createElement("ul");
  listItems.map(a => {
    const liItem = document.createElement("li");
    liItem.textContent = a.name;
    ulList.appendChild(liItem);
  });
  return ulList;
}

function alphabeticCompare(a, b) {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
}

function renderInput(input, container) {
  const dirItem = input.filter(inputEl => inputEl.type === "directory"),
        fileItem = input.filter(inputEl => inputEl.type === "file");
  dirItem.sort(alphabeticCompare);
  fileItem.sort(alphabeticCompare);
  const listItems = dirItem.concat(fileItem);
  ulList = convertItemsToUnorderedList(listItems);
  container.appendChild(ulList);
}