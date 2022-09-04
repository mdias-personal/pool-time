package dedham.dias.pool.api;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dedham.dias.pool.dto.UserCreationRequestDTO;
import dedham.dias.pool.dto.UserSearchRequestDTO;
import dedham.dias.pool.dto.UserUpdateRequestDTO;
import dedham.dias.pool.model.User;
import dedham.dias.pool.service.UserService;
import dedham.dias.pool.util.TextUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "USERS", description = "Controls the users of the website")
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
            if (result.getApproved()) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @Operation(summary = "Creates a user", description = "Creates an initial unapproved user")
    @PostMapping(path = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<User> getUsers(@RequestBody @Valid final UserCreationRequestDTO request) {
        User result = this.userService.createUser(request);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @Operation(summary = "Updates a user", description = "Updates the user with any of the fields given")
    @PutMapping(path = "/{userid}")
    HttpStatus updateUser(@RequestBody @Valid final UserUpdateRequestDTO request,
            @PathVariable("userid") final UUID userid) {
        log.warn(request.toString());
        User result = this.userService.updateUser(request, userid);
        if (result != null) {
            if (request.getSendApprovalAlert()) {
                TextUtils.sendMessage(result.getPnumber(), "Congrats " + result.getFName()
                        + "! your request for http://dedham-pool.online:82 has been approved! Lou wants to see you at the pool. Login and start making requests!");
            }
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Operation(summary = "Deletes a user", description = "Deletes a given user based on ID")
    @DeleteMapping(path = "/{userid}")
    HttpStatus deleteUser(@PathVariable("userid") final UUID userid) {
        User user = this.userService.getUser(userid);
        if (user == null) {
            return HttpStatus.BAD_REQUEST;
        } else {
            this.userService.deleteUser(user.getId());
            TextUtils.sendMessage(user.getPnumber(), "Sorry " + user.getFName()
                    + " but your request for http://dedham-pool.online:82 has been denied! Better luck next time.");
            return HttpStatus.OK;
        }
    }
}