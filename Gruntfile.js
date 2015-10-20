
module.exports = function(grunt) {
  var jshintrc = grunt.file.readJSON('.jshintrc');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      app: {
        options: {
          compress: true,
          cleancss: true,
          report: 'gzip'
        },
        files: {
          'public/css/style.css': 'src/less/style.less'
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 5 versions'})
        ]
      },
      dist: {
        src: 'public/css/*.css'
      }
    },
    jshint: {
      server: {
        options: jshintrc,
        files: {
          src: ['routes/*.js', 'models/*.js', 'controllers/*.js', '*.js']
        }
      }
    },
    mochacli: {
      development: {
        options: {
          env: {'NODE_ENV': 'development', 'TEST': true},
          reporter: 'spec',
          filesRaw: ['test/*.test.js']
        }
      }
    },
    watch: {
      less: {
        files: ['src/less/*'],
        tasks: ['less', 'postcss']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['public/css/*', 'public/js/*', 'templates/*', 'templates/*/**']
      }
    }

  });

  // Tasks for CSS
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');

  // Testing
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Live reload
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['less', 'postcss']);
  grunt.registerTask('test', ['jshint', 'mochacli:development']);
};
