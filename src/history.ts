const selectors = {
  id: ".post-header__id",
  name: ".post-title__name",
};

type Post = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  wip: boolean;
  star: boolean;
  created_by: {
    name: string;
    icon: string;
  };
};

type HistoryStore = {
  posts: Record<number, Post>;
  ids: number[];
};

const exist = (selector: string) => Boolean(document.querySelector(selector));
const selectAll = (selector: string) =>
  Array.from(document.querySelectorAll(selector));
const select = (selector: string) => document.querySelector(selector);

const historyStorage = {
  get: (cb: (store: HistoryStore) => void) => {
    chrome.storage.sync.get(["posts", "ids"], (result: HistoryStore) => {
      cb({ posts: {}, ids: [], ...result });
    });
  },
  set: (store: HistoryStore, cb: () => void) => {
    chrome.storage.sync.set(store, () => {
      cb();
    });
  },
};

const pushHistory = (post: Post) => {
  historyStorage.get((result) => {
    const newStore: HistoryStore = {
      posts: {
        [post.id]: post,
        ...result.posts,
      },
      ids: [post.id, ...result.ids.filter((id) => id !== post.id)], // new Set
    };

    // 件数より多かったら削除する何かの処理
    console.log(result);

    historyStorage.set(newStore, () => {
      console.log("saved:", newStore);
    });
  });
};

const init = () => {
  if (document.URL.search(/esa.io\/posts\/\d+/) > -1) {
    const author = select(".post-author");
    let post: Post = {
      id: Number(select(selectors.id).textContent.replace("#", "")),
      name: select(selectors.name).textContent,
      category: selectAll(".category-path__link")
        .map((node) => node.textContent)
        .join("/"),
      tags: selectAll(".post-title__tag").map((node) =>
        node.textContent.trim()
      ),
      wip: exist(".is-wip.post-title"),
      star: exist(".is-starred.js-star-button"),
      created_by: {
        name: author.querySelector(".post-author__user > a").textContent,
        icon: (author.querySelector(".thumbnail__image") as HTMLImageElement)
          .src,
      },
    };
    console.log(post);

    pushHistory(post);
  }
};

export default { init };
