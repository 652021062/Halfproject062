'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/users/:uid', function (req, res, next) {
    connection.execute(
        "UPDATE usertable SET FirstName=?, LastName=?, StudentID, Faculty, Field of study, Email=?, updated_at=? WHERE id=?;",
        [req.body.FirstName, req.body.LastName, req.body.StudentID, req.body.Faculty, req.body.Fieldofstudy, req.body.Email, Date.now(), req.params.uid]
    ).then(() => {
        console.log('Update Successful');
        res.status(200).send("Update Successfully.");
    }).catch((err) => {
        console.error('Error updating user:', err);
        res.sendStatus(500); // Internal Server Error
    });
});

udRoute.delete('/users/:uid', function (req, res, next) {
    connection.execute(
        "DELETE FROM usertable WHERE id=?;",
        [req.params.uid]
    ).then(() => {
        console.log('Delete Successful');
        res.status(200).send("Delete Successfully.");
    }).catch((err) => {
        console.error('Error deleting user:', err);
        res.sendStatus(500); // Internal Server Error
    });
});

udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = udRoute;
