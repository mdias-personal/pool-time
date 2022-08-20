package dedham.dias.pool.api;

import java.util.ArrayList;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "USER", description = "Controllers the users of the website")
@RestController("user-controller")
@RequestMapping(path = "/user")
public class UserController {

    @Operation(summary = "Gets users", description = "Retrieves user records")
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    ArrayList<String> getUser() {
        ArrayList<String> list = new ArrayList<String>();
        list.add("jeff");
        list.add("mike");
        list.add("lou");
        list.add("bitsy");
        return list;
    }
}