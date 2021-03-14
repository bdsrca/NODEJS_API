import mongoose from 'mongoose';
import {ContactSchema} from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req,res) => {
    let NewContact = new Contact(req.body);

    NewContact.save((err,contact) => {
        if (err) {
                res.send(err);   //send error
        }
        res.json(contact);      //send an array of object
    });
}
//get all
export const GetContact = (req,res) => {

    Contact.find({}, (err,contact) => {
        if (err) {
                res.send(err);
        }
        res.json(contact);  //send an array of object
    });
}

//find by ID
export const GetContactWithID = (req,res) => {
    Contact.findById(req.params.contactID, (err, contact) => {
        if (err) {
                res.send(err);
        }
        res.json(contact);  //send an array of object
    });
}
//,lastName:/req.params.lastname/i, email:req.params.email
//find by Name
export const GetContactWithName = (req,res) => {
    Contact.find({firstName:{ "$regex": req.params.firstname, "$options": "i" }}
    ,(err, contact) => {
        if (err) {
                res.send(err);
        }
        res.json(contact);  //send an array of object
    });
}
//handle PUT request
export const updateContact = (req,res) => {
    Contact.findOneAndUpdate({_id: req.params.contactID}, req.body, { new: true, useFindAndModify: false}, (err, contact) => {
        if (err) {
                res.send(err);
        }
        res.json(contact);  //send an array of object
    });
}

//handle Delete request
export const deleteContact = (req,res) => {
    Contact.remove({_id: req.params.contactID}, (err, contact) => {
        if (err) {
                res.send(err);
        }
        res.json({message:"succesfully deleted "+ req.params.contactID});  //send an array of object
    });
}

