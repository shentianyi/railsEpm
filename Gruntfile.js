module.exports = function (grunt) {

	// 构建任务配置
	grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'app/assets/originJS',
                    src: '**/*.js',
                    dest: 'app/assets/javascripts'
                }]
            }
        }

    });
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', []);
}