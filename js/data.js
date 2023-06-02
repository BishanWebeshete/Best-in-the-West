/* exported data */

var data = [];

var previousData = localStorage.getItem('javascript-local-storage');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var stringifiedData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', stringifiedData);
});
