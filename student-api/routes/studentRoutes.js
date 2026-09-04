const express = require("express");

const AppError = require("../utils/appError")

const studentRoutes = express.Router();

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

studentRoutes.get("/", (req, res, next) => {
    const { department, minMarks } = req.query;

    const marks = minMarks !== undefined ? Number(minMarks) : undefined;

    if (marks !== undefined && Number.isNaN(marks)) {
        const error = new AppError(400, "minmarks must be a numbet");
        return next(error);
    }

    const filteredStudents = students.filter((s) => {
        const matchesDepartment = !department || s.department === department;

        const matchesMarks = marks === undefined || s.marks >= marks;

        return matchesDepartment && matchesMarks;
    });

    return res.json(filteredStudents);
});

studentRoutes.get("/count", (req, res) => {
    const count = students.length;
    return res.json({
        count,
    });
});

studentRoutes.get("/topper", (req, res, next) => {
    if (students.length === 0) {
        const error = new AppError(404, "no student found");
        return next(error);
    }

    let topper = students[0];
    for (let i = 1; i < students.length; i++) {
        const student = students[i];
        if (student.marks > topper.marks) {
            topper = student;
        }
    }
    return res.json(topper);
});

studentRoutes.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new AppError(400, "Invalid student ID");
        return next(error);
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
        const error = new AppError(404, "Student not found")
        return next(error);
    }

    return res.json(student);
});

studentRoutes.post("/", (req, res, next) => {
    const { name, marks, department } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof department !== "string" ||
        department.trim() === "" ||
        marks === undefined
    ) {
        const error = new AppError(
            400,
            "Name, marks and department are required",
        ); 
        return next(error);
    }

    if (typeof marks !== "number" || marks < 0 || marks > 100) {
        const error = new AppError(400, "Marks must be between 0 and 100");
        return next(error);
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

studentRoutes.patch("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new AppError(
            400,
            "Invalid student ID",
        );
        return next(error);
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
        const error = new AppError(404, "Student not found");
        return next(error);
    }

    const { name, marks, department } = req.body;

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            const error = new AppError(400, "Invalid name");
            return next(error);
        }

        student.name = name.trim();
    }

    if (marks !== undefined) {
        if (typeof marks !== "number" || marks < 0 || marks > 100) {
            const error = new AppError(400, "Marks must be between 0 and 100");
            return next(error);
        }

        student.marks = marks;
    }

    if (department !== undefined) {
        if (typeof department !== "string" || department.trim() === "") {
            const error = new AppError(400, "Invalid department");
            return next(error);
        }

        student.department = department.trim();
    }

    return res.status(200).json({
        message: "Student updated successfully",
        student,
    });
});

studentRoutes.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new AppError(404, "Invalid student ID");
        return next(error);
    }

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        const error = new AppError(400, "Student not found");
        return next(error);
    }

    students.splice(index, 1);

    return res.status(204).send();
});

module.exports = studentRoutes;
