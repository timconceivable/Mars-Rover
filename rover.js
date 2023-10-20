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
    let returnObj = {
      mode: this.mode,
      generatorWatts: this.generatorWatts, 
      position: this.position
    }
    for (let i in msgCommands) {
      let complete = true;
      if (msgCommands[i].commandType === 'MOVE') {
        if (this.mode === 'NORMAL') {
          this.position = msgCommands[i].value;
          returnObj.position = this.position;
        } else complete = false;
      } else if (msgCommands[i].commandType === 'MODE_CHANGE') {
        this.mode = msgCommands[i].value;
        returnObj.mode = this.mode;
      }
      response[i] = {
        completed: complete,
        roverStatus: returnObj
      };
    };
    return {
      message: msgObj.name,
      results: response
    }
  }
}

module.exports = Rover;