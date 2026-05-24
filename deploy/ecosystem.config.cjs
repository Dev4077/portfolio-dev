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
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};
