# TODO backend API

This application is developed as an MVP to give functionality to the users to create workspaces, boards ...

**To build application**

run following command at root folder at backend

```
.\mvnw clean install 
```

**To create docker image for application**
```
> docker build --tag=heycar-code-challenge:latest . 
```

**To check if docker image is created successfully**
```
> docker images
```

**To run docker compose**
```
> docker-compose up
```

**To stop docker compose**
```
> docker-compose down
```


**To reach Swagger documentation**
```
http://localhost:8080/swagger-ui.html

```
