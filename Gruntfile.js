module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              
      dist: {                            
        options: {                       
          style: 'compressed',
          compass: true
        },
        files: {                                   
          'src/css/style.css': 'src/sass/style.scss'     
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      main: {
        src: ['src/js/utils.js',
        'src/js/Classes/Model.js',
        'src/js/Classes/!(Model).js',
        ],
        dest: 'src/js/all.js'
      }
    },
    uglify: {
      options: {
        report: 'min',
        mangle: true,
        preserveComments: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      my_target: {
        files: [
          {'src/js/all.min.js': ['<%= concat.main.dest %>']}
        ]
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/css/', src: '*', dest: 'target/css'},
          { expand: true, cwd: 'src/img/', src: '*', dest: 'target/img'},
          { expand: true, cwd: 'src/js/vendor/', src: '*', dest: 'target/js/vendor'},
          { src: ['src/js/all.min.js'], dest: 'target/js/all.js'},
          { src: ['src/index.html'], dest: 'target/index.html'}
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'copy']);

};