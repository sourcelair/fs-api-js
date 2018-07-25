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

  for (const child of trees[0].children) {
    expect(child).toBeInstanceOf(HTMLLIElement);
  }
  expect(trees[0].children[0].children[0].textContent).toBe("Dir");
  expect(trees[0].children[1].children[0].textContent).toBe("FinalDir");
  expect(trees[0].children[2].children[0].textContent).toBe("AnotherFile.html");
  expect(trees[0].children[3].children[0].textContent).toBe("SFile.sth");
  expect(trees[0].children[4].children[0].textContent).toBe("test.go");
  expect(trees[0].children[5].children[0].textContent).toBe("Troll.go");

  expect(
    trees[0].children[1].children[1].children[0].children[0].textContent
  ).toBe("package.json");
  expect(
    trees[0].children[1].children[1].children[1].children[0].textContent
  ).toBe("yarn.lock");

  //expect(trees[0].children[1].children[0].children[1].textContent).toBe("yarn.lock");

  for (const ulElement of trees) {
    expect(ulElement.classList.contains("fs-api-tree")).toBe(true);
  }
  expect(trees[0].children[0].classList.contains("fs-api-directory")).toBe(
    true
  );
  expect(trees[0].children[1].classList.contains("fs-api-directory")).toBe(
    true
  );
  expect(trees[0].children[2].classList.contains("fs-api-file")).toBe(true);
  expect(trees[0].children[3].classList.contains("fs-api-file")).toBe(true);
  expect(trees[0].children[4].classList.contains("fs-api-file")).toBe(true);
  expect(trees[0].children[5].classList.contains("fs-api-file")).toBe(true);

  for (const li of trees) {
    for (const child of li.children) {
      expect(child.children[0].classList.contains("fs-api-entry-name")).toBe(
        true
      );
      expect(child.classList.contains("fs-api-entry")).toBe(true);
    }
  }
});
