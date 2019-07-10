const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const request = require("request")

// app.use(bodyParser.urlencoded({
//     extended: true
//   }))

//   app.use(bodyParser.json())


// this is where an HTTP Get request is taking place using request library
app.get('/', (req, res) => {
    request("https://interview.adpeai.com/api/v1/get-task", { json: true }, (error, response, body) => {
        // here i'm manipulationg the returned body and implementing the operations and saving it in a variable to be used later in the post request
        let result = implementOps(body)
        request.post('https://interview.adpeai.com/api/v1/submit-task', { json: result }, (error, res, body) => {
            if (error) {
                console.log("error ", error)
                return
            }
            console.log(body)
        }
    )});
    })

// this is in order to keep doing the same process continuosly ....
// app.get('/stream', (req, res) => {
//     while(true){
//         request("https://interview.adpeai.com/api/v1/get-task", { json: true }, (error, response, body) => {
//         let result = implementOps(body)
//         request.post('https://interview.adpeai.com/api/v1/submit-task', { json: result }, (error, res, body) => {
//             if (error) {
//                 console.log("error ", error)
//                 return
//             }
//             console.log(body)
//         }
//     )});
//     }
// })

const implementOps = (obj) => {
    let objToPost = {}
    let value;
    let result = "result"
    let id = "id"
    if(obj.operation === 'remainder') {
        value = obj.left % obj.right
        objToPost[id] = obj.id
        objToPost[result] = value
    } else if (obj.operation === 'subtraction') {
        value = obj.left - obj.right
        objToPost[id] = obj.id
        objToPost[result] = value
    } else if (obj.operation === 'addition') {
        value = obj.left + obj.right
        objToPost[id] = obj.id
        objToPost[result] = value
    } else if (obj.opertaion === 'division') {
        value = obj.left / obj.right
        objToPost[id] = obj.id
        objToPost[result] = value
    } else {
        value = obj.left * obj.right
        objToPost[id] = obj.id
        objToPost[result] = value
    }
    return objToPost
}


app.listen(3000,() => { 
    console.log("listening at port 3000")
})