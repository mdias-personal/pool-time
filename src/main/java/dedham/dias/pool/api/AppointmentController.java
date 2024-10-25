/* (C)2024 */
package dedham.dias.pool.api;

import dedham.dias.pool.configuration.Constants;
import dedham.dias.pool.dto.ApptCreationRequestDTO;
import dedham.dias.pool.dto.ApptUpdateRequestDTO;
import dedham.dias.pool.model.Appointment;
import dedham.dias.pool.model.User;
import dedham.dias.pool.service.AppointmentService;
import dedham.dias.pool.service.TextService;
import dedham.dias.pool.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "APPTS", description = "Controls the appointments of the website")
@RestController("appts-controller")
@RequestMapping(path = "/appts")
public class AppointmentController {

  private final AppointmentService apptService;
  private final UserService userService;
  private final TextService textService;

  public AppointmentController(
      final AppointmentService apptService,
      final UserService userService,
      final TextService textService) {
    this.apptService = apptService;
    this.userService = userService;
    this.textService = textService;
  }

  @Operation(summary = "Gets all apointments", description = "Retrieves all appointment records")
  @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
  List<Appointment> getAppoinments(
      @RequestParam(required = false) @Valid final LocalDate start,
      @RequestParam(required = false) @Valid LocalDate end) {
    return this.apptService.searchAppointments(start, end);
  }

  @Operation(
      summary = "Gets a user's appointments",
      description = "Retrieves a given user's appointment records")
  @GetMapping(path = "/{userid}", produces = MediaType.APPLICATION_JSON_VALUE)
  List<Appointment> getUserAppoinments(
      @PathVariable("userid") final UUID userid,
      @RequestParam(required = false) @Valid final LocalDate start,
      @RequestParam(required = false) @Valid LocalDate end) {
    return this.apptService.searchAppointments(userid, start, end);
  }

  @Operation(
      summary = "Creates an appointment",
      description = "Creates an intial unapproved appointment")
  @PostMapping(
      path = "/{userid}",
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  ResponseEntity<Appointment> createAppointment(
      @PathVariable("userid") final UUID userid,
      @RequestBody @Valid final ApptCreationRequestDTO request) {
    log.warn(request.toString());
    Appointment result = this.apptService.createAppointment(userid, request);
    if (result != null) {
      User submitter = this.userService.getUser(userid);
      List<User> admins = this.userService.getAdminUsers();
      admins.forEach(
          admin -> {
            textService.sendNewApptMessage(admin.getPnumber(), submitter.getFName());
          });
      return ResponseEntity.ok(result);
    } else {
      return ResponseEntity.badRequest().body(result);
    }
  }

  @Operation(
      summary = "Updates an appointment",
      description = "Updates the appointment with any of the fields given")
  @PutMapping(path = "/{apptid}")
  HttpStatus updateAppointment(
      @RequestBody @Valid final ApptUpdateRequestDTO request,
      @PathVariable("apptid") final UUID apptid) {
    log.warn(request.toString());
    Appointment result = this.apptService.updateAppointment(request, apptid);
    if (result != null) {
      String alertAction = request.getActionAlert();
      if (alertAction != null) {
        User submitter = this.userService.getUser(result.getOwnerid());
        if (alertAction.equals(Constants.APPROVE_APPT)) {
          textService.sendApptUpdateMessage(
              submitter.getPnumber(), submitter.getFName(), result.getStart(), true);
        } else if (alertAction.equals(Constants.EDIT_APPT)) {
          List<User> admins = this.userService.getAdminUsers();
          admins.forEach(
              admin -> {
                textService.sendEditApptMessage(admin.getPnumber(), submitter.getFName());
              });
        }
      }
      return HttpStatus.OK;
    } else {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Operation(summary = "Deletes an appointment", description = "Deletes a given appt based on ID")
  @DeleteMapping(path = "/{apptid}")
  HttpStatus deleteAppointment(@PathVariable("apptid") final UUID apptid) {
    Appointment appt = this.apptService.getAppointment(apptid);
    UUID result = this.apptService.deleteAppointment(apptid);
    if (result != null) {
      User submitter = this.userService.getUser(appt.getOwnerid());
      textService.sendApptUpdateMessage(
          submitter.getPnumber(), submitter.getFName(), appt.getStart(), false);
      return HttpStatus.OK;
    } else {
      return HttpStatus.BAD_REQUEST;
    }
  }
}
