function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = document.createElement("li");
    liElement.classList.add("fs-api-entry", `fs-api-${item.type}`);
    const nameElement = document.createElement("span");
    nameElement.textContent = item.name;
    nameElement.classList.add("fs-api-entry-name");
    liElement.appendChild(nameElement);
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

function renderFile(url, container) {
  fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
      const input = data;
      renderInput(input, container);
    })
    .catch(function(error) {
      console.log(error);
    });
}
module.exports.render = renderFile;
module.exports.renderInput = renderInput;
