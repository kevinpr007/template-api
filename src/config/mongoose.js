import mongoose from 'mongoose';
import Promise from "bluebird";
mongoose.Promise = Promise;

export default () => {
        mongoose.set('debug', (coll, method, query, doc, options) => {
        const set = {
          coll: coll,
          method: method,
          query: query,
          doc: doc,
          options: options
        }
    
        console.log({
          dbQuery: set
        })
      })
    
      mongoose.connection.on('connecting', () => {
        console.log('Trying to establish a connection to MongoDB')
      })
    
      mongoose.connection.on('connected', () => {
        console.log('Connection established successfully')
      })
    
      mongoose.connection.on('error', err => {
        console.log(`Connection to MongoDB failed: ${err}`)
      })
    
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB connection closed')
      })

      return mongoose.connect(process.env.MONGODB_URL);
    }
    