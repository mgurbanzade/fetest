import TaskOne from './challenges/task-one/TaskOne'
import TaskTwo from './challenges/task-two/TaskTwo'
import styles from './App.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>FE Test</h1>
      </header>
      <main className={styles.main}>
        <TaskOne />
        <TaskTwo />
      </main>
    </div>
  )
}

export default App
