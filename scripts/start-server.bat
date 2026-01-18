@echo off
echo ====================================
echo   KHOI DONG WEB SERVER - QUY LOP
echo ====================================
echo.
echo Dang khoi dong server tai: http://localhost:8000
echo Nhan Ctrl+C de dung server
echo.
cd ..\backend
C:\xampp\php\php.exe artisan serve --host=localhost --port=8000
pause
