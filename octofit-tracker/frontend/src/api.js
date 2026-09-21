const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getEndpointUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(payload, resource) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const arrayKeys = [resource, 'results', 'items', 'data', 'docs', 'records']

  for (const key of arrayKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    for (const key of arrayKeys) {
      if (Array.isArray(payload.data[key])) {
        return payload.data[key]
      }
    }
  }

  return []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(getEndpointUrl(resource), { signal })

  if (!response.ok) {
    throw new Error(`Request failed for ${resource}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload, resource)
}