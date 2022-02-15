FROM openjdk:8-jre-alpine

ENV APP_HOME=/usr/app/

WORKDIR $APP_HOME

COPY build/libs/kurento-0.0.1-SNAPSHOT.jar kurentoApplication.jar

EXPOSE 8443

CMD ["java", "-jar", "kurentoApplication.jar"]