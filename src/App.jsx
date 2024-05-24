import React, {memo} from 'react'
import KanbanBoard from './components/kanban-board/KanbanBoard'

const App = () => {
  return (
    <>
      <KanbanBoard/>
    </>
  )
}

export default memo(App)