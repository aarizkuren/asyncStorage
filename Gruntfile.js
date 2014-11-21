/**
 * Created by asier on 19/11/14.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: __dirname + '/.jshintrc'
            },
            files: [
                'Gruntfile.js',
                'src/*.js',
                'test/*.spec.js'
            ]
        },

        karma: {
            options: {
                files: [
                    'src/*.js',
                    'test/helper.js',
                    // Allow an optional pattern for test files with --tests.
                    {
                        pattern: grunt.option('tests') || 'test/*.spec.js', included: true
                    }
                ]
            },
            dev: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            run: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    // Always show stack traces when Grunt prints out an uncaught exception.
    grunt.option('stack', true);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['karma:run']);
    grunt.registerTask('prod', ['jshint', 'karma:run']);
    grunt.registerTask('default', 'test');
};