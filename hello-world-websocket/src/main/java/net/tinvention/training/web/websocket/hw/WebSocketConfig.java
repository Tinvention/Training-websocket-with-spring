package net.tinvention.training.web.websocket.hw;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

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
    config.setUserDestinationPrefix(WS_USER_DEST_PREFIX);
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint(WS_WEBSOCKET_END_POINT).withSockJS();
  }

}