
var stompClientRT = null;
const dateTimeFormat = "MMMM Do YYYY, h:mm:ss a";
moment.locale();

/**
 * 
 * Real-Time messages
 * 
 * @param connected
 * @returns
 */
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $("#initMessages").prop("disabled", !connected);
    
    if (connected) {
        $("#conversation").show();
        $("#testRealTimeWsActive").show();
        $("#testRealTimeWsNotActive").hide();
    }
    else {
        $("#conversation").hide();
        $("#testRealTimeWsNotActive").show();
        $("#testRealTimeWsActive").hide();
    }
    
}

/**
 * 
 * Real-Time messages
 * 
 * @returns
 */
function connect() {
    var socketRT = new SockJS('/hello-world-websocket');
    stompClientRT = Stomp.over(socketRT);
    stompClientRT.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);       
        
        stompClientRT.subscribe('/topic/messages', function (msg) { 
        	console.log('onmessage for Init: ' + msg);  
        	showMessage(JSON.parse(msg.body));
        }); 
    });
}

function disconnect() {
    if (stompClientRT != null) {
    	stompClientRT.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

/**
 * 
 * init messages
 * 
 * @returns
 */
function initMessages() {
	$("#messages").html("");
	
	var initSubcription = stompClientRT.subscribe('/user/init/messages', function (msg) {
    	console.log('stompClientInit onmessage for Init: ' + msg);  
    	
    	_.forEach(JSON.parse(msg.body), function(value) {
		     showMessage(value);
	     });//foreach function
    	    	
    	initSubcription.unsubscribe();
    	console.log('Init Done'); 
    });
 
}

function sendMessage() {
	
	stompClientRT.send("/app/message", {}, JSON.stringify(
			{
				 'sender': $("#sender").val(),
				 'body': $("#body").val()
			}
	));
}

// Emulating ES6 template strings in ES5 with _.template() from lodash
function fmtr(str, obj) {
    return _.template(_.isString(str) ? str : '', { interpolate: /\$\{([^\}]+)\}/gm })(obj);
}

function showMessage(message) {
	var templateItem = '<div class="panel panel-default"><div class="panel-body">${body}</div> ' 
	                 + '<div class="panel-footer text-right">${moment(new Date(sent)).format(dateTimeFormat)} by <i>${sender}</i></div>';
	var item = fmtr(templateItem, message);
	$("#messages").append(item);
}

$(function () {	
	
	$( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#initMessages" ).click(function() { initMessages(); });       
    
    $('#addMessageForm').on('submit', function (e) {
    	 e.preventDefault();
		 sendMessage(); 	
    })
    
    $("#disconnect").prop("disabled", true);
    $("#initMessages").prop("disabled", true);
});
