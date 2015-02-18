module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [
                    'js/app.js',
                    'js/bc_ajaxData.js',
                    'js/bc_timemap.js'
                ],
                tasks: ['minified']
            }
        },
        minified: {
            files: {
                src: [
                    'js/*.js'
                ],
                dest: 'js/'
            },
            options: {
                sourcemap: false,
                allinone: true,
                dest_filename: "app.min.js"
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};