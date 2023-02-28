var $ol = document.querySelector('ol');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://statsapi.web.nhl.com/api/v1/standings?season=20222023');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.records[3].teamRecords.length; i++) {
    var $li = document.createElement('li');
    var $img = document.createElement('img');
    if (xhr.response.records[3].teamRecords[i].team.name === 'Vegas Golden Knights') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/800px-Vegas_Golden_Knights_logo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Los Angeles Kings') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Los_Angeles_Kings_logo.svg/1200px-Los_Angeles_Kings_logo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Edmonton Oilers') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Seattle Kraken') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Seattle_Kraken_official_logo.svg/1200px-Seattle_Kraken_official_logo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Calgary Flames') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Calgary_Flames_logo.svg/1200px-Calgary_Flames_logo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Vancouver Canucks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'San Jose Sharks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/SanJoseSharksLogo.svg/1200px-SanJoseSharksLogo.svg.png');
    } else if (xhr.response.records[3].teamRecords[i].team.name === 'Anaheim Ducks') {
      $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Anaheim_Ducks.svg/1200px-Anaheim_Ducks.svg.png');
    }
    $li.appendChild($img);
    $ol.appendChild($li);
  }
});
xhr.send();
