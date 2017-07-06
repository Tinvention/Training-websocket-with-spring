package net.tinvention.training.web.websocket.hw;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;



/**
 * 
 * 
 * 
  The "/app" prefix is arbitrary. You can pick any prefix. It’s simply meant to differentiate messages
  to be routed to message-handling methods to do application work vs messages to be routed to
  the broker to broadcast to subscribed clients.
  
  The "/topic" and "/queue" prefixes depend on the broker in use. In the case of the simple, inmemory
  broker the prefixes do not have any special meaning; it’s merely a convention that
  indicates how the destination is used (pub-sub targetting many subscribers or point-to-point
  messages typically targeting an individual recipient). 
  
  In the case of using a dedicated broker,
  most brokers use "/topic" as a prefix for destinations with pub-sub semantics and "/queue" for
  destinations with point-to-point semantics. Check the STOMP page of the broker to see the
  destination semantics it supports.
 * 
 * @author "stefano.campanini@gmail.com"
 *
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

  private static final String WS_APP_PREFIX = "/app";
  public static final String WS_USER_DEST_PREFIX = "/user";
  public static final String WS_WEBSOCKET_END_POINT = "/hello-world-websocket";

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
   config.setApplicationDestinationPrefixes(WS_APP_PREFIX, WS_USER_DEST_PREFIX);
   config.enableSimpleBroker("/topic");
   config.setUserDestinationPrefix(WS_USER_DEST_PREFIX); //it uses the websocket Session ...
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint(WS_WEBSOCKET_END_POINT).withSockJS();
  }

}