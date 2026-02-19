module.exports = {
  apps: [{
    name: 'bsedu',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/bs-education-global/client',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
