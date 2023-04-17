const factory = require("../Handlers/handler.factory");

const MachineModel = require("./Machines.model");

// craete a new machine
exports.creatMachines = factory.createOne(MachineModel, "machines");

//get a machine by id
exports.getMachine = factory.getOne(MachineModel);

//get all machines
exports.getAllMachines = factory.getAll(MachineModel);

//update a machine
exports.updateMachine = factory.updateOne(MachineModel, "machines");

//delete a machine
exports.deleteMachine = factory.deleteOn(MachineModel);
