@echo off
echo ======================================================
echo   KHOI PHUC DU LIEU (RESTORE DATABASE)
echo ======================================================
echo.

:: Hien thi danh sach file backup
echo Danh sach file backup:
echo.
dir ..\database\backups\*.sql /b
echo.

:: Nhap ten file backup
set /p filename="Nhap ten file backup (hoac enter de dung du_lieu_quylop.sql): "
if "%filename%"=="" set filename=du_lieu_quylop.sql

:: Kiem tra file backup co ton tai khong
if not exist "..\database\backups\%filename%" (
    echo [LOI] Khong tim thay file %filename%
    echo Vui long kiem tra lai ten file.
    pause
    exit
)

:: Tao database neu chua co
echo Dang tao database neu chua co...
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS quylop;"

:: Nap du lieu
echo Dang nap du lieu tu file: %filename% ...
C:\xampp\mysql\bin\mysql.exe -u root quylop < ..\database\backups\%filename%

if %errorlevel% neq 0 (
    echo [LOI] Co loi xay ra khi khoi phuc!
) else (
    echo [OK] DA KHOI PHUC THANH CONG!
    echo Du lieu da duoc nap vao XAMPP o may nay.
)

pause
