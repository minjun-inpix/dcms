# tdcms (Toy Project CMS)

이 프로젝트는 React(Vite)와 json-server를 활용하여 구축된 간단한 회원 및 콘텐츠 관리 시스템(CMS)입니다.

## 🚀 기술 스택

### Frontend (`/cms`)
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **State Management / Data Fetching:** `@tanstack/react-query` (React Query v5)
- **HTTP Client:** `axios`

### Backend (Mock API)
- **Tool:** `json-server`
- **Database:** `db.json`

---

## 💻 실행 방법

이 프로젝트는 프론트엔드와 백엔드(Mock API) 서버를 각각 실행해야 합니다.

### 1. 패키지 설치
각 폴더에서 의존성을 설치합니다.
```bash
# 프로젝트 루트 디렉토리에서 백엔드 의존성 설치
npm install

# cms 디렉토리에서 프론트엔드 의존성 설치 
cd cms
npm install
```

### 2. Mock API 서버 실행 (`json-server`)
루트 디렉토리에서 아래 명령어를 통해 포트 `4000`번으로 로컬 서버를 가동합니다.
```bash
npx json-server --watch db.json --port 4000
```
- API Endpoint: `http://localhost:4000`

### 3. Frontend 구동 (Vite)
`cms` 디렉토리에서 프론트엔드 개발 서버를 실행합니다.
```bash
cd cms
npm run dev
```
- Local URL: `http://localhost:5173` (기본 설정)

---

## 📂 주요 디렉토리 구조

```text
tdcms/
│
├── db.json               # json-server의 Mock 데이터베이스 파일
├── package.json          # 최상위 의존성 관리 파일
│
└── cms/                  # 프론트엔드(React) 소스 영역
    ├── src/
    │   ├── api/          # axios API 호출 함수들 (ex: userApi.ts)
    │   ├── hooks/        # 커스텀 훅 및 React Query 로직 (ex: useUsers.ts)
    │   ├── pages/        # 각 화면 페이지 컴포넌트 (ex: UserPage.tsx)
    │   ├── types/        # TypeScript 타입 정의 파일 (ex: user.ts)
    │   ├── App.tsx       # 메인 애플리케이션 컴포넌트
    │   └── main.tsx      # React 진입점 및 QueryClientProvider 세팅
    │
    ├── index.html
    └── package.json      # 프론트엔드(React앱) 의존성 관리 파일
```

## ✨ 주요 기능
- 회원 목록 조회 (`useQuery` 적용)
- 회원 정보 논리적 삭제(Soft Delete) 적용 (`useMutation` 및 `invalidateQueries` 사용)
