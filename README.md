# Basic login page using Angular 

# Stack:
- API Blueprint (Mock API)
- Angular
- Bootstrap
- Browserify
- Jshint
- Karma / Jasmine
- Less
- Gulp
- Npm
- Bower

## Gulp Build tasks:
- compile angular templates into angular modules
- evaluate JS code via Jshint
- test JS code via Karma / Jasmine
- compile Less into css code
- bundle JS and CSS files
- uglify JS (only in production-ready)
- migrates the built app to the dist folder
- runs a dev webserver
- opens your browser at the dev URL
- mock API
- reloads the browser upon save

# Install
    npm i
    bower i

# Build
### To uglify JS (production-ready) use --production flag
    gulp build --production
    
# Run
    gulp
