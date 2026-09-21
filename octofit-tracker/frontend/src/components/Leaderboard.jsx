import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('leaderboard', controller.signal)
      .then((items) => {
        setLeaderboard(items)
        setStatus('ready')
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id || entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h3>{entry.user?.name || entry.user}</h3>
              <p>{entry.team?.name || entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
            <span>{entry.weeklyMinutes} min</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard