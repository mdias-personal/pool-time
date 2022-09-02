package dedham.dias.pool.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
final public class ApptSearchRequestDTO {
    private UUID userUuid;

    @Override
    public String toString() {
        return "ApptSearchRequestDTO :\n" + this.userUuid.toString();
    }

    public boolean isEmpty() {
        return this.userUuid == null;
    }

}