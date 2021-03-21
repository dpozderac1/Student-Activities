var BitBucket = (function () {
    var konstruktor = function (key, secret) {
        var nesto = new Promise(function (resolve, reject) {
            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log("Dobar je status");
                    token = JSON.parse(ajax.responseText).access_token;
                    resolve(token);
                }
                else if (ajax.readyState == 4) {
                    reject("Pogresan token");
                }
            }


            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ":" + secret));
            ajax.send("grant_type=" + encodeURIComponent("client_credentials"));
        });

        return {
            ucitaj: function (nazivRepSpi, nazivRepVje, callback) {
                var sviStudenti = [];
                //if (error) throw error;
                nesto.then(function (token) {
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            for (var i = 0; i < JSON.parse(ajax.responseText).values.length; i++) {
                                var imeRepozitorija = JSON.parse(ajax.responseText).values[i].name;
                                var indeks = imeRepozitorija.substring(imeRepozitorija.length - 5, imeRepozitorija.length);

                                console.log("Ime repozitorija: " + imeRepozitorija);
                                console.log("Indeks je " + indeks);

                                var vlasnik = JSON.parse(ajax.responseText).values[i].owner.display_name;
                                var objekat = { imePrezime: vlasnik, index: indeks };

                                if (sviStudenti.length == 0) {
                                    sviStudenti.push(objekat);
                                }
                                else {
                                    for (var j = 0; j < sviStudenti.length; j++) {
                                        if (sviStudenti[j].imePrezime != vlasnik) {
                                            sviStudenti.push(objekat);
                                        }
                                    }
                                }
                            }
                            callback(null, sviStudenti);
                        }
                        else if (ajax.readyState == 4)
                            callback("Nije moguce dohvatiti listu repozitorija", null);
                    }


                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member&q=name+%3D+%22" + nazivRepVje + "%22" + "+OR+name+%3D+%22" + nazivRepSpi + "%22");
                    console.log("Nesto iznosi" + token);
                    ajax.setRequestHeader("Authorization", 'Bearer ' + token);
                    ajax.send();
                }).catch(function(err){
                    console.log(err);
                    callback(err,null);
                });
            }
        }
    }
    return konstruktor;
}());