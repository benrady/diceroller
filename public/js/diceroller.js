function rollDie(sides, count) {
  var roll = Math.floor(((Math.random() * sides) + 1));
  if (count > 1) {
    return roll + rollDie(sides, count-1);
  }
  return roll;
}

function expand(expression) {
  var regex = /(\d*)d(\d+)/g;
  var expansion = expression;
  var match = regex.exec(expression);
  while (match) {
    console.log(expansion);
    console.log(match);
    expansion = expansion.replace(match[0], rollDie(match[2], match[1] || 1));
    var match = regex.exec(expansion);
  }
  return expansion;
}

function addRow(expansion, value) {
  $('.roll-results')
    .prepend($('<tr>')
      .append(
        $('<td>').html(expansion),
        $('<td>').html("="),
        $('<td>').html(value)));
}

function formSubmit(e) {
  e.preventDefault();
  var expression = $('.expression').val();
  var expansion = expand(expression);
  addRow(expansion, eval(expansion).toString());
}

function diceRollerReady() {
  $('.roll-form').submit(formSubmit);
}
