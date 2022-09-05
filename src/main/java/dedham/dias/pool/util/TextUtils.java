package dedham.dias.pool.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import dedham.dias.pool.configuration.Constants;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TextUtils {
    public static final String ACCOUNT_SID = "AC640584d7a5c9962a3dd2ad031cb5079c";
    public static final String AUTH_TOKEN = "c5cd5efa3021ff0b0385f8cab2e7231e";
    public static final String SERVICE_SID = "MG9641fcc0695e35d4d479c3a83ddd0207";

    private static void sendMessage(String pnumber, String body) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        log.warn(body);
        Message message = Message.creator(
                new PhoneNumber("+1" + pnumber),
                SERVICE_SID,
                body)
                .create();

        System.out.println(message.getSid());
    }

    public static void sendApptUpdateMessage(String number, String fname, Date date, boolean approved) {
        String body = String.format("%s your time for %s on %s has been %s", fname, Constants.SITE_URL,
                formatDate(date),
                approved ? "approved!" : "denied. Maybe Lou is busy that day. Better luck next time.");
        sendMessage(number, body);
    }

    private static String formatDate(Date date) {
        String pattern = "MM-dd-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(date);
    }

    public static void sendNewApptMessage(String pnumber, String fName) {
        String body = String.format("%s has made a new pool request! Log into %s and review the request.", fName,
                Constants.SITE_URL);
        sendMessage(pnumber, body);
    }

    public static void sendNewUserMessage(String pnumber, String fName) {
        String body = String.format("%s wants to join %s ! Login and review the request.", fName,
                Constants.SITE_URL);
        sendMessage(pnumber, body);
    }

    public static void sendEditApptMessage(String pnumber, String fName) {
        String body = String.format("%s has edited a pool request! Log into %s and review the request.", fName,
                Constants.SITE_URL);
        sendMessage(pnumber, body);
    }

    public static void sendUserUpdateMessage(String pnumber, String fName, boolean approved) {
        String body = String.format("%s %s! your request for %s has been %s ", approved ? "Congrats" : "Sorry", fName,
                Constants.SITE_URL,
                approved ? "approved! Lou wants to see you at the pool. Login and start making requests!"
                        : "denied. Better luck next time.");
        sendMessage(pnumber, body);
    }
}
