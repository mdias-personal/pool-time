/* (C)2024 */
package dedham.dias.pool.persistence;

import dedham.dias.pool.model.Snack;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnackRepository extends JpaRepository<Snack, UUID> {}
