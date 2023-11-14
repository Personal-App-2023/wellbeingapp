pipeline {
  agent any

tools {
    nodejs "NodeJs"
}

 environment {
    DOCKER_REGISTRY = "docker.io"
    DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
    VERSION = "${env.BUILD_ID}"
  }

  stages {

 stage('Install Dependencies') {
      steps {

        sh 'npm ci'
      }
    }

    stage('Build Project') {
      steps {
        // Build the Angular project
        sh 'npm install'
      }
    }

    /*stage('Run Project') {
      steps {
        // Build the Angular project
        sh 'npm start'
      }
    }*/

    stage('Docker Build and Push') {
      steps {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker build -t doaafarouk/peacefulapp:${VERSION} .'
          sh 'docker push doaafarouk/peacefulapp:${VERSION}'
      }
    }


     stage('Cleanup Workspace') {
      steps {
        deleteDir()
      }
    }

     stage('Update Image Tag in GitOps') {
      steps {
         checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'git-ssh', url: 'git@github.com:Personal-App-2023/eks-deployment-files.git']])
        script {
          // Set the new image tag with the Jenkins build number
       sh '''
          sed -i "s/image:.*/image: doaafarouk\\/peacefulapp:${VERSION}/" react-manifest.yml
        '''

          sh 'git checkout master'
          sh 'git add .'
          sh 'git commit -m "Update image tag"'
        sshagent(['git-ssh'])
            {
                  sh('git push')
            }
        }
      }
    }
  }

}

