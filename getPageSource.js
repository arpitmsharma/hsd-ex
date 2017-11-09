function scrapeLinks() {
  var links = document.getElementsByTagName('a');
  var currentLink;
  var episodes = [];
  var episode;
  for (var i = 0; i < links.length; i++) {
    currentLink = links[i];
    if (currentLink.href.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) !== null) {
      var episodeName = currentLink.parentNode.parentNode.previousSibling.innerText;
      var quality = getQualityOfSub(episodeName);
      episode = createEpisode(episodeName, quality, currentLink.href)
      episodes.push(episode);
    }
  }
return  generateHTML(episodes, 'All');
}

function createEpisode(name, quality, link) {
  var episode = new Object();
  episode.name = name;
  episode.quality = quality;
  episode.link = link;
  return episode;
}

function getQualityOfSub(EpisodeName) {
  var matches = EpisodeName.match(/\[(.*?)\]/);
  var quality = 'none';
  if (matches) {
    quality = matches[1];
  }
  return quality;
}

function generateHTML(episodes, quality) {
  var tableBody = document.getElementById("tableBody");
  var html="";
  for (var i = 0; i < episodes.length; i++) {
  html = html+'<tr><td><a href="'+episodes[i].link +'">'+ episodes[i].name +'</a></td></tr>';
  }
return html;
}

chrome.runtime.sendMessage({
  action: "getSource",
  source: DOMtoString(document)
});
