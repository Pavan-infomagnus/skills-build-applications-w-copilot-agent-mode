import { useEffect, useState } from 'react'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function normalizeTeams(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.teams || payload?.results || payload?.items || payload?.data || []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(teamsApiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for teams: ${response.status}`)
        }

        return response.json()
      })
      .then(normalizeTeams)
      .then((items) => {
        setTeams(items)
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
    return <p className="status-message">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <article className="metric-card" key={team._id || team.name}>
            <h3>{team.name}</h3>
            <p>{team.city}</p>
            <dl>
              <div>
                <dt>Coach</dt>
                <dd>{team.coach}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.memberCount}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams