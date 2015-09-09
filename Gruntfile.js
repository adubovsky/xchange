module.exports = function (grunt) {

    var siteConfig = require('./server/config/site'),
        serverDir = './' + siteConfig.serverDir,
        clientSrcDir = './' + siteConfig.clientSrcDir,
        clientBuildDir = './' + siteConfig.clientBuildDir,
        browserifyFiles = {};

    browserifyFiles[clientBuildDir + '/js/app.js'] = [clientSrcDir + '/js/**/*.js'];
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
                files: browserifyFiles
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
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('server', ['nodemon:dev']);

    grunt.registerTask('devBuild', ['browserify', 'copy', 'sass:dev']);
    grunt.registerTask('dev', ['devBuild', 'watch']);

    grunt.registerTask('mea', ['nodemon:mongoAdmin']);

};