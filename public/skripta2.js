const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const multipart=require('multer');

app.use(bodyParser.json());
app.use(multer({    dest: './uploads/'}));

app.post('/addZadatak', function (req, res) {
    console.log("Usao sam");
    let tijelo = req.body;

    naziv=tijelo.naziv;
    nazivFajla=req.body.postavka.upload.name;
    console.log(nazivFajla);

    fs.readFile(naziv+".json", function (err, content) {
        if(content=='undefined'){
            //kreiraj novi fajl sa tim nazivom
        }
        else{

        }





        res.write(`<html><body> <table border="1" border-collapse="colapsed"> <tr> <th> ime </th> <th> prezime </th> <th> adresa </th> <th> broj telefona </th> </tr>`);
        var niz = [];
        var tekst = content.toString();
        var redovi = tekst.split("\n");

        for (var i = 0; i < redovi.length; i++) {
            var kolone = redovi[i].split(",");
            if (kolone[0] != "" && kolone[0] != ime && kolone[0] != "") {
                res.write(`<tr>`)
                var objekat = { ime: kolone[0], prezime: kolone[1], adresa: kolone[2], broj_telefona: kolone[3] };
                novaLinija="\n"+objekat.ime + "," + objekat.prezime + "," + objekat.adresa + "," + objekat.brojTelefona;
                niz.push(objekat);
                res.write(`<td>` + kolone[0] + `</td> <td>` + kolone[1] + `</td> <td>` + kolone[2] + `</td> <td>` + kolone[3] + `</td>` + `<td> <form action='/` + kolone[0] + `' method='post'><input type="submit" value="Delete"></td></form> <td><input type="submit" value="Edit"></td>`);
            }
        }

        //brise podatke u txt fajlu
        fs.writeFile("imenik.txt","", function (err) {
            if (err) throw err;
        });

        for(i=0;i<niz.length;i++){
            novaLinija="\n"+niz[i].ime + "," + niz[i].prezime + "," + niz[i].adresa + "," + niz[i].broj_telefona;
            fs.appendFile('imenik.txt', novaLinija, function (err) {
                if (err) throw err;
            });
        }

        res.end();
    });

});