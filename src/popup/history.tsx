import React from "dom-chef";
import { historyStorage } from "../history";

const reset = () =>
  historyStorage.set(
    {
      posts: {},
      historyIds: [],
    },
    () => {
      console.log("reset");
      window.close();
    }
  );

const render = () => {
  historyStorage.get((store) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (!tab) return;

      const container = document.getElementById("history");
      container.append(
        (
          <div className="popup-title">
            <h1>最近読んだ記事</h1>
            <div className="popup-reset" onClick={reset}>
              履歴を削除
            </div>
          </div>
        ) as any
      );
      if (tab.url.search(/esa.io\//) === -1) {
        container.append(
          (<div className="message">esa.ioで開いてください</div>) as any
        );
        return;
      }

      const origin = new URL(tab.url).origin;

      const { posts, historyIds } = store;

      if (historyIds.length === 0)
        container.append(
          (<div className="message">最近見た記事はありません。</div>) as any
        );

      container.append(
        (
          <ul className="histories">
            {historyIds.map((postId) => {
              const post = posts[postId];
              return (
                <li className={`history ${post.wip ? "is-wip" : ""}`}>
                  <a target="_blank" href={`${origin}/posts/${post.id}`}>
                    <img src={post.created_by.icon} width={26} height={26} />
                    <p className="title">
                      {post.category ? post.category + "/" : ""}
                      {post.name} {post.tags.join(",")}
                    </p>
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
