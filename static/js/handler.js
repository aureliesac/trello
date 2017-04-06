$(document).ready(function() {

  function getQuerystring (key) {
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^]*)");
    var qs = regex.exec(location.search);
    return qs[1];
  }

  document.write('Message ID: ' + decodeURIComponent(getQuerystring('messageId')) + '<br />');
  document.write('Date & Time: ' + decodeURIComponent(getQuerystring('datetime')) + '<br /><br />');
  document.write('Message: ' + decodeURIComponent(getQuerystring('message')));

  var authenticationSuccess = function()
  {
    console.log('Successful authentication');

    var myList = '58e3c4f3e3cc52d5b0822635';
    var creationSuccess = function(data) {
      console.log('Card created successfully. Data returned:' + JSON.stringify(data));
  };
    var newCard = {
      name: decodeURIComponent(getQuerystring('message')),
      desc: 'Add a new card here',
      // Place this card at the top of our list
      idList: myList,
      pos: 'top'
    };
  Trello.post('/cards/', newCard, creationSuccess);
  };
  var authenticationFailure = function() {
    console.log('Failed authentication');
  };


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
