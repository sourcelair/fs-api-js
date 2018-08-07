function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = document.createElement("li");
    liElement.classList.add("fs-api-entry", `fs-api-${item.type}`);
    const nameElement = document.createElement("span");
    if (item.children) {
      nameElement.addEventListener("click", function() {
        toggleDirectory(nameElement);
      });
    }
    nameElement.textContent = item.name;
    nameElement.classList.add("fs-api-entry-name");
    liElement.appendChild(nameElement);
    if (item.children) {
      module.exports.renderInput(item.children, liElement);
    }
    ulElement.appendChild(liElement);
  });
  return ulElement;
}
function toggleDirectory(nameElement) {
  if (nameElement.parentNode.classList.contains("fs-api-directory-collapse")) {
    nameElement.parentNode.classList.remove("fs-api-directory-collapse");
  } else {
    nameElement.parentNode.classList.add("fs-api-directory-collapse");
  }
}

function alphabeticCompare(a, b) {
  const firstName = a.name.toUpperCase();
  const secondName = b.name.toUpperCase();
  return firstName > secondName ? 1 : secondName > firstName ? -1 : 0;
}

module.exports.renderInput = function(input, container) {
  const dirItems = input.filter(inputEl => inputEl.type === "directory"),
    fileItems = input.filter(inputEl => inputEl.type === "file");
  dirItems.sort(alphabeticCompare);
  fileItems.sort(alphabeticCompare);
  const listItems = dirItems.concat(fileItems);
  ulElement = convertItemsToUnorderedList(listItems);
  ulElement.classList.add("fs-api-tree");
  container.appendChild(ulElement);
};

module.exports.renderUrl = async function(url, container) {
  const response = await fetch(url);
  const payload = await response.json();
  module.exports.renderInput(payload, container);
};
