package dedham.dias.pool.api;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import dedham.dias.pool.dto.ApptCreationRequestDTO;
import dedham.dias.pool.dto.ApptSearchRequestDTO;
import dedham.dias.pool.model.Appointment;
import dedham.dias.pool.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "APPTS", description = "Controls the appointments of the website")
@RestController("appts-controller")
@RequestMapping(path = "/appts")
public class AppointmentController {

    private final AppointmentService apptService;

    @Autowired
    public AppointmentController(final AppointmentService apptService) {
        this.apptService = apptService;
    }

    @Operation(summary = "Gets appointments", description = "Retrieves appointment records")
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    List<Appointment> getAppoinments(@ParameterObject @Valid final ApptSearchRequestDTO request) {
        return this.apptService.searchAppointments(request);
    }

    @Operation(summary = "Creates an appointment", description = "Creates an intial unapproved appointment")
    @PostMapping(path = "/{userid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Appointment> createAppointment(@PathVariable("userid") final UUID userid,
            @RequestBody @Valid final ApptCreationRequestDTO request) {
        log.warn(request.toString());
        Appointment result = this.apptService.createAppointment(userid, request);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}
