from openai import OpenAI
from dotenv import load_dotenv
import pandas as pd

def classification(recruitment: dict) -> dict:
    directory = 'data/job_categories.csv'
    df = pd.read_csv(directory)
    job_category_detail = df['상세 직무 분류'].to_list()
    job_category_main = df['메인 직무 분류'].to_list()
    # open_api_key 환경변수 불러오기
    load_dotenv()
    client = OpenAI()

    if recruitment['jobTask']:
        job_title = recruitment['title'] + ' ' + recruitment['jobTask']
    else:
        job_title = recruitment['title']

    # 프롬프트 생성: GPT가 job_codes 중 하나만 선택하도록 명확하게 지시합니다.
    user_message = (
        f"다음 직무 제목에 해당하는 job code를 아래 목록에서 직업을 가장 잘 설명하는 하나만 선택하여 출력하세요.\n"
        f"직무 제목: {job_title}\n"
        f"job code 목록: {job_category_detail}\n"
        "출력은 오직 job code 하나만 포함해야 하며, 추가 텍스트나 설명 없이 코드만 출력해주세요."
    )

    # system 메시지로 역할을 지정해 줄 수 있습니다.
    messages = [
        {"role": "system", "content": "너는 직무 분류 전문가이다."},
        {"role": "user", "content": user_message}
    ]

    completion = client.chat.completions.create(
        model="gpt-4o-mini-2024-07-18",
        messages=messages
    )
    
    sub_category = completion.choices[0].message.content
    
    if sub_category not in job_category_detail:
        print(f"sub_category={sub_category} not in job_category_list")
        return None

    main_category = df[df['상세 직무 분류'] == sub_category]['메인 직무 분류'].iloc[0]
    
    recruitment['job'] = main_category
    recruitment['jobDetail'] = sub_category
    # jobTask는 병무청 데이터에만 있기 때문에 사람인 데이터도 같은 테이블에서 사용하려면 pop해주어야함.
    recruitment.pop('jobTask', None)
    return recruitment