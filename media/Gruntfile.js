'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
		//too broken!
        //'js/map.js',
        //'js/locus.js',
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
          sourceMapRootpath: '/media/assets/media/'
        }
      }
    },
    uglify: {
      dist: {
        files: {
            // NOTE: scripts.min.js isn't currently in use.
			// @TODO Pull in other js files here once production is ready to concatenate and minify
			// @TODO Gut the big bootstrap JS and replace with components below as needed
          'assets/js/scripts.min.js': [
            //'assets/js/plugins/bootstrap/transition.js',
            //'assets/js/plugins/bootstrap/alert.js',
            //'assets/js/plugins/bootstrap/button.js',
            //'assets/js/plugins/bootstrap/carousel.js',
			//'assets/js/plugins/bootstrap/collapse.js',
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
        tasks: ['jshint', 'uglify', 'vagrantssh:copy_media']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          //livereload: true
          livereload: 35729
        },
        files: [
          'assets/reload.txt',
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          '../locus/templates/fbapp/*.html'
        ]
      },
      //files that don't need preprocessing but do need to be copied to media_root
      copy_media: {
		files: [
			'assets/js/*.js',
			'!assets/js/scripts.min.js',
			'assets/js/plugins/small-plugins.js',
			'js/*.js',
			'css/*.css'
		],
		tasks:  ['vagrantssh:copy_media']
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
				'/home/vagrant/copy_media'
				/*
				 * copy_media is a bash script in the home dir of the VM containing the following lines.
				 * Can probably just use these directly instead of calling the script.
				 * Rsync is probably fast enough to simply do /media to /mediaroot with recursion actually.
				 * -wm
				 *
				 * rsync -rtuv /usr/local/apps/locus/media/js/ /usr/local/apps/locus/mediaroot/js/
				 * rsync -rtuv /usr/local/apps/locus/media/css/ /usr/local/apps/locus/mediaroot/css/
				 * rsync -rtuv /usr/local/apps/locus/media/assets/ /usr/local/apps/locus/mediaroot/assets/
				*/
			],
			flags: [ '-t', '-A' ],
			callback: function( grunt, output ) {

				// Give LiveReload a local file to watch for
				// @TODO Might be able to have it watch a file in ../mediaroot instead?
				grunt.file.write('assets/reload.txt', output);

				grunt.log.writeln( '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VAGRANT Output: ');
				grunt.log.writeln( output );
				grunt.log.writeln( 'END VAGRANT Output~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' );
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
