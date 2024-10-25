/* (C)2024 */
package dedham.dias.pool.persistence;

import dedham.dias.pool.model.Appointment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {}
