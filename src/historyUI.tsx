import React from 'dom-chef'
import { historyStorage } from './history'

const renderItems = (ul: any, teamName: string, filter: string) => {
  const origin = `https://${teamName}.esa.io`
  historyStorage.get(teamName, ({ historyIds, posts }) => {
    ul.innerHTML = ''
    console.log(
      historyIds.map((postId) => {
        const post = posts[postId]
        const matched = Object.values(post).join('').match(filter)
        console.log(matched)
        ul.appendChild(
          <li
            className="history"
            style={{
              display: matched ? 'block' : 'none',
            }}>
            <a href={`${origin}/posts/${post.id}`}>
              <img src={post.created_by.icon} width={26} height={26} />
              {post.category ? post.category + '/' : ''}
              {post.name} {post.tags.join(',')}
            </a>
          </li>,
        )
      }),
    )
  })
}

export const render = (storage: any, teamName: string) => {
  const ul = (<ul className="histories"></ul>) as any
  const input = (
    <input
      type="text"
      className="input"
      placeholder="最近見た記事を検索"
      onKeyUp={(event) => {
        renderItems(ul, teamName, event.target.value)
      }}
    />
  )
  const el = (
    <div
      style={{
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        backgroundColor: 'white',
        border: '1px solid #eee',
        zIndex: 10,
        width: 500,
        height: 300,
        overflowY: 'auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
      }}>
      {input}
      {ul}
    </div>
  ) as any

  renderItems(ul, teamName, '')

  document.body.appendChild(el)
}
