package dedham.dias.pool.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dedham.dias.pool.model.Snack;
import dedham.dias.pool.service.SnackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "snacks", description = "Controls the snacks of the website")
@RestController("snacks-controller")
@RequestMapping(path = "/snacks")
public class SnackController {

    private final SnackService snackService;

    @Autowired
    public SnackController(final SnackService snackService) {
        this.snackService = snackService;
    }

    @Operation(summary = "Gets all apointments", description = "Retrieves all snack records")
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    List<Snack> getSnacks() {
        return this.snackService.getSnacks();
    }

}