const assert = require('assert');
const es = require('event-stream');
const File = require('vinyl');
const pigalleBuilder = require('../dist/gulp-pigalle-builder.dist');

describe('gulp-pigalle-builder', () => {
  describe('in streaming mode', () => {
    it('should prepend text', (done) => {

      /**
       * .then(gen => {
      return g.file(output, gen.code, {src: true})
        .pipe(gulp.dest(destination))
    });
       */

      // create the fake file
      const fakeFile = new File({
        contents: es.readArray(['stream', 'with', 'those', 'contents'])
      });

      // Create a prefixer plugin stream
      const builder = pigalleBuilder('prependthis');

      // write the fake file to it
      builder.write(fakeFile);



      // wait for the file to come back out
      builder.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isStream());

        // buffer the contents to make sure it got prepended to
        file.contents.pipe(es.wait(function(err, data) {
          // check the contents
          assert.equal(data, 'prependthisstreamwiththosecontents');
          done();
        }));
      });

    });

  });
});