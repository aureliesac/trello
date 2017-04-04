$(document).ready(function() {
    //hsp.init({
        //useTheme: true
    //});
    var listSuccess = function (data){
      console.log(data);
      var messages = $('#messages');
      data.forEach(function(item, index){
        console.log(item);
        messages.append("div").text(item.name);
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
