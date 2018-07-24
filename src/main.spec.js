const fsapi = require("./main");
var i;

test("Checks HTMLElements", () => {
  const input = [
    {
      name: "test.go",
      absolute_path: "/mnt/project/test.go",
      type: "file",
      children: null
    },
    {
      name: "Troll.go",
      absolute_path: "/mnt/project/Troll.go",
      type: "file",
      children: null
    },
    {
      name: "Dir",
      absolute_path: "/mnt/project/Dir",
      type: "directory",
      children: null
    },
    {
      name: "SFile.sth",
      absolute_path: "/mnt/project/SFile.sth",
      type: "file",
      children: null
    },
    {
      name: "AnotherFile.html",
      absolute_path: "/mnt/project/AnotherFile.html",
      type: "file",
      children: null
    },
    {
      name: "FinalDir",
      absolute_path: "/mnt/project/FinalDir",
      type: "directory",
      children: [
        {
          "name":"package.json",
          "absolute_path":"/mnt/project/vendor/package.json",
          "type":"file",
          "children":null
        },
        {
          "name":"yarn.lock",
          "absolute_path":"/mnt/project/vendor/yarn.lock",
          "type":"file",
          "children":null
        }
      ]
    }
  ];
  const container = document.createElement("div");
  fsapi.render(input, container);

  const ul = container.querySelector("ul");

  for (const child of ul.children) {
    expect(child).toBeInstanceOf(HTMLLIElement);
  }
  expect(ul.children[0].children[0].textContent).toBe("Dir");
  expect(ul.children[1].children[0].textContent).toBe("FinalDir");
  expect(ul.children[2].children[0].textContent).toBe("AnotherFile.html");
  expect(ul.children[3].children[0].textContent).toBe("SFile.sth");
  expect(ul.children[4].children[0].textContent).toBe("test.go");
  expect(ul.children[5].children[0].textContent).toBe("Troll.go");
  for (i=0; i<ul.length; i++){
    expect(ul[i].classList.contains('fs-api-tree')).toBe(true);
  }
  expect(ul.children[0].classList.contains('fs-api-directory')).toBe(true);
  expect(ul.children[1].classList.contains('fs-api-directory')).toBe(true);
  expect(ul.children[2].classList.contains('fs-api-file')).toBe(true);
  expect(ul.children[3].classList.contains('fs-api-file')).toBe(true);
  expect(ul.children[4].classList.contains('fs-api-file')).toBe(true);
  expect(ul.children[5].classList.contains('fs-api-file')).toBe(true);

  for (i=0; i<6; i++){
    expect(ul.children[i].children[0].classList.contains('fs-api-entry-name')).toBe(true);
    expect(ul.children[i].classList.contains('fs-api-entry')).toBe(true);
  }
});
