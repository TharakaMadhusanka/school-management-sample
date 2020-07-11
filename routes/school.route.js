var express = require('express');
var router = express.Router();
var schoolController = require('../controller/school.controller');
const { HttpError } = require('http-errors');

/* GET All Schools listing. */
router.get('/', 
    
    async (_req,response, next) => 
    {

        try 
        {
            response.send( await schoolController.GetListOfSchools(_req));
        }
        catch (error) 
        {
            console.log(error);
            next(error);
        }
    });

// Insert, Update, Delete School
router.post('/updateschool', 
    
    async (_req,response, next) => 
    {

        try 
        {
            response.send( await schoolController.UpdateSchool(_req));
        }
        catch (error) 
        {
            console.log(error);
            next(error);
        }
    });

router.get('/getstates',     
    async (_req,response, next) => 
    {

        try 
        {
            response.send( await schoolController.GetStatesList());
        }
        catch (error) 
        {
            console.log(error);
            next(error);
        }
    });


module.exports = router;