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
if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  try {
    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`🚀 Production SECURE server running at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start HTTPS server:', error);
    process.exit(1);
  }
} else {
  app.listen(PORT, () => {
    console.log(`🏠 Development server running at http://localhost:${PORT}`);
  });
}
