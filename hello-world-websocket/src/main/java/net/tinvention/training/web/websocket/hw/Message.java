package net.tinvention.training.web.websocket.hw;

import java.util.Date;

public class Message {

  private String sender;
  private String body;
  private Date sent;

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public Date getSent() {
    return sent;
  }

  public void setSent(Date sent) {
    this.sent = sent;
  }

  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    builder.append("Message [sender=");
    builder.append(sender);
    builder.append(", body=");
    builder.append(body);
    builder.append(", sent=");
    builder.append(sent);
    builder.append("]");
    return builder.toString();
  }

}
