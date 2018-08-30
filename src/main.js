/**Takes an item's properties to create the appropriate LIElement.
 * @param {string} type - Item's type.
 * @param {string} name - Item's name.
 * @param {string} absolute_path - Item's absolute path.
 * @returns {HTMLLIistElement} - The list item that will be appended into a container.
 */
function createNewListItem(type, name, absolute_path) {
  const liElement = document.createElement("li");
  liElement.classList.add("fs-api-entry", `fs-api-${type}`);
  liElement.dataset.path = absolute_path;
  const nameElement = document.createElement("span");
  nameElement.textContent = name;
  nameElement.classList.add("fs-api-entry-name");
  if (type === "directory") {
    const handler = document.createElement("span");
    handler.classList.add("fs-api-directory-handler");
    handler.textContent = "›";
    handler.addEventListener("click", function() {
      toggleDirectory(nameElement);
    });
    liElement.appendChild(handler);
  }
  liElement.appendChild(nameElement);
  return liElement;
}
/**Takes a list of items and converts them into an unordered list.
 * @param {array} listItems - The list of the items.
 * @returns {HTMLUListElement} the list that will be appended into a container
 */
function convertItemsToUnorderedList(listItems) {
  const ulElement = document.createElement("ul");
  listItems.forEach(item => {
    const liElement = createNewListItem(
      item.type,
      item.name,
      item.absolute_path
    );
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
  return listItems;
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
/**Takes an item's properties to append a new list item in the correct container.
 * @param {string} type - Item's type.
 * @param {string} name - Item's name.
 * @param {string} url - Container's absolute path.
 */
function appendNewEntry(type, path, url) {
  //const URL = url;
  const URL = "/mnt/project/vendor"; //UNTIL SERVER IS UP, THIS IS FOR TESTING
  const container = document.querySelector(`li[data-path="${URL}"]`);
  const liElement = createNewListItem(type, path, url.concat(path));
  container.querySelector(".fs-api-tree").appendChild(liElement);
}
module.exports.FileSystem = class {
  constructor(url, container) {
    this.url = url;
    this.container = container;

    module.exports.renderUrl(url, this.container);
  }
  getDirectoryContents(path = "") {
    return new Promise((resolve, reject) => {
      fetch(this.url.concat(path))
        .then(response => {
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getFileContents(path = "") {
    return new Promise((resolve, reject) => {
      fetch(this.url.concat(path))
        .then(response => {
          resolve(response.text());
        })
        .catch(error => reject(error));
    });
  }
  createDirectory(path = "") {
    return new Promise((resolve, reject) => {
      fetch(this.url.concat("directories").concat(path), {
        method: "POST"
      }).catch(error => {
        reject(error);
      });
      appendNewEntry("directory", path, this.url);
      resolve(path);
    });
  }
  createFile(path) {
    return new Promise((resolve, reject) => {
      fetch(this.url.concat("directories").concat(path), {
        method: "POST"
      }).catch(error => {
        reject(error);
      });
      appendNewEntry("file", path, this.url);
      resolve(path);
    });
  }
  updateFileContents(path, contents) {
    return new Promise((resolve, reject) => {
      fetch(this.url.concat(path), {
        method: "PUT",
        body: contents
      }).catch(error => {
        reject(error);
      });
      resolve(path);
    });
  }
  moveFileOrDirectory(currentPath, newPath) {
    return new Promise((resolve, reject) => {});
  }
  deleteFileOrDirectory(path) {
    return new Promise((resolve, reject) => {});
  }
};
