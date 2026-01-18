@echo off
echo ======================================================
echo   KHOI DONG FRONTEND - QUY LOP
echo ======================================================
echo.

:: Kiem tra xem co Python khong
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Dang khoi dong server voi Python...
    echo Truy cap trang web tai: http://localhost:3000
    echo Nhan Ctrl+C de dung server
    echo.
    cd frontend
    python -m http.server 3000
) else (
    echo [CANH BAO] Python chua duoc cai dat.
    echo Vui long mo file index.html truc tiep hoac:
    echo 1. Cai dat Python tu https://python.org
    echo 2. Cai dat extension "Live Server" trong VS Code
    echo.
    pause
    
    :: Mo file index.html bang trinh duyet mac dinh
    echo Mo file index.html bang trinh duyet...
    start frontend\index.html
)

pause
