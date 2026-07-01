from fastapi import APIRouter

from app.api.v1.routers.admin import router as admin_router
from app.api.v1.routers.analysis import router as analysis_router
from app.api.v1.routers.auth import router as auth_router
from app.api.v1.routers.dashboard import router as dashboard_router
from app.api.v1.routers.health import router as health_router
from app.api.v1.routers.history import router as history_router
from app.api.v1.routers.notifications import router as notifications_router
from app.api.v1.routers.reports import router as reports_router
from app.api.v1.routers.search import router as search_router
from app.api.v1.routers.threats import router as threats_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(analysis_router)
api_router.include_router(reports_router)
api_router.include_router(health_router)
api_router.include_router(dashboard_router)
api_router.include_router(notifications_router)
api_router.include_router(admin_router)
api_router.include_router(history_router)
api_router.include_router(search_router)
api_router.include_router(threats_router)
