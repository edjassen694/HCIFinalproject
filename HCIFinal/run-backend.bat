@echo off
title Student MS - Backend (Laravel 12)
set "PATH=%PATH%;C:\tools\php"
cd /d "%~dp0backend"
echo ========================================================
echo Starting Laravel 12 Backend API on http://127.0.0.1:8000
echo ========================================================
php artisan serve --port=8000
