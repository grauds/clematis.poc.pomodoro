pipeline {

  agent none

  stages {
    stage("Verify tooling") {
      agent any
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
      agent any
      steps {
        // Get the code from a GitHub repository
        git 'https://github.com/grauds/clematis.poc.pomodoro.git'
      }
    }

    stage('Dockerized build') {
      agent any
      steps {
        sh '''
           docker build . -t clematis.poc.pomodoro -f Dockerfile
        '''
      }
    }

    stage('Publish tests') {
      agent any
      steps {
        sh '''
           export DOCKER_BUILDKIT=1
           docker build --output "type=local,dest=${WORKSPACE}/coverage" --target test-out .
           ls -l ./coverage
        '''
        recordCoverage(
          tools: [[parser: 'COBERTURA', pattern: 'coverage/**/cobertura-coverage.xml']],
          id: 'cobertura',
          name: 'Cobertura Coverage',
          sourceCodeRetention: 'EVERY_BUILD',
          ignoreParsingErrors: true,
          qualityGates: [
            [threshold: 60.0, metric: 'LINE', baseline: 'PROJECT', unstable: true],
            [threshold: 60.0, metric: 'BRANCH', baseline: 'PROJECT', unstable: true]
          ]
        )
      }
    }

    stage ('Dependency-Check') {
      agent any
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
      agent any
      steps {
        sh '''
           docker compose stop
           docker stop clematis-poc-pomodoro || true && docker rm clematis-poc-pomodoro || true
           docker compose build
           docker compose up -d
        '''
      }
    }

    stage('e2e-tests') {
      agent { docker { image 'mcr.microsoft.com/playwright:v1.41.1-jammy' } }
      steps {
          sh 'npm ci'
          sh 'npx playwright test'
      }
    }
  }

}
