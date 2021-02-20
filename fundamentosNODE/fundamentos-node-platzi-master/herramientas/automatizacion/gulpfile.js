const gulp = require('gulp');
const server = require('gulp-server-livereload');
/*
una tarea se instancia a través de gulp.task, un nombre y la 
función que se ejecutará cuando dicha tarea se invoque. 
La tarea default, como su propio nombre indica, será la que 
se ejecute por defecto si no se especifica el nombre de ninguna 
tarea. Sin más código que este, accede lanza el comando gulp 
desde la consola.
*/
gulp.task('build', function(cb) {
    console.log('Construyendo el sitio');
    setTimeout(cb, 1200);
});

gulp.task('serve', function(cb) {
    gulp.src('www')
        .pipe(server({
            livereload: true,
            open: true,
        }));
});

gulp.task('default', gulp.series('build', 'serve'));