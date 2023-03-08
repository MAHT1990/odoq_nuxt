module.exports = {
	apps: [
		{
			name: 'OdoqNuxt',
			exec_mode: 'cluster',
			instances: 'max',
			script: 'yarn',
			args: 'start',
			autorestart: true,
			watch: false,

			// pm2 start ecosystem.config.js
			env: {
				HOST: '0.0.0.0',
				PORT: 3000,
				NODE_ENV: 'development'
			},

			// pm2 start ecosystem.config.js
			env_production: {
				HOST: '0.0.0.0',
				PORT: 3000,
				NODE_ENV: 'production'
			},
			output: './logs/console.log',
			error:'./logs/consoleError.log'
		}
	]
}
