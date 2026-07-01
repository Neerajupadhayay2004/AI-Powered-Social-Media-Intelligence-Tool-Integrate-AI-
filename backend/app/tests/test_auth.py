from fastapi.testclient import TestClient

from app.main import app
from app.database.base import SessionLocal, Base, engine
from app.models.domain import Role

client = TestClient(app)


def setup_module() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    db.add(Role(name="admin", description="Administrator"))
    db.add(Role(name="viewer", description="Viewer"))
    db.commit()
    db.close()


def test_register_and_login() -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={"email": "user@example.com", "username": "user", "password": "StrongPass123"},
    )
    assert response.status_code == 201

    login = client.post(
        "/api/v1/auth/login",
        json={"email": "user@example.com", "password": "StrongPass123"},
    )
    assert login.status_code == 200
    assert "access_token" in login.json()
