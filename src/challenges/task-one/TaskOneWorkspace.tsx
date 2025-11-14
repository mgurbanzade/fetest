import  { useState } from 'react'
import styles from './task-one.module.scss'

type Priority = 'low' | 'medium' | 'high'
type Status = 'todo' | 'doing' | 'done'

interface BacklogItem {
  id: string
  title: string
  owner: string
  status: Status
  priority: Priority
  points: number
  dueDate: string
}

const seedItems: BacklogItem[] = [
  { id: 'DES-120', title: 'Dark theme polish', owner: 'Amelia', status: 'doing', priority: 'high', points: 5, dueDate: '2025-11-15' },
  { id: 'DES-121', title: 'Profile avatar cropper', owner: 'Jon', status: 'todo', priority: 'medium', points: 3, dueDate: '2025-11-25' },
  { id: 'DES-122', title: 'Notification settings UX', owner: 'Greta', status: 'doing', priority: 'low', points: 2, dueDate: '2025-11-18' },
  { id: 'DES-123', title: 'Incident report template', owner: 'Nia', status: 'todo', priority: 'high', points: 8, dueDate: '2025-11-12' },
  { id: 'DES-124', title: 'Billing summary empty state', owner: 'Samira', status: 'done', priority: 'medium', points: 1, dueDate: '2025-11-05' },
]

interface ViewFilters {
  owner: string
  status: Status | 'all'
}

/**
 * TODO:
 *   1. Implement `applyFilters` so the UI shows the correct items.
 *   It returns the array of items that match the filters.
 *   2. Implement `collectSummary` to surface quick risk/coverage signals.
 *   It returns { total: number; blocked: number; overdue: BacklogItem[]; heavyOwners: Record<string, number> }
 *
 * Keep the functions pure and strongly typed. Once they work,
 * discuss follow-up optimisations (memoisation? derived inputs?).
 */

const TaskOneWorkspace: React.FC = () => {
  const [filters, setFilters] = useState<ViewFilters>({ owner: '', status: 'all' })
  const [pointThreshold, setPointThreshold] = useState(6)

  const visibleItems = seedItems;
  const summary = { total: 0, blocked: 0, overdue: [], heavyOwners: {} }; // implement collectSummary 

  return (
    <section className={styles.workspace}>
      <header>
        <h3>Minimal backlog board</h3>
        <p>Only two functions are missing. Get the list rendering by implementing them, then tighten the experience (risk visibility, memoisation, testing plan).</p>
      </header>

      <div className={styles.controls}>
        <label>
          <span>Filter by owner</span>
          <input
            value={filters.owner}
            onChange={(event) => setFilters((prev) => ({ ...prev, owner: event.target.value }))}
            placeholder="e.g. Amelia"
          />
        </label>
        <label>
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value as ViewFilters['status'] }))}
          >
            <option value="all">All</option>
            <option value="todo">To do</option>
            <option value="doing">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>
          <span>Heavy owner threshold</span>
          <input
            type="number"
            min={1}
            max={15}
            value={pointThreshold}
            onChange={(event) => setPointThreshold(Number.parseInt(event.target.value, 10))}
          />
        </label>
      </div>

      <div className={styles.summary}>
        <span>Total: {summary.total}</span>
        <span>Blocked: {summary.blocked}</span>
        <span>Overdue: {summary.overdue.length}</span>
        <span>
          Owners &gt; {pointThreshold} pts:{' '}
          {Object.entries(summary.heavyOwners)
            .filter(([, points]) => points > pointThreshold)
            .map(([owner, points]) => `${owner} (${points})`)
            .join(', ') || 'None'}
        </span>
      </div>

      <ul className={styles.list} data-testid="backlog-list">
        {visibleItems.map((item) => {
          const isOverdue = new Date(item.dueDate) < new Date()
          const ownerLoad = summary.heavyOwners[item.owner] ?? 0
          const isHeavyOwner = ownerLoad > pointThreshold

          return (
            <li key={item.id} className={styles.card}>
              <div className={styles.titleRow}>
                <h4>{item.title}</h4>
                <span className={styles.badge}>{item.status}</span>
              </div>
              <div className={styles.meta}>
                <span>{item.id}</span>
                <span>Owner: {item.owner}</span>
                <span>Priority: {item.priority}</span>
                <span>Points: {item.points}</span>
                <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
              </div>
              <div className={styles.meta}>
                {isOverdue && <span className={`${styles.badge} ${styles.riskBadge}`}>Overdue</span>}
                {item.status === 'todo' && item.priority === 'high' && <span className={`${styles.badge} ${styles.riskBadge}`}>High-priority todo</span>}
                {isHeavyOwner && <span className={`${styles.badge} ${styles.riskBadge}`}>Owner over threshold</span>}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TaskOneWorkspace

