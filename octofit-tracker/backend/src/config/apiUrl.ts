export function getApiBaseUrl(port = 8000) {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}