/* (C)2024 */
package dedham.dias.pool.model;

import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "snack")
@Table(name = "snack")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Snack {

  @Id private UUID id;
  private String name;
  private String type;

  public Snack(UUID id, String name) {
    this.id = id;
    this.name = name;
  }

  public String toString() {
    return "Snack: " + id.toString() + "\n" + name;
  }
}
