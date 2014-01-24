module.exports = function(grunt) {
    var vendorJsFiles = [
        'public/assets/vendor/jquery/jquery.js',
        'public/assets/vendor/underscore/underscore.js',
        'public/assets/vendor/backbone/backbone.js',
        'public/assets/vendor/marionette/backbone.marionette.js',
        'public/assets/vendor/backbone.syphon/lib/backbone.syphon.js',
        'public/assets/vendor/handlebars/handlebars.js',
        'public/assets/vendor/bootstrap/bootstrap.js',
        'public/assets/vendor/momentjs/moment.js',
        'public/assets/vendor/moment-timezine/index.js'
    ];

    var mainJsFiles = [
        'public/assets/js/lacquer/config/**/*.js',
        'public/assets/js/lacquer/app.js',
        'public/assets/js/lacquer/entities/**/*.js',
        'public/assets/js/lacquer/views/**/*.js',
        'public/assets/js/lacquer/apps/**/*.js'
    ];
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: './public/assets/vendor',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'

            },
            vendor: {
                src: vendorJsFiles,
                dest: 'public/js/vendor.js'
            },
            main: {
                src: mainJsFiles,
                dest: 'public/js/scripts.js'
            }
        },
        uglify: {
            vendor: {
                files: {
                    'public/js/vendor.min.js': '<%= concat.vendor.dest %>'
                }
            },
            main: {
                files: {
                    'public/js/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: '<%= concat.main.src %>'
        },
        cssmin: {
            vendor: {
                files: {
                    'public/css/vendor.css': ['public/assets/vendor/bootstrap/bootstrap.css']
                }
            },
            main: {
                files: {
                    'public/css/style.css': ['public/assets/css/**/*.css']
                }
            }
        },
        clean: [
            'public/img/', 'public/fonts/'
        ],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'public/assets/vendor/bootstrap/', src: ['glyphicons-**'], dest: 'public/fonts/', filter: 'isFile'},
                    {expand: true, cwd: 'public/assets/img/', src: ['**'], dest: 'public/img/'},
                    {expand: true, cwd: 'public/assets/fonts/', src: ['**'], dest: 'public/fonts/'}
                ]
            }
        },
        jasmine: {
            main: {
                src: 'public/assets/js/**/*.js',
                options: {
                    specs: 'test/*spec.js'
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    processName: function(path) {

                        // отрезаем ненужную часть пути
                        var appsCwd = 'public/assets/js/lacquer/apps/';
                        var baseCwd = 'public/assets/js/lacquer/templates/';
                        var ext = '.hbs';
                        path = (path.indexOf(appsCwd) === 0) ? path.slice(appsCwd.length) : path;
                        path = (path.indexOf(baseCwd) === 0) ? path.slice(baseCwd.length) : path;


                        path = (path.indexOf(ext) > 0) ? path.slice(0, path.indexOf(ext)) : path;
                        return path;
                    }
                },
                expand: true,
                files: {
                    "public/js/templates.js": ["public/assets/js/lacquer/apps/**/*.hbs", "public/assets/js/lacquer/templates/**/*.hbs"]
                }
            }
        },
        watch: {
            vendor: {
                files: ['public/assets/vendor/**'],
                tasks: ['clean', 'copy', 'jshint', 'concat', 'uglify', 'cssmin']
            },
            js: {
                files: ['public/assets/js/**/*.js', '.jshintrc'],
                tasks: ['jshint', 'concat:main']
            },
            css: {
                files: ['public/assets/css/**'],
                tasks: ['cssmin:main']
            },
            hbs: {
                files: ["public/assets/js/lacquer/apps/**/*.hbs", "public/assets/js/lacquer/templates/**/*.hbs"],
                tasks: ['handlebars']
            },
            files: {
                files: ['public/assets/img/**', 'public/assets/fonts/**'],
                tasks: ['clean', 'copy']
            },
            compiled: {
                files: ['public/img/**', 'public/fonts/**', 'public/css/**', 'public/js/**'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', ['bower', 'clean', 'copy', 'jshint', 'concat', 'uglify', 'cssmin', 'handlebars']);
    grunt.registerTask('js', ['jshint', 'concat:main', 'uglify:main']);
    grunt.registerTask('css', ['cssmin']);
};