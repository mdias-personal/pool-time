/* (C)2024 */
package dedham.dias.pool.api;

import dedham.dias.pool.model.Snack;
import dedham.dias.pool.service.SnackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "snacks", description = "Controls the snacks of the website")
@RestController("snacks-controller")
@RequestMapping(path = "/snacks")
public class SnackController {

  private final SnackService snackService;

  public SnackController(final SnackService snackService) {
    this.snackService = snackService;
  }

  @Operation(summary = "Gets all apointments", description = "Retrieves all snack records")
  @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
  List<Snack> getSnacks() {
    return this.snackService.getSnacks();
  }
}
