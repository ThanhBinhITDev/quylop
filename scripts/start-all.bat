@echo off
echo ======================================================
echo   KHOI DONG SERVER QUY LOP (LARAVEL)
echo ======================================================
echo.

:: Them PHP cua XAMPP vao moi truong chay tam thoi
set PATH=C:\xampp\php;%PATH%

:: Kiem tra xem PHP co hoat dong khong
php -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Khong tim thay PHP tai C:\xampp\php
    echo Vui long kiem tra lai duong dan XAMPP
    pause
    exit
)

:: Di chuyen vao thu muc backend va chay server
cd ..\backend
echo Dang chay lenh: php artisan serve...
echo Truy cap trang web tai: http://localhost:8000
echo.
php artisan serve

pause
