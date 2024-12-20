/* (C)2024 */
package dedham.dias.pool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EntityScan
@EnableAutoConfiguration
public class PoolApplication {

  public static void main(String[] args) {
    SpringApplication.run(PoolApplication.class, args);
  }
}
