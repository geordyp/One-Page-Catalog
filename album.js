"use strict";

var multipart = require('./lib/form-multipart');
var urlencoded = require('./lib/form-urlencoded');
var json = require('./lib/form-json');

/** @module album
 * A RESTful resource representing a software project
 * implementing the CRUD methods.
 */
module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
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

function read(req, res, db) {
  var id = req.params.id;
  db.get("SELECT * FROM albums WHERE id=?", [id], function(err, album){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
      return;
    }
    if(!album) {
      res.statusCode = 404;
      res.end("Project not found");
      return;
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(album));
  });
}

/** @function create
 * Creates a new project and adds it to the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function create(req, res, db) {

  // A helper function to carry out the database
  // insertion once the POST data has been processed
  function insert(req, res, db) {
    var album = req.body;
    db.run("INSERT INTO albums (name, description, image) VALUES (?,?,?,?,?)",
      [album.name, album.description, album.image],
      function(err) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Could not insert album into database");
          return;
        }
        res.statusCode = 200;
        res.end();
      }
    );
  }

  // Determine what kind of data we're dealing with
  switch(req.headers['content-type']) {
    case 'multipart/form-data':
      // A multipart form
      multipart(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/x-www-form-urlencoded':
      // Standard form encoding
      urlencoded(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/json':
    case 'text/json':
      // A JSON string\
      json(req, res, function(req, res) {
        insert(req, res, db);
      });
      break;
  }
}

/** @update
 * Updates a specific record with the supplied values
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function update(req, res, db) {
  var id = req.params.id;

  // Helper function to update the database record
  function update(req, res, db) {
    var album = req.body;
    db.run("UPDATE albums SET name=?, description=?, image=? WHERE id=?",
      [album.name, album.description, album.image, id],
      function(err) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Could not update album in database");
          return;
        }
        res.statusCode = 200;
        res.end();
      }
    );
  }

  // Determine what kind of data we're dealing with
  switch(req.headers['content-type']) {
    case 'multipart/form-data':
      // A multipart form
      multipart(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/x-www-form-urlencoded':
      // Standard form encoding
      urlencoded(req, res, function(req, res){
        insert(req, res, db);
      });
      break;
    case 'application/json':
    case 'text/json':
      // A JSON string\
      json(req, res, function(req, res) {
        insert(req, res, db);
      });
      break;
  }
}

/** @destroy
 * Removes the specified project from the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function destroy(req, res, db) {
  var id = req.params.id;
  db.run("DELETE FROM albums WHERE id=?", [id], function(err) {
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
    }
    res.statusCode = 200;
    res.end();
  });
}
