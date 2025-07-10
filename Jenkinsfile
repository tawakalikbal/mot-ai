pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS24', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build app') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: ['dev-cms']) {
                    sh '''
                    # Ubah IP dan path sesuai kebutuhan
                    rsync -avz --delete .next/ rizqi_rifai@34.128.73.186:/var/www/mot-ai/.next/
                    rsync -avz --delete public/ @34.128.73.186:/var/www/mot-ai/public/
                    rsync -avz --delete package.json rizqi_rifai@34.128.73.186:/var/www/mot-ai/
                    rsync -avz --delete node_modules/ rizqi_rifai@34.128.73.186:/var/www/mot-ai/node_modules/

                    ssh rizqi_rifai@34.128.73.186 << 'ENDSSH'
                        cd /var/www/mot-ai
                        pm2 restart mot-ai || pm2 start npm --name "mot-ai" -- run start
                    ENDSSH
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Build or deployment failed!"
        }
        success {
            echo "✅ Deployment successful!"
        }
    }
}