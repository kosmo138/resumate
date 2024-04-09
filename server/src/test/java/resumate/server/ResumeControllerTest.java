package resumate.server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.RequiredArgsConstructor;
import resumate.server.controller.ResumeController;
import resumate.server.service.ResumeService;

@WebMvcTest(ResumeController.class)
@RequiredArgsConstructor
public class ResumeControllerTest {
    @MockBean
    private ResumeService resumeService;
    private MockMvc mockMvc;

    @Test
    public void testGetResume() {
        String url = "/api/resume/";
        String jwt = "Bearer {TEST_JWT}";
        try {
            mockMvc.perform(MockMvcRequestBuilders.get(url).header("authorization", jwt)).andExpect(status().isOk());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
