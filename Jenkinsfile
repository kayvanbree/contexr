pipeline {
  agent any

  environment {
    DOCKER_IMAGE_SCOPE = 'scubakay'
    DOCKER_IMAGE_NAME = 'contexr'
    DOMAIN = appendBranchName('contexr.scubakay.com')
  }

  stages {
    //stage('Unit Test') {
    //  agent {
    //    docker 'weboaks/node-karma-protractor-chrome'
    //  }
    //  steps {
    //    unstash 'node_modules'
    //    sh 'npm run test:ci'
    //    junit 'reports/**/*.xml'
    //  }
    //}

    stage('Compile') {
      agent {
        docker {
          image 'mhart/alpine-node:10'
          args '-u root:root'
        }
      }
      steps {
        // unstash 'node_modules'
        sh 'npm install'
        sh 'npm run build'
        stash includes: 'dist/', name: 'dist'
      }
    }

    stage('Build and Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerhub_p', usernameVariable: 'dockerhub_u')]) {
          sh 'chmod -R u+w dist/'
          unstash 'dist'
          sh 'docker build -t ${DOCKER_IMAGE_SCOPE}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME} .'
          sh 'docker login -u ${dockerhub_u} -p ${dockerhub_p}'
          sh 'docker push ${DOCKER_IMAGE_SCOPE}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}'
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          sh 'echo "Deploying to ${DOMAIN}"...'
          sh 'docker-compose down --rmi all'
          sh 'docker-compose pull'
          sh 'docker-compose config'
          sh 'docker-compose up -d'
        }
      }
    }
  }
}

def appendBranchName(String url) {
  if (env.BRANCH_NAME != 'master') {
    return "${env.BRANCH_NAME + '.' + url}"
  }
  return url
}
