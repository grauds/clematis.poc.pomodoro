import fs from 'fs';
import https from 'https';
import express from 'express';
import ReactDOM from 'react-dom/server';
import { indexTemplate } from './indexTemplate';
import { App } from '@/App';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

const PORT = process.env.PORT || 3000;

// Production path where the Docker volume 'ssl_certs' is mounted
const certPath = '/opt/software/certs/clematis-pomodoro-ssl-cert.crt';
const keyPath = '/opt/software/certs/clematis-pomodoro-ssl-key.key';

// Middlewares
app.use('/static', express.static('./dist/client'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false, // Set to true in real production for better security
  }),
);

// SSR Route
app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

/**
 * SERVER INITIALIZATION
 * Checks if SSL certificates exist (Production/Docker environment)
 * Falls back to HTTP if they are missing (Local Development)
 */
console.log("--- SSL DIAGNOSTICS ---");
console.log("Attempting to find cert at:", certPath);
console.log("Attempting to find key at:", keyPath);

try {
  const certCheck = fs.statSync(certPath);
  console.log("Cert file found! Permissions:", certCheck.mode);

  const keyCheck = fs.statSync(keyPath);
  console.log("Key file found! Permissions:", keyCheck.mode);

  // If we get here, both exist
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  https.createServer(options, app).listen(PORT, () => {
    console.log(`🚀 SECURE server on https://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ SSL Check Failed:", err.message);
  console.log("Falling back to HTTP...");
  app.listen(PORT, () => {
    console.log(`🏠 HTTP server on http://localhost:${PORT}`);
  });
}
