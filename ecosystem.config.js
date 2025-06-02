// MRS/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      }
    },
    {
      name: 'recommendation-service',
      script: './ReccomendationService/main.py',
      interpreter: 'python3',
      watch: ['./ReccomendationService']
    }
  ]
}
