# Team7-AndroidBackend
Bob-like peer-to-peer carsharing

## Configuration

Copy `config/index.js.sample` to `config/index.js` and fill in the required keys.

## Contributing

You'll need node.js and npm.

```bash
git clone https://github.com/HowestServerSideScripting/Team7-AndroidBackend.git
npm install
npm install -g grunt-cli

# Development: Build less and watch for changes
grunt

# Production: Build less
grunt build

# Run server
npm start
open http://localhost:3000/

# Run server and reload on changes
npm install -g nodemon
nodemon bin/www
open http://localhost:3000/

# Run on production
NODE_ENV=production npm start
```

## Before Commits

Run `grunt test`
