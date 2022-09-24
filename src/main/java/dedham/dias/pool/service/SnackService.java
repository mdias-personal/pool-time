package dedham.dias.pool.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dedham.dias.pool.model.Snack;
import dedham.dias.pool.persistence.SnackRepository;

@Service
final public class SnackService {
    private final SnackRepository snackRepo;

    public SnackService(final SnackRepository snackRepo) {
        this.snackRepo = snackRepo;
    }

    public List<Snack> getSnacks() {
        return snackRepo.findAll();
    }

}
