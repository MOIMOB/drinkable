# MOIMOB shared Gemfile: keep the part above "App-specific" identical in every app.
# Ruby comes from mise (mise.toml). Install: bundle install. Run: bundle exec fastlane <lane>.
# Gemfile.lock is committed; it locks for Linux (CI) and macOS (release machine).
source "https://rubygems.org"

gem "fastlane", "~> 2.241"
gem "abbrev" # dropped from Ruby 3.4 default gems; still required by fastlane's dependencies


plugins_path = File.join(File.dirname(__FILE__), "fastlane", "Pluginfile")
eval_gemfile(plugins_path) if File.exist?(plugins_path)
