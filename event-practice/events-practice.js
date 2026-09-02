const eventEmitter = require("events")

const emitter = new eventEmitter();

const createStudentListner1 = () => {
    console.log("student1 created succesfully!");
    console.log(`The time stamp is - ${new Date()}`);
};

function createStudent() {
    emitter.emit("studentCreated");
}

function updateStudent() {
    emitter.emit("studentUpdated");
}

function deleteStudent() {
    emitter.emit("studentDeleted");
}

emitter.on("studentCreated",() => {
        console.log("student1 created succesfully!");
        console.log(`The time stamp is - ${new Date()}`);
});

emitter.on("studentCreated", () => {
    console.log("student2 created succesfully!");
    console.log(`The time stamp is - ${new Date()}`);
});
 
emitter.on("studentUpdated", () => {
    console.log("student updated succesfully!");
    console.log(
        `The time stamp is - ${new Date()}`,
    );
});
 
emitter.on("studentDeleted", () => {
    console.log("student deleted succesfully!");
    console.log(
        `The time stamp is - ${new Date()}`,
    );
});
 
createStudent();
updateStudent();
deleteStudent();