node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                  sh 'npm test --coverage --watchAll -u'
                }
    echo "test"
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }

  stage('Build') {
                nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                  sh 'npm run build'
                }
            
        }

    stage('Push to S3') {
      nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                  sh 'npm run build'
                }

    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Delete(bucket:'mc.adminportal.beardtrust', 
      workingDir:'build', path:'**/*')

      s3Upload(bucket:'mc.adminportal.beardtrust', 
      workingDir:'build', includePathPattern:'**/*') // primary bucket
    }
    }
}
