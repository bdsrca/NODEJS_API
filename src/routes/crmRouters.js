import {addNewContact,
        GetContact,
        GetContactWithID,
        updateContact,
        deleteContact,
        GetContactWithName
} from '../controllers/crmController';
import { login, register, loginRequired } from '../controllers/userControllers'

const routes = (app) => {
    app.route('/contact')
        .get((req,res, next) => {
            //middleware
               console.log('Request from : ' + req.originalUrl) 
               console.log('Request type : ' + req.method) 
               next();
        }, loginRequired, GetContact  //retrieve all
        //(req,res,next) => {
            //res.send('GET Request successful!')
        //}
        )
         
        // post endpoint
        //.post((req,res) =>
        //res.send('POST Request successful!'));
        .post(loginRequired, addNewContact);


    app.route('/contact/:contactID')
        //handle ID passed get content
        .get(loginRequired, GetContactWithID)
           
        //handles put requests
        //.put((req,res) =>
        //res.send('PUT Request successful!'))
        .put(loginRequired, updateContact)

        //handle Delete
        //.delete((req,res) =>
        //res.send('DELETE Request successful!'))  
        .delete(loginRequired, deleteContact);

    app.route('/contact/name/:firstname?/:lastname?/:email?')
        //handle ID passed get content
        .get(loginRequired, GetContactWithName) 

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/login')
        .post(login);

}

export default routes;