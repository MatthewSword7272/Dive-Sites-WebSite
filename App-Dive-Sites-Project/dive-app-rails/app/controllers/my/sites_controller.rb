class My::SitesController < ApplicationController
  before_action :set_site, only: %i[show update destroy]
  # before_action :check_permission!, only: %i[update destroy]

  # rescue_from PermissionDeniedError do |_e|
  #   head :forbidden
  # end

  # GET /sites
  def index
    @sites = current_user!.sites

    render json: @sites
  end

  # GET /sites/1
  def show
    render json: @site
  end

  # POST /sites
  def create
    @site = current_user!.sites.new(site_params)

    if @site.save
      render json: @site, status: :created, location: @site
    else
      render json: @site.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sites/1
  def update
    if @site.update(site_params)
      render json: @site
    else
      render json: @site.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sites/1
  def destroy
    @site.destroy
  end

  private

  # def check_permission!
  #   if @site.site_created_by != current_user!
  #     raise PermissionDeniedError
  #   end
  # end

  # Use callbacks to share common setup or constraints between actions.
  def set_site
    @site = current_user!.sites.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def site_params
    params.require(:site).permit(
      :name,
      :max_depth,
      :min_depth,
      :certification,
      :spearfishing,
      :port_phillip,
      :description,
      :latitude,
      :longitude,
      :date,
      :image_url,
      :video_id,
      :site_access,
      features: [],
    )
  end
end

