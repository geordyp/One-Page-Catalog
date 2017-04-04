"use strict";

/** @module album
 * A RESTful resource representing a software project
 * implementing the CRUD methods.
 */
module.exports = {
  list: list,
  // create: create,
  // read: read,
  // update: update,
  // destroy: destroy
}

function list(req, res, db) {
  db.all("SELECT * FROM albums", [], function(err, albums){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error")
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(albums));
  });
}
