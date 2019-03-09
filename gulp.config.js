let basePaths = 'project_file_name';

let baseConfig = {
	isDev : true,
	sourceMap : true,
	sassStyle: 'compact',
	cssRename : true,
	paths: {
		html	: basePaths+'/src',
		css		: basePaths+'/src/scss',
		script	: basePaths+'/src/js',
		image	: basePaths+'/src/images'
	},
	pathsDev: {
		html	: basePaths+'/dist',
		css		: basePaths+'/dist/css',
		script	: basePaths+'/dist/js',
		image	: basePaths+'/dist/images'
	},
	pathsTest: {
		html	: basePaths+'/dist_test',
		css		: basePaths+'/dist_test/css',
		script	: basePaths+'/dist_test/js',
		image	: basePaths+'/dist_test/images'
	},
	pathsBuild: {
		html	: basePaths+'/build',
		css		: basePaths+'/build/css',
		script	: basePaths+'/build/js',
		image	: basePaths+'/build/images'
	},
	autoprefixerConfig: {
		browsers: ['last 2 version']
	},
	base64Config: {
		extensions: ['png'],
		maxImageSize: 8*1024
	},
	pxToViewport: false
}

let projectConfig = require('./'+basePaths+'/project.config');

for ( let k in projectConfig ) {
	if ( projectConfig[k] != undefined) {
		baseConfig[k] = projectConfig[k]
	}
}

module.exports = baseConfig;