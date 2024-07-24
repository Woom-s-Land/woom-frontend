pipeline {
    agent any

    tools {
        nodejs 'Node-20'
    }

    environment {
        // 환경 변수 설정
        DOCKER_TAG = "latest"
        REPO_NAME = "sungwoo166/react-app"
        CONTAINER_NAME = "react-web-app"
        IMAGE_NAME = "${REPO_NAME}:${DOCKER_TAG}"
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'develop', url: "https://github.com/Woom-s-Land/wooms-frontend"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USR')]) {
                    sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USR --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${REPO_NAME}:${DOCKER_TAG} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push ${REPO_NAME}:${DOCKER_TAG}"
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker-compose -f ${COMPOSE_FILE} down'
            }
        }

        stage('Start New Containers') {
            steps {
                sh 'docker-compose -f ${COMPOSE_FILE} up -d'
            }
        }
    }
}
