var attachSmallPokemonTemplate = function(attributes, $elementAppendedTo) {
  // call your small template and then append it where it should go
  var $template = $templatePokemonSmall(attributes);
  $template.appendTo($elementAppendedTo);
}
var $templatePokemonSmall = function(attributes) {
  // create a small jQuery template for Pokémon
  // to insert into your Poké ball!
  $template = $('<div class="pokemon template small animated zoomIn">')
              .attr('data-rid',     attributes.id) // rails id
              .attr('data-pkdx-id', attributes.pkdx_id);
  $('<h4>').text(attributes.name).appendTo($template);
  $image = $('<img class="poke-sprite" width="75"/>')
            .attr('src', attributes.image_url)
            .appendTo($template);
  return $template;
}
