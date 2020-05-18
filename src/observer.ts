import textCount from './textCount'

const target = document.querySelector('#preview-body .markdown > div')
if (target) {
  // init
  textCount.init()
  const observer = new MutationObserver(records => {
    console.log('ob')
    textCount.onTextChange()
  })

  observer.observe(target, {
    childList: true, // 子要素となるDOMの追加・削除を見るオプション
    // 子要素の中身のテキストを検知するには2つのオプションを有効する必要があった
    subtree: true,
    characterData: true,
  })
  console.log('enddd')
}
