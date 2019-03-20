var gulp = require("gulp"),
  	importResolve = require("import-resolve"),
  	pathSCSS = "scss/",
  	pathCSS = "theme/assets/";

var resolveSass = callback => {
  importResolve({
		"ext": "scss",
		"pathToMain": pathSCSS + "style.scss",
		"output": pathCSS + "alabama.scss.liquid"
	});
  callback();
};

gulp.task('default', resolveSass);
gulp.task('watch', () => {
  gulp.watch([pathSCSS + "*.scss", pathSCSS + "**/*.scss"], resolveSass);
});
