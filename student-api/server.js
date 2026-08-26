const express = require("express");

const app = express();

app.use(express.json());

const students = [
    {
        id: 1,
        name: "Aman",
        marks: 82,
        department: "CSE",
    },
    {
        id: 2,
        name: "Riya",
        marks: 91,
        department: "ECE",
    },
];

app.get("/api/students", (req, res) => {
    const { department, minMarks } = req.query;

    const marks = minMarks !== undefined ? Number(minMarks) : undefined;

    if (marks !== undefined && Number.isNaN(marks)) {
        return res.status(400).json({
            message: "minMarks must be a number",
        });
    }

    const filteredStudents = students.filter((s) => {
        const matchesDepartment = !department || s.department === department;

        const matchesMarks = marks === undefined || s.marks >= marks;

        return matchesDepartment && matchesMarks;
    });

    return res.json(filteredStudents);
});

app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid student ID",
        });
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found",
        });
    }

    return res.json(student);
});

app.post("/api/students", (req, res) => {
    const { name, marks, department } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof department !== "string" ||
        department.trim() === "" ||
        marks === undefined
    ) {
        return res.status(400).json({
            message: "Name, marks and department are required",
        });
    }

    if (typeof marks !== "number" || marks < 0 || marks > 100) {
        return res.status(400).json({
            message: "Marks must be between 0 and 100",
        });
    }

    const id = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;

    const student = {
        id,
        name: name.trim(),
        marks,
        department: department.trim(),
    };

    students.push(student);

    return res.status(201).json({
        message: "Student created successfully",
        student,
    });
});

app.listen(3000, () => {
    console.log("server started!");
});