const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "portfolio",
      cwd: path.join(__dirname, ".."),
      script: "server/dist/index.mjs",
      interpreter: "node",
      node_args: "--enable-source-maps",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "mongodb+srv://dev:dev@videoplayercluster.zxj2mb4.mongodb.net/portfolio",
        SESSION_SECRET: "dev-secret-change-in-production",
        SERVER_PORT: 8080,
        CLIENT_PORT: 21113,
        BASE_PATH: "/",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};
