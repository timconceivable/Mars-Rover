const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  receiveMessage(msgObj) {
    let msgCommands = msgObj.commands;
    let response = [];
    for (let i in msgCommands) {
      let complete = true;
      if (msgCommands[i].commandType === 'MOVE') {
        if (this.mode === 'NORMAL') {
          this.position = msgCommands[i].value;
        } else complete = false;
      }
      if (msgCommands[i].commandType === 'MODE_CHANGE') {
        this.mode = msgCommands[i].value;
      }
      response[i] = { completed: complete };
      if (msgCommands[i].commandType === 'STATUS_CHECK') {
        response[i]["roverStatus"] = {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
        }
      };
    };
    return { message: msgObj.name, results: response }
  }
}

module.exports = Rover;