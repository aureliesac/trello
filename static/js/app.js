$(document).ready(function() {
    var testingSuccess = function (data){
      console.log(data);
      getMessages(data[0].id);
      var lists = $("<select />")
        .change(function () {
          console.log ($(this).val());
          getMessages ($(this).val());
        });

      data.forEach(function(item) {
        var item = $('<option />', {value: item.id, text: item.name}).appendTo(lists);
      });

      lists.appendTo($('#dropdown'));
      // when list is selected, clear current list of cards and get lists/cards and call list success
    }

    var testingError = function (data) {
      console.log(data);
    }
    var listSuccess = function (data){
      //console.log(data);
      $('#cards').html('');
      data.forEach(function(item, index){
        //console.log(item);
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
        $('#cards').append($msg);
      });
    }
    var listError = function (){
      console.log("cantgetlist");
    }
    var authenticationSuccess = function()
    {
      console.log('Successful authentication');
      Trello.get("/boards/58dd6ed489ac42e65ededb48/lists", testingSuccess, testingError);
    };

    var getMessages = function (list)
    {
      Trello.get("/lists/" + list + "/cards", listSuccess, listError);
    }

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
