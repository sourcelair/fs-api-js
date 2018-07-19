const fsapi = require("./main");

test('Checks HTMLElements', () => {
  const input = [
    {
      "name":"test.go",
      "absolute_path":"/mnt/project/test.go",
      "type":"file",
      "children":null
    },
    {
      "name":"Troll.go",
      "absolute_path":"/mnt/project/Troll.go",
      "type":"file",
      "children":null
    },
    {
      "name":"Dir",
      "absolute_path":"/mnt/project/Dir",
      "type":"directory",
      "children":null
    },
    {
      "name":"SFile.sth",
      "absolute_path":"/mnt/project/SFile.sth",
      "type":"file",
      "children":null
    },
    {
      "name":"AnotherFile.html",
      "absolute_path":"/mnt/project/AnotherFile.html",
      "type":"file",
      "children":null
    },
    {
      "name":"FinalDir",
      "absolute_path":"/mnt/project/FinalDir",
      "type":"directory",
      "children":null
    }
  ];
  const container = document.createElement('div');
  fsapi.render(input, container);

  const ul = container.querySelector("ul");

  for (const child of ul.children) {
    expect(child).toBeInstanceOf(HTMLLIElement);
  }
  expect(ul.children[0].textContent).toBe("Dir");
  expect(ul.children[1].textContent).toBe("FinalDir");
  expect(ul.children[2].textContent).toBe("AnotherFile.html");
  expect(ul.children[3].textContent).toBe("SFile.sth");
  expect(ul.children[4].textContent).toBe("test.go");
  expect(ul.children[5].textContent).toBe("Troll.go");
});