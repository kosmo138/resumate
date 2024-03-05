package resumate.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping(value = "/test", produces = "application/json")
    public String getTest() {
        JsonObject response = new JsonObject();
        response.addProperty("message", "GET response from SpringBoot");
        return response.toString();
    }

    @PostMapping(value = "/test", produces = "application/json")
    public String postTest() {
        JsonObject response = new JsonObject();
        response.addProperty("message", "POST response from SpringBoot");
        return response.toString();
    }
}
