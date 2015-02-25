var currentPokemonData = function() {
  return {
    id: $pokemon.data('rid'),
    pkdx_id: $pokemon.data('pkdx-id'),
    name: $pokemon.find('h4').text(),
    image_url: $pokemon.find('img').attr('src')
  }
}

var currentPlayer = function($chosen) {
  return $chosen.children().first().data('name');
}

var catchPokemon = function(e) {
  var $chosen_player = $('.chosen').children().first();
  var $pokemon       = $(e.target).parent();
  var data = currentPokemonData();
  clearRandomPokemon();
  attachSmallPokemonTemplate(data, $chosen_player.find('.panel-body'));
  console.log($chosen_player.data('name') + ' --> ' + $pokemon.data('rid'));
}

var iChoseNext = function() {
  var $col    = $('.pokeball-col');
  var $chosen = $('.chosen');
  if ($chosen.length != 0) { // if there is a chosen pokeball!
    $next   = $chosen.next();
    if ($next.hasClass('new-pokeball')) { // start over
      $next = $next.siblings().first();
    }
    $chosen.removeClass('chosen');
    $next.addClass('chosen');

    return currentPlayer($next);
  } else if ($col.length != 0) { // no one chosen yet!
    $chosen = $col.first().addClass('chosen');

    return currentPlayer($chosen);
  } else { // no pokeballs!
    return null;
  }
}
