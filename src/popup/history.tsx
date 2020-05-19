import React from "dom-chef";
import { historyStorage } from "../history";
import { getTeam } from "../util";

const reset = (teamName: string) =>
  historyStorage.set(
    teamName,
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
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (!tab) return;
    const teamName = getTeam(tab.url);
    const container = document.getElementById("history");
    if (!teamName) {
      container.append(
        (<div className="message">esa.ioで開いてください</div>) as any
      );
      return;
    }
    historyStorage.get(teamName, (store) => {
      container.append(
        (
          <div className="popup-title">
            <h1>最近読んだ記事</h1>
            <div className="popup-reset" onClick={() => reset(teamName)}>
              履歴を削除
            </div>
          </div>
        ) as any
      );
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
