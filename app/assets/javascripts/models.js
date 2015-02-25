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

  // tell the DB to add this pokemon to the pokeball
  $.ajax({
    url:  '/pokeballs/' + $chosen_player.data('rid') + '/pokemons',
    type: 'POST',
    data: { pokemon_id: data.id}
  }).done(function (data) {
    clearRandomPokemon();
    attachSmallPokemonTemplate(data, $chosen_player.find('.panel-body'));
  });


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

var loadPokeballsWithPage = function() {
  $.ajax({
    url: "/pokeballs",
    type: "GET",
    dataType: "json"
  }).done(function(list_of_pokeballs){

    // iterate through the list of pokeballs
    for(var i=0, len = list_of_pokeballs.length; i < len; i++) {

      // get the pokeball list id
      var id = list_of_pokeballs[i].id;

      // with that id, make another AJAX call to the pokeball list of pokemons
      $.ajax({
        url: '/pokeballs/' + id,
        type: 'GET',
        dataType: 'json',
        data: { pokemon_id: list_of_pokeballs.id }
      }).done(function(pokeball_detail) {

        // given all the pokeball's detailed information
        // get the pokeballs pokemon
        var pokemons = pokeball_detail.pokemons;

        // get the name of the pokeball's owner (as lowercase)
        var name = pokeball_detail.pokeball.name.toLowerCase();

        // given the ownder's name, we grab the HTML element that shows their pokemon
        var $list = $('[data-name=' + name + ']')

        // iterate over the list of pokemon
        for (var j=0, len = pokemons.length; j < len; j++) {
          // append each pokemon to the DOM
          attachSmallPokemonTemplate(pokemons[j], $list.find('.panel-body'));
        }
      });
    }
  })
}
