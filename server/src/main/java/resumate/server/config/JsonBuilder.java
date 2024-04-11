package resumate.server.config;

import java.util.Map;
import java.util.LinkedHashMap;

import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonBuilder {
    private Map<String, String> jsonObject;

    public JsonBuilder() {
        jsonObject = new LinkedHashMap<String, String>();
    }

    public JsonBuilder put(String key, String value) {
        this.jsonObject.put(key, value);
        return this;
    }

<<<<<<< HEAD
    public String build() { // JSON 형식의 문자열을 빌드하는 메서드 , 반환값은 JSON형식의 문자열
=======
    public String build() { 
>>>>>>> origin/dev
        StringBuilder builder = new StringBuilder();
        builder.append("{"); // 객체의 시작을 표시하는 { 문자열 추가 : 제이슨 객체의 시작을 나타내는 기호를 빌더에 추가
        for (String key : jsonObject.keySet()) { // JSON객체의 각 키-값 쌍에 대한 순회: jsonObject에 있는 키-값 쌍을 반복하면서 처리합니다.
            builder.append("\"").append(key).append("\": ");
            Object value = jsonObject.get(key);
            if (value instanceof String) {
                builder.append("\"").append(value).append("\"");
            } else {
                builder.append(value);
            }
            builder.append(", ");
        }
<<<<<<< HEAD
        //각 키를 빌더에 추가한다.
        //해당 키에 해당하는 값이 문자열인 경우, 큰따옴표로 감싼 문자열을 추가로 합니다.
        // 그렇지 않으면 그대로 추가
        // 각 키-값 쌍 사이에는 쉽표를 추가하여 구분한다.

        builder.delete(builder.length() - 2, builder.length()); // 마지막 쉽표 제거
        builder.append("}"); //객체의 끝을 나타내는  } 문자열을 빌더에 추가
        final String str = builder.toString(); // 최동 문자열로 변환하고 초기화
        //빌더에 있는 문자열을 최종 문자열로 변환하고, jsonObject로 초기화
        jsonObject.clear();//호출 후에는 내부의 jsonObject가 비워진다.
=======
        
        builder.delete(builder.length() - 2, builder.length());
        builder.append("}");
        final String str = builder.toString();
        jsonObject.clear();
>>>>>>> origin/dev
        return str;
    }
}
