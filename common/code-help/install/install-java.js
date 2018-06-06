module.exports = ({NPM_NODE_CLIENT,URL_CLIENT}) => {
    return `//download source code from github
git clone git@github.com:SolidStateGroup/bullet-train-java-client.git
cd bullet-train-java-client

// Use this mvn command to install jar into your local maven repository
mvn clean install -DskipTests

//Add following dependencies to your project in pom.xml
<dependency>
<groupId>com.ssg</groupId>
<artifactId>bullet-train-client</artifactId>
<version>1.0</version>
</dependency>

//Gradle
implementation 'com.ssg:bullet-train-client:1.0'

`
}
