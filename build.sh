echo "Build frontend/admin"
npm run build --prefix frontend/admin/

echo "Build frontend/public"
npm run build --prefix frontend/public/

echo "Build front-end Docker"
docker build ./frontend/. -t ghcr.io/testausserveri/qrpyora/frontend

echo "Build back-end Docker"
docker build ./backend/. -t ghcr.io/testausserveri/qrpyora/backend
