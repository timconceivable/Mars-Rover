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
    let resultsArray = [];
    let returnObj = {
      mode: this.mode,
      generatorWatts: this.generatorWatts, 
      position: this.position
    }
    for (let i in msgCommands) {
      if (msgCommands[i].commandType === 'STATUS_CHECK') {
        resultsArray[i] = {
          completed: true,
          roverStatus: returnObj
        };
      }
      if (msgCommands[i].commandType === 'MOVE') {
        let okToMove = true;
        if (this.mode === 'NORMAL') {
          this.position = msgCommands[i].value;
          returnObj.position = this.position;
        } else okToMove = false;
        resultsArray[i] = {
          completed: okToMove,
          roverStatus: returnObj
        };
      }
      if (msgCommands[i].commandType === 'MODE_CHANGE') {
        this.mode = msgCommands[i].value;
        returnObj.mode = this.mode;
        resultsArray[i] = {
          completed: true,
          roverStatus: returnObj
        };
      }
    };
    return {
      message: msgObj.name,
      results: resultsArray
    }
  }
}

module.exports = Rover;