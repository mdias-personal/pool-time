package dedham.dias.pool.util;

import com.twilio.Twilio; 
import com.twilio.rest.api.v2010.account.Message; 
import com.twilio.type.PhoneNumber; 
 
public class TextUtils { 
    public static final String ACCOUNT_SID = "AC640584d7a5c9962a3dd2ad031cb5079c"; 
    public static final String AUTH_TOKEN = "c5cd5efa3021ff0b0385f8cab2e7231e";
    public static final String SERVICE_SID = "MG9641fcc0695e35d4d479c3a83ddd0207";
 
    public static void sendMessage(String pnumber, String body){ 
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN); 
        Message message = Message.creator( 
                new PhoneNumber("+1"+pnumber),
                SERVICE_SID,
                body)
            .create(); 
 
        System.out.println(message.getSid()); 
    } 
}