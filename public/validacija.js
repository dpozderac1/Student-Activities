var Validacija = (function () {
    //lokalne variable idu ovdje
    var konstruktor = function (divElementPoruke) {
        oznacen = [{ tip: "ime", pogresan: false }, { tip: "godina", pogresan: false }, { tip: "repozitorij", pogresan: false }, { tip: "index", pogresan: false }, { tip: "naziv", pogresan: false }, { tip: "password", pogresan: false }, { tip: "url", pogresan: false }];
        neIspisuj = [true, true, true, true, true, true, true];
        function testiraj(inputElement, tacan, pozicija) {
            divElementPoruke.innerHTML = "";
            divElementPoruke.style.marginLeft = "20%";
            if (tacan) {
                inputElement.style.background = "white";
            }
            if (tacan && oznacen[pozicija].pogresan) {
                oznacen[pozicija].pogresan = false;
            }
            else if (!tacan) {
                oznacen[pozicija].pogresan = true;
                inputElement.style.background = "orangered";
            }

            if (!tacan && !neIspisuj[pozicija]) {
                neIspisuj[pozicija] = false;
            }
            else {
                neIspisuj[pozicija] = (!(tacan != neIspisuj[pozicija]));
            }

            var brojPogresnih = 0;
            for (var j = 0; j < neIspisuj.length; j++) {
                if (!neIspisuj[j]) {
                    brojPogresnih += 1;
                }
            }

            if (brojPogresnih > 0) {
                divElementPoruke.innerHTML = "Sljedeca polja nisu validna:";
            }
            if (brojPogresnih == 0) {
                divElementPoruke.innerHTML = "";
            }
            else {
                var brojac = 0;
                for (var k = 0; k < neIspisuj.length; k++) {
                    if (!neIspisuj[k]) {
                        divElementPoruke.innerHTML += oznacen[k].tip;
                        brojac += 1;
                        if (brojac < brojPogresnih) {
                            divElementPoruke.innerHTML += ",";
                        }
                        else {
                            divElementPoruke.innerHTML += "!";
                        }
                    }
                }
            }
            /*var brojPogresnih = 0;
            for (var j = 0; j < oznacen.length; j++) {
                if (oznacen[j].pogresan) {
                    brojPogresnih += 1;
                }
            }

            if (brojPogresnih > 0) {
                divElementPoruke.innerHTML = "Sljedeca polja nisu validna:"
            }
            if (brojPogresnih == 0) {
                divElementPoruke.innerHTML = "";
            }
            else {
                var brojac = 0;
                for (var k = 0; k < oznacen.length; k++) {
                    if (oznacen[k].pogresan) {
                        divElementPoruke.innerHTML += oznacen[k].tip;
                        brojac += 1;
                        if (brojac < brojPogresnih) {
                            divElementPoruke.innerHTML += ",";
                        }
                        else {
                            divElementPoruke.innerHTML += "!";
                        }
                    }
                }
            }*/
        }

        return {
            ime: function (inputElement) {
                var regex = /^([A-Z][a-z]([a-z]|\'){0,})([\-\ ][A-Z][a-z]([a-z]|\'){0,}){0,3}$/;
                var tacan = true;
                var sadrzaj = inputElement.value;
                if (inputElement.value.match(regex)) {
                    for (var i = 0; i < sadrzaj.length; i++) {
                        if (sadrzaj[i] == "'") {
                            if (i < sadrzaj.length - 1 && sadrzaj[i + 1] == "'") {
                                tacan = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    tacan = false;
                }
                testiraj(inputElement, tacan, 0, "ime");
            },
            godina: function (inputElement) {
                var regex = /^20[0-9]{2}\/20[0-9]{2}$/;
                var tacan = false;
                if (!inputElement.value.match(regex)) {
                    tacan = false;
                }
                else {
                    var sadrzaj = inputElement.value;
                    if (parseInt(sadrzaj.substring(0, 4)) + 1 == parseInt(sadrzaj.substring(5, 9))) {
                        tacan = true;
                    }
                    else {
                        tacan = false;
                    }
                }
                testiraj(inputElement, tacan, 1, "godina");
            },
            repozitorij: function (inputElement, regex) {
                var tacan = true;
                if (!inputElement.value.match(regex)) {
                    tacan = false;
                }
                testiraj(inputElement, tacan, 2, "repozitorij");
            },
            index: function (inputElement) {
                var tacan = true;
                var regex = /^(([1][4-9])|([2][0]))[0-9]{3}$/;
                if (!inputElement.value.match(regex)) {
                    tacan = false;
                }
                testiraj(inputElement, tacan, 3, "index");
            },
            naziv: function (inputElement) {
                var tacan = true;
                var regex = /^[A-Za-z]([0-9A-Za-z\\\/\-\"\'\!\?\:\;\,]){1,}[0-9a-z]$/;
                if (!inputElement.value.match(regex)) {
                    tacan = false;
                }
                testiraj(inputElement, tacan, 4, "naziv");
            },
            password: function (inputElement) {
                var mala = 0;
                var velika = 0;
                var broj = 0;
                var tacan = true;
                if (inputElement.value.length < 8) {
                    tacan = false;
                }
                else {
                    var sadrzaj = inputElement.value;
                    for (var i = 0; i < sadrzaj.length; i++) {
                        if (sadrzaj[i] >= 'a' && sadrzaj[i] <= 'z') {
                            mala += 1;
                        }
                        else if (sadrzaj[i] >= 'A' && sadrzaj[i] <= 'Z') {
                            velika += 1;
                        }
                        else if (parseInt(sadrzaj[i]) >= 0 && parseInt(sadrzaj[i]) <= 9) {
                            broj += 1;
                        }
                    }

                    if (mala < 2 || velika < 2 || broj < 2) {
                        tacan = false;
                    }
                }
                testiraj(inputElement, tacan, 5, "repozitorij");
            },
            url: function (inputElement) {
                var sadrzaj = inputElement.value;

                var rijec = "([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))";



                //var regex=/^(http|https|ftp|ssh)\:\/\/([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))(\.([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))){0,}(\/([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))(\/([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))){0,}){0,1}(\?(([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))\=([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9])))(\&([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))\=([a-z0-9]([a-z0-9-]{0,}[a-z0-9]{1,})|([a-z0-9]))){0,}){0,1}$/;


                var regex = /^(http|https|ftp|ssh)\:\/\/([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))(\.([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))){0,}(\/([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))(\/([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))){0,}){0,1}(\?(([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))\=([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9])))(\&([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))\=([a-zA-Z0-9]([a-zA-Z0-9-]{0,}[a-zA-Z0-9]{1,})|([a-zA-Z0-9]))){0,}){0,1}$/;
                var tacan = true;
                if (!sadrzaj.match(regex)) {
                    tacan = false;
                }
                testiraj(inputElement, tacan, 6, "url");
            }
        }
    }
    return konstruktor;
}());