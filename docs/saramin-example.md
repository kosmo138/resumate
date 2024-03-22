# 사람인 API 요청 예제 코드

URL url = new URL(urlStr);

// URL 연결 (웹페이지 URL 연결.)

conn = (HttpURLConnection)url.openConnection();

// 요청 방식 선택 (GET, POST)

conn.setRequestMethod("GET");

// 서버 Response Data를 JSON 형식의 타입으로 요청.

conn.setRequestProperty("Accept", "application/json");

int responseCode = conn.getResponseCode();

//사람인 API 요청 헤더 예제