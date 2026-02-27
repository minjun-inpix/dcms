import { useState } from 'react'

// ./pages/*.tsx 전부 자동 import (Vite 전용 문법)
const pageModules = import.meta.glob('./pages/*.tsx', { eager: true })

type PageModule = {
  default: React.ComponentType
  pageTitle?: string
}

const pages = Object.entries(pageModules).map(([path, mod]) => {
  const m = mod as PageModule
  const fileName = path.split('/').pop()!.replace('.tsx', '')

  if (!m.default) {
    console.warn(`[Warning] ${fileName} 파일에 default export 가 없습니다.`)
  }

  return {
    id: fileName,
    title: m.pageTitle ?? fileName,
    Component: m.default || (() => <div>Default Export Not Found in {fileName}</div>),
  }
})

function App() {
  const [currentId, setCurrentId] = useState<string | null>(null)

  if (currentId) {
    const current = pages.find(p => p.id === currentId)!
    const PageComponent = current.Component
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setCurrentId(null)}>← 화면 목록으로</button>
        <PageComponent />
      </div>
    )
  }

  return (
    <div style={{ height:'100vh', padding: 12 }}>
      <p>화면 목록</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pages.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <button 
              onClick={() => setCurrentId(p.id)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9'
              }}
            >
              {p.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
