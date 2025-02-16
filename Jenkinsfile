pipeline {

  agent none

  environment {
     REPORT_FILES = "index.html"
     REPORT_TITLES = "Shard 1"
  }

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
                --prettyPrint''', nvdCredentialsId: 'NVD_API_Key', odcInstallation: 'Dependency Checker'

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
      agent any
      steps {
        sh '''
           export DOCKER_BUILDKIT=1
           export CI=true
           docker build --target test-e2e .
           docker build --output "type=local,dest=${WORKSPACE}" --target test-e2e-out .
           ls -l ./playwright-report
           ls -l ./test-results
        '''

        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: REPORT_FILES,
            reportName: "Playwright",
            reportTitles: REPORT_TITLES
        ])
      }
      post {
        success {
          archiveArtifacts(artifacts: 'test-results/homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }

}
