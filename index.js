//Zadatak 1
var express = require('express');
var app = express();
app.use(express.static("public"));
app.listen(8080);

const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//Zadatak 2
app.post('/addZadatak', upload.single('postavka'), function (req, res) {
    let tijelo = req.body;
    naziv = tijelo.naziv;
    fajl = req.file;

    opt = { root: __dirname };

    if (naziv == "" || fajl == undefined) {
        res.render("greska", { greskaParagraf: { tipGreske: "Sva polja nisu unesena" } });
    }
    else {

        if (fajl.mimetype != "application/pdf") {
            res.render("greska", { greskaParagraf: { tipGreske: "Tip fajla nije pdf" } });
        }
        else {

            db.zadatak.findOne({ where: { naziv: naziv } }).then(function (pronadjeniZadatak) {
                if (pronadjeniZadatak) {
                    res.render("greska", { greskaParagraf: { tipGreske: "Zadatak sa istim imenom već postoji" } });
                }
                else {
                    db.zadatak.create({ naziv: naziv, postavka: "http://localhost:8080/" + naziv + ".pdf" });
                    fs.readFile('./uploads/' + fajl.filename, function (err, data) {
                        if (err) throw err;
                        fs.appendFile('./public/SpaseniFajlovi/' + naziv + '.pdf', data, function (err) {
                            if (err) throw err;
                            res.redirect("addZadatak.html");
                        });
                    });
                }
            });
        }
    }
});

//Iscitavanje pdf-a
app.get("/:nazivZadatka.pdf", function (req, res) {
    var nazivFajla = req.params.nazivZadatka + ".pdf";
    res.sendFile(__dirname + '/public/spaseniFajlovi/' + nazivFajla);
});


const url = require('url');

//Zadatak 3
app.get('/zadatak', function (req, res) {

    let tijelo = req.query;
    var naziv = tijelo.naziv;

    db.zadatak.findOne({ where: { naziv: naziv } }).then(function (procitaniZadatak) {
        if (!procitaniZadatak) {
            res.render("greska", { greskaParagraf: { tipGreske: "Fajl zadatka ne postoji" } });
        }
        else {
            res.redirect(procitaniZadatak.postavka);
        }
    });
});


//Zadatak 4
app.post('/addGodina', function (req, res) {
    let tijelo = req.body;
    var nazivGodine = tijelo.nazivGod;
    var nazivRepozitorijaVjezbe = tijelo.nazivRepVje;
    var nazivRepozitorijaSpirale = tijelo.nazivRepSpi;

    if (nazivGodine == "") {
        res.render("greska", { greskaParagraf: { tipGreske: "Unesite naziv godine" } });
    }
    else if (nazivRepozitorijaVjezbe == "") {
        res.render("greska", { greskaParagraf: { tipGreske: "Unesite naziv repozitorija vjezbe" } });
    }
    else if (nazivRepozitorijaSpirale == "") {
        res.render("greska", { greskaParagraf: { tipGreske: "Unesite naziv repozitorija spirale" } });
    }
    else {
        db.godina.findOne({ where: { nazivGod: nazivGodine } }).then(function (novaGodina) {
            if (novaGodina) {
                res.render("greska", { greskaParagraf: { tipGreske: "Vec postoji godina sa tim nazivom" } });
            }
            else {
                db.godina.create({ nazivGod: nazivGodine, nazivRepSpi: nazivRepozitorijaSpirale, nazivRepVje: nazivRepozitorijaVjezbe });
                res.redirect("addGodina.html");
            }

        });
    }
});

//Zadatak 5
app.get('/godine', function (req, res) {
    var niz = [];
    db.godina.findAll().then(function (procitaneGodine) {
        
        for (var i = 0; i < procitaneGodine.length; i++) {
            var objekat = { nazivGod: procitaneGodine[i].dataValues.nazivGod, nazivRepVje: procitaneGodine[i].dataValues.nazivRepVje, nazivRepSpi: procitaneGodine[i].dataValues.nazivRepSpi };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));
    });
});

//Zadatak 7

app.get('/zadaci', function (req, res) {

    var primljeniHeader = req.headers.accept;

    var JSONJe = false;
    var XMLJe = false;
    var CSVJe = false;

    if (primljeniHeader.indexOf('json') != -1) {
        JSONJe = true;
    }
    if (primljeniHeader.indexOf('xml') != -1) {
        XMLJe = true;
    }
    if (primljeniHeader.indexOf('csv') != -1) {
        CSVJe = true;
    }

    if (JSONJe == false && XMLJe == false && CSVJe == false) {
        JSONJe = true;
    }

    niz = [];
    db.zadatak.findAll().then(function (vraceniZadaci) {
        for (var i = 0; i < vraceniZadaci.length; i++) {
            var objekat = { naziv: vraceniZadaci[i].dataValues.naziv, postavka: vraceniZadaci[i].dataValues.postavka };
            niz.push(objekat);
        }
        if (niz.length == 0 && JSONJe) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(niz));
        }
        else if (niz.length == 0 && XMLJe) {
            res.writeHead(200, { 'Content-Type': 'application/xml' });
            var doc = `<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n`;
            doc += `</zadaci>`;
            res.end(doc);
        }
        else if (niz.length == 0 && CSVJe) {
            res.writeHead(200, { 'Content-Type': 'application/csv' });
            var csv = "";
            res.end(csv);
        }
        else {
            if (JSONJe) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(niz));
            }
            else if (XMLJe) {
                res.writeHead(200, { 'Content-Type': 'application/xml' });
                var doc = `<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n`;
                for (var i = 0; i < niz.length; i++) {
                    doc += `\t<zadatak>\n\t\t<naziv>` + niz[i].naziv + `</naziv>\n\t\t<postavka>` + niz[i].postavka + `</postavka>\n\t</zadatak>\n`;
                }
                doc += `</zadaci>`;
                res.end(doc);
            }
            else if (CSVJe) {
                res.writeHead(200, { 'Content-Type': 'application/csv' });
                var csv = "";
                for (var i = 0; i < niz.length; i++) {
                    if (i < niz.length - 1) {
                        csv += niz[i].naziv + ',' + niz[i].postavka + '\n';
                    }
                    else {
                        csv += niz[i].naziv + ',' + niz[i].postavka;
                    }
                }
                res.end(csv);
            }
        }
    });
});



const db = require('./db.js');
db.sequelize.sync().then(function () {
});

//Spirala4 Zadatak2b
app.post('/addVjezba', function (req, res) {

    var sGodine = req.body.sGodine;
    var sVjezbe = req.body.sVjezbe;
    var provjeriNaziv = req.body.naziv;



    if (provjeriNaziv === undefined) {
        //forma je fPostojeca

        if (sGodine != undefined && sVjezbe != undefined) {
            db.godina.findOne({ where: { id: sGodine } }).then(function (nadjenaGodina) {
                db.vjezba.findOne({ where: { id: sVjezbe } }).then(function (nadjenaVjezba) {
                    
                    if (nadjenaVjezba != null && nadjenaGodina != null) {
                        nadjenaGodina.addVjezbe([nadjenaVjezba]);
                        res.redirect("addVjezba.html");
                    }
                });
            });
        }
        else {
            res.render("greska", { greskaParagraf: { tipGreske: "Neka polja su prazna!" } });
        }
    }
    else {
        
        var tijelo = req.body;
        var naziv = tijelo.naziv;
        var spirala = tijelo.spirala;


        

        if (naziv != undefined && naziv != "" && sGodine != undefined) {
            var spiralaJe = false;
            if (spirala == "on") {
                spiralaJe = true;
            }
            else {
                spiralaJe = false;
            }

            db.vjezba.findOne({ where: { naziv: naziv } }).then(function (nadjenaVjezba) {
                if (nadjenaVjezba) {
                    res.render("greska", { greskaParagraf: { tipGreske: "Vjezba sa datim nazivom vec postoji!" } });
                }
                else {
                    db.vjezba.create({ naziv: naziv, spirala: spiralaJe });
                    db.godina.findOne({ where: { id: sGodine } }).then(function (nadjenaGodina) {
                        db.vjezba.findOne({ where: { naziv: naziv } }).then(function (nadjenaVjezba) {
                            
                            if (nadjenaVjezba != null && nadjenaGodina != null) {
                                nadjenaGodina.addVjezbe([nadjenaVjezba]);
                                res.redirect("addVjezba.html");
                            }
                        });
                    });
                }
            })
        }
        else {
            res.render("greska", { greskaParagraf: { tipGreske: "Neka polja su prazna!" } });
        }
    }


});

app.get('/procitajVjezbe', function (req, res) {
    db.vjezba.findAll().then(function (sveVjezbe) {
        var niz = [];
        for (var i = 0; i < sveVjezbe.length; i++) {
            var objekat = { id: sveVjezbe[i].dataValues.id, naziv: sveVjezbe[i].dataValues.naziv };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));
    });
});


//Spirala4 Zadatak2c
app.get('/procitajZadatak', function (req, res) {
    //treba parametar url biti ovdje
    var mojurl = url.parse(req.url);
    var parametri = new url.URLSearchParams(mojurl.query);
    var vjezba = parametri.get("vjezba");
    
    db.vjezba.findOne({ where: { id: vjezba } }).then(function (pronadjenaVjezba) {
        if (pronadjenaVjezba != null) {
            pronadjenaVjezba.getZadaci().then(function (sviZadaci) {
                var niz = [];
                db.zadatak.findAll().then(function (ostaliZadaci) {
                    if (sviZadaci.length == 0) {
                        
                        for (var i = 0; i < ostaliZadaci.length; i++) {
                            var objekat = { id: ostaliZadaci[i].dataValues.id, naziv: ostaliZadaci[i].dataValues.naziv };
                            niz.push(objekat);
                        }
                    }
                    else {
                        for (var i = 0; i < ostaliZadaci.length; i++) {
                            var postoji = false;
                            for (var j = 0; j < sviZadaci.length; j++) {
                                if (ostaliZadaci[i].dataValues.naziv == sviZadaci[j].dataValues.naziv) {
                                    postoji = true;
                                }
                            }
                            if (!postoji) {
                                var objekat = { id: ostaliZadaci[i].dataValues.id, naziv: ostaliZadaci[i].dataValues.naziv };
                                niz.push(objekat);
                            }
                        }
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(niz));
                });
            });
        }
    });
});



app.post('/vjezba/:idVjezbe/zadatak', function (req, res) {
    var tijelo = req.body;
    
    var idVjezbe=req.params.idVjezbe;
    
    var idZadatka = tijelo.sZadatak;
    pogreskaPoruka = "";
    if (idVjezbe != undefined && idZadatka != undefined) {
        db.vjezba.findOne({ where: { id: idVjezbe } }).then(function (nasaoVjezbu) {
            db.zadatak.findOne({ where: { id: idZadatka } }).then(function (nasaoZadatak) {
                nasaoVjezbu.addZadaci([nasaoZadatak]);
            })
        });
        pogreskaPoruka = "";
    }
    else {
        pogreskaPoruka = "Neka polja su prazna";
        console.log(pogreskaPoruka);
    }
});

app.post("/student", function (req, res) {
    var tijelo = req.body;
    var godina = tijelo.godina;
    var niz = JSON.parse(tijelo.studenti);

    var n = 0;
    var m = 0;
    db.student.findAll().then(function (studentiIzBaze) {
        if (studentiIzBaze.length == 0 && niz.length != 0) {
            for (var i = 0; i < niz.length; i++) {
                db.student.create({ imePrezime: niz[i].imePrezime, index: niz[i].index, studentGod: godina });
                n = n + 1;
                m = m + 1;
            }
        }
        else {
            var pozicija = [];
            for (var i = 0; i < niz.length; i++) {
                var postoji = false;
                for (var j = 0; j < studentiIzBaze.length; j++) {
                    if (niz[i].index == studentiIzBaze[j].index) {
                        postoji = true;
                        db.student.update({ studentGod: godina }, { where: { index: niz[i].index } });
                        m = m + 1;
                        pozicija.push(j);
                    }
                }
                if (!postoji) {
                    db.student.create({ imePrezime: niz[i].imePrezime, index: niz[i].index, studentGod: godina });
                    n = n + 1;
                    m = m + 1;
                }
            }
            var brojacPozicije = 0;
            for (var i = 0; i < studentiIzBaze.length; i++) {
                if (i != pozicija[brojacPozicije]) {
                    if (studentiIzBaze[i].studentGod == godina) {
                        m = m + 1;
                    }
                }
                else {
                    brojacPozicije = brojacPozicije + 1;
                }
            }
        }
        db.godina.findOne({ where: { id: godina } }).then(function (vratioGodinu) {
            var objekat = { message: "Dodano je " + n + " novih studenata i upisano " + m + " na godinu " + vratioGodinu.nazivGod };
            res.send(objekat);
        });
    });

});

app.get("/pogreska", function (req, res) {
    if (pogreskaPoruka != "") {
        res.render("greska", { greskaParagraf: { tipGreske: "Neka polja su prazna!" } });
        pogreskaPoruka = "";
    }
    else {
        res.redirect("addVjezba.html");
    }
});

app.get("/procitajGodine", function (req, res) {
    db.godina.findAll().then(function (sveGodine) {
        var niz = [];
        for (var i = 0; i < sveGodine.length; i++) {
            var objekat = { id: sveGodine[i].dataValues.id, nazivGod: sveGodine[i].dataValues.nazivGod };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));
    });
});

app.get("/dajDatuGodinu", function (req, res) {
    var mojurl = url.parse(req.url);
    var parametri = new url.URLSearchParams(mojurl.query);
    var godina = parametri.get("godina");
    var niz=[];
    db.godina.findOne({ where: { id: godina } }).then(function (nasaoGodinu) {
        if (nasaoGodinu) {
            var objekat = { nazivGod: nasaoGodinu.nazivGod, nazivRepVje: nasaoGodinu.nazivRepVje, nazivRepSpi: nasaoGodinu.nazivRepSpi };
            niz.push(objekat);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(niz));
        }
    });
});