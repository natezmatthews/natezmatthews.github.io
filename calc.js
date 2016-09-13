// var calc = '<form id="frm" action="" onsubmit="launch(); return false"></div><div id="upperleft"><div id="radio1"><input class="even" type="radio" name="radr" checked="checked" onclick="switchLoc()" />Address&nbsp;<input class="even" type="radio" name="radr" onclick="switchLoc()" />Multiple input&nbsp;<input class="even" type="radio" name="radr" onclick="switchLoc()" />Latitude/longitude</div><br /><div id="DA"><label for="address0">Address or city:</label><br /><input type="text" id="address0" name="address" size="55" maxlength="60" onfocus="this.select()" /></div><div id="DA2" class="off"><label for="address1">Addresses (Each on a separate line):</label><br /><textarea id="address1" name="address" rows="2" cols="0" style="width: 26.5em" onfocus="this.select()"></textarea></div><div id="DL" class="off"><div class="DFI"><label for="latitude" accesskey="L">Latitude(s):</label><br /><textarea id="latitude" cols="16" rows="2" onfocus="this.select()"></textarea>&nbsp;&nbsp;</div><div class="DMA"><label for="longitude">Longitude(s):</label><br /><textarea id="longitude" cols="17" rows="2" onfocus="this.select()"></textarea></div></div><div id="DR" class="off"><label id="resultslabel" for="results">0 search results:</label><br /><div id="DRF"><select id="results"><option></option></select></div><br style="clear: both" /></div><div id="DB" class="fleft"><input id="add" type="submit" class="btn2" value="Add" accesskey="I" /><input type="button" class="btn2" value="Remove" accesskey="X" onclick="removeOptionSelected()" /><input type="button" class="btn2" value="Clear all" accesskey="0" onclick="clearAll()" /></div><div id="DB2" class="fleft"><input id="add2" type="button" class="btn2" value="Continue" onclick="contin()" /><input type="button" class="btn2" value="Cancel" onclick="cancelGeocode()" /></div><div id="DB3" class="fleft"><input id="ok" type="button" class="btn2" value="Ok" onclick="ok1()" /><input type="button" class="btn2" value="Skip" onclick="skip()" /><input type="button" class="btn2" value="Cancel" onclick="cancelGeocode()" /></div><div id="msg"></div></div><div id="upperright"><div id="radio2"><input class="even" type="radio" id="w0" name="radw" checked="checked" onclick="switchWeight()" />Weight by time&nbsp;&nbsp;<input class="even" type="radio" id="w1" name="radw" onclick="switchWeight()" />Other weight</div><br /><div id="DIC"><div id="DT"><div class="DFI"><label for="years0" accesskey="Y">Years:</label><br /><input type="text" id="years0" name="years" size="5" maxlength="5" onfocus="this.select()" /></div><div class="DFI"><label for="months0">Months:</label><br /><input type="text" id="months0" name="months" size="5" maxlength="5" onfocus="this.select()" /></div><div class="DMA"><label for="days0">Days:</label><br /><input type="text" id="days0" name="days" size="5" maxlength="5" onfocus="this.select()" /></div></div><div id="DT2" class="off"><div class="DFI"><label for="years1" accesskey="Y">Years:</label><br /><textarea id="years1" name="years" rows="2" cols="0" style="width: 4em" onfocus="this.select()"></textarea></div><div class="DFI"><label for="months1">Months:</label><br /><textarea id="months1" name="months" rows="2" cols="0" style="width: 4em" onfocus="this.select()"></textarea></div><div class="DMA"><label for="days1">Days:</label><br /><textarea id="days1" name="days" rows="2" cols="0" style="width: 4em" onfocus="this.select()"></textarea></div></div><div id="DW" class="off"><label for="weight0" accesskey="W">Weight:</label><br /><input type="text" id="weight0" name="weight" size="15" maxlength="15" onfocus="this.select()" /></div><div id="DW2" class="off"><label for="weight1" accesskey="W">Weight:</label><br /><textarea id="weight1" name="weight" rows="2" cols="15" onfocus="this.select()"></textarea></div><a href="javascript:triggerMid()"><img id="micon" src="files/micon.jpg" alt="Midpoint info"></img></a><span>Leave blank for no weight</span></div></div><div class="DCL"></div><div id="map"></div><div id="DLB"><div id="DE" class="off"></div><div id="DP"><label id="placeslabel" for="places" accesskey="P">Your places:</label><br /><select id="places" size="8" onchange="openPlace()"><option>.</option><option>.</option><option>.</option></select></div><br /><br /><input type="checkbox" id="disp" checked="checked" />Display place markers<br /><br /><label for="method">Calculation method:</label><br /><div id="radio3"><input id="method" type="radio" name="method" checked="checked" onclick="changeMethod()" />Midpoint (Center of gravity)<br /><input type="radio" name="method" onclick="changeMethod()" />Center of minimum distance<br /><input type="radio" name="method" onclick="changeMethod()" />Average latitude/longitude</div><br /><br /><input type="checkbox" id="large" onclick="switchMap()" />Larger map&nbsp;<input type="button" class="btn" value="Save map" onclick="save(0)" /></div></form>';

var map, geocoder, MM;

var nate = new Array();
// var cAddress = document.getElementsByName("address");
// var cYear = document.getElementsByName("years");
// var cMonth = document.getElementsByName("months");
// var cDay = document.getElementsByName("days");
// var cWeight = document.getElementsByName("weight");
// var addresses = new Array();
// var years = new Array();
// var months = new Array();
// var days = new Array();
// var lats = new Array();
// var lons = new Array();
// var ck = new Array();
// var mTxt = ["Geographic midpoint", "Center of minimum distance", "Average latitude/longitude"];

// var f1, 
var request, addressIndex, pause, cancel, parlat, parlng, sameMap = 0;

var par = 0;
var rI;
// var wI, cI;
var rad90 = rad(90);
var rad180 = rad(180);
var M = Math;
// var p, 
var infoWindow, geoOverLimit;
// document.write(calc);

function initialize() {
    datime = new Date();
    console.log("initialize " + datime.getSeconds() + ":" + datime.getMilliseconds());
    // f1 = D("frm"); // f1 now is the form
    // p = f1.places; // Number of documented places
    // nate.length = 0;
    // infoWindow = new google.maps.InfoWindow({
    //     content: ""
    // });
    // rI = 0;
    // // wI = 0;
    // // cI = 0;

    // var y = "",
    //     m = "",
    //     d = "",
    //     cl = "",
    //     cn = "",
    //     z = "",
    //     x = "",
    //     c = "",
    //     w = "",
    //     p0 = "",
    //     r = "",
    //     latlng;
    // var s = window.location.search.substring(1);
    // //s="ml=33.7288&mn=-118.07501&l=33.803244|33.93759|34.007659|33.956234|33.942584|32.56872|32.697083|32.752006|32.761919|32.824002&n=-118.181647|-118.362142|-118.281898|-118.263943|-118.272402|-117.086903|-117.099553|-117.136551|-117.082216|-117.103308&a=924+East+Vernon+Street,+Signal+Hill,+CA+90755,+USA|10816+South+Burl+Avenue,+Inglewood,+CA+90304,+USA|459+West+42nd+Street,+Los+Angeles,+CA+90037,+USA|632+East+88th+Place,+Los+Angeles,+CA+90002,+USA|140+East+103rd+Street,+Los+Angeles,+CA+90003,+USA|1525+Oakden+Drive,+San+Diego,+CA+92154,+USA|4428+Logan+Avenue,+San+Diego,+CA+92113,+USA|4094+Hamilton+Street,+San+Diego,+CA+92104,+USA|5267+Adams+Avenue,+San+Diego,+CA+92115,+USA|5104+Fino+Drive,+San+Diego,+CA+92124,+USA&d=1100|1100|1100|1100|1100|220|220|220|220|220&cl=33.29116&cn=-117.72218&z=8&x=1&c=0&p=1&r=1&w=0 ";

    // s = decodeURI(s.replace(/\+/gi, " ")); // Parsing queries on the end of the URL. Unclear to me why.
    // var a3 = s.split("&");
    // if (a3.length > 0) {
    //     for (j = 0; j < a3.length; j++) {
    //         var a4 = a3[j].split("=");
    //         var q = a4[1];
    //         switch (a4[0]) {
    //             case "ml":
    //                 parlat = q;
    //                 break;
    //             case "mn":
    //                 parlng = q;
    //                 break;
    //             case "l":
    //                 lats = q.split("|");
    //                 break;
    //             case "n":
    //                 lons = q.split("|");
    //                 break;
    //             case "a":
    //                 addresses = q.split("|");
    //                 break;
    //             case "y":
    //                 y = q.replace(/\|/g, "\n");
    //                 break;
    //             case "m":
    //                 m = q.replace(/\|/g, "\n");
    //                 break;
    //             case "d":
    //                 d = q.replace(/\|/g, "\n");
    //                 break;
    //             case "x":
    //                 x = 1;
    //                 f1.large.checked = (q == "1");
    //                 switchMap();
    //                 break;
    //             case "cl":
    //                 cl = q;
    //                 break;
    //             case "cn":
    //                 cn = q;
    //                 break;
    //             case "z":
    //                 z = parseInt(q);
    //                 break;
    //             case "c":
    //                 c = 1;
    //                 // f1.method[q].checked = true;
    //                 // cI = q;
    //                 break;
    //             case "p":
    //                 p0 = 1;
    //                 f1.disp.checked = (q == "1");
    //                 break;
    //             case "w":
    //                 // f1.radw[q].checked = true;
    //                 // switchWeight();
    //                 break;
    //             case "r":
    //                 f1.radr[q].checked = true;
    //                 switchLoc();
    //                 break;
    //         }
    //     }
    // }

    // // readCookie('ckData1');
    // // if (w == "" && ck[2] >= 0 && ck[2] <= 1) {
    // //     wI = ck[2];
    // //     f1.radw[wI].checked = true;
    // //     switchWeight();
    // // }
    // // if (r == "" && ck[1] >= 0 && ck[1] <= 2) {
    // //     rI = ck[1];
    // //     f1.radr[rI].checked = true;
    // // }
    // switchLoc();
    // // if (c == "" && ck[3] >= 0 && ck[3] <= 2) {
    // //     cI = ck[3];
    // //     f1.method[cI].checked = true;
    // // }
    // // if (p0 == "") {
    // //     f1.disp.checked = (ck[4] == 1 || isNaN(ck[4]));
    // // }
    // // if (x == "") {
    // //     f1.large.checked = (ck[0] == "1");
    // //     switchMap()
    // // }

    // if (cl != "" && cn != "" && cl >= -90 && cl <= 90 && cn >= -180 && cn <= 180) {
    //     if (z == "") z = 3;
    //     latlng = new google.maps.LatLng(cl, cn);
    // // } else if (!isNaN(ck[5]) && !isNaN(ck[6])) {
    // //     latlng = new google.maps.LatLng(ck[5], ck[6]);
    // //     z = ck[7] * 1;
    // } else {
    //     latlng = new google.maps.LatLng(39.17, -98.297);
    //     z = 3;
    // }

    console.log("Initialize");

    geocoder = new google.maps.Geocoder();
    var options = {
        zoom: 3,
        center: google.maps.LatLng(39.17, -98.297),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(D("map"), options);

    // if (nate.length) {
    //     par = 1;
    //     years = getInput(y, nate.length);
    //     months = getInput(m, nate.length);
    //     days = getInput(d, nate.length);
    //     launch(1);
    // } else if (parlat && parlng) {
    //     par = 1;
    //     calculate();
    // }
    // if ((MM || nate.length) && (cl == "" || cn == "")) setBounds();
}

// function unload() {
    // datime = new Date();
    // console.log("unload " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     setCookie('ckData1', f1.large.checked * 1, rI + f1.radr[2].checked * 1, wI, cI, f1.disp.checked * 1, map.getCenter().lat(), map.getCenter().lng(), map.getZoom());
// }

// function readCookie(cookieName) {
    // datime = new Date();
    // console.log("readCookie " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     var theCookie = "" + document.cookie;
//     var ind = theCookie.indexOf(cookieName);
//     if (ind == -1 || cookieName == "") return "";
//     var ind1 = theCookie.indexOf(';', ind);
//     if (ind1 == -1) ind1 = theCookie.length;
//     var s = unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
//     ck = s.split("|");
// }

// function setCookie(cookieName, x, r, w, c, p0, cl, cn, z) {
//     var nDays = 2500;
//     var today = new Date();
//     var expire = new Date();
//     expire.setTime(today.getTime() + 3600000 * 24 * nDays);
//     var cookieValue = x + "|" + r + "|" + w + "|" + c + "|" + p0 + "|" + cl + "|" + cn + "|" + z;
//     document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
// }

function selectText(myDiv) {
    datime = new Date();
    console.log("selectText " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.setBaseAndExtent) {
            selection.setBaseAndExtent(myDiv, 0, myDiv, 1);
        } else {
            var range = document.createRange();
            range.selectNodeContents(myDiv);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    } else {
        var range = document.body.createTextRange();
        range.moveToElementText(myDiv);
        range.select();
    }
}

function setBounds() {
    datime = new Date();
    console.log("setBounds " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var bounds = new google.maps.LatLngBounds();
    var point;
    if (nate.length || MM) {
        if (MM) {
            point = MM.getPosition();
            bounds.extend(point);
        }
        for (i = 0; i < nate.length; i++) {
            var point = new google.maps.LatLng(nate[i].marker.getPosition().lat(), nate[i].marker.getPosition().lng());
            bounds.extend(point);
        }
        mapLoaded = false;
        map.fitBounds(bounds);
        if (map.getZoom() > 15) map.setZoom(15);
    }
}

function createMarker(point, html, ico, d) {
    datime = new Date();
    console.log("createMarker " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var icon = null,
        shadow = null,
        visible = true;
    if (ico) {
        icon = "images/paleblue_MarkerM.png";
        shadow = {
            url: 'images/shadow50.png',
            size: new google.maps.Size(37, 34),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 34)
        };
    } else {
        // if (!f1.disp.checked) 
        visible = false;
    }
    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: icon,
        shadow: shadow,
        visible: visible
    });
    if (d) marker.setDraggable(true);
    google.maps.event.addListener(marker, "click", function() {
        var h = "";
        if (!ico) {
            if (marker.dragged != 1) {
                h = formatInfo(splitAddress(p[marker.i].text), "x", "", marker.i);
            } else {
                h = formatInfo("Current location:", marker.getPosition().lat(), marker.getPosition().lng(), marker.i);
            }
        } else {
            h = html;
        }
        displayError(h);
        //alert(h);
        infoWindow.content = h;
        //infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'dragstart', function() {
        saveLatLng(marker.i, marker.getPosition());
        closeInfo();
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        sameMap = 1;
        calculate();
        marker.dragged = 1;
    });
    return marker;
}

function closeInfo() {
    datime = new Date();
    console.log("closeInfo " + datime.getSeconds() + ":" + datime.getMilliseconds());
    D("DE").style.display = "none";
}

function clearAll() {
    datime = new Date();
    console.log("clearAll " + datime.getSeconds() + ":" + datime.getMilliseconds());
    par = 0;
    closeInfo();
    dispMsg('Clearing...', 2);
    clear2();
}

function clear2() {
    datime = new Date();
    console.log("clear2 " + datime.getSeconds() + ":" + datime.getMilliseconds());
    D("DE").style.display = "none";
    for (i = nate.length - 1; i >= 0; i--) {
        nate[i].marker.setMap(null);
    }
    MM = remove(MM);
    nate.length = 0;
    dispCount();
    clearGeocode();
    clearWeights();
    // lockWeights();
    nate.length = 0;
    // nate.length = 0;
    // lons.length = 0;
    // years.length = 0;
    // months.length = 0;
    // days.length = 0;
    dispMsg("", 2);
}

function clearGeocode() {
    datime = new Date();
    console.log("clearGeocode " + datime.getSeconds() + ":" + datime.getMilliseconds());
    nate[0].Address = "";
    nate[1].Address = "";
    // f1.latitude.value = "";
    // f1.longitude.value = "";
}

function clearWeights() {
    datime = new Date();
    console.log("clearWeights " + datime.getSeconds() + ":" + datime.getMilliseconds());
    for (i = 0; i < 2; i++) {
        nate[i].year = "";
        nate[i].month = "";
        nate[i].day = "";
        // cWeight[i].value = "";
    }
    years.length = 0;
    months.length = 0;
    days.length = 0;
}

function removeOptionSelected() {
    datime = new Date();
    console.log("removeOptionSelected " + datime.getSeconds() + ":" + datime.getMilliseconds());
    par = 0;
    closeInfo();
    var i = p.selectedIndex;
    dispMsg("", 2);
    D("DE").style.display = "none";
    if (i >= 0) {
        nate[i].marker.setMap(null);
        p.remove(i);
        if (nate.length == 0) {
            clearAll();
            return false;
        } else if (nate.length == 1) {
            if (MM) MM = remove(MM);
        }
        for (j = i; j < nate.length; j++) {
            nate[j].marker.i = j;
        }
        dispCount();
        calculate();
    }
}

function appendToList() {
    datime = new Date();
    console.log("appendToList " + datime.getSeconds() + ":" + datime.getMilliseconds());
    dispMsg("Adding...", addresses.length);
    var r = f1.results;
    var i = M.max(r.selectedIndex, 0);
    var sText = r[i].text;
    if (MM) MM = remove(MM);
    appendOptionLast("places", sText);
    var l = nate.length - 1;
    nate[l].y = nate[addressIndex].year;
    nate[l].m = nate[addressIndex].month;
    nate[l].d = nate[addressIndex].day;
    var point = new google.maps.LatLng(roundx(r[i].lat, 6), roundx(r[i].lng, 6));
    nate[l].marker = createMarker(point, "", null, 1);
    nate[l].marker.i = l;
    dispCount();
    // if (!l) lockWeights();
}

function calculate() {
    datime = new Date();
    console.log("calculate " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (nate.length > 1 || par) {
        var midlat = 0,
            midlng = 0;
        var x = 0;
        var y = 0;
        var z = 0;
        var x1, y1, z1;
        var pt = new Object();
        pt.lat = 0;
        pt.lon = 0;
        var totdays = 0;
        var lats1 = new Array();
        var lons1 = new Array();
        var days1 = new Array();
        var sinlats = new Array();
        var coslats = new Array();
        with(Math) {
            for (i = 0; i < nate.length; i++) {
                lats1[i] = rad(nate[i].marker.getPosition().lat());
                lons1[i] = rad(nate[i].marker.getPosition().lng());
                sinlats[i] = sin(lats1[i]);
                coslats[i] = cos(lats1[i]);
                days1[i] = nate[i].y * 365.25 + nate[i].m * 30.4375 + nate[i].d * 1;
                if (days1[i] == 0) {
                    days1[i] = 1;
                }
                totdays = totdays + days1[i];
                x1 = coslats[i] * cos(lons1[i]);
                y1 = coslats[i] * sin(lons1[i]);
                z1 = sinlats[i];
                x += x1 * days1[i];
                y += y1 * days1[i];
                z += z1 * days1[i];
            }
            x = x / totdays;
            y = y / totdays;
            z = z / totdays;
            midlng = atan2(y, x);
            hyp = sqrt(x * x + y * y);
            midlat = atan2(z, hyp);
            // if (cI != 2 && abs(x) < 1.0e-9 && abs(y) < 1.0e-9 && abs(z) < 1.0e-9) {
            if (abs(x) < 1.0e-9 && abs(y) < 1.0e-9 && abs(z) < 1.0e-9) {
                if (MM) MM = remove(MM);
                displayError('Congratulations, your travels are perfectly evenly distributed across the globe!');
            }
            else {
                // if (cI == 2) {
                //     y = 0;
                //     x = 0;
                //     for (i = 0; i < lats1.length; i++) {
                //         y = y + lats1[i] * days1[i];
                //         x = x + normalizeLongitude(lons1[i] - midlng) * days1[i];
                //     }
                //     midlat = y / totdays;
                //     midlng = normalizeLongitude(x / totdays + midlng);
                // }
                // else if (cI == 1) {
                //     if (lats1.length > 2 || lats1.length == 2 & days1[0] != days1[1]) {
                //         var tries = 0;
                //         lats1[lats1.length] = midlat;
                //         lons1[lons1.length] = midlng;
                //         var distrad = rad90;
                //         var mindist = 1.0e07;
                //         var sum, gMindist, lat2, slat, cdist, minlat, minlon;
                //         var t = new Array(8, 6, 7, 2, 0, 1, 5, 3, 4);
                //         var scale = new Array(0.7071, 0.7071, 1, 0.7071, 0.7071, 1, 1, 1, 1);
                //         var testcenter = true;
                //         i = lats1.length + 8;
                //         while (distrad > 2.0e-08 && tries < 5000) {
                //             if (i < 0) {
                //                 i = 8;
                //             }
                //             while (i >= 0) {
                //                 if (i < 9) {
                //                     y = floor(t[i] / 3) - 1;
                //                     x = t[i] % 3;
                //                     switch (x) {
                //                         case 1:
                //                             pt.lon = midlng;
                //                             pt.lat = midlat - y * distrad;
                //                             pt = normalizeLatitude(pt);
                //                             break
                //                         case 0:
                //                             pt.lon = midlng;
                //                             pt.lat = midlat - y * distrad * scale[i];
                //                             pt = normalizeLatitude(pt);
                //                             lat2 = pt.lat;
                //                             slat = sin(lat2);
                //                             cdist = cos(distrad * scale[i]);
                //                             pt.lat = asin(slat * cdist);
                //                             pt.lon = normalizeLongitude(pt.lon + atan2(-sin(distrad * scale[i]) * cos(lat2), cdist - slat * sin(pt.lat)));
                //                             break
                //                         case 2:
                //                             pt.lon = normalizeLongitude(midlng + normalizeLongitude(midlng - pt.lon));
                //                     }
                //                 } else {
                //                     pt.lat = lats1[i - 9];
                //                     pt.lon = lons1[i - 9];
                //                 }
                //                 if (pt.lon != midlng || pt.lat != midlat || testcenter) {
                //                     sum = 0;
                //                     for (j = 0; j < lats1.length - 1; j++) {
                //                         sum += acos(sinlats[j] * sin(pt.lat) + coslats[j] * cos(pt.lat) * cos(pt.lon - lons1[j])) * days1[j];
                //                     }
                //                     if (!testcenter) {
                //                         if (sum < mindist) {
                //                             mindist = sum;
                //                             minlat = pt.lat;
                //                             minlon = pt.lon;
                //                         }
                //                     } else {
                //                         gMindist = sum;
                //                         testcenter = false;
                //                     }
                //                 }
                //                 i--;
                //             }
                //             if (mindist - gMindist < -4.0e-14) {
                //                 midlat = minlat;
                //                 midlng = minlon;
                //                 gMindist = mindist;
                //             } else {
                //                 distrad = distrad * 0.5;
                //             }
                //             tries++
                //         }
                //     }
                // }
                if (!par) {
                    midlat = deg(midlat);
                    midlng = deg(midlng);
                } else {
                    midlat = parlat;
                    midlng = parlng;
                }
                par = 0;
                if (MM) MM = remove(MM);
                //My flipping code:
                var oplat = midlat * -1;
                var oplng = (midlng % 360) - 180;
                // geoNames(oplat, oplng, 1);
                var point = new google.maps.LatLng(oplat, oplng);
                // var h1 = formatInfo('<b>' + mTxt[cI] + '</b>', oplat, oplng, -1);
                var h1 = formatInfo('<b>Filler</b>', oplat, oplng, -1);
                var h2 = '<p class="pz"><a href="javascript:save(1)">Find nearby points of interest</a></p></div>';
                MM = createMarker(point, h1 + h2, 1, 0);
                MM.setMap(map);
                MM.h1 = h1;
                MM.h2 = h2;
                // console.log("Here?");
                geocoder.geocode({
                    'latLng': point
                }, revGeoCallback);
            }
            // if (tries >= 5000) {
            //     displayError('The center of distance for these ' + nate.length + ' places could not be precisely located. The displayed center of distance is probably accurate to within two degrees.');
            // }
        }
    }
    if (!par && !sameMap) {
        setBounds();
    }
    sameMap = 0;
}

function geoNames(wlat, wlng, attempt) {
    datime = new Date();
    console.log("geoNames " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var request;
    try {
        request = new XMLHttpRequest();
    } catch (ms1) { // yes, exception handling is supported in JavaScript
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ms2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ex) {
                request = null;
            }
        }
    }
    if (request == null) {
        alert("Error creating request object");
    }
    north = wlat + (attempt * 4);
    south = wlat - (attempt * 4);
    east = wlng + (attempt * 4);
    west = wlng - (attempt * 4);
    url = "http://api.geonames.org/citiesJSON?north=" + north.toString() + "&south=" + south.toString() + "&east=" + east.toString() + "&west=" + west.toString() + "&lang=en&username=natezmatthews";
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var resp = JSON.parse(request.responseText);
            for (i in resp.geonames) {
                if (resp.geonames[i].wikipedia) {
                    p1 = resp.geonames[i];
                    getInfoForWindow(p1.wikipedia, p1.lat, p1.lng);
                    return;
                }
            }
            geoNames(wlat, wlng, attempt + 1);
        }
    };
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(null);
}

function getInfoForWindow(wikiurl, lat, lng) {
    datime = new Date();
    console.log("getInfoForWindow " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var extract, imgurl, title = wikiurl.substr(wikiurl.lastIndexOf("/") + 1);
    $.when(
        $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&titles=" + title + "&format=json&callback=?",
            function(data) {
                for (i in data.query.pages) {
                    if (data.query.pages[i].extract) {
                        extract = data.query.pages[i].extract;
                        break;
                    }
                }
            }
        ),
        $.getJSON("https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + title + "&callback=?",
            function(data2) {
                for (i in data2.responseData.results) {
                    if (data2.responseData.results[i].url) {
                        imgurl = data2.responseData.results[i].url;
                        break;
                    }
                }
            }
        )
    ).then(function() {
        makeInfoWindow(extract, imgurl, wikiurl, lat, lng, title);
    });
}

function makeInfoWindow(extract, imgurl, wikiurl, lat, lng, title) {
    datime = new Date();
    console.log("makeInfoWindow " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var contentString = "<img src='" + imgurl + "' style='width:370px;'><h1>" + decodeURI(title) + "</h1><div>" + extract + "</div><a href='http://" + wikiurl + "'>" + wikiurl + "</a>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var cityLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: cityLatlng,
        map: map,
        title: title
    });
    map.setZoom(4);
    infowindow.open(map, marker);
}

function saveLatLng(i, ll) {
    datime = new Date();
    console.log("saveLatLng " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (isNaN(nate[i].lat)) {
        nate[i].lat = ll.lat();
        nate[i].lng = ll.lng();
    }
}

function reset(i) {
    datime = new Date();
    console.log("reset " + datime.getSeconds() + ":" + datime.getMilliseconds());
    closeInfo();
    nate[i].marker.dragged = 0;
    var point = new google.maps.LatLng(nate[i].lat, nate[i].lng);
    nate[i].marker.setPosition(point);
    calculate();
}

function r5(i) {
    datime = new Date();
    console.log("r5 " + datime.getSeconds() + ":" + datime.getMilliseconds());
    p.selectedIndex = i;
    removeOptionSelected();
}

function remove(obj) {
    datime = new Date();
    console.log("remove " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (obj) {
        obj.setMap(null);
    }
    return null;
}

function appendOptionLast(combo, item) {
    datime = new Date();
    console.log("appendOptionLast " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var elOptNew = document.createElement('option');
    elOptNew.text = item;
    elOptNew.value = item;
    var elSel = D(combo);
    try {
        elSel.add(elOptNew, null);
    } catch (ex) {
        elSel.add(elOptNew);
    }
}

function dispCount() {
    datime = new Date();
    console.log("dispCount " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var l = nate.length;
    var m = "s";
    switch (l) {
        case 1:
            m = "";
            break;
        case 0:
            l = "";
    }
    D("placeslabel").innerHTML = "Your " + l + " place" + m + ":";
}

function dispMsg(s, l) {
    datime = new Date();
    console.log("dispMsg " + datime.getSeconds() + ":" + datime.getMilliseconds());
    // if (l > 1) D("msg").innerHTML = s;
    console.log("Display Msg: " + s);
}

function displayError(e) {
    datime = new Date();
    console.log("displayError " + datime.getSeconds() + ":" + datime.getMilliseconds());
    console.log("Display Error: " + e);
    // D("DE").innerHTML = e;
    // toggleDivs(["DE"], 1);
    //alert(e);
}

function rad(dg) {
    datime = new Date();
    console.log("rad " + datime.getSeconds() + ":" + datime.getMilliseconds());
    return (dg * Math.PI / 180);
}

function deg(rd) {
    datime = new Date();
    console.log("deg " + datime.getSeconds() + ":" + datime.getMilliseconds());
    return (rd * 180 / Math.PI);
}

function splitAddress(s) {
    datime = new Date();
    console.log("splitAddress " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var t = s.split(/,/);
    if (t.length > 3 || t.length > 2 && /\d/g.test(t[0])) {
        s = t[0] + "<br>";
        for (j = 1; j < t.length; j++) {
            if (j > 1) s += ", ";
            s += trim(t[j]);
        }
    }
    return s;
}

function normalizeLongitude(lon) {
    datime = new Date();
    console.log("normalizeLongitude " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var n = Math.PI;
    if (lon > n) {
        lon = lon - 2 * n
    } else if (lon < -n) {
        lon = lon + 2 * n
    }
    return lon;
}

function normalizeLatitude(point) {
    datime = new Date();
    console.log("normalizeLatitude " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (Math.abs(point.lat) > rad90) {
        point.lat = rad180 - point.lat - 2 * rad180 * (point.lat < -rad90);
        point.lon = normalizeLongitude(point.lon - rad180);
    }
    return point;
}

function trim(s) {
    datime = new Date();
    console.log("trim " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (s.charCodeAt(0) > 32 && s.charCodeAt(s.length - 1) > 32)
        return s;
    else {
        return s.replace(/^\s+|\s+$/g, '');
    }
}

function rTrim(s) {
    datime = new Date();
    console.log("rTrim " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (s.charCodeAt(s.length - 1) > 32)
        return s;
    else {
        return s.replace(/\s+$/g, '');
    }
}

function roundx(n, exp) {
    datime = new Date();
    console.log("roundx " + datime.getSeconds() + ":" + datime.getMilliseconds());
    return M.round(n * M.pow(10, exp)) / M.pow(10, exp);
}

// function lockWeights() {
    // datime = new Date();
    // console.log("lockWeights " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     f1.w0.disabled = (nate.length > 0);
//     f1.w1.disabled = (nate.length > 0);
// }

// Toggle which divs of the menu are shown
function toggleDivs(divs, block) {
    datime = new Date();
    console.log("toggleDivs " + datime.getSeconds() + ":" + datime.getMilliseconds());
    for (i = 0; i < divs.length; i++) {
        if (i < block) {
            D(divs[i]).style.display = "block";
        } else {
            D(divs[i]).style.display = "none";
        }
    }
}

function D(id) {
    datime = new Date();
    console.log("D " + datime.getSeconds() + ":" + datime.getMilliseconds());
    return document.getElementById(id);
}

// function switchLoc() {
    // datime = new Date();
    // console.log("switchLoc " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     var prev = rI;
//     if (f1.radr[0].checked) {
//         toggleDivs(["DA", "DB", "DA2", "DR", "DB2", "DB3", "DL"], 2);
//         rI = 0;
//     } else if (f1.radr[1].checked) {
//         toggleDivs(["DA2", "DB", "DA", "DR", "DB2", "DB3", "DL"], 2);
//         rI = 1;
//     } else {
//         toggleDivs(["DL", "DB", "DA", "DA2", "DR", "DB2", "DB3"], 2);
//         rI = 1;
//     }
//     if (prev != rI) clearGeocode();
//     // switchWeight();
// }

// function switchWeight() {
    // datime = new Date();
    // console.log("switchWeight " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     var prev = wI;
//     if (f1.radw[0].checked) {
//         if (f1.radr[0].checked) {
//             toggleDivs(["DT", "DT2", "DW", "DW2"], 1);
//         } else {
//             toggleDivs(["DT2", "DT", "DW", "DW2"], 1);
//         }
//         wI = 0;
//     } else {
//         if (f1.radr[0].checked) {
//             toggleDivs(["DW", "DW2", "DT", "DT2"], 1);
//         } else {
//             toggleDivs(["DW2", "DW", "DT", "DT2"], 1);
//         }
//         wI = 1;
//     }
//     if (prev != wI) clearWeights();
// }

// function changeMethod() {
    // datime = new Date();
    // console.log("changeMethod " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     closeInfo();
//     if (f1.method[2].checked) {
//         cI = 2;
//     } else if (f1.method[1].checked) {
//         cI = 1;
//     } else {
//         cI = 0;
//     }
//     if (nate.length > 1) calculate()
// }

// function switchMap() {
    // datime = new Date();
    // console.log("switchMap " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     if (f1.large.checked) {
//         D("map").style.width = "48em";
//         D("map").style.height = "29.4em";
//     } else {
//         D("map").style.width = "30.1em";
//         D("map").style.height = "24.1em";
//     }
//     if (map) {
//         google.maps.event.trigger(map, 'resize');
//     }
//     if (nate.length > 0) {
//         setBounds();
//     }
// }

function getTimes(l) {
    datime = new Date();
    console.log("getTimes " + datime.getSeconds() + ":" + datime.getMilliseconds());
    years = getInput(cnate[rI].Year.value, l);
    months = getInput(cnate[rI].Month.value, l);
    days = getInput(cnate[rI].Day.value, l);
    // if (wI == 1) {
    //     days = getInput(cWeight[rI].value, l);
    // } else {
    //     days = getInput(cnate[rI].Day.value, l);
    // }
}

function getInput(s, l) {
    datime = new Date();
    console.log("getInput " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var sText = rTrim(s);
    sText = sText.replace(/\r\n/g, '\n');
    var r = sText.split('\n');
    if (l) {
        if (r.length != l) {
            r.length = l;
            s = r.join().replace(/undefined/g, "");
            r = s.split(',');
        }
    } else {
        if (sText.length == 0) r.length = 0;
    }
    return r;
}

function validateTimes(a, l) {
    datime = new Date();
    console.log("validateTimes " + datime.getSeconds() + ":" + datime.getMilliseconds());
    console.log("Fix Validate Times Later");
    // var a1 = ""
    // //     m = ["time", "weight"];
    // // var n = ["day", "weight"];
    // if (nate.length) {
    //     var first = !nate[0].y && !nate[0].m && !nate[0].d;
    // } else {
    //     var first = !parseFloat(nate[0]) && !parseFloat(months[0]) && !parseFloat(days[0].year);
    // }
    // for (i = 0; i < l; i++) {
    //     if (a == "address") a1 = addresses[i];
    //     if (isNaN(nate[i].year)) {
    //         displayError("The year \'" + nate[i].year + "\' for " + a + " #" + parseInt(i + 1) + " " + a1 + " is invalid.");
    //         return;
    //     }
    //     if (isNaN(nate[i].month)) {
    //         displayError("The month \'" + nate[i].month + "\' for " + a + " #" + parseInt(i + 1) + " " + a1 + " is invalid.");
    //         return;
    //     }
    //     if (isNaN(nate[i].day)) {
    //         displayError("The day \'" + nate[i].day + "\' for " + a + " #" + parseInt(i + 1) + " " + a1 + " is invalid.");
    //         return;
    //     }
    //     nate[i] = +years[i].year;
    //     nate[i] = +months[i].month;
    //     nate[i] = +days[i].day;
    //     cur = !nate[i] && !months[i] && !days[i].year;
    //     if (!first && cur) {
    //         displayError("A time must be specified for " + a + " #" + parseInt(i + 1) + " " + addresses[i] + ".");
    //         return false;
    //     }
    //     if (first && !cur) {
    //         displayError('You must either enter a time for all locations in Your Places, or leave the time blank or zero for all locations.');
    //         return false;
    //     }
    // }
    return true;
}

function launch(p1) {
    datime = new Date();
    console.log("launch " + datime.getSeconds() + ":" + datime.getMilliseconds());
    // if (!p1) par = 0;
    var l;
    if (!map) return;
    closeInfo();
    request = -2;
    pause = 0;
    cancel = 0;
    // if (f1.radr[2].checked || par) {
    //     if (!par) {
    //         lats = getInput(f1.latitude.value, 0);
    //         lons = getInput(f1.longitude.value, 0);
    //         getTimes(nate.length);
    //     }
    //     if (nate.length != lons.length) {
    //         displayError('The number of latitudes is not the same as the number of longitudes. Please check your data.');
    //         return false;
    //     }
    //     if (nate.length == 0 || lons.length == 0) {
    //         displayError('You must specify a latitude and longitude before continuing.');
    //         return false;
    //     }
    //     for (j = 0; j < nate.length; j++) {
    //         if (!validateLl(lats[j], 0)) {
    //             displayError("The entry \'" + lats[j] + "\' for latitude #" + parseInt(j + 1) + " is invalid.");
    //             return false;
    //         }
    //         if (!validateLl(lons[j], 1)) {
    //             displayError("The entry \'" + lons[j] + "\' for longitude #" + parseInt(j + 1) + " is invalid.");
    //             return false;
    //         }
    //     }
    //     if (!validateTimes("location", nate.length)) return false;
    //     addressIndex = -1
    //     if (nate.length > 1) {
    //         dispProceed();
    //         dispMsg("Adding...", 2);
    //     }
    //     if (MM) MM = remove(MM);
    //     launchL();
    //     return false;
    // } else {
    // addresses = getInput(cAddress[rI].value, 0);
    // getTimes(addresses.length);
    if (nate.length == 0) {
        displayError('You must specify an address before continuing.');
        return false;
    }
    if (!validateTimes("address", addresses.length)) return false;
    // }
    addressIndex = 0;
    if (nate.length > 1) {
        dispProceed();
        dispMsg("Searching...", 2);
    }
    launchG()
}

function launchL() {
    datime = new Date();
    console.log("launchL " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (addressIndex >= nate.length - 1 || cancel) {
        clearWeights();
        clearGeocode();
        if (!par || parlat && parlng) calculate();
        dispStart();
        dispMsg("", 2);
        return false;
    } else {
        addressIndex++;
    }
    if (request >= addressIndex) return false;
    request = addressIndex;
    D("DE").style.display = "none";
    appendOptionLast("places", nate[addressIndex].Address);
    // if (par) {
    //     appendOptionLast("places", nate[addressIndex].Address);
    // } else {
    //     appendOptionLast("places", "Lat: " + lats[addressIndex] + "  Long: " + lons[addressIndex]);
    // }
    var l = nate.length - 1;
    nate[l].y = parseFloat(nate[addressIndex].year);
    nate[l].m = parseFloat(nate[addressIndex].month);
    nate[l].d = parseFloat(nate[addressIndex].day);
    var point = new google.maps.LatLng(latLonToDecimal(lats[addressIndex]), latLonToDecimal(lons[addressIndex]));
    nate[l].marker = createMarker(point, "", null, 1);
    nate[l].marker.i = l;
    dispCount();
    window.setTimeout(launchL, 15);
    // if (!l) lockWeights();
}

function launchG() {
    datime = new Date();
    console.log("launchG " + datime.getSeconds() + ":" + datime.getMilliseconds());
    // D("DE").style.display = "none";
    geocoder.geocode({
        'address': nate[addressIndex].Address
    }, gCallback);
}

function gCallback(res, status) {
    datime = new Date();
    console.log("gCallback " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (cancel || request >= addressIndex) return false;
    // var r = f1.results;
    if (status != "OK") {
        // D("ok").value = "Retry";
        switch (status) {
            case "ZERO_RESULTS":
                displayError('Address #' + parseInt(addressIndex + 1) + ' \'' + nate[addressIndex].Address + '\' was not found.');
                break;
            case "OVER_QUERY_LIMIT":
                if (!geoOverLimit) {
                    displayError('Google geocoder speed limit. Click \'Resume\' each time calculator stops.');
                    geoOverLimit = 1;
                }
                // D("ok").value = "Resume";
                break;
            case "REQUEST_DENIED":
                displayError('Request denied');
                break;
            case "INVALID_REQUEST":
                displayError('Invalid request');
                break;
        }
        // dispMsg("", 2);
        r.length = 0;
        pause = 1;
        // toggleDivs(["DB3", "DB", "DB2"], 1);
        return;
    }

    request = addressIndex;
    var addr, loc, ind = 0;
    r.length = 0;

    for (i = 0; i < res.length; i++) {
        addr = res[i].formatted_address;
        if (!addr) {
            addr = nate[addressIndex].Address;
        }
        try {
            if (res[i].types[0] == "street_address") {
                ind = addr.indexOf(",");
                if (ind > -1) {
                    ind += 2;
                }
            }
        } catch (err0) {
            ind = -1;
        }
        appendOptionLast("results", addr);
        r[r.length - 1].lat = res[i].geometry.location.lat();
        r[r.length - 1].lng = res[i].geometry.location.lng();
        r[r.length - 1].i = ind;
    }

    // if (r.length > 0) {
    appendToList();
    // } else {
    //     D("ok").value = "Ok";
    //     toggleDivs(["DR", "DB3", "DA","DA2","DL", "DB", "DE", "DB2"], 2);
    //     D("resultslabel").innerHTML = "Select from " + r.length + " results:";
    //     dispMsg("", 2);
    //     f1.results.focus();
    //     pause = 1;
    // }

    loopG();
}

function loopG() {
    datime = new Date();
    console.log("loopG " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (!pause) {
        if (addressIndex < addresses.length - 1 && !cancel) {
            addressIndex++;
            window.setTimeout(launchG, 60);
        } else {
            calculate();
            clearWeights();
            clearGeocode();
            dispStart();
            dispMsg("", 2);
        }
    }
}

// function dispStart() {
    // datime = new Date();
    // console.log("dispStart " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     switchLoc();
//     toggleDivs(["DB", "DB2", "DB3"], 1);
//     f1.add.focus();
// }

// function dispProceed() {
    // datime = new Date();
    // console.log("dispProceed " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     switchLoc();
//     toggleDivs(["DB2", "DB", "DB3"], 1);
// }

// function ok1() {
    // datime = new Date();
    // console.log("ok1 " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     D("DE").style.display = "none";
//     pause = 0;
//     if (addresses.length > 1) dispProceed();
//     if (D("ok").value == "Retry" || D("ok").value == "Resume") {
//         request = -1;
//         launchG();
//         return false;
//     }
//     appendToList();
//     loopG();
// }

function skip() {
    datime = new Date();
    console.log("skip " + datime.getSeconds() + ":" + datime.getMilliseconds());
    D("DE").style.display = "none";
    pause = 0;
    if (addresses.length > 1) dispProceed();
    loopG();
}

function cancelGeocode() {
    datime = new Date();
    console.log("cancelGeocode " + datime.getSeconds() + ":" + datime.getMilliseconds());
    D("DE").style.display = "none";
    cancel = 1;
    if (nate.length > 1) calculate();
    dispStart();
    dispMsg("", 2);
}

// function contin() {
    // datime = new Date();
    // console.log("contin " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     D("DE").style.display = "none";
//     dispMsg("Please wait...", 2);
//     if (f1.radr[1].checked) {
//         launchG();
//     } else {
//         launchL();
//     }
// }

function validateLl(s, j) {
    datime = new Date();
    console.log("validateLl " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var d = ["ns", "ew"];
    var pl = ["90(\\.0+)?|[0-8]?\\d", "180(\\.0+)?|(0?\\d?\\d|1[0-7]\\d)"];
    var ps = "^(-|[" + d[j] + "]\\s*)?(" + pl[j] + "([^\\w.-]+[0-5]?\\d){0,2}(\\.\\d+)?)(\\s*[" + d[j] + "])?$";
    var reg = new RegExp(ps, "i");
    return (reg.test(s) && (/^[nsew-]/i.test(s) + /[nsew-]$/i.test(s) < 2));
}

function latLonToDecimal(s) {
    datime = new Date();
    console.log("latLonToDecimal " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var t = s.replace(/-/, "");
    var pos = t.search(/[\d.]/);
    t = t.substring(pos);
    var r = t.split(/[^\d.]/);
    var sum = 0;
    for (i = 0; i < r.length; i++) {
        sum += r[i] / M.pow(60, i);
    }
    s = -2 * sum * (/[sw-]/i.test(s) - 0.5);
    return s;
}

function openPlace() {
    datime = new Date();
    console.log("openPlace " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var i = p.selectedIndex;
    if (i > -1) {
        closeInfo();
        if (nate[i].marker.getVisible() == false) {
            nate[i].marker.setVisible(true);
        }
        google.maps.event.trigger(nate[i].marker, 'click');
    }
}

function triggerMid() {
    datime = new Date();
    console.log("triggerMid " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (MM) {
        google.maps.event.trigger(MM, 'click');
    }
}

// function save(meet) {
    // datime = new Date();
    // console.log("save " + datime.getSeconds() + ":" + datime.getMilliseconds());
//     if (!map || !map.getCenter()) return;
//     var u = "",
//         i = 0,
//         u2 = "",
//         l = "",
//         n = "",
//         a = "",
//         y = "",
//         m = "",
//         d = "",
//         m1 = "",
//         m2 = "",
//         pl = nate.length;
//     if (!meet) {
//         u2 = "cl=" + roundx(map.getCenter().lat(), 5) + "&cn=" + roundx(map.getCenter().lng(), 5) + "&z=" + map.getZoom() + "&x=" + f1.large.checked * 1 + "&c=" + cI + "&p=" + f1.disp.checked * 1 + "&r=" + rI + "&w=" + wI
//     }
//     if (pl > 0) {
//         var yr = false,
//             mn = false,
//             da = false;
//         for (j = 0; j < nate.length; j++) {
//             if (nate[j].y != 0) yr = true;
//             if (nate[j].m != 0) mn = true;
//             if (nate[j].d != 0) da = true;
//         }
//         if (MM) {
//             u += "ml=" + roundx(MM.getPosition().lat(), 5) + "&mn=" + roundx(MM.getPosition().lng(), 5) + "&";
//         }
//         var e = "Microsoft Internet Explorer";
//         var h = location.href + "?";
//         h = h.substring(0, h.indexOf("?"));
//         var limit = 2083 + 1927 * (navigator.appName != e) - h.length - u.length - u2.length - 3 * (yr + mn + da) * (meet == 0) - 10; //extra 10 is for &l=, &n=, &a=, extra ampersand
//         var a1 = getLength(i, yr, mn, da, meet, "");
//         while (i < pl && l.length + n.length + a.length + y.length + m.length + d.length + a1.tot.length < limit) {
//             l += a1.l;
//             n += a1.n;
//             a += a1.a;
//             if (!meet) {
//                 if (yr) y += a1.y;
//                 if (mn) m += a1.m;
//                 if (da) d += a1.d;
//             }
//             i++;
//             if (i < pl) a1 = getLength(i, yr, mn, da, meet, "|");
//         }
//         u += "l=" + l + "&n=" + n + "&a=" + a;
//     }

//     if (i < pl) {
//         var m3 = "save";
//         if (meet) m3 = "transfer";
//         m2 += " Your browser can " + m3 + " the midpoint for all places along with the first " + i + " place markers.";
//     }

//     if (!meet) {
//         if (yr) u += "&y=" + y;
//         if (mn) u += "&m=" + m;
//         if (da) u += "&d=" + d;
//         if (u.length > 2) u += "&";
//         m1 = "Click ok to refresh the page. You can then save the page/map in your Favorites/Bookmarks.";
//         a = confirm(m1 + m2);
//         if (a) window.location.search = "?" + u + u2;
//     } else {
//         m1 = "Click ok to transfer the midpoint marker and other data to a page with a searchable map where you can search for points of interest near the midpoint.";
//         a = confirm(m1 + m2);
//         if (a) window.location = "meet/index.html?" + u;
//     }
// }

function getLength(i, yr, mn, da, meet, v) {
    datime = new Date();
    console.log("getLength " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var a1 = new Object();
    a1.l = v + roundx(nate[i].marker.getPosition().lat(), 6);
    a1.n = v + roundx(nate[i].marker.getPosition().lng(), 6);
    a1.a = v + encodeURI(nate[i].text.replace(/ /gi, "+"));
    if (!meet && yr) a1.y = v + nate[i].y;
    else a1.y = "";
    if (!meet && mn) a1.m = v + nate[i].m;
    else a1.m = "";
    if (!meet && da) a1.d = v + nate[i].d;
    else a1.d = "";
    a1.tot = a1.l + a1.n + a1.a + a1.y + a1.m + a1.d;
    return a1;
}

function popMessage(msg) {
    datime = new Date();
    console.log("popMessage " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var s = '"resizeable=0,left=' + (screen.width / 2 - 180) + ',top=' + (screen.height / 2 - 120) + ',width=360,height=240"';
    messagewin = window.open("message.php", "messagewin", s);
    D("frm2").target = "messagewin";
    D("frm2").data2.value = msg;
    D("frm2").submit();
}

function revGeoCallback(results, status) {
    datime = new Date();
    console.log("revGeoCallback " + datime.getSeconds() + ":" + datime.getMilliseconds());
    if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            var near = '<p class="pz">Nearest address:<br>' + splitAddress(results[0].formatted_address) + '</p>';
            var h1 = MM.h1;
            var h2 = MM.h2;
            MM.setMap(null);
            MM = createMarker(MM.getPosition(), h1 + near + h2, 1, 0);
            MM.setMap(map);
            MM.h1 = h1;
            MM.h2 = h2;
        }
    }
}

function formatInfo(s, lat, lng, i) {
    datime = new Date();
    console.log("formatInfo " + datime.getSeconds() + ":" + datime.getMilliseconds());
    var h = '<div><p class="pz">' + s + '</p>';
    if (!isNaN(lat)) {
        h += '<div class="DWH">Latitude:<br>Longitude:</div><div class="DBL" onclick="selectText(this)">' + roundx(lat, 6) + '<br>' + roundx(lng, 6) + '</div><div class="DCL"></div>';
    }
    if (i > -1) {
        // if (f1.radw[0].checked && (nate[i].y || nate[i].m || nate[i].d)) {
        if (nate[i].y || nate[i].m || nate[i].d) {
            h += '<p class="pz">Weight:<br>Years: ' + nate[i].y + ' Months: ' + nate[i].m + ' Days: ' + nate[i].d + '</p>';
        // } else if (f1.radw[1].checked && nate[i].d) {
        } else if (nate[i].d) {
            h += '<p class="pz">Weight: ' + nate[i].d + '</p>';
        }
        var a2 = '<b>Drag me</b> to pinpoint a location<br><a class="bluelink" href="javascript:r5(' + i + ')">Remove me</a>';
        if (nate[i].marker.dragged == 1) {
            a2 += '&nbsp;&nbsp;&nbsp;&nbsp;<a class="bluelink" href="javascript:reset(' + i + ')">Reset location</a>';
        }
        h += '<p class="pz">' + a2 + '</p></div>';
    }
    return h;
}

google.maps.event.addDomListener(window, 'load', initialize);