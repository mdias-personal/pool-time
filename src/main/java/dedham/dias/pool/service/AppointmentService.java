package dedham.dias.pool.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import dedham.dias.pool.dto.ApptCreationRequestDTO;
import dedham.dias.pool.dto.ApptUpdateRequestDTO;
import dedham.dias.pool.model.Appointment;
import dedham.dias.pool.persistence.AppointmentRepository;

@Service
final public class AppointmentService {
    private final AppointmentRepository apptRepo;

    public AppointmentService(final AppointmentRepository apptRepo) {
        this.apptRepo = apptRepo;
    }

    public List<Appointment> searchAppointments(UUID userid, LocalDate start, LocalDate end) {
        return (userid == null && start == null && end == null) ? apptRepo.findAll()
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
        return apptRepo.save(appt);
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
            return apptRepo.save(appt);
        } else {
            return null;
        }
    }

}
