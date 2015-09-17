module.exports = function (grunt) {

    var siteConfig = require('./server/config'),
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
            options: {
                livereload: 9000
            },
            js: {
                files: [
                    clientSrcDir + '/js/**/*.js'
                ],
                tasks: ['js:dev']
            },
            html: {
                files: [
                    clientSrcDir + '/partials/**/*.html',
                    clientSrcDir + '/*.html'
                ],
                tasks: ['html']
            },
            css: {
                files: [
                    clientSrcDir + '/scss/**/*.scss'
                ],
                tasks: ['css:dev']
            }
        },
        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: [{
                    dest: clientBuildDir + '/js/app.js',
                    src: [clientSrcDir + '/js/**/*.js', '!' + clientSrcDir + '/js/**/*.tests.js']
                }]
            },
            prod: {
                files: [{
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
            },
            prod: {
                options: {
                    sourcemap: false,
                    style: 'compressed'
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
                '-W030': false,  //expect($scope.item.isValid()).to.be.true;
                                 //                                    ^ Expected an assignment or function call and instead saw an expression.
                '-W087': false,  //debugger
                globals: {
                    console: false,
                    /* mocha */
                    describe: false,
                    it: false,
                    before: false,
                    beforeEach: false,
                    after: false,
                    afterEach: false,
                    expect: false,
                    inject: false,
                    /* Browserify */
                    require: false,
                    module: false,
                    'module.exports': false
                }
            },
            client: [siteConfig.clientSrcDir + '/**/*.js'],
            server: [siteConfig.serverDir + '/**/*.js'],
            tools: ['Gruntfile.js']
        },
        clean: {
            html: [siteConfig.clientBuildDir + '/index.html', siteConfig.clientBuildDir + '/partials'],
            img: [siteConfig.clientBuildDir + '/img'],
            css: [siteConfig.clientBuildDir + '/css'],
            js: [siteConfig.clientBuildDir + '/js']
        },
        shell: {
            mongo: {
                command: 'mongod',
                options: {
                    async: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell-spawn');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('server', ['jshint:server', 'shell:mongo', 'nodemon:dev']);

    //subtasks
    //js
    grunt.registerTask('js:dev', ['clean:js', 'jshint:client', 'karma', 'browserify:dev']);
    grunt.registerTask('js:prod', ['clean:js', 'jshint:client', 'karma', 'browserify:prod']);
    //html
    grunt.registerTask('html', ['clean:html', 'copy']);
    //css
    grunt.registerTask('css:dev', ['clean:css', 'sass:dev']);
    grunt.registerTask('css:prod', ['clean:css', 'sass:prod']);

    grunt.registerTask('devBuild', ['js:dev', 'css:dev', 'html']);
    grunt.registerTask('build', ['js:prod', 'css:prod', 'html']);
    grunt.registerTask('dev', ['devBuild', 'watch']);

    grunt.registerTask('mea', ['nodemon:mongoAdmin']);

};