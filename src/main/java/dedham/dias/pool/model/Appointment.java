package dedham.dias.pool.model;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "appointment")
@Table(name = "appointment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

    @Id
    private UUID id;
    @Column(name ="owneruuid")
    private UUID ownerid;

    @Column(name = "start_date")
    private LocalDate start;
    @Column(name = "end_date")
    private LocalDate end;
    private Boolean approved;
}