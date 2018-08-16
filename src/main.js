/**Takes a list of items and converts them into an unordered list.
 * @param {array} listItems - The list of the items.
 * @returns {HTMLUListElement} the list that will be appended into a container
 */
function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const handler = document.createElement("span");
    handler.classList.add("fs-api-directory-handler");

    const liElement = document.createElement("li");
    liElement.classList.add("fs-api-entry", `fs-api-${item.type}`);
    if (item.type === "directory") {
      handler.textContent = "›";
    }
    const nameElement = document.createElement("span");
    if (item.type === "directory") {
      handler.addEventListener("click", function() {
        toggleDirectory(nameElement);
      });
    }
    nameElement.textContent = item.name;
    nameElement.classList.add("fs-api-entry-name");
    liElement.appendChild(handler);
    liElement.appendChild(nameElement);
    if (item.children) {
      module.exports.renderInput(item.children, liElement);
    }
    ulElement.appendChild(liElement);
  });
  return ulElement;
}

/**Takes the clicked element and toggles the directory.
 * @param {HTMLSpanElement} nameElement - The clicked element.
 */
function toggleDirectory(nameElement) {
  if (nameElement.parentNode.classList.contains("fs-api-directory-collapse")) {
    nameElement.parentNode.classList.remove("fs-api-directory-collapse");
  } else {
    nameElement.parentNode.classList.add("fs-api-directory-collapse");
  }
}

/**Selects the clicked element and unselects any other that might be selected
 * @param {HTMLLIElement} clickedElement - The item that is going to be selected
 * @param {HTMLElement} rootContainer - The container in which the click occured*/
function selectEntry(clickedElement, rootContainer) {
  rootContainer
    .querySelectorAll(".fs-api-selected")
    .forEach(entry => entry.classList.remove("fs-api-selected"));
  clickedElement.classList.add("fs-api-selected");
}
/**Takes 2 words and compares them case insensitively.
 * @param {object} a - The first file.
 * @param {object} b - The second file
 * @param {string} a.name - The first word of the comparison.
 * @param {string} b.name - The second word of the comparison.
 * @returns {number} 1 if a > b, 0 if a == b and -1 if a < b.
 */
function alphabeticCompare(a, b) {
  const firstName = a.name.toUpperCase();
  const secondName = b.name.toUpperCase();
  return firstName > secondName ? 1 : secondName > firstName ? -1 : 0;
}
/**Takes an input containing the files' characteristics and a container
 * in which the final list will be appended.
 * @param {object} input - The input containing the files in .json form.
 * @param {HTMLElement} container - The container that will contain the list of files.
 * */

module.exports.renderInput = function(input, container) {
  const dirItems = input.filter(inputEl => inputEl.type === "directory"),
    fileItems = input.filter(inputEl => inputEl.type === "file");
  dirItems.sort(alphabeticCompare);
  fileItems.sort(alphabeticCompare);
  const listItems = dirItems.concat(fileItems);
  ulElement = convertItemsToUnorderedList(listItems);
  ulElement.classList.add("fs-api-tree");
  container.addEventListener("click", function(e) {
    selectEntry(e.target.parentNode, container);
  });
  container.appendChild(ulElement);
};

/**Takes the url containing the files' data and converts them into json form.
 * @param {string} url - The url from which the data will be extracted.
 * @param {HTMLElement} container - The container that will contain the list of files.
 * */

module.exports.renderUrl = async function(url, container) {
  const response = await fetch(url);
  const payload = await response.json();
  module.exports.renderInput(payload, container);
};
