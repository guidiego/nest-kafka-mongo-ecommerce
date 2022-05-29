## Running as Dev
We are using `nvm` to use control version, you could give `nvm use` in the root folder for the 3 tabs, after it you could run this commands:

#### First Tab (mongo and kafka)
```javascript
docker compose up mongo kafka
```

#### Second Tab (api)
```javascript
cd api
yarn install
yarn start:dev
```

#### Third Tab (api)
```javascript
cd worker
yarn install
yarn start:dev
```

## Run in with docker
```javascript
docker compose up
```