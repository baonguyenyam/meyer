module.exports = function (gulp, $, browserSync) {
	gulp.task('concat-js', function () {
		return gulp.src([
				'bower_components/jquery/dist/jquery.slim.min.js',
				'bower_components/popper.js/dist/umd/popper.min.js',
				'bower_components/bootstrap/dist/js/bootstrap.min.js',
				// Phần Plugins
				// 'bower_components/owl.carousel/dist/owl.carousel.min.js',
			])
			.pipe($.concat('meyer.js'))
			.pipe(gulp.dest('./dist/js'));
	});
};
