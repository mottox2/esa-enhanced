import React from 'dom-chef'
import { Post, historyStorage } from './history'

type NodeState = {
  node: HTMLLIElement
  post: Post
}[]

const renderItems = (
  parent: any,
  teamName: string,
  cb?: (state: NodeState) => void,
) => {
  const origin = `https://${teamName}.esa.io`
  return historyStorage.get(teamName, ({ historyIds, posts }) => {
    const states = historyIds.map((postId) => {
      const post = posts[postId]
      const node = (
        <li className="history is-visible">
          <a href={`${origin}/posts/${post.id}`}>
            <img src={post.created_by.icon} width={26} height={26} />
            {post.category ? post.category + '/' : ''}
            {post.name} {post.tags.join(',')}
          </a>
        </li>
      ) as any
      parent.appendChild(node)
      return { node, post }
    })
    cb(states)
  })
}

export const render = (teamName: string) => {
  let current = -1
  document.querySelectorAll('.overlay').forEach((n) => n.remove())
  const container = (<div className="overlay"></div>) as any

  const close = () => {
    container.remove()
    document.body.style.overflowY = 'auto'
  }
  container.addEventListener('click', close)
  const ul = (<ul className="histories"></ul>) as any
  const el = (<div className="historyFilter">{ul}</div>) as any

  renderItems(ul, teamName, (state) => {
    const input = ((
      <input
        type="text"
        className="input"
        placeholder="最近見た記事を検索"
        onKeyUp={(event) => {
          const { target, keyCode } = event

          if (keyCode === 27) close() // ESC

          state.forEach(({ node, post }) => {
            const filterStr = target.value
            node.classList.remove('is-visible')
            const matched = [post.name, post.category, post.tags.join('')]
              .join('')
              .match(filterStr)
            if (matched) node.classList.add('is-visible')
          })

          state.forEach((state) => state.node.classList.remove('is-active'))
          if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
            if (keyCode === 38) current--
            if (keyCode === 40) current++
          } else {
            current = -1
          }

          const visibleItems = ul.querySelectorAll('li.is-visible')
          visibleItems[current] &&
            visibleItems[current].classList.add('is-active')

          if (visibleItems.length === 0) {
            console.log('結果なし')
          }

          if (event.keyCode === 13) {
            visibleItems[current] &&
              visibleItems[current].querySelector('a').click()
          }
        }}
      />
    ) as any) as HTMLInputElement
    el.prepend(input)
    input.focus()
  })

  container.append(el)
  document.body.style.overflowY = 'hidden'
  document.body.appendChild(container)
}
