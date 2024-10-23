/* (C)2024 */
package dedham.dias.pool.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "appointment")
@Table(name = "appointment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

  @Id private UUID id;

  @Column(name = "owneruuid")
  private UUID ownerid;

  @Column(name = "start_date")
  private Date start;

  @Column(name = "end_date")
  private Date end;

  private Boolean approved;

  @ElementCollection
  @CollectionTable(name = "appointment_guest", joinColumns = @JoinColumn(name = "appointmentid"))
  @Column(name = "guestid")
  private List<UUID> guests;

  @ManyToMany
  @JoinTable(
      name = "appointment_snack",
      joinColumns = @JoinColumn(name = "appointmentid"),
      inverseJoinColumns = @JoinColumn(name = "snackid"))
  private List<Snack> snacks;
}
