import React from 'dom-chef'

const targetSelector = '#preview-body .markdown > div'

const style = {
  position: 'absolute' as const,
  top: 0,
  right: 16,
  lineHeight: '56px',
}

let el: any;

const init = () => {
  el = <div style={style}></div>
  const tabPreview = document.getElementById('js_tab_preview')
  tabPreview.style.position = 'relative'
  tabPreview.append(el)
}

const onTextChange = () => {
  const target = document.querySelector(targetSelector)
  el.textContent = target.textContent.length + '文字'
}

export default {
  init, onTextChange
}
