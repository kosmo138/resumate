# 사람인 API 요청 예제 코드

```java
package kr.co.saramin.oapi;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/**
 * 사람인 채용공고 API 샘플
 */
public class Sample {

    public static void main(String[] args) {
        String accessKey = "accessKey"; // 발급받은 accessKey";

        try {
            String text = URLEncoder.encode("", "UTF-8");
            String apiURL = "https://oapi.saramin.co.kr/job-search?access-key="+accessKey+"&keyword="+ text;

            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json");

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            System.out.println(response.toString());
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```