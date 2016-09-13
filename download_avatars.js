require('dotenv').config();
const request = require('request');
const fs = require('fs');

  var username= 'mulvster'
  var api_token = process.env['GITHUB_API_TOKEN'];
  const apiRoot = 'https://api.github.com';
  var repoOwner = "Lighthouse-labs"
  var repoName =  "laser_shark"
  var array = [];


function getRepoContributors(repoOwner, repoName, cb) {
request.get({
  url: apiRoot + '/repos/' + repoOwner + '/' + repoName + '/contributors',
  qs: {


  },
  headers: {
    'User-Agent': 'Lighthouse',
     //Authorization: 'token ' + api_token
  },
  json: true
}, function (err, incomingMessage, responseBody) {
  cb(err, responseBody)

  });
}
  getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {

    result.map(function(cv,index,array){
      array.push(cv.avatar_url)
      var filename = "./avatar/"+ cv.id + ".jpg";       //this captures the url and saves the whole bite and reads
                                                       // the image and saves it locally.
                                                       //the pipe uses a file stream that will either do a read or write
                                                       //to store the information on your local file.

      downloadImageByURL(cv.avatar_url,filename);
 })

});

function downloadImageByURL(url, filePath) {
  request.get(url).on("error",function(err){
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath))

}






