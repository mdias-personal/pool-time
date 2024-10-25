/* (C)2024 */
package dedham.dias.pool.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import dedham.dias.pool.configuration.Constants;
import java.text.SimpleDateFormat;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TextService {
  private final String AUTH_TOKEN;
  private final String ACCOUNT_SID;
  private final String SERVICE_SID;

  public TextService(
      @Value("${twilio.account_sid}") String accountSID,
      @Value("${twilio.service_sid}") String serviceSID,
      @Value("${twilio.token}") String token) {
    this.ACCOUNT_SID = accountSID;
    this.SERVICE_SID = serviceSID;
    this.AUTH_TOKEN = token;
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
  }

  private void sendMessage(String pnumber, String body) {
    // asynchronously send the text updates
    new Thread(
            () -> {
              log.warn(ACCOUNT_SID);
              log.warn(body);
              try {
                Message message =
                    Message.creator(new PhoneNumber("+1" + pnumber), SERVICE_SID, body).create();
                System.out.println(message.getSid());
              } catch (Exception e) {
                e.printStackTrace();
              }
            })
        .start();
  }

  public void sendApptUpdateMessage(String number, String fname, Date date, boolean approved) {
    String body =
        String.format(
            "%s your time for %s on %s has been %s",
            fname,
            Constants.SITE_URL,
            formatDate(date),
            approved ? "approved!" : "denied. Maybe Lou is busy that day. Better luck next time.");
    sendMessage(number, body);
  }

  private String formatDate(Date date) {
    String pattern = "MM-dd-yyyy";
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    return simpleDateFormat.format(date);
  }

  public void sendNewApptMessage(String pnumber, String fName) {
    String body =
        String.format(
            "%s has made a new pool request! Log into %s and review the request.",
            fName, Constants.SITE_URL);
    sendMessage(pnumber, body);
  }

  public void sendNewUserMessage(String pnumber, String fName) {
    String body =
        String.format(
            "%s wants to join %s ! Login and review the request.", fName, Constants.SITE_URL);
    sendMessage(pnumber, body);
  }

  public void sendEditApptMessage(String pnumber, String fName) {
    String body =
        String.format(
            "%s has edited a pool request! Log into %s and review the request.",
            fName, Constants.SITE_URL);
    sendMessage(pnumber, body);
  }

  public void sendUserUpdateMessage(String pnumber, String fName, boolean approved) {
    String body =
        String.format(
            "%s %s! your request for %s has been %s ",
            approved ? "Congrats" : "Sorry",
            fName,
            Constants.SITE_URL,
            approved
                ? "approved! Lou wants to see you at the pool. Login and start making requests!"
                : "denied. Better luck next time.");
    sendMessage(pnumber, body);
  }
}
