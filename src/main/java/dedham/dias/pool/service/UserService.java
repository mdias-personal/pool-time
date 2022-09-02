package dedham.dias.pool.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import dedham.dias.pool.dto.UserCreationRequestDTO;
import dedham.dias.pool.dto.UserSearchRequestDTO;
import dedham.dias.pool.dto.UserUpdateRequestDTO;
import dedham.dias.pool.model.User;
import dedham.dias.pool.persistence.UserRepository;

@Service
final public class UserService {
    private final UserRepository userRepo;

    public UserService(final UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> searchUsers(UserSearchRequestDTO request) {
        List<User> users = request.isEmpty() ? userRepo.findAll() : userRepo.findAll(getExampleUser(request));
        users.forEach(user -> {
            user.setPword(null);
        });
        return users;
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

        User user = null;
        if (!(existingUser.isPresent())) {
            user = new User(
                    UUID.randomUUID(),
                    request.getFname(),
                    request.getLname(),
                    request.getPnumber(),
                    request.getEmail(),
                    request.getPword());
            user.setPoolScore(0);
            user.setAdmin(false);
            user.setApproved(false);
            userRepo.save(user);
            // we shouldnt send the pword back to the front end
            user.setPword(null);
        }
        return user;
    }

    public User attemptLogin(@Valid String email, @Valid String password) {
        Optional<User> result = userRepo.findOne(
                Example.of(new User(
                        email,
                        password)));
        return result.isPresent() ? result.get() : null;
    }

    public User updateUser(@Valid UserUpdateRequestDTO request, UUID userUuid) {
        Optional<User> maybeUser = userRepo.findById(userUuid);
        if (maybeUser.isPresent()) {
            User user = maybeUser.get();
            user.setId(userUuid);
            if (request.getApproved() != null) {
                user.setApproved(request.getApproved());
            }
            if (request.getPnumber() != null) {
                user.setPnumber(request.getPnumber());
            }
            if (request.getEmail() != null) {
                user.setEmail(request.getEmail());
            }
            if (request.getPoolScore() > 0) {
                user.setPoolScore(request.getPoolScore());
            }
            if (request.getPword() != null) {
                if (!request.getOldPword().equals(user.getPword())) {
                    return null;
                } else {
                    user.setPword(request.getPword());
                }
            }
            return userRepo.save(user);
        } else {
            return null;
        }
    }

    public UUID deleteUser(@Valid UUID userid) {
        userRepo.deleteById(userid);
        return userid;
    }

}
