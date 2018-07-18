function iterator(array) {
  const ulList = document.createElement("ul");
  array.map(a => {
    const liItem = document.createElement("li");
    liItem.textContent = a.name;
    ulList.appendChild(liItem);
  });
  return ulList;
}
function renderInput(input, container) {
  const dirItem = input.filter(inputEl => inputEl.type === "directory"),
    fileItem = input.filter(inputEl => inputEl.type === "file");
  dirItem.sort(function(a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
  fileItem.sort(function(a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });

  dirList = iterator(dirItem);
  fileList = iterator(fileItem);
  container.appendChild(dirList);
  container.appendChild(fileList);
}
