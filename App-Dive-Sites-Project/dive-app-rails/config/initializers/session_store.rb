if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_dive-sites-app', domain: '_dive-sites-app-json-api', expires: 5.hours.from_now, same_site: :strict
else
  Rails.application.config.session_store :cookie_store, key: '_dive-sites-app', expires: 5.hours.from_now, same_site: :strict
end
