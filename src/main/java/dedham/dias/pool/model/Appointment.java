/* (C)2024 */
package dedham.dias.pool.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
