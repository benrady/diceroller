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
  try {
    $('.error').empty();
    var expression = $('.expression').val();
    var expansion = expand(expression);
    addRow(expansion, eval(expansion).toString());
  } catch(e) {
    console.log(e);
    $('.error').text(e);
  }
}

function clearResults() {
  $('.roll-results').empty();
}

function keyPress() {
  var current = $('.expression').val();
  var newVal = current + $(this).text();
  $('.expression').val(newVal).change();
}

function diceRollerReady() {
  $('.roll-form').submit(formSubmit);
  $('.clear-btn').on('tap', clearResults);
  $('.input-btn').on('tap', keyPress);
}
