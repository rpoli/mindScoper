module.exports = function (grunt) {


  grunt.initConfig({
    jsDir: 'public/js/',
    cssDir: 'public/css/',
    scssDir: 'public/src/scss/',
    cssDistDir: 'public/src/css/',
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      js: {
        options: {
          specs: 'test/*_spec.js',
          template: require('grunt-template-jasmine-requirejs')
        }
      }
    },
    copy: {
      getProd: {
        files: [{
          expand: true,
          cwd: 'public/js/src/templates',
          src: '**/*.js',
          dest: 'public/js/min/templates',
          flatten: true,
          filter: 'isFile'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          /* nested / compact/ compressed / expanded  */
          trace: true,
          debugInfo: false,
          lineNumbers: true,
          update: false,
          sourcemap: "none"
        },
        files: [{
          expand: true,
          cwd: 'public/src/scss',
          src: ['*.scss', '**/*.scss'],
          dest: 'public/src/css',
          ext: '.css'
        }]

      }
    },
    jshint: {
      all: ['gruntfile.js', 'public/js/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        forin: true,
        maxerr: 100,
        undef: true,
        unused: true,
        jasmine: true,
        node: true,
        mocha: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    jscs: {
      files: {
        src: ['gruntfile.js', "public/js/**/*.js"]
      },
      options: {
        "fix": true,
        "esnext": true, // If you use ES6 http://jscs.info/overview.html#esnext
        "verbose": false, // If you need output with rule names http://jscs.info/overview.html#verbose
        "requireCurlyBraces": ["if"],
        "disallowMixedSpacesAndTabs": true,
        "disallowMultipleLineBreaks": true,
        "disallowMultipleSpaces": {
          "allowEOLComments": true
        },
        "disallowMultipleVarDecl": true,
        "disallowUnusedParams": true,
        "validateIndentation": 2,
        "requireSpacesInFunctionExpression": {
          "beforeOpeningRoundBrace": true,
          "beforeOpeningCurlyBrace": true
        },
        "requireSemicolons": true,
        "requireSpaceAfterKeywords": true,
        "requireDotNotation": true,
        "requireCommaBeforeLineBreak": true,
        "disallowTrailingComma": true,
        "disallowTrailingWhitespace": true,
        "requireSpaceAfterComma": true
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: "public/js",
          baseUrl: './',
          dir: "public/build",
          removeCombined: true,
          findNestedDependencies: true,
          mainConfigFile: "public/js/requireConfig.js",
          skipDirOptimize: true,
          modules: [{
              name: "depModules/home/dep"
            }
          ]
        }
      }
    },
    "babel": {
        "options": {
            "sourceMap": true,
            "experimental": true,
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "public/src/",                
                "src": ["js/*.js","js/**/*.js","js/*.jsx","js/**/*.jsx"],
                "dest": "public/build/",
                "ext": ".js"
            }]
        }
    },

    browserify: {
      main: {
        src: 'public/build/js/main.js',
        dest: 'public/build/js/app.js'
      }
    },

    watch: {
      files: ['<%=jsDir%>*.js', '<%=scssDir%>/**/*.scss'],
      tasks: ['sass']
    }
  });
  
   //grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask("optimize", ["requirejs"]);
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-jsbeautifier");

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  // Default task(s).
  grunt.registerTask('default', ['babel','browserify']);
};