// function request(url, callback) {
//   var xhr = new XMLHttpRequest();
//
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status !== 200) {
//       callback(xhr.responseText);
//     } else if (xhr.readyState == 4 && xhr.status == 200) {
//       callback(null, JSON.parse(xhr.responseText));
//     }
//   };
//   xhr.open("POST", url);
//   xhr.send();
// }
