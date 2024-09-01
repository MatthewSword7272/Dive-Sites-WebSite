class SitesController < ApplicationController
  before_action :set_site, only: %i[show]

  # GET /sites
  def index
    @sites = Site.all

    render json: @sites
  end

  # GET /sites/1
  def show
    render json: @site
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_site
    @site = Site.find(params[:id])
  end
end
