class PokemonsController < ApplicationController
  before_action :set_pokemon, only: [:show, :update, :destroy]

  def index
    @pokemons = Pokemon.all

    @pokemons = @pokemons.sample if params[:random]

    # nested index...
    if params[:pokeball_id]
      # (#joins)#merge filters one set of AR models (known as an AR relation)
      # by their association(s)! Another (worse) way to write this would be:
      #
      # @pokemons = Pokeball.find(params[:pokeball_id]).pokemons

      @pokemons = @pokemons.joins(:pokeballs)
                           .merge( Pokeball.where id: params[:pokeball_id] )
    end

    render json: @pokemons
  end

  def show
    render json: @pokemon
  end

  def create
    pokeball = Pokeball.find params["pokeball_id"]
    newly_caught_pokemon = Pokemon.find params["pokemon_id"]

    pokeball.pokemons << newly_caught_pokemon
  end

  def update
    if @pokemon.update(pokemon_params)
      render :show, status: :ok, location: @pokemon
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pokemon.destroy
    head :no_content
  end

  private

  def set_pokemon
    @pokemon = Pokemon.find(params[:id])
  end

  def pokemon_params
    params.require(:pokemon).permit(:name, :image_url, :pkdx_id, :catch_ratio, :attack, :defense, :health, :speed, :weight, :height)
  end
end
