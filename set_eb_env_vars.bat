@echo off
SET ENV_NAME=cross-stitch-pattern-env
SET REGION=us-east-1

echo Setting environment variables for Elastic Beanstalk environment: %ENV_NAME%

aws elasticbeanstalk update-environment ^
  --environment-name %ENV_NAME% ^
  --region %REGION% ^
  --option-settings ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=AWS_REGION,Value=us-east-1 ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=DYNAMODB_TABLE_NAME,Value=CrossStitchItems ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=NODE_ENV,Value=production ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=PORT,Value=3000 ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=S3_BUCKET_NAME,Value=cross-stitch-designs-photos

if %ERRORLEVEL% == 0 (
    echo Environment variables set successfully!
) else (
    echo Failed to set environment variables. Check AWS CLI configuration and permissions.
)

pause