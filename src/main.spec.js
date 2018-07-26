const fsapi = require("./main");

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
          name: "yarn.lock",
          absolute_path: "/mnt/project/vendor/yarn.lock",
          type: "file",
          children: null
        },
        {
          name: "package.json",
          absolute_path: "/mnt/project/vendor/package.json",
          type: "file",
          children: null
        }
      ]
    }
  ];
  const container = document.createElement("div");
  fsapi.render(input, container);

  const trees = container.querySelectorAll("ul");
  const rootTree = trees[0];
  for (const child of rootTree.children) {
    expect(child).toBeInstanceOf(HTMLLIElement);
  }
  expect(rootTree.children[0].children[0].textContent).toBe("Dir");
  expect(rootTree.children[1].children[0].textContent).toBe("FinalDir");
  expect(rootTree.children[2].children[0].textContent).toBe("AnotherFile.html");
  expect(rootTree.children[3].children[0].textContent).toBe("SFile.sth");
  expect(rootTree.children[4].children[0].textContent).toBe("test.go");
  expect(rootTree.children[5].children[0].textContent).toBe("Troll.go");
  expect(trees[1].children[0].children[0].textContent).toBe("package.json");
  expect(trees[1].children[1].children[0].textContent).toBe("yarn.lock");

  for (const ulElement of trees) {
    expect(ulElement.classList.contains("fs-api-tree")).toBe(true);
  }
  expect(rootTree.children[0].classList.contains("fs-api-directory")).toBe(
    true
  );
  expect(rootTree.children[1].classList.contains("fs-api-directory")).toBe(
    true
  );
  expect(rootTree.children[2].classList.contains("fs-api-file")).toBe(true);
  expect(rootTree.children[3].classList.contains("fs-api-file")).toBe(true);
  expect(rootTree.children[4].classList.contains("fs-api-file")).toBe(true);
  expect(rootTree.children[5].classList.contains("fs-api-file")).toBe(true);

  for (const tree of trees) {
    for (const child of tree.children) {
      expect(child.children[0].classList.contains("fs-api-entry-name")).toBe(
        true
      );
      expect(child.classList.contains("fs-api-entry")).toBe(true);
    }
  }
});
