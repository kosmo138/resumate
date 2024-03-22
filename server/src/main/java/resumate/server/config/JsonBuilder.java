package resumate.server.config;

import java.util.HashMap;

import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonBuilder {
    private HashMap<String, Object> jsonObject;

    public JsonBuilder() {
        jsonObject = new HashMap<>();
    }

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
        return builder.toString();
    }
}
