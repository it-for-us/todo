FROM eclipse-temurin:17-alpine

COPY target/*.jar app.jar

EXPOSE 8080/tcp

ENTRYPOINT ["java", "-jar","app.jar"]
