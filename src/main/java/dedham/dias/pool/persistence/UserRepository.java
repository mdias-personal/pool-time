package dedham.dias.pool.persistence;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dedham.dias.pool.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
}
