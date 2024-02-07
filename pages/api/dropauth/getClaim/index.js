import { MongoClient } from "mongodb";

export default async function handler(req,res){
    const {method} = req;
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if(method == "GET"){
        try{
            let client = new MongoClient("mongodb+srv://louisdevzz04:vohuunhan1310@cluster0.zmwbg2i.mongodb.net/dropauth?retryWrites=true&w=majority")
            let clientPromsie = await client.connect();
            let db = clientPromsie.db();
            let col = await db.collection("dataclaim");
            
            const data = await col.find({}).toArray()
            res.status(200).json({data})
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: error.message})
        }
    }

    
}