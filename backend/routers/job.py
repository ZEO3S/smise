from datetime import date
from fastapi import APIRouter
from sqlmodel import Session, select
from models.recruitments import Recruitment
from data.connection import get_session
from typing import Optional
from collections import defaultdict

import json

job_router = APIRouter(
    tags=["Job"]
)

@job_router.get("/")
def get_job_list(serviceType: Optional[str] = None):
    job = get_grouped_jobs_by_service_type()
    if not serviceType:
        serviceType = "전체"
    # 산업기능요원, 전문연구요원, 승선근무예비역 중에서 공고가 하나도 없는 경우.
    if serviceType not in job:
        job = dict()
        job["jobs"] = [{"category":f"현재 공고가 없습니다.", "details": ["없음"]}]
        return job
    return job[serviceType]

def get_grouped_jobs_by_service_type():
    # 세션을 가져옵니다.
    session = next(get_session())
    # 날짜 지난 데이터의 카테고리는 안뽑기위함.
    today = date.today()
    # 그룹핑을 위한 이중 defaultdict 생성
    grouped = defaultdict(lambda: defaultdict(set))

    # Recruitment 테이블에서 serviceType, job, jobDetail을 선택
    statement = (
        select(Recruitment.serviceType, Recruitment.job, Recruitment.jobDetail)
        .where(Recruitment.expirationDate >= today)
    )
    rows = session.exec(statement).all()

    # 각 행에 대해 group을 만듭니다.
    for service_type, job, job_detail in rows:
        # 해당 service_type에 대한 job 그룹에 job_detail을 추가
        grouped[service_type][job].add(job_detail)
        # "전체" 항목에도 같은 데이터를 추가 (모든 서비스 타입 포함)
        grouped["전체"][job].add(job_detail)

    # 최종 JSON 형태로 가공합니다.
    final_result = {}
    for service_type, jobs in grouped.items():
        final_result[service_type] = {
            "jobs": [
                {
                    "category": job,
                    "details": sorted(list(details))
                }
                for job, details in jobs.items()
            ]
        }

    return final_result

# detail_to_job = {}

# @job_router.on_event("startup")
# def set_detail_to_job():
#     global detail_to_job
#     with open("data/job.json", 'r') as f:
#         job = json.load(f)
#     for type in job:
#         for j in job[type]["jobs"]:
#             for detail in j["details"]:
#                 detail_to_job[detail] = j["category"]
