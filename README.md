# Bandsintown test API

Example application written in [next.js](https://github.com/zeit/next.js/) that makes use of [bandsintown API](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0).

Each successful bandintown request is cached both on server-side and client-side. Frontend app doesn't send requests directly to bandsintown url, it sends requests to local server.

Server remembers each responses for one day and frontend  for one hour.


## Before calling any npm script, install all dependencies
```
npm install
```

### To run all tests
```
npm run test
```

### To run all tests in watch mode
```
npm run test:watch
```

### To run application in development mode
```
npm run dev
```

### To run application in production mode
```
npm run build
npm run start
```