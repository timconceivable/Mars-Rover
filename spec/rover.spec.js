const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover(666).position).toBe(666);
    expect(new Rover(666).mode).toBe('NORMAL');
    expect(new Rover(666).generatorWatts).toBe(110);
  });
  let cmd = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let msg = new Message('Test message', cmd);
  let Rov = new Rover(111);

  test("response returned by receiveMessage contains the name of the message", function() {  
    expect(Rov.receiveMessage(msg).message).toBe('Test message');
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(Rov.receiveMessage(msg).results.length).toEqual(2);
  });

  let cmd2 = [new Command('STATUS_CHECK')];
  let msg2 = new Message('Test message', cmd2);
  let Rov2 = new Rover(222);
  let result2 = Rov2.receiveMessage(msg2).results[0].roverStatus;
  test("responds correctly to the status check command", 
  function() {
    expect(result2.position).toBe(222);
    expect(result2.mode).toBe('NORMAL');
    expect(result2.generatorWatts).toBe(110);
  });

});
