var $ol = document.querySelector('ol');
var $rankingsContainer = document.querySelector('.rankings-container');
var $tableContentContainer = document.querySelector('.table-content-container');
var $playerProfileContainer = document.querySelector('.player-profile-container');
var $plusSign = document.querySelector('.plus-sign');
var $plusSignContainer = document.querySelector('.plus-sign-container');
var $favoritePlayersContainer = document.querySelector('.favorite-players-content-container');
var $favoritesButton = document.querySelector('.favorites');
var $advancedStatsContainer = document.querySelector('.advanced-stats-container');
var $bestInTheWest = document.querySelector('.best-in-the-west');
var $favoriteTbody = document.querySelector('.favoriteTbody');

function viewRankings() {
  $tableContentContainer.classList.add('hidden');
  $rankingsContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
  $favoritePlayersContainer.classList.add('hidden');
  $advancedStatsContainer.classList.add('hidden');
}

function addFavoritePlayer(player) {
  var $favoriteTr = document.createElement('tr');
  $favoriteTr.setAttribute('id', player.id);
  var $favoriteTd1 = document.createElement('td');
  $favoriteTd1.textContent = player.number;
  var $favoriteTd2 = document.createElement('td');
  $favoriteTd2.textContent = player.name;
  var $favoriteTd3 = document.createElement('td');
  $favoriteTd3.textContent = player.position;
  var $favoriteTd4 = document.createElement('td');
  var $trashIcon = document.createElement('i');
  $trashIcon.className = 'fa-solid fa-trash';
  $favoriteTbody.appendChild($favoriteTr);
  $favoriteTr.appendChild($favoriteTd1);
  $favoriteTr.appendChild($favoriteTd2);
  $favoriteTr.appendChild($favoriteTd3);
  $favoriteTd4.appendChild($trashIcon);
  $favoriteTr.appendChild($favoriteTd4);
}

var teamImageSources = {
  'Vegas Golden Knights': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png',
  'Los Angeles Kings': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png',
  'Edmonton Oilers': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png',
  'Seattle Kraken': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png',
  'Calgary Flames': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Calgary_Flames_logo.svg/1200px-Calgary_Flames_logo.svg.png',
  'Vancouver Canucks': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png',
  'San Jose Sharks': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png',
  'Anaheim Ducks': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png'
};

// finds all teams/rankings in pacific division
var teams = new XMLHttpRequest();
teams.open('GET', 'https://statsapi.web.nhl.com/api/v1/standings?season=20222023');
teams.responseType = 'json';
teams.addEventListener('load', function () {
  var records = teams.response.records[3].teamRecords;
  for (let i = 0; i < records.length; i++) {
    var teamID = records[i].team.id;
    var teamName = records[i].team.name;
    var $li = document.createElement('li');
    var $img = document.createElement('img');
    $img.setAttribute('src', teamImageSources[teamName]);
    $img.setAttribute('id', teamID);
    $li.appendChild($img);
    $ol.appendChild($li);
  }
});
teams.send();

// creates team roster
var $imagesContainer = document.querySelector('.listed-images-container');
$imagesContainer.addEventListener('click', function (event) {
  var teamElement = event.target;
  if (event.target.tagName === 'LI') {
    teamElement = event.target.firstChild;
  } else if (event.target.tagName !== 'IMG') {
    return;
  }
  $favoritePlayersContainer.classList.add('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.remove('hidden');
  var teamID = teamElement.id;
  var selectedTeam = new XMLHttpRequest();
  selectedTeam.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/roster?season=20222023');
  selectedTeam.responseType = 'json';
  selectedTeam.addEventListener('load', function () {
    var $oldTableBody = document.querySelector('#roster');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $tbody = document.createElement('tbody');
    $tbody.setAttribute('id', 'roster');
    var roster = selectedTeam.response.roster;
    for (let i = 0; i < roster.length; i++) {
      var $table = document.querySelector('#table');
      var $tr = document.createElement('tr');
      $tr.setAttribute('id', roster[i].person.id);
      var $td1 = document.createElement('td');
      if (roster[i].jerseyNumber === undefined) {
        $td1.textContent = 'N/A';
      } else {
        $td1.textContent = roster[i].jerseyNumber;
      }
      var $td2 = document.createElement('td');
      $td2.textContent = roster[i].person.fullName;
      var $td3 = document.createElement('td');
      $td3.textContent = roster[i].position.abbreviation;
      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tbody.appendChild($tr);
      $table.appendChild($tbody);
    }
  });
  selectedTeam.send();

  // lists general statistics on selected team
  var teamInfo = new XMLHttpRequest();
  teamInfo.open('GET', 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/stats');
  teamInfo.responseType = 'json';
  teamInfo.addEventListener('load', function () {
    var details = teamInfo.response.stats[0].splits[0];
    var $rosterName = document.querySelector('.official-roster');
    $rosterName.textContent = details.team.name + ' ' + 'Official' + ' ' + 'Roster';
    var $wins = document.querySelector('.wins');
    $wins.textContent = details.stat.wins;
    var $losses = document.querySelector('.losses');
    $losses.textContent = details.stat.losses;
    var $overTimeLosses = document.querySelector('.otl');
    $overTimeLosses.textContent = details.stat.ot;
    var $points = document.querySelector('.points');
    $points.textContent = details.stat.pts;
  });
  teamInfo.send();
});

var $rankingsTab = document.querySelector('.rankings');
$rankingsTab.addEventListener('click', function () {
  viewRankings();
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
  var playerInfo = new XMLHttpRequest();
  playerInfo.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId);
  playerInfo.responseType = 'json';
  // finds general information on selected player
  playerInfo.addEventListener('load', function () {
    var playerDetails = playerInfo.response.people[0];
    var $playerImg = document.querySelector('.player-image');
    var currentTeam = playerDetails.currentTeam.name;
    $playerImg.setAttribute('src', teamImageSources[currentTeam]);
    $plusSign.setAttribute('id', playerDetails.id);
    var $name = document.querySelector('.name');
    $name.textContent = playerDetails.fullName;
    var $position = document.querySelector('.position');
    $position.textContent = playerDetails.primaryPosition.abbreviation;
    var $height = document.querySelector('.height');
    $height.textContent = playerDetails.height;
    var $weight = document.querySelector('.weight');
    $weight.textContent = playerDetails.weight + ' ' + 'lbs';
    var $age = document.querySelector('.age');
    $age.textContent = playerDetails.currentAge + ' ' + 'yrs';
    var $birthDay = document.querySelector('.birth-date');
    $birthDay.textContent = playerDetails.birthDate;
    var $birthPlace = document.querySelector('.birth-place');
    $birthPlace.textContent = playerDetails.birthCity + ',' + ' ' + playerDetails.birthCountry;
  });
  playerInfo.send();

  var stats = new XMLHttpRequest();
  stats.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=homeAndAway&season=20222023');
  stats.responseType = 'json';
  // finds general stats on selected player
  stats.addEventListener('load', function () {
    var playerStatsHome = stats.response.stats[0].splits[0].stat;
    var playerStatsAway = stats.response.stats[0].splits[1].stat;
    var $gamesPlayed = document.querySelector('.gp');
    $gamesPlayed.textContent = playerStatsHome.games + playerStatsAway.games + ' ' + 'gp';
    var $goals = document.querySelector('.goals');
    var $assists = document.querySelector('.assists');
    if (playerStatsHome.goals === undefined) {
      $goals.textContent = Math.round(1000 * (playerStatsHome.savePercentage + playerStatsAway.savePercentage) / 2) / 1000 + '%';
      $assists.textContent = Math.round(1000 * (playerStatsHome.goalAgainstAverage + playerStatsAway.goalAgainstAverage) / 2) / 1000 + ' ' + 'gaa';
    } else {
      $goals.textContent = playerStatsHome.goals + playerStatsAway.goals + ' ' + 'G';
      $assists.textContent = playerStatsHome.assists + playerStatsAway.assists + ' ' + 'A';
    }
  });
  stats.send();

  var advancedStats = new XMLHttpRequest();
  advancedStats.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=byMonth');
  advancedStats.responseType = 'json';
  // finds advanced stats on selected player
  advancedStats.addEventListener('load', function (event) {
    var $savePercentage = document.querySelector('.shg');
    var $gaa = document.querySelector('.ppg');
    var $wins = document.querySelector('.pim');
    var $losses = document.querySelector('.shots');
    var $toi = document.querySelector('.toi-game');
    var $oldTableBody = document.querySelector('.advancedStatsTbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $advancedStatsTable = document.querySelector('.advanced-stats-table');
    var $advancedStatsTbody = document.createElement('tbody');
    $advancedStatsTbody.setAttribute('class', 'advancedStatsTbody');
    for (let i = 0; i < advancedStats.response.stats[0].splits.length; i++) {
      var detailedStats = advancedStats.response.stats[0].splits[i];
      var $advancedStatsTr = document.createElement('tr');
      var $advancedStatsTh = document.createElement('th');
      $advancedStatsTh.textContent = detailedStats.month;
      $advancedStatsTr.appendChild($advancedStatsTh);
      if (detailedStats.stat.shots === undefined) {
        $savePercentage.textContent = 'SV%';
        $gaa.textContent = 'GAA';
        $wins.textContent = 'Saves';
        $losses.textContent = 'Shots';
        $toi.textContent = 'S/O';
        var advancedStatsKeys = ['evenStrengthSavePercentage', 'goalAgainstAverage', 'evenSaves', 'evenShots', 'shutouts'];
        for (var key of advancedStatsKeys) {
          var $advancedStatsTd = document.createElement('td');
          $advancedStatsTd.textContent = Math.round(1000 * detailedStats.stat[key]) / 1000;
          $advancedStatsTr.appendChild($advancedStatsTd);
        }
        $advancedStatsTbody.appendChild($advancedStatsTr);
        $advancedStatsTable.appendChild($advancedStatsTbody);
      } else {
        $savePercentage.textContent = 'SHG';
        $gaa.textContent = 'PPG';
        $wins.textContent = 'PIM';
        $losses.textContent = 'Shots';
        $toi.textContent = 'TOI';
        var advancedStatsKeys2 = ['shortHandedGoals', 'powerPlayGoals', 'pim', 'shots', 'timeOnIcePerGame'];
        for (var key2 of advancedStatsKeys2) {
          var $advancedStatsTd2 = document.createElement('td');
          $advancedStatsTd2.textContent = detailedStats.stat[key2];
          $advancedStatsTr.appendChild($advancedStatsTd2);
        }
        $advancedStatsTbody.appendChild($advancedStatsTr);
        $advancedStatsTable.appendChild($advancedStatsTbody);
      }
    }
  });
  advancedStats.send();

  var rankings = new XMLHttpRequest();
  rankings.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $trId + '/stats?stats=regularSeasonStatRankings&season=20222023');
  rankings.responseType = 'json';
  var $loadingSign = document.querySelector('.lds-ring');
  var $onPaceTable = document.querySelector('.where-he-stands-table');
  $loadingSign.classList.remove('hidden');
  $onPaceTable.classList.add('hidden');
  // finds rankings on selected player
  rankings.addEventListener('load', function () {
    var $points = document.querySelector('.points-rank');
    var $goals = document.querySelector('.goals-rank');
    var $assists = document.querySelector('.assists-rank');
    var $plusMinus = document.querySelector('.plusMinus-rank');
    var $ppg = document.querySelector('.ppg-rank');
    var $shg = document.querySelector('.shg-rank');
    var $shot = document.querySelector('.shot-rank');
    var $gp = document.querySelector('.gp-rank');
    $loadingSign.classList.add('hidden');
    $onPaceTable.classList.remove('hidden');
    var playerRankings = rankings.response.stats[0].splits[0].stat;
    var $oldTableBody = document.querySelector('.projectedStatsTbody');
    if ($oldTableBody) {
      $oldTableBody.remove();
    }
    var $onPaceTbody = document.createElement('tbody');
    $onPaceTbody.setAttribute('class', 'projectedStatsTbody');
    var $onPaceRow = document.createElement('tr');
    $onPaceTable.appendChild($onPaceTbody);
    $onPaceTbody.appendChild($onPaceRow);
    if (playerRankings.goalsAgainst !== undefined) {
      $points.textContent = 'GP';
      $goals.textContent = 'GA';
      $assists.textContent = 'L';
      $plusMinus.textContent = 'OT';
      $ppg.textContent = 'SV%';
      $shg.textContent = 'shots';
      $shot.textContent = 'S.O';
      $gp.textContent = 'W';
      var rankingKeys = ['games', 'goalsAgainst', 'losses', 'ot', 'savePercentage', 'shotsAgainst', 'shutOuts', 'wins'];
      for (var key of rankingKeys) {
        var $td = document.createElement('td');
        $td.textContent = playerRankings[key];
        $onPaceRow.appendChild($td);
      }
    } else {
      $points.textContent = 'P';
      $goals.textContent = 'G';
      $assists.textContent = 'A';
      $plusMinus.textContent = '+/-';
      $ppg.textContent = 'PPG';
      $shg.textContent = 'SHG';
      $shot.textContent = 'S.O';
      $gp.textContent = 'GP';
      var rankingKeys2 = ['rankPoints', 'rankGoals', 'rankAssists',
        'rankPlusMinus', 'rankPowerPlayGoals',
        'rankShortHandedGoals', 'rankShotPct', 'rankGamesPlayed'];
      for (var key2 of rankingKeys2) {
        var $td2 = document.createElement('td');
        $td2.textContent = playerRankings[key2];
        $onPaceRow.appendChild($td2);
      }
    }
  });
  rankings.send();
});

// adds player to favorites list
$plusSignContainer.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  $advancedStatsContainer.classList.add('hidden');
  $favoritePlayersContainer.classList.remove('hidden');
  $playerProfileContainer.classList.add('hidden');
  var $iconId = event.target.closest('i').id;
  var favorites = new XMLHttpRequest();
  favorites.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + $iconId);
  favorites.responseType = 'json';
  favorites.addEventListener('load', function () {
    var favoriteInfo = favorites.response.people[0];
    var newFavorite = {
      id: $iconId,
      number: favoriteInfo.primaryNumber,
      name: favoriteInfo.fullName,
      position: favoriteInfo.primaryPosition.abbreviation
    };
    data.push(newFavorite);
    addFavoritePlayer(newFavorite);
  });
  favorites.send();
});

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

$noButton.addEventListener('click', function () {
  $modal.classList.add('hidden');
});
$yesButton.addEventListener('click', function () {
  closestTr.remove();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === closestTr.id) {
      data.splice(i, 1);
    }
  }
  $modal.classList.add('hidden');
});

$favoritesButton.addEventListener('click', function () {
  $favoritePlayersContainer.classList.remove('hidden');
  $rankingsContainer.classList.add('hidden');
  $tableContentContainer.classList.add('hidden');
  $playerProfileContainer.classList.add('hidden');
  $advancedStatsContainer.classList.add('hidden');
});

$bestInTheWest.addEventListener('click', function () {
  viewRankings();
});

document.addEventListener('DOMContentLoaded', function () {
  data.forEach(entry => {
    addFavoritePlayer(entry);
  });
});
