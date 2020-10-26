pipeline {
    agent any
    stages {
        stage('Get project'){
            steps{
                checkout scm
                sh "npm install"
            }
        }
        stage('environment') {
            steps {
                sh "env"
            }
        }
        stage('Create Pacts') {
            steps {
                sh "npm run generate-pact-client"
            }
        }
        stage('Publish Pacts') {
            steps {
                sh "npm run publish-pacts-Broker"
            }
        }
    }
}