function main () {
  var inputForm = document.getElementById('input-form');

  var diagramElm = document.getElementById('diagram');

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
}

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}