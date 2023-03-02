var $ol = document.querySelector('ol');
var $rankingsContainer = document.querySelector('.rankings-container');
var $tableContentContainer = document.querySelector('.table-content-container');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://statsapi.web.nhl.com/api/v1/standings?season=20222023');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.records[3].teamRecords.length; i++) {
    var teamID = xhr.response.records[3].teamRecords[i].team.id;
    var teamName = xhr.response.records[3].teamRecords[i].team.name;
    var $li = document.createElement('li');
    var $img = document.createElement('img');
    if (teamName === 'Vegas Golden Knights') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Los Angeles Kings') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Edmonton Oilers') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Seattle Kraken') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Calgary Flames') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Calgary_Flames_logo.svg/1200px-Calgary_Flames_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Vancouver Canucks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'San Jose Sharks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png');
      $img.setAttribute('id', teamID);
    } else if (teamName === 'Anaheim Ducks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png');
      $img.setAttribute('id', teamID);
    }
    $li.appendChild($img);
    $ol.appendChild($li);
  }
});
xhr.send();

var $imagesContainer = document.querySelector('.listed-images-container');
$imagesContainer.addEventListener('click', function (event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.remove('hidden');
  var teamID = event.target.id;
  var xhr1 = new XMLHttpRequest();
  xhr1.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/roster?season=20222023');
  xhr1.responseType = 'json';
  xhr1.addEventListener('load', function () {
    // console.log(xhr1.response);
    // console.log(xhr1.response.roster[0].person.id);
    var $oldTableBody = document.querySelector('tbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $tbody = document.createElement('tbody');
    for (let i = 0; i < xhr1.response.roster.length; i++) {
      var $table = document.querySelector('table');
      var $tr = document.createElement('tr');
      $tr.setAttribute('id', xhr1.response.roster[i].person.id);
      var $td1 = document.createElement('td');
      $td1.textContent = xhr1.response.roster[i].jerseyNumber;
      var $td2 = document.createElement('td');
      // $td2.setAttribute('id', xhr1.response.roster[i].person.id);
      $td2.textContent = xhr1.response.roster[i].person.fullName;
      var $td3 = document.createElement('td');
      $td3.textContent = xhr1.response.roster[i].position.abbreviation;
      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tbody.appendChild($tr);
      $table.appendChild($tbody);
    }

  });
  xhr1.send();
});

var $rankingsTab = document.querySelector('.rankings');
$rankingsTab.addEventListener('click', function (event) {
  $tableContentContainer.classList.add('hidden');
  $rankingsContainer.classList.remove('hidden');
});

var $table = document.querySelector('#table');
$table.addEventListener('click', function (event) {
  if (event.target.tagName !== 'TD') {
    return;
  }
  var $trId = event.target.closest('tr').id;
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var $name = document.querySelector('.name');
    $name.textContent = xhr2.response.people[0].fullName;
    var $position = document.querySelector('.position');
    $position.textContent = xhr2.response.people[0].primaryPosition.abbreviation;
    var $height = document.querySelector('.height');
    $height.textContent = xhr2.response.people[0].height;
    var $weight = document.querySelector('.weight');
    $weight.textContent = xhr2.response.people[0].weight;
    var $age = document.querySelector('.age');
    $age.textContent = xhr2.response.people[0].currentAge;
    var $birthDay = document.querySelector('.birth-date');
    $birthDay.textContent = xhr2.response.people[0].birthDate;
    var $birthPlace = document.querySelector('.birth-place');
    $birthPlace.textContent = xhr2.response.people[0].birthCity + ',' + xhr2.response.people[0].birthCountry;
  });
  xhr2.send();
});
