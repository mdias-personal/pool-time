package dedham.dias.pool.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
final public class ApptUpdateRequestDTO {
    private Boolean approved;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date start;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date end;
    private String actionAlert;
    private List<UUID> guests;

    @Override
    public String toString() {
        return "ApptUpdateRequestDTO :\n" + this.start.toString() + "\n " + this.end.toString() + "\n"
                + this.approved.toString() + "\n" + guests.toString();
    }
}