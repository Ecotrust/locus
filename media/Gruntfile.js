'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    less: {
      dist: {
        files: {
          'assets/css/main.min.css': [
            'assets/less/app.less'
          ]
        },
        options: {
          compress: false,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          sourceMapFilename: 'assets/css/main.min.css.map',
          sourceMapRootpath: '/app/themes/commonplace/'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            //'assets/js/plugins/bootstrap/transition.js',
            //'assets/js/plugins/bootstrap/alert.js',
            //'assets/js/plugins/bootstrap/button.js',
            //'assets/js/plugins/bootstrap/carousel.js',
			'assets/js/plugins/bootstrap/collapse.js',
            //'assets/js/plugins/bootstrap/dropdown.js',
            //'assets/js/plugins/bootstrap/modal.js',
            //'assets/js/plugins/bootstrap/tooltip.js',
            //'assets/js/plugins/bootstrap/popover.js',
			//'assets/js/plugins/bootstrap/scrollspy.js',
            //'assets/js/plugins/bootstrap/tab.js',
            //'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        },
        options: {
            // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
            sourceMap: 'assets/js/scripts.min.js.map'
            // sourceMappingURL: 'http://commonplace/app/themes/commonplace/assets/js/scripts.min.js.map'
			, compress: false
			, mangle: false
            , beautify: true
        }
      }
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/bootstrap/*.less'
        ],
        tasks: ['less', 'vagrantssh:copy_media']
      },
      js: {
        files: [
          '<%= jshint.all %>',
          'assets/js/plugins/small-plugins.js'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          //livereload: true
          livereload: 35729
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          '*.html'
        ]
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    },
	vagrantssh: {
		copy_media: {
			path: './../.vagrant/',
			commands: [
				//'echo "testing" > /tmp/test2.txt',
				//'cat /tmp/test2.txt'
				'/home/vagrant/copy_media'
			],
			flags: [ '-t', '-A' ],
			callback: function( grunt, output ) {
				grunt.log.writeln( '!!!!-----------!!!!! ~~~~~ VAGRANT Output: ' + output );
			}
		}
	}
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-vagrant-ssh');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'less',
    'uglify'
  ]);
  grunt.registerTask('dev', [
    'watch',
	'vagrantssh:copy_media'
  ]);
  grunt.registerTask('va', [
	'vagrantssh:copy_media'
  ]);
};
