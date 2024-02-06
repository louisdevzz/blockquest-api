import { MongoClient } from "mongodb";

export default async function handler(req,res){
    const {method} = req
    let client = new MongoClient("mongodb+srv://louisdevzz04:vohuunhan1310@cluster0.zmwbg2i.mongodb.net/dropauth?retryWrites=true&w=majority")
    let clientPromsie = await client.connect();
    let db = clientPromsie.db()
    let col = await db.collection("datas")

    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if(method=="POST"||method=="post"||method=="Post"){
        const data = {
            name: req.body.name,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            backgroundCover:req.body.backgroundCover,
            link: req.body.link,
            timezone: req.body.timezone,
            amount: req.body.amount
        } 
        const updata = await col.insertOne(data)
        res.status(200).json(updata)
    }
    if(method=="GET"||method=="get"||method=="Get"){
        const data = await col.find({}).toArray()
        res.status(200).json({data})
    }
}
