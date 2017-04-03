'use strict'

const fs = require('fs')
const serveStatic = require('serve-static')

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt)
    require('time-grunt')(grunt)

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './src/css/main.css': './src/sass/main.scss', // dest, src
                }
            }
        },

        browserify: {
            watch: {
                files: {
                    './dist/app.js': ['./src/app.js']
                },
                options: {
                    transform: ['hbsfy', 'babelify'],
                    browserifyOptions: {
                      debug: true
                    }
                }
            },
            dist: {
                files: {
                    './dist/app.js': ['./src/app.js']
                },
                options: {
                    transform: ['hbsfy', 'babelify', 'uglifyify'],
                    browserifyOptions: {
                      debug: true
                    }
                }
            }
        },

        clean: {
            dist: ['./dist']
        },

        connect: {
            server: {
                options: {
                    base: './dist',
                    hostname: '0.0.0.0',
                    livereload: true,
                    open: true,
                    port: 3000,
                    middleware: (connect, options) => {
                        const middlewares = []

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base]
                        }

                        options.base.forEach(function (base) {
                            middlewares.push(serveStatic(base))
                        })

                        // default: index.html
                        middlewares.push((req, res) => {
                            fs
                                .createReadStream(`${options.base}/index.html`)
                                .pipe(res)
                        })
                        return middlewares
                    }
                }
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: 'src',
                src: ['*.html','css/*.css', 'img/*'],
                dest: './dist/'
            }
        },

        watch: {
            js: {
                files: ['./src/**/*.js', './src/**/*.hbs', './src/*.html', './src/css/*.css'],
                tasks: ['browserify:watch'],
                options: {
                    livereload: true
                }
            },

            html: {
                files: ['./src/*html'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            },

            sass: {
                files: ['./src/sass/*.scss'],
                tasks: ['sass', 'copy'],
                options: {
                    livereload: true
                }
            }
        }
    })

    grunt.registerTask('default', ['clean', 'copy', 'sass', 'browserify:dist']);
    grunt.registerTask('start', ['default', 'connect', 'watch']);
    grunt.loadNpmTasks('grunt-contrib-sass');

}
