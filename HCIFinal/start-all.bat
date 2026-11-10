@echo off
title Student MS - Launcher
echo Starting Student Management System...
start "Student MS - Backend" cmd /k "%~dp0run-backend.bat"
timeout /t 2 /nobreak >nul
start "Student MS - Frontend" cmd /k "%~dp0run-frontend.bat"
echo.
echo Both servers have been launched!
echo - Frontend: http://localhost:3000
echo - Backend API: http://127.0.0.1:8000
echo.
