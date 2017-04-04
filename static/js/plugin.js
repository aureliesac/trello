$(document).ready(function() {
    hsp.init({
        useTheme: true
    });
    hsp.bind('sendtoapp', function(message){
  sendToAppHandler(message);
});
    function sendToAppHandler(message) {
  var messageId = "messageId=" + encodeURIComponent(message.post.id);
  var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
  var message   = "&message=" + encodeURIComponent(message.post.content.body);
  var handler = 'https://e2c64e62.ngrok.io/trellohandler.html?' + messageId + datetime + message;

  hsp.showCustomPopup(handler, 'App Plugin popup');
}
});
