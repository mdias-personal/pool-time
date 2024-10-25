/* (C)2024 */
package dedham.dias.pool.dto;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public final class UserCreationRequestDTO {
  @NotNull private String fname;
  @NotNull private String lname;
  @NotNull private String pnumber;
  @NotNull private String email;
  @NotNull private String pword;

  @Override
  public String toString() {
    return "UserCreationRequestDTO :\n"
        + this.fname
        + "\n "
        + this.lname
        + "\n"
        + this.pnumber
        + "\n"
        + this.email
        + "\n"
        + this.pword;
  }
}
