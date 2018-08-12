var fs = require('fs');
var fsex = require("fs-extra");
//fs.mkdirSync('aaaa');
var parse = require('csv-parse');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var csvData = [];
var a = 1;

var data = fs.readFileSync('data.json');
//var filenames = JSON.parse(data);



fs.createReadStream("sample2.csv")
  .pipe(parse({ delimiter: ':' }))
  .on('data', function (csvrow) {
    console.log(csvrow);

    var source = 'sample'
    var destination = 'language/telugu/vowels/' + csvrow[0].split(",")[0];  // folder name
    var filename = csvrow[0].split(",")[1];     // image file name
    console.log('------------' + a++);
    // copy source folder to destination
    fsex.copy(source, destination, function (err) {
      if (err) {
        console.log('An error occured while copying the folder.')
        return console.error(err)
      }
      console.log('Copy completed!');

      var encryptedFileName = encryptFileName(filename);
      var encryptTitle = encryptFileName("12345678");
      var filepath = destination + "/config.js";

      /* fs.readFile(filepath, "utf-8", function (err, data) {
        //CREATE/PARSE XML OBJECT FROM STRING
        var customerConfig = new DOMParser().parseFromString(data);

        //SET VALUE TO "TEST" (<city>default</city> TO <city>test</city>)
        customerConfig.getElementsByTagName("city")[0].childNodes[0].data = csvrow[0].split(",")[1];

        //THIS OUTPUTS "test" WHICH IS CORRECT - 
        //console.log(customerConfig.getElementsByTagName("city")[0].childNodes[0].data);

        //SERIALIZE TO STRING
        var xmlString = new XMLSerializer().serializeToString(customerConfig);

        //THIS OUTPUTS THE FULL XML FILE
        //console.log(xmlString);

        // This writes the new XML to the file.
        fs.writeFile(filename, xmlString);
      }); */

      fs.readFile(filepath, "utf-8", function (err, data) {
        var leftside = data.split("=")[0];
        var jsonValue = JSON.parse(data.split("=")[1].replace(";", ""));
        console.log(jsonValue);
        jsonValue.imagefile = encryptedFileName;
        var newContent = leftside + " = " + JSON.stringify(jsonValue) + ";";
        // This writes the new XML to the file.
        fs.writeFile(filepath, newContent);
      });
      fs.createReadStream('language/telugu/vowels/images/' + filename).pipe(fs.createWriteStream(destination + '/' + filename));
      console.log("COPIED IMAGE TO THE  FOLDER");
    });
  })
  .on('end', function () {
    //do something wiht csvData
    console.log(csvData);
  });

function decryptFileName(filename) {
  var imagefile = "4GcN8P8.60b6039_20d4d60_9S5_e1";
  var c = "";
  var d = "";
  for (var i = 0; i < imagefile.length; i++) {
    if (i % 2 !== 0)
      c += imagefile.charAt(i);
    else
      d += imagefile.charAt(i);
  }
  console.log("--------------------------------")
  console.log("FILE NAME: " + d + c.split("").reverse().join(""));
}

function encryptFileName(filename) {
  var imagefile = filename; //"4c886b092dd095e1_S_640_360.PNG";
  var c = "";
  var d = "";
  for (var i = 0, j = (imagefile.length - 1); i <= j; i++ , j--) {
    if (i != j) {
      c += imagefile.charAt(i) + imagefile.charAt(j);
    } else {
      c += imagefile.charAt(i);
    }

  }
  console.log("--------------------------------")
  console.log("FILE NAME: " + c);
  return c;
}

function encryptFileName(title) {  
  var c = "";
  var d = "";
  for (var i = 0, j = (title.length - 1); i <= j; i++ , j--) {
    if (i != j) {
      c += title.charAt(i) + title.charAt(j);
    } else {
      c += title.charAt(i);
    }

  }
  console.log("--------------------------------")
  console.log("TITLE: " + c);
  return c;
}