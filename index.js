import http from 'http';
import { Readable, pipeline } from 'stream';
import emoji from 'node-emoji';
class EmojiMoonStream extends Readable {
  constructor (options) {
    super(options);
    this.moonPhases = [];
    this.index = 0;
    this.moonPhases.push(emoji.get(':full_moon:'));
    this.moonPhases.push(emoji.get(':waning_gibbous_moon:'));
    this.moonPhases.push(emoji.get(':last_quarter_moon:'));
    this.moonPhases.push(emoji.get(':waning_crescent_moon:'));
    this.moonPhases.push(emoji.get(':new_moon:'));
    this.moonPhases.push(emoji.get(':waxing_crescent_moon:'));
    this.moonPhases.push(emoji.get(':first_quarter_moon:'));
    this.moonPhases.push(emoji.get(':moon:'));
  }

  _read () {
    const LAST_MOON_PHASE = 8;
    const FIRST_MOON_PHASE = 0;
    this.push(this.moonPhases[this.index++]);
    if (this.index === LAST_MOON_PHASE) {
      this.index = FIRST_MOON_PHASE;
    }
  }
}
const server = http.createServer((req, res) => {
  const moonPhasesStream = new EmojiMoonStream();

  pipeline(moonPhasesStream, res, (error) => console.log(error));
});

server.listen(3000);
