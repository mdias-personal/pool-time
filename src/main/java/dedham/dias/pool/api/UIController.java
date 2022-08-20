package dedham.dias.pool.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dedham.dias.pool.util.FileUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "ROOT", description = "Displays the UI")
@RestController("ui-controller")
@RequestMapping(path = "/")
public class UIController {

    @Operation(summary = "Displays the UI", description = "Displays the UI")
    @GetMapping(path = "", produces = MediaType.TEXT_HTML_VALUE)
    String get() {
        return FileUtils.getResourceFileContentAsString("templates/index.html");
    }
}