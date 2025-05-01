@echo off
SET ENV_NAME=cross-stitch-pattern-env
SET REGION=us-east-1

echo Deploying to Elastic Beanstalk environment: %ENV_NAME%
eb deploy %ENV_NAME% --region %REGION%

if %ERRORLEVEL% == 0 (
    echo Deployment successful. Setting environment variables...
    aws elasticbeanstalk update-environment ^
      --environment-name %ENV_NAME% ^
      --region %REGION% ^
      --option-settings ^
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=AWS_REGION,Value=us-east-1 ^
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=DYNAMODB_TABLE_NAME,Value=CrossStitchItems ^
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=NODE_ENV,Value=production ^
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=PORT,Value=3000 ^
        Namespace=aws:elasticbeanstalk:application:environment:OptionName=S3_BUCKET_NAME,Value=cross-stitch-designs-photos
    if %ERRORLEVEL% == 0 (
        echo Environment variables set successfully!
    ) else (
        echo Failed to set environment variables.
    )
) else (
    echo Deployment failed.
)
aws elasticbeanstalk describe-configuration-settings --environment-name %ENV_NAME% --region us-east-1
pause