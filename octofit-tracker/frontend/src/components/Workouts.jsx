import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('workouts', controller.signal)
      .then((items) => {
        setWorkouts(items)
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
    return <p className="status-message">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      <div className="team-grid">
        {workouts.map((workout) => (
          <article className="metric-card" key={workout._id || workout.title}>
            <h3>{workout.title}</h3>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Level</dt>
                <dd>{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
            <p className="goal-copy">{workout.recommendedForGoal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts