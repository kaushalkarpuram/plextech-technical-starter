

/* Do NOT add any more modules */
var http = require('http');
var url = require('url');
//const Todo = require("./controller");
const { getReqData } = require("./utils");
const data = require("./data");
const PORT = process.env.PORT || 8000;


//Different status enum
var validStatus = [ "available", "pending", "sold"];

const server = http.createServer(function (req, res) {


  // TODO: Implement routes from API Spec
  if (req.url.match(/\/pet/) && req.method === "POST") {
    try {
      
      // get the data sent along
      let todo_data =  getReqData(req);
      console.log("After the parsing", todo_data);

      //let jsonData = JSON.parse(todo_data);
      console.log("Original data obtained", data);
      //console.log("Req data obtained", jsonData);


      let todo = new Promise((resolve, _) => {
        // create a todo, with random id and data sent
        let newTodo = {
            id: Math.floor(4 + Math.random() * 10),
            name: todo_data.name,
            photoUrls: todo_data.photoUrls,
            tags: todo_data.tags,
            status: todo_data.status
        };

        // return the new created todo
        resolve(newTodo);
      });

      console.log("Req data object created", todo);
      data.push(todo);
      console.log("After adding the object", data);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      //send the todo
      res.end(JSON.stringify(todo));


    } catch (error) {
      console.log(error.message);
      console.log ("Invalid input: Error in adding pet");
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write("ADD: Error in adding pet.");
      res.end();
    }
  } else
  if (req.url.match(/\/pet/) && req.method === "PUT") {
    try {
      
      // get the data sent along
      let todo_data =  getReqData(req);
      console.log("After the parsing", todo_data);

      //let jsonData = JSON.parse(todo_data);
      console.log("Original data obtained", data);
      //console.log("Req data obtained", jsonData);


      let todo = new Promise((resolve, _) => {
        // create a todo, with random id and data sent
        let newTodo = {
            id: Math.floor(4 + Math.random() * 10),
            name: todo_data.name,
            photoUrls: todo_data.photoUrls,
            tags: todo_data.tags,
            status: todo_data.status
        };

        // return the new created todo
        resolve(newTodo);
      });

      console.log("Req data object created", todo);

      //Update the pet
      for( var i = 0; i < data.length; i++){ 
        if (data[i].id === todo.id) {
            console.log("Found the pet", data[i]);
            data[i].name = todo.name;
            data[i].photoUrls = todo.photoUrls;
            data[i].tags = todo.tags;
            data[i].status = todo.status;
            break;
        }
      }

      
      console.log("After updating the object", data);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      //send the todo
      res.end(JSON.stringify(todo));


    } catch (error) {
      console.log(error.message);
      console.log ("Invalid input: Error in updating pet");
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write("UPDATE: Error in updating pet.");
      res.end();
    }
  } else
  if (req.url.match(/\/pet\/([0-9]+)/) && req.method === "GET") {
    try {
      // get id from url
    
      const id = req.url.split("/")[2];
      console.log ("GET: input id is", id);
      //console.log ("GET: input data is", data.length);
      var outArray;

      // get the pet by id
      for( var i = 0; i < data.length; i++){ 
        if (data[i].id === parseInt(id) ) {
            console.log("Found the pet", data[i]);
            outArray = data.slice(i,1);
            break;
        }
      }
      //console.timeLog("output array count", outArray.length);
      

      if (!outArray) {
        res.writeHead(400, { "Content-Type": "application/json" });
        // send the error
        res.write ("GET: FindById: Pet Not found");
        //res.write(outArray);
        res.end();
      }
      else {
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.write(JSON.stringify(outArray));
        //res.write(JSON.stringify(outArray));
        res.end();
      }
      

  } catch (error) {
      console.log ("Invalid input: Error in finding pet");
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write("GET: Error in processing. Pet Not found.");
      res.end();
  }
  } 
  else  if (req.url.match(/\/pet\/findByStatus\/([a-z]+)/) && req.method === "GET") {

      const status = req.url.split("/")[3];
      console.log ("GET: FindByStatus: Input status is", status);

      // get the pet by id
      //let pet =  new Pets().getPetByStatus(status);
      var checkByStatus = "";
        if (!status) 
            checkByStatus = "available";
        else   
            checkByStatus = status;
        
       var outArray; 
       
        //parse the comma separated values
        var statusArray = checkByStatus.split(',');
        //iterate through the list
        for( var i = 0; i < data.length; i++){ 
            if (statusArray.indexOf(data[i].status)>-1) {
              //console.log("GET: FindByStatus: Found one node", data);
              if (outArray) {
                outArray.push(data[i]); 
              }
              else {
                outArray = data.slice(i,1);
              }
            }
          }
          

      if (!outArray) {
        res.writeHead(400, { "Content-Type": "application/json" });
        // send the error
        res.write ("GET: FindByStatus: Pet Not found");
        res.end();
      }
      else {
        
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.write(JSON.stringify(outArray));
        //res.write(JSON.stringify(outArray));
        res.end();
      }
  }
  else if (req.url.match(/\/pet\/findByTags\/([a-z]+)/) && req.method === "GET") {

    const tags = req.url.split("/")[3];
    console.log ("GET: findByTags: Input tag is", tags);

    
      if (tags) {
          inputTagList = tags.split(',');
          console.log ("GET: findByTags: Input list is", inputTagList);

      var outArray = null; 
          //iterate through the list
          for( var i = 0; i < data.length; i++){ 
              var dataTags = data[i].tags;
              for( var j = 0; i < dataTags.length; j++){ 
                if (inputTagList.indexOf(dataTags[j])>-1) {
                  if (outArray) {
                    console.log("Added by push", data[i]);
                    outArray.push(data[i]); 
                  }
                  else {
                    console.log("Added by slice", data[i]);
                    outArray = data.slice(i,1);
                  }
                break;
              }
            }
        }
      } else  {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write("Invalid tag value (no pets found with supplied tags");
        res.end();        
      } 
     
    if (!outArray) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write("Invalid tag value (no pets found with supplied tags");
      res.end();
    }
    else {
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the data
      res.write(JSON.stringify(outArray));
      //res.write(JSON.stringify(outArray));
      res.end();
    }
}
else if (req.url.match(/\/pet\/([0-9]+)/) && req.method === "DELETE") {
    try {
      // get id from url
    
      const id = req.url.split("/")[2];
      console.log ("DELETE REQUEST: input id is", id);
      
      var deleted = false;
      for( var i = 0; i < data.length; i++){ 
        console.log("processing", data[i].id, " and ", id);

          if ( data[i].id == parseInt(id) ) { 
              data.splice(i, 1); 
              deleted = true;
              console.log("Delete successful", data);
              break;
          }
      }
      console.log("After delete list", data);
      
      if (deleted) {
          // deleted the pet
          // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        console.log ("preparing the response");
        //res.write(JSON.stringify(pet));
        res.write(`Pet with id: ${id} found: Deleted the Pet`);
        res.end();
      } else {
          // return an error
          res.writeHead(400, { "Content-Type": "application/json" });
          // send the error
          console.log (`Pet with id: ${id} not found`);
          res.write(`Pet with id: ${id} not found`);
          res.end();
      }

  } catch (error) {
      console.log ("DELETE: Invalid input: Error in finding pet");
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write("Error in processing the Delete. Invalid input");
      // send the error
      res.end(JSON.stringify({ message: error }));
  }
  } 
  else {
    /* Catch-All */
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write("Not Found")
    res.end();
    }
  });

server.listen(PORT, () => {
  console.log('Server running at http://localhost:8000');
  });




