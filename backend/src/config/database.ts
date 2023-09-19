import mongoose, { ConnectOptions } from 'mongoose'

let database : mongoose.Connection

export async function connect() {

    if(database)
        return
    
    const URI = process.env.DB_URI || ''

    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName : process.env.DB_NAME
    } as ConnectOptions)

    database = mongoose.connection

    database.once("open", async () => {
        console.log("Connected to database")
    })

    database.on("error", () => {
        console.log("Error in db connection")
    })
}

export const disconnect = () => {
    
    if(!database)
        return

    mongoose.disconnect()
}