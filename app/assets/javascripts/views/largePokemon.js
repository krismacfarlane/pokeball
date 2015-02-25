// Below are the functions necessary to create the HTML for a Pokemon
// object on the screen. You need to call the first function with a
// JS object that has the attributes id, name, pkdx_id, and image_url
// (at least), and a string name of who can catch it

var attachLargePokemonTemplate = function(attributes) {
  clearRandomPokemon();
  $randomPokemon.removeClass('empty');
  $pokemon = $templatePokemonLarge(attributes, capitalize(iChoseNext()));
  $randomPokemon.append($pokemon);
}
var clearRandomPokemon = function() {
  $randomPokemon.children().fadeOut().remove();
}
var $templatePokemonLarge = function(attributes, person) {
  $template = $('<div class="pokemon template large animated zoomIn">')
                .attr('data-rid',     attributes.id) // rails id
                .attr('data-pkdx-id', attributes.pkdx_id);
  $('<h4>').text(attributes.name).appendTo($template);
  $image = $('<img class="poke-sprite" width="120"/>')
             .attr('src', attributes.image_url);
  $('<div class="sprite-canvas">')
    .append($image)
    .appendTo($template);
  $('<br>').appendTo($template);
  $('<button type="button" class="btn btn-md btn-default" id="catch-pokemon">')
    .text('Catch for ' + person + '!')
    .on('click', catchPokemon)
    .appendTo($template);
  return $template;
}
