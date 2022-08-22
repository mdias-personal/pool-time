package dedham.dias.pool.dto;

import javax.validation.constraints.NotNull;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@JsonInclude(NON_NULL)
@Getter
@Setter
final public class UserCreationRequestDTO {
    @NotNull
    private String fname;
    @NotNull
    private String lname;
    @NotNull
    private String pnumber;
    @NotNull
    private String email;
    @NotNull
    private String pword;

    public UserCreationRequestDTO() {
    }

    @Override
    public String toString() {
        return "UserCreationRequestDTO :\n" + this.fname + "\n " + this.lname + "\n" + this.pnumber + "\n" + this.email + "\n" + this.pword;
    }
}
