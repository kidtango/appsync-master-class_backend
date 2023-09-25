# appsync-master-class_backend
 2nd attempt to finish this course!

### To create local CloudFormation templates
yarn run sls -- package

### Generate local env
yarn run sls -- export-env

### Deploy to AWS
yarn run sls -- deploy

yarn run sls appsync validate-schema

### Generate CloudFormation template
yarn run sls -- package

### deploy a single resource/function
yarn sls -- deploy -f <nameOfResource>