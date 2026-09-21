import { useEffect, useState } from 'react'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function normalizeActivities(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.activities || payload?.results || payload?.items || payload?.data || []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(activitiesApiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for activities: ${response.status}`)
        }

        return response.json()
      })
      .then(normalizeActivities)
      .then((items) => {
        setActivities(items)
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
    return <p className="status-message">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Tracking</p>
        <h2>Activities</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Team</th>
              <th>Minutes</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.type}</td>
                <td>{activity.user?.name || activity.user}</td>
                <td>{activity.team?.name || activity.team}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities