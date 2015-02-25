console.log('file loaded');

var $randomPokemon, // page element references (set on load below...)
    $newPokeball,
    $pokeballs,
    $pokeballListEl;

// Attach and template methods for new pokeballs and new pokemon in pokeballs!
var attachPokeball = function(attributes) {
  // call your pokeball template and then append it where it should go
}
var $templatePokeball = function(attributes) {
  // create a small jQuery template for pokéballs
}

// these methods change the chosen pokeball and return whose pokeball it is

$(document).ready(function() {
  $randomPokemon = $('#show-random-poke');
  $newPokeball   = $('#add-pokeball');
  $pokeballs     = $('.panel');
  $pokeballListEl = $('.pokeballs');

  $('#generate-random-poke').on('click', function(e) {
    // get a random pokemon from the database and
    // attach it to the DOM (with the large template)
    $.ajax({
      url:      "/pokemons",
      type:     "GET",
      data:     { random: true },
      dataType: "json"
    }).done(function(data){
      attachLargePokemonTemplate(data);
    });
  });

});

// Utility function!

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
