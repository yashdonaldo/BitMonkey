import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from 'http'
import https from 'https'

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
  timeout: 10000,
})

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,
  timeout: 10000,
  rejectUnauthorized: false // Only use this in development if you're having SSL certificate issues
})

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        agent: httpAgent
      },
      "/api2/v1/user": {
        target: "https://vqh49ejsjf.execute-api.ap-south-1.amazonaws.com/",
        changeOrigin: true,
        agent: httpsAgent
      },
      "/graphql": {
        target: "http://localhost:8000",
        changeOrigin: true,
        agent:httpAgent,
        rewrite: (path)=> path.replace(/^\/graphql/, '/graphql')
      }
    }
  },
  plugins: [react()],
})
