# Evi-Chan Dashboard — Railway

## GitHub → Railway

Upload the contents of this folder to the **root** of your GitHub repository:

```text
package.json
railway.json
server.js
public/
  index.html
  style.css
  script.js
```

Railway start command:

```bash
node server.js
```

The server automatically uses Railway's `PORT` environment variable and listens on `0.0.0.0`.

After deployment, open:

```text
https://YOUR-DOMAIN/health
```

You should see JSON similar to:

```json
{"ok":true,"name":"Evi-Chan Dashboard","status":"online"}
```

If `/health` works, open the main domain `/`.
