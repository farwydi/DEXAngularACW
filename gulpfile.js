var gulp = require('gulp'),
	jade = require('jade'),
	gulpJade = require('gulp-jade'),
	ts = require('gulp-typescript');

var locationApp = 'app';
var locationBuild = 'htdocs';

gulp.task('jade', function () {
	return gulp.src([locationApp+'/**/*.jade', 'index.jade'])
	.pipe(gulpJade({
		jade: jade,
		pretty: true
	}))
	.pipe(gulp.dest(locationBuild+'/'));
});

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
	return gulp.src(locationApp+'/**/*.ts')
		.pipe(tsProject())
		.pipe(gulp.dest(locationBuild+'/'+locationApp));
});

gulp.task('js', function() {
	return gulp.src(locationApp+'/**/*.js')
		.pipe(gulp.dest(locationBuild+'/'+locationApp));
});

gulp.task('copy_config', function() {
	return gulp.src('systemjs.config.js')
		.pipe(gulp.dest(locationBuild));
});

gulp.task('build_backend', function() {
	gulp.src('backend/**/*.php')
		.pipe(gulp.dest(locationBuild));
});

gulp.task('build', function() {
	gulp.src('node_modules/@angular/core/bundles/core.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/common/bundles/common.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));
		
	gulp.src('node_modules/@angular/compiler/bundles/compiler.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/forms/bundles/forms.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/http/bundles/http.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/platform-browser/bundles/platform-browser.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/@angular/router/bundles/router.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib/angular'));

	gulp.src('node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js')
		.pipe(gulp.dest(locationBuild+'/lib'));

	gulp.src('node_modules/rxjs/*.js')
		.pipe(gulp.dest(locationBuild+'/lib/rxjs'));	

	gulp.src('node_modules/rxjs/util/*.js')
		.pipe(gulp.dest(locationBuild+'/lib/rxjs/util'));

	gulp.src('node_modules/rxjs/symbol/*.js')
		.pipe(gulp.dest(locationBuild+'/lib/rxjs/symbol'));

	gulp.src('node_modules/core-js/client/shim.min.js')
		.pipe(gulp.dest(locationBuild+'/lib/core-js/client'));

	gulp.src('node_modules/systemjs/dist/system.src.js')
		.pipe(gulp.dest(locationBuild+'/lib'));

	gulp.src('node_modules/zone.js/dist/zone.js')
		.pipe(gulp.dest(locationBuild+'/lib'));
});

gulp.task('default', ['copy_config', 'build', 'build_backend', 'js', 'jade'], function() {
	gulp.watch('systemjs.config.js', ['copy_config']);

	gulp.watch(locationApp+'/**/*.js', ['js']);

	gulp.watch([locationApp+'/**/*.jade', 'index.jade'], ['jade']);
});