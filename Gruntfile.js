module.exports = function(grunt) {
    var vendorJsFiles = [
        'public/assets/vendor/jquery/jquery.js',
        'public/assets/vendor/underscore/underscore.js',
        'public/assets/vendor/backbone/backbone.js',
        'public/assets/vendor/backbone.localStorage.js',
        'public/assets/vendor/marionette/backbone.marionette.js',
        'public/assets/vendor/backbone.syphon/lib/backbone.syphon.js',
        'public/assets/vendor/bootstrap/bootstrap.js',
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
                src: ['public/assets/js/**/*.js'],
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
        watch: {
            vendor: {
                files: ['public/assets/vendor/**',  'Gruntfile.js'],
                tasks: ['clean', 'copy', 'jshint', 'concat', 'uglify', 'cssmin']
            },
            bower: {
                files: ['bower_components/**'],
                tasks: ['bower', 'clean', 'copy', 'jshint', 'concat', 'uglify', 'cssmin']
            },
            js: {
                files: ['public/assets/js/**'],
                tasks: ['jshint', 'concat:main', 'uglify:main']
            },
            css: {
                files: ['public/assets/css/**'],
                tasks: ['cssmin:main']
            },
            files: {
                files: ['public/assets/img/**', 'public/assets/fonts/**'],
                tasks: ['clean', 'copy']
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

    grunt.registerTask('default', ['bower', 'clean', 'copy', 'jshint', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('js', ['jshint', 'concat:main', 'uglify:main']);
    grunt.registerTask('css', ['jshint', 'concat:main', 'uglify:main']);
};