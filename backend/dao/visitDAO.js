// import user data model for accessing user information in the database
import Visit from '../models/visitModel.js'


// This method checks whether a visit has been logged in the db
const getVisit = async function(dateVal, visitIP, visitTypeVal) {

    try {
        let visit;
        visit = await Visit.find({date: dateVal, ipAddress: visitIP, visitType: visitTypeVal}).exec();
        return visit;
    }
    catch(error){
        throw new Error(error);
    }

}

// This method will create a new visit in the db based on given data
const createVisit = async(visitData) => {
    try {
        await Visit.create(visitData);
    }
    catch(error){
        throw new Error(error);
    }
}

// this method will get all visit data in the DB and return it
const getAllVisits = async function() {
    try {
        const visits = await Visit.find({});
        return visits;
    }
    catch(error){
        throw new Error(error);
    }

}

export default {getVisit, createVisit, getAllVisits}