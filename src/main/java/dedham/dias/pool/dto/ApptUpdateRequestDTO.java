package dedham.dias.pool.dto;

import java.time.LocalDate;

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
    private LocalDate start;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDate end;

    @Override
    public String toString() {
        return "ApptUpdateRequestDTO :\n" + this.start.toString() + "\n " + this.end.toString() + "\n"
                + this.approved.toString();
    }
}