/* (C)2024 */
package dedham.dias.pool.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

@Slf4j
public class FileUtils {
  public static String getResourceFileContentAsString(final String filename) {
    String result = "";
    final ClassPathResource cpr = new ClassPathResource(filename);
    try {
      final byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
      result = new String(bdata, StandardCharsets.UTF_8);
    } catch (final IOException e) {
      log.error(e.getMessage());
    }
    return result;
  }
}
