# sails-admin

## Installation

```bash
git clone https://github.com/RelativeMedia/sails-admin sails-admin;
cd sails-admin;
cd backend && npm install && cd ../;
cd frontend && npm install && cd ../;
```
## Localhost Startup

1. perform the Installation steps
2. Then use `nf start --wrap` or `npm start` in the sails-admin directory to start both the backend, and frontend together
3. visit http://localhost:1337/v1/<some_api_endpoint> for api calls
4. visit http://localhost:3000/ for the UI/ReactJs/Frontend

**Note:** By defaullt sails-admin uses `sails-disk` for development, the docker install shows how to use docker containers with a mysql database.

## Example docker-compose.yml (For Production)

This will start three containers, the database, frontend/nginx, and the sails backend api. All three containers will bind mount docker volumes to /backend, /backend/mysql, and /frontend so make sure you run `npm i` in each backend and frontend folder first and run `npm run build` in frontend folder if you've made code changes.

```yaml
version: "3"
services:
  db:
    image: mysql:latest
    container_name: sails-admin_db
    volumes:
      - ./backend/mysql/data:/var/lib/mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: "changeme"
      MYSQL_USER: "sails_admin_dba"
      MYSQL_PASSWORD: "changeme"
      MYSQL_DATABASE: "sails_admin_dev"
  frontend:
    image: relativemedia/nginx-proxy
    container_name: sails-admin_frontend
    ports:
      - 80:80
    depends_on:
      - db
    volumes:
      - ./frontend:/frontend
  backend:
    image: relativemedia/sails-admin-backend
    container_name: sails-admin_backend
    ports:
      - 1337:1337
    links:
      - frontend:backend
    depends_on:
      - db
    environment:
      MYSQL_USER: "sails_admin_dba"
      MYSQL_HOST: db
      MYSQL_PORT: 3306
      MYSQL_PASSWORD: "changeme"
      MYSQL_DATABASE: "sails_admin_dev"
      AUTO_ADMIN_ENABLED: 'true'
      AUTO_ADMIN_USERNAME: 'admin'
      AUTO_ADMIN_PASSWORD: 'password'
      AUTO_ADMIN_FIRSTNAME: 'Gordon'
      AUTO_ADMIN_LASTNAME: 'Freeman'
      AUTO_ADMIN_EMAIL: 'admin@example.com'
      CIPHER_SERVICE_SECRET: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    volumes:
      - ./backend:/backend
```
