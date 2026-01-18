@echo off
echo ======================================================
echo   SAO LUU DU LIEU (BACKUP DATABASE)
echo ======================================================
echo.

:: Kiem tra mysqldump co ton tai khong
if not exist "C:\xampp\mysql\bin\mysqldump.exe" (
    echo [LOI] Khong tim thay C:\xampp\mysql\bin\mysqldump.exe
    echo Ban co cai XAMPP o o dia C: khong?
    pause
    exit
)

:: Tao ten file backup voi timestamp
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
set filename=quylop_backup_%mydate%_%mytime%.sql

:: Thuc hien backup vao thu muc backups
echo Dang luu du lieu vao file: %filename% ...
C:\xampp\mysql\bin\mysqldump.exe -u root quylop > ..\database\backups\%filename%

if %errorlevel% neq 0 (
    echo [LOI] Co loi xay ra khi backup!
) else (
    echo [OK] DA SAO LUU THANH CONG!
    echo.
    echo File backup: database\backups\%filename%
    echo Bay gio ban co the copy file backup sang may khac.
)

pause
