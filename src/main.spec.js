const fsapi = require("./main");
global.fetch = require("jest-fetch-mock");

test("Checks fs-api-js", () => {
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
  fsapi.renderInput(input, container);

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
    if (tree.children) {
      if (tree.previousSibling) {
        //At first we expect from the li not to contain the "collapse" class, since its contents are diplayed.
        expect(
          tree.parentNode.classList.contains("fs-api-directory-collapse")
        ).toBe(false);
        //We click the folder.
        tree.previousSibling.click();
        //Now we expect that the list collapses
        expect(
          tree.parentNode.classList.contains("fs-api-directory-collapse")
        ).toBe(true);
        //We click the folder.
        tree.previousSibling.click();
        //Now we expect for the folders' contents to be displayed.
        expect(
          tree.parentNode.classList.contains("fs-api-directory-collapse")
        ).toBe(false);
      }
    }
  }
});

describe("Tests fetch call", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("mockResponse", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            name: "main.go",
            absolute_path: "/mnt/project/main.go",
            type: "file",
            children: null
          }
        ]
      })
    );

    //assert on the response
    const container = document.createElement("div");

    fsapi.renderUrl("/api/fs/", container).then(res => {
      expect(res.data).toEqual([
        {
          name: "main.go",
          absolute_path: "/mnt/project/main.go",
          type: "file",
          children: null
        }
      ]);
    });

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/fs/");
  });
});
