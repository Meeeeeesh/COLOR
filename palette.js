;(function() {
  var getJSON = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  };

  var loadHeaderBanner = function() {
    header = document.createElement("header");
    header.className = "header__container";
    hOneTitle = document.createElement("h1");
    hOneTitle.innerText = "HexMIX";
    header.appendChild(hOneTitle);
    hTwoTitle = document.createElement("h2");
    hTwoTitle.innerText = "Please, nothing ugly.";
    header.appendChild(hTwoTitle);
    document.body.insertBefore(header, document.body.childNodes[0]);
  }

  var Palette = function() {
    this.dominant = null;
    this.contrastingDominant = null;
    this.subDominant = null;
    this.contrastingSubDominant = null;
    this.pop = null;
  };

  var handleResponse = function(e) {
    var palettes = JSON.parse(e.target.responseText);
    var palettesGroup = document.createElement('div');
    palettesGroup.className = "palettes__group";
    var title, category;
    palettes.forEach(function(palette){
      paletteDiv = document.createElement('div');
      paletteDiv.className = "palette__section";
      title = document.createElement('h3');
      title.className = "palette__title";
      title.innerText = palette.title;
      paletteDiv.appendChild(title);
      category = document.createElement('p');
      category.className = "palette__category";
      category.innerText = palette.category;
      paletteDiv.appendChild(category);
      palettesGroup.appendChild(paletteDiv);

      var p = new Palette();
      hexKeys = [ 'dominant', 
                  'contrastingDominant', 
                  'subDominant', 
                  'contrastingSubDominant', 
                  'pop' ];
      var i = 0;
      for(; i < hexKeys.length; i++) {
        p = palette.hex[hexKeys[i]];
        hexDiv = document.createElement('div');
        hexDiv.className = 'palette__hex';
        hexDiv.style.background = p;
        hexDiv.innerHTML = '&nbsp;'
        paletteDiv.appendChild(hexDiv);
      };
    });
    document.body.insertBefore(palettesGroup, document.body.childNodes[1]);
  };

  getJSON('/palette.json', handleResponse);
  loadHeaderBanner();
})();


