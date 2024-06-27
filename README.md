# 📝 Resumate

## 프로젝트 소개

### 데모 페이지

https://www.resumate.store/

**테스트 계정**

이메일: `1@test.com`

비밀번호: `1111`

### 기능 시연 영상

https://youtu.be/VJO9gFIWUFo

### 프로젝트 일정 및 역할

https://github.com/orgs/kosmo138/projects/1

각 인원의 기여 내용을 위의 링크를 통해 확인하실 수 있습니다.

### 발표 자료

https://bit.ly/3VZgZ9i

### Figma Design

https://bit.ly/4b09Iuj

### 개발 목적

1. 자기소개서를 작성하는 것이 어렵고 시간이 오래 걸린다는 일상 속 불편함이 있었습니다.

2. 이를 해결하기 위해 "AI가 자기소개서를 써 주면 편하지 않을까?" 생각에 본 프로젝트를 시작했습니다.

### 팀 내 공지사항

[NOTICE.md](/NOTICE.md)

프로젝트에서 사용하는 도구들의 개념과 사용 방법을 위의 문서에 정리했습니다.

## 참여 인원

### 김수영 [@suyons](https://github.com/suyons)

**역할**

- 아이디어 기획 및 일정 관리
- 프론트엔드: 랜딩 페이지 및 전체 프로토타입 작성
- 백엔드: 회원정보, 이력서, 자기소개서 CRUD 기능 전체
- 백엔드: 자기소개서 초안 생성 및 수정 기능 프로토타입 작성
- 초기 개발 환경 구축
- AWS 배포 설정

**브랜치**

- main
- dev
- feat/prototype

### 백소나 [@baeksona](https://github.com/baeksona)

**역할**

- 웹 스크랩: 회사 이름 입력 시 인재상 페이지 탐색
- 자연어 처리: 인재상 키워드를 추출 및 MySQL CRUD 연동
- 성능 개선: 질문 템플릿 수정을 통한 답변의 품질 개선

**브랜치**

- feat/web-scrap

### 이동준 [@mogri89](https://github.com/mogri89)

**역할**

- 이력서 편집 페이지 프론트엔드 구현
- 이력서 CRUD 기능 통합
- PDF 파일 출력, 자기소개서 추가 기능 구현
- 사이트 이용 관련 오류 및 기능구현 여부 확인

**브랜치**

- feat/resume-1

### 이수진 [@WGCAT](https://github.com/WGCAT)

**역할**

- 자기소개서 목록 및 편집 페이지 프론트엔드 뷰 구현
- 자기소개서 CRUD 기능 통합

**브랜치**

- feat/letter

### 이수현 [@SH2G](https://github.com/SH2G)

**역할**

- 로그인 화면 뷰 작성

**브랜치**

- feat/login-1

### 이준아 [@gliderjun](https://github.com/gliderjun)

**역할**

- 카카오 OAuth API 관리 및 환경 준비

**브랜치**

- feat/login-2

### 정유선 [@yousunning](https://github.com/yousunning)

**역할**

- 이력서 목록 페이지 프론트엔드 구현
- 이력서 CRUD 기능 통합
- 발표자료 준비
- 이력서 PDF 파일 출력 기능 구현

**브랜치**

- feat/resume-2

### 황태윤 [@taeyounh](https://github.com/taeyounh)

**역할**

- API 사용 방법 조사 및 타당성 검토
- Q&A 메뉴 페이지 내용 작성

**브랜치**

- feat/qna

## 공동 진행 작업

### 프론트엔드 UI 설계

**전체 인원**

전체 회의를 통해 UI 구성을 설계했습니다.

**김수영 [@suyons](https://github.com/suyons)**

Figma를 이용하여 랜딩 페이지와 목록 페이지를 구체화했습니다.

**정유선 [@yousunning](https://github.com/yousunning)**

Figma를 이용하여 이력서/자소서 작성, 채용공고 페이지를 구체화했습니다.

### UML 다이어그램 작성

#### Usecase

**이수진 [@WGCAT](https://github.com/WGCAT)**

요구사항을 정리한 이후, 전체 회의를 통해 유스케이스를 정리하였습니다.

**정유선 [@yousunning](https://github.com/yousunning)**

다이어그램 초안을 Draw.io를 이용하여 정리했습니다.

#### Package

**김수영 [@suyons](https://github.com/suyons)**

전체 인원이 시스템에 대한 포괄적인 이해를 할 수 있도록 아래의 패키지 다이어그램을 작성하여 전 인원에게 시스템을 설명하였습니다.

### 데이터베이스 설계

**전체 인원**
본인의 담당 기능을 구현함에 있어 필요한 테이블 및 컬럼을 정의하여 ERD 초안을 작성하였습니다.

**이수진 [@WGCAT](https://github.com/WGCAT)**

각 인원이 작성한 다이어그램 초안을 취합하여 아래의 초안을 작성하였습니다 (Ver. 1)

**김수영 [@suyons](https://github.com/suyons)**

ERD를 검토 및 수정하여 (Ver.2) AWS RDS에서 실행 중인 MySQL 데이터베이스에 반영했습니다.

## Diagram

### Package Diagram

![Package Diagram](/docs/diagram/package-diagram.svg)

### Usecase Diagram

![Usecase Diagram](/docs/diagram/usecase-diagram.svg)

### Entity-Relationship Diagram

**Ver. 1**

![E-R Diagram 1](/docs/diagram/er-diagram-1.png)

**Ver. 2**

![E-R Diagram 2](/docs/diagram/er-diagram-2.svg)

