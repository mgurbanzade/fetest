import { useMemo, useState } from 'react'
import styles from './task-two.module.scss'

type Risk = 'low' | 'medium' | 'high'

interface ReleaseEvent {
  id: string
  title: string
  squad: string
  risk: Risk
  timestamp: string
  notes: string
}

interface Filters {
  squad: string
  risk: Risk | 'all'
}

interface TimelineGroup {
  day: string
  events: ReleaseEvent[]
}

const seedEvents: ReleaseEvent[] = [
  { id: 'REL-2411', title: 'Usage insights launch', squad: 'Atlas', risk: 'medium', timestamp: '2025-11-18T09:00:00Z', notes: 'QA checklist outstanding' },
  { id: 'REL-2411A', title: 'Usage insights dry-run', squad: 'Atlas', risk: 'low', timestamp: '2025-11-17T15:00:00Z', notes: 'Prep deployment' },
  { id: 'REL-2412', title: 'Incident timeline export', squad: 'Beacon', risk: 'high', timestamp: '2025-11-14T11:15:00Z', notes: 'Load testing blocker' },
  { id: 'REL-2413', title: 'Warehouse migration phase 2', squad: 'Cipher', risk: 'high', timestamp: '2025-11-25T16:30:00Z', notes: 'Schema review pending' },
  { id: 'REL-2415', title: 'Observability quickstart', squad: 'Beacon', risk: 'medium', timestamp: '2025-11-20T10:00:00Z', notes: 'Docs review' },
  { id: 'REL-2415A', title: 'Observability blog post', squad: 'Beacon', risk: 'low', timestamp: '2025-11-20T18:30:00Z', notes: 'Marketing alignment' },
]

/**
 * TODO:
 *   1. Implement `buildTimeline` to group events by calendar day and apply filters.
 *   2. Implement `summariseByRisk` to return quick risk counts.
 */
export function buildTimeline(_events: ReleaseEvent[], _filters: Filters): TimelineGroup[] {
  return []
}

export function summariseByRisk(_events: ReleaseEvent[]): Record<Risk, number> {
  return { low: 0, medium: 0, high: 0 }
}

const TaskTwoWorkspace: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({ squad: '', risk: 'all' })

  const timeline = useMemo(() => buildTimeline(seedEvents, filters), [filters])
  const riskSummary = useMemo(() => summariseByRisk(timeline.flatMap((group) => group.events)), [timeline])

  return (
    <section className={styles.workspace}>
      <header>
        <h3>Release event timeline</h3>
        <p>Two pure helpers are left unfinished. Wire them up, verify the UI reflects the data, then talk through optimisations or testing ideas.</p>
      </header>

      <div className={styles.controls}>
        <label>
          <span>Squad</span>
          <input
            value={filters.squad}
            onChange={(event) => setFilters((prev) => ({ ...prev, squad: event.target.value }))}
            placeholder="e.g. Atlas"
          />
        </label>
        <label>
          <span>Risk</span>
          <select
            value={filters.risk}
            onChange={(event) => setFilters((prev) => ({ ...prev, risk: event.target.value as Filters['risk'] }))}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <div className={styles.summary}>
        <span>Events shown: {timeline.reduce((sum, item) => sum + item.events.length, 0)}</span>
        <span>High risk: {riskSummary.high}</span>
        <span>Medium: {riskSummary.medium}</span>
        <span>Low: {riskSummary.low}</span>
      </div>

      <ul className={styles.list} data-testid="timeline-list">
        {timeline.map((group) => (
          <li key={group.day} className={styles.group}>
            <h4>{group.day}</h4>
            {group.events.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <div className={styles.eventHeader}>
                  <h4>{event.title}</h4>
                  <span>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={styles.eventHeader}>
                  <span>{event.squad}</span>
                  <span className={styles.riskBadge}>{event.risk}</span>
                </div>
                <p>{event.notes}</p>
              </article>
            ))}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TaskTwoWorkspace

