import textCount from "./textCount";
import history from "./history";

history.init();

const target = document.querySelector("#preview-body .markdown > div");
if (target) {
  textCount.init();
  const observer = new MutationObserver((records) => {
    textCount.onTextChange();
  });

  observer.observe(target, {
    childList: true, // 子要素となるDOMの追加・削除を見るオプション
    // 子要素の中身のテキストを検知するには2つのオプションを有効する必要があった
    subtree: true,
    characterData: true,
  });
}
