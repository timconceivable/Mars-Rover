// const Command = require('./command.js');
// const Message = require('./message.js');
class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  receiveMessage(msgObj) {
    let msgCommands = msgObj.commands;
    let resultsArray = [];
    for (let i in msgCommands) {
      if (msgCommands[i].commandType === 'STATUS_CHECK') {
        resultsArray[i] = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts, 
            position: this.position
          }
        };
      }
      if (msgCommands[i].commandType === 'MOVE') {
        this.position += msgCommands[i].value;
        resultsArray[i] = {
          completed: true
        };
      }
      if (msgCommands[i].commandType === 'MODE_CHANGE') {
        resultsArray[i] = {
          completed: true
        };
      }
    };
    return {
      message: msgObj.name,
      results: resultsArray
    }
  }
}

/* let cmd = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let msg = new Message('Test message', cmd);
let Rov = new Rover(666666);
console.log(Rov.receiveMessage(msg) ); //.results.length); */

module.exports = Rover;