//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
   "code": String,
   "name": String,
   "coordinates": {
      "latitude": Number,
      "longitude": Number
   },
   "address": String,
   "created_at": Date,
   "updated_at": Date
});

listingSchema.pre('save', function(next) {
   if (!this.name || !this.code) {
      throw new Error('Name or code not provided!');
      return;
   }

   var currentDate = new Date();
   this.updated_at = currentDate;

   if (!this.created_at) {
      this.created_at = currentDate;
   }

   next();
});

listingSchema.pre('findOneAndUpdate', function(next) {
   this.update({}, { $set: { updated_at: new Date() } });
   next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
