$(document).ready(function() {
    //hsp.init({
        //useTheme: true
    //});
    var listSuccess = function (data){
      console.log(data);
      var messages = $('#messages');
      data.forEach(function(item, index){
        console.log(item);
        var $msg = $("<div>", {"class": "hs_message"});
        var $avatar = $("<div>", {"class": "hs_avatar"});
        $avatar.append('<img class="hs_avatarImage" src="./asset/avatar.png" alt="Avatar">');
        $avatar.append('<a href="#" class="hs_avatarLink" title="Username"></a>');
        var $content = $("<div>", {"class": "hs_content"});
        $content.append('<a href="#" class="hs_userName" title="Username">'+item.name+'</a>');
        $content.append('<a href="#" class="hs_postTime" target="_blank" title="Sunday, September 14 2014 at 12:00pm via Hootsuite">2 minute ago</a>');
        //var $contentText = $("<div>", {"class": "hs_contentText"}).text(item.name);
        //$content.append($contentText);
        $msg.append($avatar);
        $msg.append($content);
        messages.append($msg);
      });
    }
    var listError = function (){
      console.log("cantgetlist");
    }
    var authenticationSuccess = function()
    {
      console.log('Successful authentication');
      Trello.get("/lists/58dd6f0c1b5d5ea481f146fc/cards", listSuccess, listError)
    };
    var authenticationFailure = function() {
      console.log('Failed authentication');
    };

    console.log("my log message");

    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
  });
});
