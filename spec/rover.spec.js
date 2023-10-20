const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {
// TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover(7).position).toBe(7);
    expect(new Rover(7).mode).toBe('NORMAL');
    expect(new Rover(7).generatorWatts).toBe(110);
  });

// TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    expect(new Rover(8).receiveMessage(new Message('Test', [])).message).toBe('Test');
  });
  
// TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let twoCommands = [ new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER') ];
    expect(new Rover(9).receiveMessage(new Message('Two commands', twoCommands)).results.length).toEqual(2);
  });

// TEST 10
  test("responds correctly to the status check command", 
  function() {
    let status = new Rover(10).receiveMessage(new Message('Status', [ new Command('STATUS_CHECK')])).results[0].roverStatus;
    expect(status.position).toBe(10);
    expect(status.mode).toBe('NORMAL');
    expect(status.generatorWatts).toBe(110);
  });

// TEST 11
  test("responds correctly to the mode change command", 
  function() {
    let rov11 = new Rover(11);
    let modeChange = rov11.receiveMessage(new Message('Mode change', [ new Command('MODE_CHANGE', 'LOW_POWER')])).results[0];
    expect(modeChange.completed).toBe(true);
    expect(rov11.mode).toBe('LOW_POWER');
  });

// TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rov12 = new Rover(12, 'LOW_POWER', 0);
    expect(rov12.receiveMessage(new Message('Move', [ new Command('MOVE', 128)])).results[0].completed).toBe(false);
    expect(rov12.position).toBe(12);
  });

// TEST 13
  test("responds with the position for the move command", 
  function() {
    let rov13 = new Rover(13);
    rov13.receiveMessage(new Message('Move', [ new Command('MOVE', 69)]));
    expect(rov13.position).toBe(69);
  });

});
