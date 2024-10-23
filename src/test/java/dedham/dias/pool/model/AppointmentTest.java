/* (C)2024 */
package dedham.dias.pool.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AppointmentTest {
  @Test
  void test() {
    Appointment appt = new Appointment();
    appt.setApproved(true);
    Assertions.assertTrue(appt.getApproved());
  }
}
