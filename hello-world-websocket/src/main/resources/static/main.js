
var stompClientRT = null;
var stompClientInit = null;

const dateTimeFormat = "MMMM Do YYYY, h:mm:ss a";
moment.locale();

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    
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

function connect() {
    var socketRT = new SockJS('/hello-world-websocket');
    stompClientRT = Stomp.over(socketRT);
    stompClientRT.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);       
        
        stompClientRT.subscribe('/topic/messages', function (msg) {
        	showMessage(JSON.parse(msg.body));
        }); 
    });
}

function disconnect() {
    if (stompClientRT != null) {
    	stompClientRT.disconnect();
    }
    if (stompClientInit != null) {
    	stompClientInit.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function initMessages() {
	$("#messages").html("");
	
    var socketInit = new SockJS('/hello-world-websocket');
    stompClientInit = Stomp.over(socketInit);
    stompClientInit.connect({}, function (frame) { 
        console.log('Connected for Init: ' + frame);       
        
        var initSubcription = stompClientInit.subscribe('/user/init/messages', function (msg) {
        	console.log('stompClientInit onmessage for Init: ' + frame);  
        	showMessage(JSON.parse(msg.body));
        /*	initSubcription.unsubscribe();
        	console.log('Init Done'); 
        	stompClientInit.disconnect();
        	stompClientInit = null; */
        });
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
	$("#messages").prepend(item);
}

$(function () {
	$("#messages").html("");
	
	$("#conversation").hide();
	
	$( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#initMessages" ).click(function() { initMessages(); });       
    
    $('#addMessageForm').on('submit', function (e) {
    	 e.preventDefault();
		 sendMessage(); 	
    })
});
