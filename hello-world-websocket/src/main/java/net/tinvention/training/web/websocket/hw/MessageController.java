package net.tinvention.training.web.websocket.hw;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController extends AbstractController {

  public static final String TARGET_TOPIC = "/topic/messages";
  public static final String TARGET_INIT_TOPIC = WebSocketConfig.WS_USER_DEST_PREFIX + "/init/messages";
  
  @Autowired
  private MessageStoreStub messageStoreStub;

  @MessageMapping("/message")
  @SendTo(TARGET_TOPIC)
  public Message send(Message input) throws Exception {
    logger.debug("called, input : " + input);
    input.setSent(new Date());
    
    messageStoreStub.add(input);
    return input;
  }
  
  @SubscribeMapping( TARGET_INIT_TOPIC ) 
  public List<Message> onSubcribe() throws Exception {
    logger.debug("onSubcribe called ");
    return messageStoreStub.getMessages();
  }

}
