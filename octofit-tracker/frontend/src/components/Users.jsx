import { useEffect, useState } from 'react'

const usersApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function normalizeUsers(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.users || payload?.results || payload?.items || payload?.data || []
}

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(usersApiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for users: ${response.status}`)
        }

        return response.json()
      })
      .then(normalizeUsers)
      .then((items) => {
        setUsers(items)
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
    return <p className="status-message">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">{error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Fitness goal</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge text-bg-success">{user.role}</span>
                </td>
                <td>{user.fitnessGoal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users