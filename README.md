# Evi-Chan Dashboard

## GitHub → Railway

1. Upload all files in this folder to the root of a GitHub repository.
2. In Railway choose **New Project → Deploy from GitHub Repo**.
3. Select the repository.
4. Railway detects the Node.js project from `package.json`.
5. The start command is already configured as `npm start`.

No manual `npm install` is required on Railway; dependencies are installed during the build.

## Structure

```text
.
├── package.json
├── railway.json
├── server.js
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## Port

The server uses `process.env.PORT`, so Railway can assign the port automatically.
