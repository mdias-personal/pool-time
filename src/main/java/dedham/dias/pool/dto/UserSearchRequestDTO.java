/* (C)2024 */
package dedham.dias.pool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class UserSearchRequestDTO {
  private String fName;
  private String lName;
  private String pnumber;

  @Override
  public String toString() {
    return "UserSeachRequestDTO :\n" + this.fName + "\n " + this.lName + "\n" + this.pnumber;
  }

  public boolean isEmpty() {
    return this.fName == null && this.lName == null && pnumber == null;
  }
}
