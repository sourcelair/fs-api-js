function strComp (str1, str2) {
  if (str1.localeCompare(str2) === -1 || str1.localeCompare(str2) === 0){
    return true;
  }
}

function checkAndPush(inputElement, liArray) {
  const tempLiItem = document.createElement("li");
  tempLiItem.textContent = inputElement.name;
  for (j=0; j<liArray.length; j++){
    if (strComp(inputElement.name.toUpperCase(), liArray[j].textContent.toUpperCase()))
      break;
  }
  return j;
}

function renderInput(input, container){
  const dirItem = [];
  const fileItem = [];

  const dirList = document.createElement("ul");
  const fileList = document.createElement("ul");

  var i, j;
  for (i=0; i<input.length; i++) {
    const tempItem = document.createElement("li");
    tempItem.textContent = input[i].name;
    if (input[i].type === "directory")
      dirItem.splice(checkAndPush(input[i], dirItem), 0, tempItem);
    else 
      fileItem.splice(checkAndPush(input[i], fileItem), 0, tempItem);
  }

  for (i=0; i<dirItem.length; i++) {
    dirList.appendChild(dirItem[i]);
  }
  for (i=0; i<fileItem.length; i++) {
    fileList.appendChild(fileItem[i]);
  }
  container.appendChild(dirList);
  container.appendChild(fileList);
}