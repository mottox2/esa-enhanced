const selectors = {
  id: ".post-header__id",
  name: ".post-title__name",
};

const exist = (selector: string) => Boolean(document.querySelector(selector));
const selectAll = (selector: string) =>
  Array.from(document.querySelectorAll(selector));
const select = (selector: string) => document.querySelector(selector);

const init = () => {
  if (document.URL.search(/esa.io\/posts\/\d+/) > -1) {
    let results = {};
    results["id"] = Number(select(selectors.id).textContent.replace("#", ""));
    results["name"] = select(selectors.name).textContent;

    results["category"] = selectAll(".category-path__link")
      .map((node) => node.textContent)
      .join("/");
    results["tags"] = selectAll(".post-title__tag").map((node) =>
      node.textContent.trim()
    );

    results["wip"] = exist(".is-wip.post-title");
    results["star"] = exist(".is-starred.js-star-button");

    const author = select(".post-author");
    results["created_by"] = {};
    results["created_by"]["name"] = author.querySelector(
      ".post-author__user > a"
    ).textContent;
    results["created_by"]["icon"] = (author.querySelector(
      ".thumbnail__image"
    ) as HTMLImageElement).src;

    console.log(results);
  }
};

export default { init };
