@echo off
echo Deploying to Elastic Beanstalk environment: cross-stitch-pattern-env

:: Sanitize timestamp
set HOUR=%TIME:~0,2%
if "%HOUR:~0,1%"==" " set HOUR=0%HOUR:~1,1%
set TIMESTAMP=%DATE:~-4%%DATE:~4,2%%DATE:~7,2%_%HOUR%%TIME:~3,2%%TIME:~6,2%

:: Clean and create ZIP
echo Cleaning node_modules and .next
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json

echo Installing dependencies
call npm install

echo Building application
call npm run build

echo Creating ZIP archive
zip -r app-%TIMESTAMP%.zip . -x "node_modules/*" ".next/*" ".git/*"

:: Deploy to Elastic Beanstalk
echo Deploying to Elastic Beanstalk
eb deploy cross-stitch-pattern-env --region us-east-1

echo Deployment complete
pause