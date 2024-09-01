require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @site = sites(:one)
  end

  test "should get index" do
    get sites_url, as: :json
    assert_response :success
  end

  test "should create site" do
    assert_difference("Site.count") do
      post sites_url, params: { site: { certification: @site.certification, date: @site.date, description: @site.description, latitude: @site.latitude, longitude: @site.longitude, max_depth: @site.max_depth, min_depth: @site.min_depth, name: @site.name, port_phillip: @site.port_phillip, spearfishing: @site.spearfishing, types: @site.types } }, as: :json
    end

    assert_response :created
  end

  test "should show site" do
    get site_url(@site), as: :json
    assert_response :success
  end

  test "should update site" do
    patch site_url(@site), params: { site: { certification: @site.certification, date: @site.date, description: @site.description, latitude: @site.latitude, longitude: @site.longitude, max_depth: @site.max_depth, min_depth: @site.min_depth, name: @site.name, port_phillip: @site.port_phillip, spearfishing: @site.spearfishing, types: @site.types } }, as: :json
    assert_response :success
  end

  test "should destroy site" do
    assert_difference("Site.count", -1) do
      delete site_url(@site), as: :json
    end

    assert_response :no_content
  end
end
