module.exports = function (grunt) {

    var siteConfig = require('./server/config/site'),
        serverDir = './' + siteConfig.serverDir,
        clientSrcDir = './' + siteConfig.clientSrcDir,
        clientBuildDir = './' + siteConfig.clientBuildDir;

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*Server perks*/
        nodemon: {
            dev: {
                script: [serverDir, 'app.js'].join('/'),
                options: {
                    ignore: ['node_modules/**', 'client/**']
                }
            },
            mongoAdmin: {
                script: './node_modules/mongo-express/app.js',
                options: {
                    watch: false
                }
            }
        },
        /*Client perks*/
        watch: {
            scripts: {
                files: [
                    clientSrcDir + '/js/**/*.js',
                    clientSrcDir + '/partials/**/*.html',
                    clientSrcDir + '/*.html',
                    clientSrcDir + '/scss/**/*.scss'
                ],
                tasks: ['devBuild'],
                options: {
                    livereload: 9000
                }
            }
        },
        browserify: {
            dist: {
                files: [{//browserifyFiles[clientBuildDir + '/js/app.js'] = [clientSrcDir + '/js/**/*.js', '!' + clientSrcDir + '/js/**/*.tests.js'];
                    dest: clientBuildDir + '/js/app.js',
                    src: [clientSrcDir + '/js/**/*.js', '!' + clientSrcDir + '/js/**/*.tests.js']
                }]
            }
        },
        copy: {
            partials: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: clientBuildDir + '/partials',
                        cwd: clientSrcDir + '/partials'
                    }
                ]
            },
            index: {
                files: [
                    {
                        expand: true,
                        src: ['*.html'],
                        dest: clientBuildDir + '/',
                        cwd: clientSrcDir + '/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: clientBuildDir + '/img',
                        cwd: clientSrcDir + '/img'
                    }
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: true
                },
                files: [
                    {
                        src: clientSrcDir + '/scss/main.scss',
                        dest: clientBuildDir + '/css/main.css'
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: './karma.conf.js'
            }
        },
        jshint: {
            options: {
                '-W097': false,  //Use the function form of "use strict".
                "globals": {
                    /* mocha */
                    "describe": false,
                    "it": false,
                    "before": false,
                    "beforeEach": false,
                    "after": false,
                    "afterEach": false,
                    /* Browserify */
                    "require": false,
                    "module": false,
                    "module.exports": false
                }
            },
            client: [siteConfig.clientSrcDir + '/**/*.js'],
            server: [siteConfig.serverDir + '/**/*.js'],
            tools: ['Gruntfile.js']
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('server', ['jshint:server','nodemon:dev']);

    grunt.registerTask('devBuild', ['jshint:client', 'browserify', 'copy', 'sass:dev']);
    grunt.registerTask('dev', ['devBuild', 'watch']);

    grunt.registerTask('mea', ['nodemon:mongoAdmin']);

};