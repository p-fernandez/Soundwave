Soundwave is just a wrapper of the Web Audio API that I started inspired by [@mjanssen](https://github.com/mjanssen) package [Aural](https://github.com/mjanssen/aural) so I can learn more about the API and test the Rollup.js bundler that I had never worked with.

# Bundle
```
yarn rollup:prod
```
# Use
Import ```bundle.js``` and load a local file with ```Soundwave.load(file)```.
```Soundwave.play()```
```Soundwave.pause()```
```Soundwave.stop()```
They are self-explanatory.

I just allow playing one sound file at a time. Haven't tested further than with MP3 file format.

# Examples
By far, just one with the basic functions I have already implemented.

# License
ISC
