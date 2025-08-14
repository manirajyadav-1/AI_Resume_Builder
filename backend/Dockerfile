# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/Resume-Builder-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Resume-Builder-0.0.1-SNAPSHOT.jar"]



# # Stage 1: Build the application
# FROM maven:3.8.4-openjdk-17 AS build
#
# WORKDIR /app
#
# COPY pom.xml .
# RUN mvn dependency:go-offline
#
# COPY src ./src
# RUN mvn clean package -DskipTests
#
# # Stage 2: Run the application
# FROM openjdk:17-jdk-slim
#
# WORKDIR /app
#
# # Copy the built JAR from the first stage
# COPY --from=build /app/target/Resume-Builder-0.0.1-SNAPSHOT.jar .
#
# # Expose port 8080
# EXPOSE 8080
#
# # Specify the command to run the application
# ENTRYPOINT ["java", "-jar", "/app/Resume-Builder-0.0.1-SNAPSHOT.jar"]



