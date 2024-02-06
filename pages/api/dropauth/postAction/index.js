import { MongoClient } from "mongodb";

export default async function handler(req,res){
    const {method} = req;
    if(method == "POST"||method=="Post"){
        try{
            let client = new MongoClient("mongodb+srv://louisdevzz04:vohuunhan1310@cluster0.zmwbg2i.mongodb.net/dropauth?retryWrites=true&w=majority")
            let clientPromsie = await client.connect();
            let db = clientPromsie.db();
            let col = await db.collection("actiondatas");
            
            const data = {
                contentId:req.body.contentId,
                postId:req.body.postId,
                action:req.body.action,
                userCreated:req.body.userCreated,
            };
            const result = await col.insertOne(data)
            console.log("data",data)
            return res.status(200).json(result)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: error.message})
        }
    }

    
}