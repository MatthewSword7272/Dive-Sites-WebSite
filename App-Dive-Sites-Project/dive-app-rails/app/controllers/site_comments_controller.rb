class SiteCommentsController < ApplicationController
  before_action :set_site
  before_action :set_site_comment, only: %i[show update destroy]
  before_action :check_permission!, only: %i[update destroy]

  rescue_from PermissionDeniedError do |_e|
    head :forbidden
  end

  # GET /site_comments
  def index
    @site_comments = @site.site_comments
    render json: @site_comments
  end

  # GET /site_comments/1
  def show
    render json: @site_comment
  end

  # POST /site_comments
  def create
    @site_comment = @site.site_comments.build(site_comment_params)
    @site_comment.user_id = current_user!.id

    if @site_comment.save
      render json: @site_comment, status: :created
    else
      render json: @site_comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sites/1
  def update
    if @site_comment.update(site_comment_params)
      render json: @site_comment
    else
      render json: @site_comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sites/1
  def destroy
    @site_comment.destroy
  end

  private

  def check_permission!
    if @site_comment.user_id != current_user!.id
      raise PermissionDeniedError
    end
  end
  # Use callbacks to share common setup or constraints between actions.
  def set_site_comment
    @site_comment = @site.site_comments.find(params[:id])
  end

  def set_site
    @site = Site.find(params[:site_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def site_comment_params
    params.require(:site_comment).permit(
      :comment,
      :user_id,
      :site_id
    )
  end
end
