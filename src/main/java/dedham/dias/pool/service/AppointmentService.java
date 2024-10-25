/* (C)2024 */
package dedham.dias.pool.service;

import dedham.dias.pool.dto.ApptCreationRequestDTO;
import dedham.dias.pool.dto.ApptUpdateRequestDTO;
import dedham.dias.pool.model.Appointment;
import dedham.dias.pool.model.Snack;
import dedham.dias.pool.persistence.AppointmentRepository;
import dedham.dias.pool.persistence.SnackRepository;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public final class AppointmentService {
  private final AppointmentRepository apptRepo;
  private final SnackRepository snackRepo;

  public AppointmentService(final AppointmentRepository apptRepo, final SnackRepository snackRepo) {
    this.apptRepo = apptRepo;
    this.snackRepo = snackRepo;
  }

  public List<Appointment> searchAppointments(UUID userid, LocalDate start, LocalDate end) {
    return (userid == null && start == null && end == null)
        ? apptRepo.findAll()
        : apptRepo.findAll(getExampleAppt(userid));
  }

  public List<Appointment> searchAppointments(LocalDate start, LocalDate end) {
    return apptRepo.findAll();
  }

  private Example<Appointment> getExampleAppt(UUID userid) {
    final Appointment appt = new Appointment();
    appt.setOwnerid(userid);
    return Example.of(appt);
  }

  public Appointment createAppointment(UUID userid, ApptCreationRequestDTO request) {
    Appointment appt = new Appointment();
    appt.setId(UUID.randomUUID());
    appt.setOwnerid(userid);
    appt.setApproved(false);
    appt.setStart(request.getStart());
    appt.setEnd(request.getEnd());
    appt.setGuests(request.getGuests());
    appt.setSnacks(getSnacksFromNames(request.getSnacks()));
    return apptRepo.save(appt);
  }

  private List<Snack> getSnacksFromNames(List<String> names) {
    List<Snack> result = new ArrayList<Snack>();
    List<Snack> newSnacks = new ArrayList<Snack>();

    HashMap<String, Snack> dbMap = new HashMap<String, Snack>();
    snackRepo
        .findAll()
        .forEach(
            snack -> {
              dbMap.put(snack.getName(), snack);
            });

    names.forEach(
        name -> {
          Snack dbSnack = dbMap.get(name);

          if (dbSnack != null) {
            result.add(dbSnack);
          } else {
            newSnacks.add(new Snack(UUID.randomUUID(), name));
          }
        });

    result.addAll(snackRepo.saveAll(newSnacks));

    return result;
  }

  public UUID deleteAppointment(UUID apptid) {
    apptRepo.deleteById(apptid);
    return apptid;
  }

  public Appointment updateAppointment(@Valid ApptUpdateRequestDTO request, UUID apptid) {
    Optional<Appointment> maybeAppt = apptRepo.findById(apptid);
    if (maybeAppt.isPresent()) {
      Appointment appt = maybeAppt.get();
      appt.setId(apptid);
      if (request.getApproved() != null) {
        appt.setApproved(request.getApproved());
      }
      if (request.getStart() != null) {
        appt.setStart(request.getStart());
      }
      if (request.getEnd() != null) {
        appt.setEnd(request.getEnd());
      }
      if (request.getGuests() != null) {
        appt.setGuests(request.getGuests());
      }
      if (request.getSnacks() != null) {
        appt.setSnacks(getSnacksFromNames(request.getSnacks()));
      }
      return apptRepo.save(appt);
    } else {
      return null;
    }
  }

  public Appointment getAppointment(UUID apptid) {
    Optional<Appointment> appt = apptRepo.findById(apptid);
    return appt.isPresent() ? appt.get() : null;
  }
}
