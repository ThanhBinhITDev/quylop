@echo off
echo ======================================================
echo   DANG SAO LUU DU LIEU (BACKUP DATABASE)
echo ======================================================
echo.

:: Kiem tra mysqldump co ton tai khong
if not exist "C:\xampp\mysql\bin\mysqldump.exe" (
    echo [LOI] Khong tim thay C:\xampp\mysql\bin\mysqldump.exe
    echo Ban co cai XAMPP o o dia C: khong?
    pause
    exit
)

:: Thuc hien backup
echo Dang luu du lieu vao file: du_lieu_quylop.sql ...
C:\xampp\mysql\bin\mysqldump.exe -u root quylop > du_lieu_quylop.sql

if %errorlevel% neq 0 (
    echo [LOI] Co loi xay ra khi backup!
) else (
    echo [OK] DA SAO LUU THANH CONG!
    echo.
    echo Bay gio ban chi can copy thu muc nay sang may khac.
    echo Sang may moi, chay file KHOI_PHUC_DU_LIEU.bat la xong.
)

pause
