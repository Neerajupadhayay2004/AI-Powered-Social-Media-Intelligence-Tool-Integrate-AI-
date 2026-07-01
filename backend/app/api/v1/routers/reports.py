from fastapi import APIRouter, Depends, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import Analysis, Report, User
from app.security.auth import get_current_user
from app.services.report_service import ReportService

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("", status_code=status.HTTP_201_CREATED)
def create_report(analysis_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> dict[str, str]:
    analysis = db.get(Analysis, analysis_id)
    if not analysis or analysis.user_id != current_user.id:
        raise ValueError("Analysis not found")

    report_service = ReportService()
    file_path = report_service.generate_pdf(analysis, f"Report for {analysis.id}")
    report = Report(user_id=current_user.id, analysis_id=analysis.id, title="Generated Report", report_type="pdf", file_path=file_path)
    db.add(report)
    db.commit()
    return {"message": "Report generated", "file_path": file_path}


@router.get("", response_model=list[dict])
def list_reports(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[dict]:
    reports = db.query(Report).filter(Report.user_id == current_user.id).all()
    return [{"id": report.id, "title": report.title, "report_type": report.report_type, "file_path": report.file_path, "created_at": report.created_at} for report in reports]


@router.get("/{report_id}")
def get_report(report_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> FileResponse:
    report = db.get(Report, report_id)
    if not report or report.user_id != current_user.id:
        raise ValueError("Report not found")
    return FileResponse(report.file_path)
