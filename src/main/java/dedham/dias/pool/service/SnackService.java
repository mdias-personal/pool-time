/* (C)2024 */
package dedham.dias.pool.service;

import dedham.dias.pool.model.Snack;
import dedham.dias.pool.persistence.SnackRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public final class SnackService {
  private final SnackRepository snackRepo;

  public SnackService(final SnackRepository snackRepo) {
    this.snackRepo = snackRepo;
  }

  public List<Snack> getSnacks() {
    return snackRepo.findAll();
  }
}
