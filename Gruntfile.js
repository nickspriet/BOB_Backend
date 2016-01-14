module.exports = function (grunt) {
    var jshintrc = grunt.file.readJSON('.jshintrc');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        }
    });

    // Testing
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('test', ['jshint', 'mochacli:development']);
};
