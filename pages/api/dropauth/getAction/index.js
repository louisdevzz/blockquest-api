import { MongoClient } from "mongodb";

export default async function handler(req,res){
    const {method} = req;
    let client = new MongoClient("mongodb+srv://louisdevzz04:vohuunhan1310@cluster0.zmwbg2i.mongodb.net/dropauth?retryWrites=true&w=majority")
    let clientPromsie = await client.connect();
    let db = clientPromsie.db();
    let col = await db.collection("actiondatas");


    if(method=="GET"){
        try{
            const result = await col.find().toArray();
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }
}