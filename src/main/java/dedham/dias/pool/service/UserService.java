package dedham.dias.pool.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import dedham.dias.pool.dto.UserCreationRequestDTO;
import dedham.dias.pool.dto.UserSearchRequestDTO;
import dedham.dias.pool.model.User;
import dedham.dias.pool.persistence.UserRepository;

@Service
final public class UserService {
    private final UserRepository userRepo;

    public UserService(final UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> searchUsers(UserSearchRequestDTO request) {
        if (request.isEmpty()) {
            return userRepo.findAll();
        } else {
            return userRepo.findAll(getExampleUser(request));
        }
    }

    private Example<User> getExampleUser(UserSearchRequestDTO request) {
        final User user = new User();
        user.setPnumber(request.getPnumber());
        user.setFName(request.getFName());
        user.setLName(request.getLName());
        return Example.of(user);
    }

    private Example<User> getExampleUser(UserCreationRequestDTO request) {
        final User user = new User();
        user.setEmail(request.getEmail());
        return Example.of(user);
    }

    public User createUser(UserCreationRequestDTO request) {
        Optional<User> existingUser = userRepo.findOne(getExampleUser(request));

        if (existingUser.isPresent()) {
            return null;
        } else {
            return userRepo.save(new User(
                    UUID.randomUUID(),
                    request.getFname(),
                    request.getLname(),
                    request.getPnumber(),
                    request.getEmail(),
                    request.getPword()));
        }
    }

    public User attemptLogin(@Valid String email, @Valid String password) {
        Optional<User> result = userRepo.findOne(
                Example.of(new User(
                        email,
                        password)));
        return result.isPresent() ? result.get() : null;
    }

}
