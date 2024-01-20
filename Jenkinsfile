pipeline {

  agent any

  stages {

    stage("Verify tooling") {
      steps {
        sh '''
              docker version
              docker info
              docker compose version
              curl --version
              jq --version
              docker compose ps
            '''
      }
    }

    stage('Get code') {
      steps {
        // Get the code from a GitHub repository
        git 'https://github.com/grauds/clematis.poc.pomodoro.git'
      }
    }

    stage('Dockerized build') {
      steps {
        sh '''
           docker build . -t clematis.poc.pomodoro -f Dockerfile
        '''
      }
    }

    stage('Publish tests') {
      steps {
        sh '''
           export DOCKER_BUILDKIT=1
           docker build --output "type=local,dest=${WORKSPACE}/coverage" --target test-out .
           ls -l ./coverage
        '''
        publishCoverage adapters: [istanbulCoberturaAdapter(mergeToOneReport: true, path: 'coverage/**/cobertura-coverage.xml')], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
      }
    }

    stage ('Dependency-Check') {
        steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
              dependencyCheck additionalArguments: '''
                  -o "./"
                  -s "./"
                  -f "ALL"
                  -P "depcheck.properties"
                  --prettyPrint''', odcInstallation: 'Dependency Checker'

              dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
    }

    stage("Build and start docker compose services") {
      steps {
        sh '''
           docker compose stop
           docker stop clematis-poc-pomodoro || true && docker rm clematis-poc-pomodoro || true
           docker compose build
           docker compose up -d
        '''
      }
    }
  }

}
