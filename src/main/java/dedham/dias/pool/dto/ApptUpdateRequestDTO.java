/* (C)2024 */
package dedham.dias.pool.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class ApptUpdateRequestDTO {
  private Boolean approved;

  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date start;

  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date end;

  private String actionAlert;
  private List<UUID> guests;
  private List<String> snacks;

  @Override
  public String toString() {
    return "ApptUpdateRequestDTO :\n"
        + this.start.toString()
        + "\n "
        + this.end.toString()
        + "\n"
        + this.approved.toString()
        + "\n"
        + guests.toString()
        + "\n"
        + snacks.toString();
  }
}
