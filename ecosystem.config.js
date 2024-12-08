module.exports = {
	apps: [{
		name: 'comeOnBack',
		script: 'dist/main.js',
		env: {
			PORT: 3000,
			MONGO_URL: 'mongodb+srv://annslivankova:OwZ6F0eOCzZkPuxY@blogify-project.h3yubwn.mongodb.net/blogify-db?retryWrites=true&w=majority',
			DB_URL: 'mongodb://localhost:27017',
			DB_NAME: 'comeon',

			LOGIN_CRED: 'wonderwoman',
			PASS_CRED: 'supergamebywonW',

			JWT_SECRET: 'someSecret123',
			ACCESS_TTL: '30d',
			REFRESH_TTL: '60d',
		},
	}],
};
