# appsync-master-class_backend
 2nd attempt to finish this course!

### To create local CloudFormation templates
npm run sls -- package

### Generate local env
npm run sls -- export-env

### Deploy to AWS
npm run sls -- deploy

npm run sls appsync validate-schema

### Generate CloudFormation template
npm run sls -- package

### deploy a single resource/function
yarn sls -- deploy -f <nameOfResource>