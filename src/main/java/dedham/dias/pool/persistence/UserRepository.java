/* (C)2024 */
package dedham.dias.pool.persistence;

import dedham.dias.pool.model.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {}
