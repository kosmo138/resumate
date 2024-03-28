package resumate.server.config;

import java.util.Map;
import java.util.LinkedHashMap;

import org.springframework.context.annotation.Configuration;

// 1차원의 JSON 문자열을 생성하는 클래스, Builder 패턴 적용
@Configuration
public class JsonBuilder {
    private Map<String, Object> jsonObject;

    // LinkedHashMap을 사용하여 데이터의 삽입 순서를 보장
    public JsonBuilder() {
        jsonObject = new LinkedHashMap<>();
    }

    // key-value 쌍을 추가
    public JsonBuilder put(String key, Object value) {
        this.jsonObject.put(key, value);
        return this;
    }

    public String build() {
        StringBuilder builder = new StringBuilder();
        builder.append("{");
        for (String key : jsonObject.keySet()) {
            builder.append("\"").append(key).append("\": ");
            Object value = jsonObject.get(key);
            if (value instanceof String) {
                builder.append("\"").append(value).append("\"");
            } else {
                builder.append(value);
            }
            builder.append(", ");
        }
        builder.delete(builder.length() - 2, builder.length());
        builder.append("}");
        final String str = builder.toString();
        jsonObject.clear();
        return str;
    }
}
