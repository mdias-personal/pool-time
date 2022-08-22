package dedham.dias.pool.api;

import java.util.List;

import javax.validation.Valid;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dedham.dias.pool.dto.UserCreationRequestDTO;
import dedham.dias.pool.dto.UserSearchRequestDTO;
import dedham.dias.pool.model.User;
import dedham.dias.pool.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "USERS", description = "Controllers the users of the website")
@RestController("users-controller")
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Gets users", description = "Retrieves user records")
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    List<User> getUsers(@ParameterObject @Valid final UserSearchRequestDTO request) {
        return this.userService.searchUsers(request);
    }

    @Operation(summary = "Logs in users", description = "checks the email/pass combo for validness")
    @GetMapping(path = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<User> login(@Parameter @Valid final String email, @Parameter @Valid String password) {
        User result = this.userService.attemptLogin(email, password);
        if (result != null) {
            if(result.getApproved()) {
                return ResponseEntity.ok(result);
            }
            else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @Operation(summary = "Creates a user", description = "Creates an initial unapproved user")
    @PostMapping(path = "", consumes =MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<User> getUsers(@RequestBody @Valid final UserCreationRequestDTO request) {
        log.warn(request.toString());
        User result = this.userService.createUser(request);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}