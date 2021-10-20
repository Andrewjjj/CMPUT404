# CMPUT404

### For development:

- To run it in a container:

1. Make sure Docker is installed
2. Run:
`docker-compose up --build`
3. Check if the containers are running by
`docker ps`

React ui-service should run on port `3000` and our back-end rest api endpoints should be running on `8080`.


- To run it locally

rest-service:
1. Make sure npm and node is installed
2. Check whether they are installed by running `npm --version`
3. cd to rest-service/
4. Install all dependencies by doing:
`npm install`
5. Install nodemon globally (optional, but highly recommended)
`npm install -g nodemon`
6. Run nodemon
`nodemon` 

ui-service:
1. Make sure npm and node is installed
2. Check whether they are installed by running `npm --version`
3. cd to ui-service/
4. Install all dependencies by doing:
`npm install`
5. Run react
`npm start`


### Ports
By default, rest-service should run on 8080, and our react app should run on 3000.