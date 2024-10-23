/* (C)2024 */
package dedham.dias.pool.dto;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public final class UserUpdateRequestDTO {
  private String fname;
  private String lname;
  private String pnumber;
  private String email;
  private String pword;
  private int poolScore;
  private Boolean approved;
  private String oldPword;
  private Boolean sendApprovalAlert;

  @Override
  public String toString() {
    return "UserUpdateRequestDTO :\n"
        + this.fname
        + "\n "
        + this.lname
        + "\n"
        + this.pnumber
        + "\n"
        + this.email
        + "\n"
        + this.pword
        + "\n"
        + this.oldPword;
  }
}
