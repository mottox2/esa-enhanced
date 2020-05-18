import React from "dom-chef";
import { historyStorage } from "../history";

const render = () => {
  historyStorage.get((store) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (!tab) return;

      console.log(tab, tab.url);
      if (tab.url.search(/esa.io\//) === -1) {
        console.log("aAwfdww");
        document.getElementById("history").innerText =
          "esaサイトで開いてください";
        return;
      }

      const origin = new URL(tab.url).origin;

      const { posts, ids } = store;
      document.getElementById("history").append(
        (
          <ul className="histories">
            {ids.join(".")}
            {ids.map((postId) => {
              const post = posts[postId];
              return (
                <li>
                  <a target="_blank" href={`${origin}/posts/${post.id}`}>
                    {post.name}
                  </a>
                </li>
              );
            })}
          </ul>
        ) as any
      );
    });
  });
};

export default render;
