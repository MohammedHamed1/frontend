@echo off
echo ========================================
echo    PayPass Full System Launcher
echo ========================================
echo.

echo 🚀 Starting Backend Server...
start "Backend" cmd /k "cd paypass-backend-main && npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo ⏳ Waiting for frontend to start...
timeout /t 3 /nobreak >nul

echo 📊 Starting Admin Dashboard...
start "Admin Dashboard" cmd /k "cd frontend/paypass-admin-dashboard && npm run dev"

echo ⏳ Waiting for dashboard to start...
timeout /t 5 /nobreak >nul

echo 🌍 Opening applications in browser...
start http://localhost:5000
start http://localhost:3000
start http://localhost:3001

echo.
echo ✅ All services started successfully!
echo.
echo 📍 URLs:
echo    Backend:     http://localhost:5000
echo    Frontend:    http://localhost:3000
echo    Dashboard:   http://localhost:3001
echo.
echo Press any key to exit...
pause >nul 