var express = require('express')
var app = express()
const sqlite3 = require('sqlite3').verbose();

// const path = require('path')
// const dbPath = path.resolve(__dirname, 'amanpreet-c0782918.db')
// const db = new sqlite3.Database(dbPath)

// open the database
let db = new sqlite3.Database('./db/amanpreet-c0782918.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

let sql = `select VegName, (amt*Veggieprice) as Amount from vegetables, price where vegetables.VegId = price.priceId`;

// let sql = `SELECT * FROM vegetables`;

app.get('/', function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Lab Test 1</title>");
  res.write("<style>thead,tfoot {background-color: #3f87a6;color: #fff;}tbody {background-color: #e4f0f5;}caption {padding: 10px;caption-side: bottom;}table {border-collapse: collapse;border: 2px solid rgb(200, 200, 200);letter-spacing: 1px;font-family: sans-serif;font-size: .8rem;}td,th {border: 1px solid rgb(190, 190, 190);padding: 5px 10px;}td {text-align: center;}</style>");
  res.write("</head>");
  res.write("<body>");
  res.write("<h2>Lab Test 1</h2>");
  res.write("<table>");
  res.write("<thead><tr><th>Vegetable Name</th><th scope='col'>Amount</th></tr></thead>");

//   res.send(
    // db.all(sql, [], (err, rows) => {
    //   if (err) {
    //     throw err;
    //   }
    //   rows.forEach((row) => {
    //     console.log(row.name);
    //   });
    // }))
  
    db.serialize(() => {
        db.all(sql, (err, rows) => {
          if (err) {
            console.error(err.message);
          }
          console.log('table selected');
          rows.forEach((row) => {
            console.log(row.VegName);
            res.write("<tbody><tr><th scope='row'>" +row.VegName+ "</th><td>" +row.Amount+ "</td></tr></tbody>");
  
          });
          res.write("</table>");
          res.write("</body>");
          res.write("</html>");
          res.end('');

          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
          });

        });
      })

})
app.listen(3000)
