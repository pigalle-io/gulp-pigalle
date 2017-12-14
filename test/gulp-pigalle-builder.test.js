const assert = require('assert');
const es = require('event-stream');
const File = require('vinyl');
const pigalleBuilder = require('../dist/gulp-pigalle-builder.dist');

describe('gulp-pigalle', () => {
  describe('in streaming mode', () => {
    it('should prepend text', (done) => {

      // create the fake file
      const fakeFile = new File({
        contents: es.readArray(['stream', 'with', 'those', 'contents'])
      });

      // Create a prefixer plugin stream
      const myPrefixer = prefixer('prependthis');

      // write the fake file to it
      myPrefixer.write(fakeFile);

      // wait for the file to come back out
      myPrefixer.once('data', function(file) {
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