const body = document.body;
const dirList = document.createElement("ul");
const fileList = document.createElement("ul");

const dirItem = [];
const fileItem = [];

const input = [
  {
    "name":"main.go",
    "absolute_path":"/mnt/project/main.go",
    "type":"file",
    "children":null
  },
  {
    "name":"Gopkg.toml",
    "absolute_path":"/mnt/project/Gopkg.toml",
    "type":"file",
    "children":null
  },
  {
    "name":"Gopkg.lock",
    "absolute_path":"/mnt/project/Gopkg.lock",
    "type":"file",
    "children":null
  },
  {
    "name":"vendor",
    "absolute_path":"/mnt/project/vendor",
    "type":"directory",
    "children":null
  },
  {
    "name":".gitignore",
    "absolute_path":"/mnt/project/.gitignore",
    "type":"file",
    "children":null
  },
  {
    "name": ".git",
    "absolute_path": "/mnt/project/.git",
    "type":"directory",
    "children":null
  }
];

function strComp (str1, str2) {
  if (str1.localeCompare(str2) === -1 || str1.localeCompare(str2) === 0){
    return true;
  }
}

for (var i=0; i<input.length; i++) {
  if (input[i].type === "directory"){
    const tempDirItem = document.createElement("li");
    tempDirItem.textContent = input[i].name;
    var j=0;

    if(dirItem.length!==0){
      for (j=0; j<dirItem.length; j++){
        const tempInput = input[i].name;
        const str1 = tempInput.toUpperCase();

        const tempD = dirItem[j].textContent;
        const str2 = tempD.toUpperCase();
     
        if (strComp(str1, str2)){
          break;
        }
      }
    }
    dirItem.splice(j, 0, tempDirItem);
  }
  else if (input[i].type === "file"){
    const tempFileItem = document.createElement("li");
    tempFileItem.textContent = input[i].name;
    var j=0;

    if(fileItem.length!==0){
      for (j=0; j<fileItem.length; j++){
        const tempInput = input[i].name;
        const str1 = tempInput.toUpperCase();

        const tempF = fileItem[j].textContent;
        const str2 = tempF.toUpperCase();

        if (strComp(str1, str2)){
          break;
        }
      }
    }
    fileItem.splice(j, 0, tempFileItem);
  }
  else {
    console.log("Error in type of file");
  }
}

for (var i=0; i<dirItem.length; i++) {
  dirList.appendChild(dirItem[i]);
}
for (var i=0; i<fileItem.length; i++) {
  fileList.appendChild(fileItem[i]);
}
body.appendChild(dirList);
body.appendChild(fileList);

