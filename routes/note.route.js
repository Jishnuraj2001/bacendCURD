const express=require("express");
const noteRouter=express.Router();

const{Notemodel}=require("../models/note.model");



noteRouter.get("/",async(req,res)=>{
    let query=req.query;
    try {
        const noteData=await Notemodel.find(query);
        res.send(noteData);
    } catch (error) {
        console.log(error);
        res.send("Unable to get the Note data's");
    }
})


noteRouter.post("/create",async(req,res)=>{
    const notedata=req.body;
    try {
        const Note=new Notemodel(notedata);
        await Note.save();
        res.send("created the note");
    } catch (error) {
        console.log(error);
        res.send("unable to create the note");
    }
})



noteRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id;
    let newData=req.body;
    const note=await Notemodel.findOne({"_id":id});//newww
    const userID_in_note=note.userID;//newww
    const userID_req=req.body.userID;
    try {
        if(userID_req!==userID_in_note){
            res.send({"msg":"You are not authorized"});
        }else{
            await Notemodel.findByIdAndUpdate({"_id":id},newData);
            res.send(`document with id:${id} is updated`);
        }
    } catch (error) {
        console.log(error);
        res.send("Unable to update the document");
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const note=await Notemodel.findOne({"_id":id});//newww
    const userID_in_note=note.userID;//newww
    const userID_req=req.body.userID;
    try {
        if(userID_req!==userID_in_note){
            res.send({"msg":"You are not authorized"});
        }else{
            await Notemodel.findByIdAndDelete({_id:id});
            res.send(`document with id:${id} is deleted`);
        }
    } catch (error) {
        console.log(error);
        res.send("Unable to delete the document");
    }
})


module.exports={
    noteRouter
}