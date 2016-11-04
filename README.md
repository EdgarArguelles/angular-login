# Basic login page using Angular 

# Stack:
- API Blueprint (Mock API)
- Angular
- Bootstrap
- Browserify
- Eslint
- Karma / Jasmine
- Less
- Gulp
- Npm
- Bower

## Gulp Build tasks:
- compile angular templates into angular modules
- evaluate JS code via Eslint
- test JS code via Karma / Jasmine
- compile Less into css code
- bundle JS and CSS files
- uglify JS (only in production-ready)
- migrates the built app to the dist folder
- runs a dev webserver
- opens your browser at the dev URL
- mock API
- reloads the browser upon save

# Global Install
    npm i bower drakov gulp gulp-cli -g

# Install
    npm i
    bower i

# Build
### To uglify JS (production-ready) use --production flag
    gulp build --production
    
# Run
    gulp

### Note
- Valid user: user
- Valid password: 123
