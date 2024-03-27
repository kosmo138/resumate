package resumate.server.controller;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resumate.server.service.ResumeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
public class ResumeController {
    private final ResumeService resumeService;

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<String> getResume(@RequestHeader("authorization") String bearer) {
        return resumeService.selectResumeHead(bearer);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> getResumeById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return resumeService.selectResumeBody(bearer, id);
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postResume(@RequestHeader("authorization") String bearer,
            @RequestBody String resume) {
        return resumeService.insertResume(bearer, resume);
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> patchResumeById(@RequestHeader("authorization") String bearer,
            @RequestBody String resume, @PathVariable("id") int id) {
        return resumeService.updateResume(bearer, resume, id);
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deleteResumeById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return resumeService.deleteResume(bearer, id);
    }
}