package dedham.dias.pool.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
final public class UserSearchRequestDTO {
    private String fName;
    private String lName;
    private String pnumber;

    public UserSearchRequestDTO() {
    }

    @Override
    public String toString() {
        return "UserCreationRequestDTO :\n" + this.fName + "\n " + this.lName + "\n" + this.pnumber;
    }

    public boolean isEmpty() {
        return this.fName == null && this.lName == null && pnumber == null;
    }

}