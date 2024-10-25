/* (C)2024 */
package dedham.dias.pool.dto;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@JsonInclude(NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public final class ApptCreationRequestDTO {
  @NotNull @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date start;

  @NotNull @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date end;

  private List<UUID> guests;
  private List<String> snacks;

  @Override
  public String toString() {
    return "ApptCreationRequestDTO :\n"
        + this.start.toString()
        + "\n "
        + this.end.toString()
        + "\n"
        + this.guests.toString()
        + "\n"
        + this.snacks.toString();
  }
}
