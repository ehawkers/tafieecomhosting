import { connect } from 'mongoose';

require('dotenv').config()

const mongodb = () =>{
    connect(process.env.AUTH).then(()=>{
        console.log("Database connection established successfully")
    }).catch((err)=>{
            console.log("Error while connectiong with database")
            console.log(err)
            process.exit(1);
    })
}
export default mongodb();