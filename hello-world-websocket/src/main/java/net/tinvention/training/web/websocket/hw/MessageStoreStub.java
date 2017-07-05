package net.tinvention.training.web.websocket.hw;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MessageStoreStub {

  private List<Message> stored = new ArrayList<>();

  public boolean add(Message arg0) {
    return stored.add(arg0);
  }

  public List<Message> getMessages() {
    return stored;
  }

}
