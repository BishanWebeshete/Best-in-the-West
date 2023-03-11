var $ol = document.querySelector('ol');
var $rankingsContainer = document.querySelector('.rankings-container');
var $tableContentContainer = document.querySelector('.table-content-container');
var $playerProfileContainer = document.querySelector('.player-profile-container');
var $plusSign = document.querySelector('.plus-sign');
var $plusSignContainer = document.querySelector('.plus-sign-container');
var $favoritePlayersContainer = document.querySelector('.favorite-players-content-container');
var $favoritesButton = document.querySelector('.favorites');
var $advancedStatsContainer = document.querySelector('.advanced-stats-container');

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
  $favoritePlayersContainer.classList.add('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.remove('hidden');
  var teamID = event.target.id;
  var xhr1 = new XMLHttpRequest();
  xhr1.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/roster?season=20222023');
  xhr1.responseType = 'json';
  xhr1.addEventListener('load', function () {
    var $oldTableBody = document.querySelector('tbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $tbody = document.createElement('tbody');
    for (let i = 0; i < xhr1.response.roster.length; i++) {
      var $table = document.querySelector('#table');
      var $tr = document.createElement('tr');
      $tr.setAttribute('id', xhr1.response.roster[i].person.id);
      var $td1 = document.createElement('td');
      $td1.textContent = xhr1.response.roster[i].jerseyNumber;
      var $td2 = document.createElement('td');
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

  var xhr5 = new XMLHttpRequest();
  xhr5.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/stats');
  xhr5.responseType = 'json';
  xhr5.addEventListener('load', function (event) {
    var $rosterName = document.querySelector('.official-roster');
    $rosterName.textContent = xhr5.response.stats[0].splits[0].team.name + ' ' + 'Official' + ' ' + 'Roster';
    var $wins = document.querySelector('.wins');
    $wins.textContent = xhr5.response.stats[0].splits[0].stat.wins;
    var $losses = document.querySelector('.losses');
    $losses.textContent = xhr5.response.stats[0].splits[0].stat.losses;
    var $overTimeLosses = document.querySelector('.otl');
    $overTimeLosses.textContent = xhr5.response.stats[0].splits[0].stat.ot;
    var $points = document.querySelector('.points');
    $points.textContent = xhr5.response.stats[0].splits[0].stat.pts;
  });
  xhr5.send();
});

var $rankingsTab = document.querySelector('.rankings');
$rankingsTab.addEventListener('click', function (event) {
  $tableContentContainer.classList.add('hidden');
  $rankingsContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
  $favoritePlayersContainer.classList.add('hidden');
  $advancedStatsContainer.classList.add('hidden');
});

var $table = document.querySelector('#table');
$table.addEventListener('click', function (event) {
  if (event.target.tagName !== 'TD') {
    return;
  }
  $advancedStatsContainer.classList.remove('hidden');
  $playerProfileContainer.classList.remove('hidden');
  $tableContentContainer.classList.add('hidden');
  var $trId = event.target.closest('tr').id;
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var $playerImg = document.querySelector('.player-image');
    var currentTeam = xhr2.response.people[0].currentTeam.name;
    if (currentTeam === 'Vegas Golden Knights') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png');
    } else if (currentTeam === 'Los Angeles Kings') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png');
    } else if (currentTeam === 'Edmonton Oilers') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png');
    } else if (currentTeam === 'Seattle Kraken') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png');
    } else if (currentTeam === 'Vancouver Canucks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png');
    } else if (currentTeam === 'San Jose Sharks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png');
    } else if (currentTeam === 'Anaheim Ducks') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png');
    } else if (currentTeam === 'Calgary Flames') {
      $playerImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Calgary_Flames_logo.svg/1200px-Calgary_Flames_logo.svg.png');
    }
    $plusSign.setAttribute('id', xhr2.response.people[0].id);
    var $name = document.querySelector('.name');
    $name.textContent = xhr2.response.people[0].fullName;
    var $position = document.querySelector('.position');
    $position.textContent = xhr2.response.people[0].primaryPosition.abbreviation;
    var $height = document.querySelector('.height');
    $height.textContent = xhr2.response.people[0].height;
    var $weight = document.querySelector('.weight');
    $weight.textContent = xhr2.response.people[0].weight + ' ' + 'lbs';
    var $age = document.querySelector('.age');
    $age.textContent = xhr2.response.people[0].currentAge + ' ' + 'yrs';
    var $birthDay = document.querySelector('.birth-date');
    $birthDay.textContent = xhr2.response.people[0].birthDate;
    var $birthPlace = document.querySelector('.birth-place');
    $birthPlace.textContent = xhr2.response.people[0].birthCity + ',' + ' ' + xhr2.response.people[0].birthCountry;
  });
  xhr2.send();

  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=homeAndAway&season=20222023');
  xhr3.responseType = 'json';
  xhr3.addEventListener('load', function () {
    var $gamesPlayed = document.querySelector('.gp');
    $gamesPlayed.textContent = xhr3.response.stats[0].splits[0].stat.games + xhr3.response.stats[0].splits[1].stat.games + ' ' + 'gp';
    var $goals = document.querySelector('.goals');
    $goals.textContent = xhr3.response.stats[0].splits[0].stat.goals + xhr3.response.stats[0].splits[1].stat.goals + ' ' + 'G';
    var $assists = document.querySelector('.assists');
    $assists.textContent = xhr3.response.stats[0].splits[0].stat.assists + xhr3.response.stats[0].splits[1].stat.assists + ' ' + 'A';
  });
  xhr3.send();

  var xhr6 = new XMLHttpRequest();
  xhr6.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=byMonth');
  xhr6.responseType = 'json';
  xhr6.addEventListener('load', function (event) {
    var $oldTableBody = document.querySelector('.advancedStatsTbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $advancedStatsTable = document.querySelector('.advanced-stats-table');
    var $advancedStatsTbody = document.createElement('tbody');
    $advancedStatsTbody.setAttribute('class', 'advancedStatsTbody');
    for (let i = 0; i < xhr6.response.stats[0].splits.length; i++) {
      var $advancedStatsTr = document.createElement('tr');
      var $advancedStatsTh = document.createElement('th');
      $advancedStatsTh.textContent = xhr6.response.stats[0].splits[i].month;
      var $advancedStatsTd = document.createElement('td');
      $advancedStatsTd.textContent = xhr6.response.stats[0].splits[i].stat.shortHandedGoals;
      var $advancedStatsTd1 = document.createElement('td');
      $advancedStatsTd1.textContent = xhr6.response.stats[0].splits[i].stat.powerPlayGoals;
      var $advancedStatsTd2 = document.createElement('td');
      $advancedStatsTd2.textContent = xhr6.response.stats[0].splits[i].stat.pim;
      var $advancedStatsTd3 = document.createElement('td');
      $advancedStatsTd3.textContent = xhr6.response.stats[0].splits[i].stat.shots;
      var $advancedStatsTd4 = document.createElement('td');
      $advancedStatsTd4.textContent = xhr6.response.stats[0].splits[i].stat.timeOnIcePerGame;
      $advancedStatsTr.appendChild($advancedStatsTh);
      $advancedStatsTr.appendChild($advancedStatsTd1);
      $advancedStatsTr.appendChild($advancedStatsTd);
      $advancedStatsTr.appendChild($advancedStatsTd2);
      $advancedStatsTr.appendChild($advancedStatsTd3);
      $advancedStatsTr.appendChild($advancedStatsTd4);
      $advancedStatsTbody.appendChild($advancedStatsTr);
      $advancedStatsTable.appendChild($advancedStatsTbody);
    }
  });
  xhr6.send();

  var xhr7 = new XMLHttpRequest();
  xhr7.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=onPaceRegularSeason&season=20222023');
  xhr7.responseType = 'json';
  xhr7.addEventListener('load', function (event) {
    var $oldTableBody = document.querySelector('.projectedStatsTbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $onPaceTable = document.querySelector('.on-pace-table');
    var $onPaceTbody = document.createElement('tbody');
    $onPaceTbody.setAttribute('class', 'projectedStatsTbody');
    var $onPaceRow = document.createElement('tr');
    var $td1 = document.createElement('td');
    $td1.textContent = xhr7.response.stats[0].splits[0].stat.goals;
    var $td2 = document.createElement('td');
    $td2.textContent = xhr7.response.stats[0].splits[0].stat.assists;
    var $td3 = document.createElement('td');
    $td3.textContent = xhr7.response.stats[0].splits[0].stat.points;
    var $td4 = document.createElement('td');
    $td4.textContent = xhr7.response.stats[0].splits[0].stat.blocked;
    var $td5 = document.createElement('td');
    $td5.textContent = xhr7.response.stats[0].splits[0].stat.faceOffPct;
    var $td6 = document.createElement('td');
    $td6.textContent = xhr7.response.stats[0].splits[0].stat.hits;
    var $td7 = document.createElement('td');
    $td7.textContent = xhr7.response.stats[0].splits[0].stat.overTimeGoals;
    var $td8 = document.createElement('td');
    $td8.textContent = xhr7.response.stats[0].splits[0].stat.pim;
    var $td9 = document.createElement('td');
    $td9.textContent = xhr7.response.stats[0].splits[0].stat.plusMinus;

    $onPaceTable.appendChild($onPaceTbody);
    $onPaceTbody.appendChild($onPaceRow);
    $onPaceRow.appendChild($td1);
    $onPaceRow.appendChild($td2);
    $onPaceRow.appendChild($td3);
    $onPaceRow.appendChild($td4);
    $onPaceRow.appendChild($td5);
    $onPaceRow.appendChild($td6);
    $onPaceRow.appendChild($td7);
    $onPaceRow.appendChild($td8);
    $onPaceRow.appendChild($td9);
  });
  xhr7.send();
});

var $favoriteTbody = document.getElementById('favorite-tbody');
$plusSignContainer.addEventListener('click', function (event) {
  var id = event.target.getAttribute('id');
  if (event.target.tagName !== 'I') {
    return;
  }
  $advancedStatsContainer.classList.add('hidden');
  $favoritePlayersContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
  var $iconId = event.target.closest('i').id;
  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $iconId);
  xhr4.responseType = 'json';
  xhr4.addEventListener('load', function () {
    var $favoritesTable = document.querySelector('#favorite-players-table');
    var $favoriteTr = document.createElement('tr');
    $favoriteTr.setAttribute('id', event.target.id);
    var $favoriteTd1 = document.createElement('td');
    $favoriteTd1.textContent = xhr4.response.people[0].primaryNumber;
    var $favoriteTd2 = document.createElement('td');
    $favoriteTd2.textContent = xhr4.response.people[0].fullName;
    var $favoriteTd3 = document.createElement('td');
    $favoriteTd3.textContent = xhr4.response.people[0].primaryPosition.abbreviation;
    var $favoriteTd4 = document.createElement('td');
    var $trashIcon = document.createElement('i');
    $trashIcon.className = 'fa-solid fa-trash';
    $favoritesTable.appendChild($favoriteTbody);
    $favoriteTbody.appendChild($favoriteTr);
    $favoriteTr.appendChild($favoriteTd1);
    $favoriteTr.appendChild($favoriteTd2);
    $favoriteTr.appendChild($favoriteTd3);
    $favoriteTd4.appendChild($trashIcon);
    $favoriteTr.appendChild($favoriteTd4);
  });
  xhr4.send();

  if ($favoriteTbody.hasChildNodes('tr')) {
    var xhr8 = new XMLHttpRequest();
    xhr8.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + id + '/stats?stats=homeAndAway&season=20222023');
    xhr8.responseType = 'json';
    xhr8.addEventListener('load', function () {
      var ppg = 0;
      var playerGoals = xhr8.response.stats[0].splits[0].stat.goals + xhr8.response.stats[0].splits[1].stat.goals;
      var playerAssists = xhr8.response.stats[0].splits[0].stat.assists + xhr8.response.stats[0].splits[1].stat.assists;
      var playerGames = xhr8.response.stats[0].splits[0].stat.games + xhr8.response.stats[0].splits[1].stat.games;
      var playerPoints = playerGoals + playerAssists;
      var $averagePpgText = document.querySelector('.avg-ppg');
      var pointsPerGame = playerPoints / playerGames;
      ppg += pointsPerGame;
      $averagePpgText.textContent = ppg;
    });
    xhr8.send();
  }
}
  //   var xhr8 = new XMLHttpRequest();
  //   xhr8.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + id + '/stats?stats=homeAndAway&season=20222023');
  //   xhr8.responseType = 'json';
  //   xhr8.addEventListener('load', function () {
  //     console.log(xhr8.response);
  //     var playerGoals = xhr8.response.stats[0].splits[0].stat.goals + xhr8.response.stats[0].splits[1].stat.goals;
  //     var playerAssists = xhr8.response.stats[0].splits[0].stat.assists + xhr8.response.stats[0].splits[1].stat.assists;
  //     var playerGames = xhr8.response.stats[0].splits[0].stat.games + xhr8.response.stats[0].splits[1].stat.games;
  //     var playerPoints = playerGoals + playerAssists;
  //     var $averagePpgText = document.querySelector('.avg-ppg');
  //     $averagePpgText.textContent = playerPoints / playerGames;
  //   });
  //   xhr8.send();
  // }
);

var closestTr = null;
var $modal = document.querySelector('.modal-container');
var $yesButton = document.querySelector('.yes-button');
var $noButton = document.querySelector('.no-button');
$favoriteTbody.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  closestTr = event.target.closest('tr');
  $modal.classList.remove('hidden');
});

$noButton.addEventListener('click', function (even) {
  $modal.classList.add('hidden');
});
$yesButton.addEventListener('click', function (event) {
  closestTr.remove();
  $modal.classList.add('hidden');
});

$favoritesButton.addEventListener('click', function (event) {
  $favoritePlayersContainer.classList.remove('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.add('hidden');
  $playerProfileContainer.classList.add('hidden');
  $advancedStatsContainer.classList.add('hidden');
});
