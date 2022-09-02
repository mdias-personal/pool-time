package dedham.dias.pool.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import dedham.dias.pool.dto.ApptCreationRequestDTO;
import dedham.dias.pool.dto.ApptSearchRequestDTO;
import dedham.dias.pool.model.Appointment;
import dedham.dias.pool.model.User;
import dedham.dias.pool.persistence.AppointmentRepository;
import dedham.dias.pool.persistence.UserRepository;

@Service
final public class AppointmentService {
    private final AppointmentRepository apptRepo;
    private final UserRepository userRepo;

    public AppointmentService(final AppointmentRepository apptRepo, final UserRepository userRepo) {
        this.apptRepo = apptRepo;
        this.userRepo = userRepo;
    }

    public List<Appointment> searchAppointments(ApptSearchRequestDTO request) {
        return request.isEmpty() ? apptRepo.findAll() : apptRepo.findAll(getExampleAppt(request));
    }

    private Example<Appointment> getExampleAppt(ApptSearchRequestDTO request) {
        final Appointment appt = new Appointment();
        User user = new User();
        user.setId(request.getUserUuid());
        appt.setOwner(user);
        return Example.of(appt);
    }

    public Appointment createAppointment(UUID userid, ApptCreationRequestDTO request) {
        Appointment appt = new Appointment();
        Optional<User> user = userRepo.findById(userid);
        appt.setId(UUID.randomUUID());
        appt.setOwner(user.isPresent() ? user.get() : null);
        appt.setApproved(false);
        appt.setStart(request.getStart());
        appt.setEnd(request.getEnd());
        return apptRepo.save(appt);
    }

}
