(function onLoad() {
  fech('/getMessages', 'GET', function(err, messageArray) {
    if (err) {
      console.log(err);
    } else {
      var messageArea = document.getElementById('messagesArea');
      messageArray.forEach(function(message) {
        var messageElement = document.createElement('ul');
        var userName = document.createElement('li');
        var description = document.createElement('li');
        var timeStamp = document.createElement('li');
        description.innerText = message.description;
        timeStamp.innerText = message.time_stamp;
        userName.innerText = message.name;
        messageElement.appendChild(userName);
        messageElement.appendChild(description);
        messageElement.appendChild(timeStamp);
        messageArea.appendChild(messageElement);
      });
    }
  });
})();

function fech(url, method, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status == 200) {
      callback(null, JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, url);
  xhr.send();
}
