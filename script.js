function main () {
  var inputForm = document.getElementById('input-form');

  var diagramElm = document.getElementById('diagram');

  var copyLink = document.getElementById('copyLink');

  var diagramInput = document.getElementById('diagram-input');

  var rebuild = function () {
    var elm = document.getElementById('diagram');
    var parent = elm.parentNode;
    parent.removeChild(elm);
    elm = document.createElement("div");
    elm.setAttribute('id', 'diagram');
    parent.appendChild(elm);
  }

  var draw = function (text) {
    diagramElm = document.getElementById('diagram');
    var diagram = Diagram.parse(text);
    diagram.drawSVG("diagram", {theme: 'simple'});
  };

  inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var diagramInput = document.getElementById('diagram-input');
    var text = diagramInput.value;
    rebuild();
    draw(text);
  });

  copyLink.addEventListener('click', function (event) {
    event.preventDefault();
    var baseUrl = location.origin + location.pathname;
    var encodedText = btoa(diagramInput.value);
    if (encodedText) {
      baseUrl += '?t=';
      baseUrl += encodedText;
    }
    copyToClipboard(baseUrl);
  });

  // Initialize
  var initText = getURLParameter('t');
  if(initText) {
    initText = atob(initText);
    diagramInput.value = initText;
    draw(initText);
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\/$/,''))||null
  }

  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl(Cmd)+C, Enter", text);
  }

}

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}