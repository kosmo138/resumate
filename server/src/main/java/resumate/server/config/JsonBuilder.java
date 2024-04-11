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
