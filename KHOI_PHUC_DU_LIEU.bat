@echo off
echo ======================================================
echo   DANG KHOI PHUC DU LIEU (RESTORE DATABASE)
echo ======================================================
echo.

:: Kiem tra file backup co ton tai khong
if not exist "du_lieu_quylop.sql" (
    echo [LOI] Khong tim thay file du_lieu_quylop.sql
    echo Vui long chay file SAO_LUU_DU_LIEU.bat o may cu truoc.
    pause
    exit
)

:: Tao database neu chua co
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS quylop;"

:: Nap du lieu
echo Dang nap du lieu tu file: du_lieu_quylop.sql ...
C:\xampp\mysql\bin\mysql.exe -u root quylop < du_lieu_quylop.sql

if %errorlevel% neq 0 (
    echo [LOI] Co loi xay ra khi khoi phuc!
) else (
    echo [OK] DA KHOI PHUC THANH CONG!
    echo Du lieu da duoc nap vao XAMPP o may nay.
)

pause
