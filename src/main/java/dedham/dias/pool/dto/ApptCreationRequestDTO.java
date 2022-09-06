package dedham.dias.pool.dto;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
final public class ApptCreationRequestDTO {
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date start;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date end;

    private List<UUID> guests;

    @Override
    public String toString() {
        return "ApptCreationRequestDTO :\n" + this.start.toString() + "\n " + this.end.toString() + "\n"
                + this.guests.toString();
    }
}
