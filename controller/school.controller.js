'use strict'
var config = require('../utility/config');
var contextService = require('../service/connectdb.service');
const { request } = require('../app');


// Method to Get List Of Schools
exports.GetListOfSchools = async (_req, _res) => {
    const limit = (_req.query.noOfRows) ? _req.query.noOfRows : 10;
    const offSet = (_req.query.pageNumber) ? (_req.query.pageNumber - 1) * limit : 0;
    const searchFor = (_req.query.searchFor) ? _req.query.searchFor : '';
    let listOfRecords = [];
    try 
    {
        listOfRecords = await contextService.ExecuteQuery('CALL GetListOfSchools(' 
                                + limit + ',' 
                                + offSet + ',"'
                                + searchFor + '")');
        
        return listOfRecords[0];
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
        
    }
}

// Method to Insert, Update, Delete School Record
// If Flag = 1 -> Insert
// If Flag = 3 -> Delete
// If Flag = 2 -> Update
exports.UpdateSchool = async (_req, _res) => {
    try 
    {
        let requestBody = _req.body;

        if (requestBody.Type == null || requestBody.Type == '') 
            throw new Error('Missing Required Field, Type');
        
        let response = await contextService.ExecuteQuery(' CALL UpdateSchool("' + 
               requestBody.SchoolName + '","' +
               requestBody.Street + '","' + 
               requestBody.Suburb + '",' + 
               parseInt(requestBody.StateId) + ',' +
               parseInt(requestBody.PostCode) + ',' +
               parseInt(requestBody.NoOfRegisteredStudents) + ',' + 
               parseInt(requestBody.Type) + ',' +
               ((requestBody.SchoolId != null) ? parseInt (requestBody.SchoolId) : 0) + ')'
        );

        return response;
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
        
    }
}

exports.GetStatesList = async(_req, _res) => {
    try
    {
        let listofstates = await contextService.ExecuteQuery(' CALL GetStatesList ');
        return listofstates[0];
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
        
    }
}