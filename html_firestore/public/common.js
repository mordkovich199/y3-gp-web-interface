function init_firestore() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBF7sllbZOvmENwJMPlGKhTVwQCOK52ZXs",
        authDomain: "staycool-1c2ec.firebaseapp.com",
        projectId: "staycool-1c2ec",
        storageBucket: "staycool-1c2ec.appspot.com",
        messagingSenderId: "82521942434",
        appId: "1:82521942434:web:8853843eabeeb2706caafb"
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    return firebase.firestore();
}

function add_to_data(db, docs) {
    docs.forEach((doc) => {
        var data = doc.data();
        db[doc.id] = {};
        for(var d in data) {
            db[doc.id][d] = data[d];
        }
    });
}
function add_sensor_rows(sensors, table_data) {
    var keys = Object.keys(sensors).sort(); // sort keys
    for(var sensor_id in keys) {
        sensor_obj = sensors[keys[sensor_id]];
        // Calculate color for score
        var score_data = sensor_obj[1];
        var color = "white"; // default background color
        if (score_data > 4.5) {
            color = "green";
        }
        else if (score_data > 2.5) {
            color = "yellow";
        }
        else if (score_data > 1) {
            color = "orange";
        }
        else {
            color = "red";
        }
        // Add row to table
        var row = table_data.insertRow();
        var id = row.insertCell(); id.innerHTML = keys[sensor_id];
        var temp = row.insertCell(); temp.innerHTML = sensor_obj[0];
        var score = row.insertCell(); score.innerHTML = `<div style="background-color:${color};">${score_data}</div>`;
    }
}

function add_route_rows(data, table_data) {
    for(var key in data) {
        var __data = data[key];
        var truck_id = key.split("_")[1];
        var info_key = "info_" + truck_id;
        if(!__data.hasOwnProperty(info_key)) {
            console.log(`Invalid key '${truck_id}'`);
        }
        else {
            var info = __data[info_key];

            // Add row to table
            var row = table_data.insertRow();
            var id = row.insertCell(); id.innerHTML = `<a href="route_detail.html?route=${truck_id}" class="rowlink">${truck_id}</a>`;
            var origin = row.insertCell(); origin.innerHTML = info.Departing;
            var dest = row.insertCell(); dest.innerHTML = info.Arriving;
            var progress = row.insertCell(); progress.innerHTML = `<progress id="route_progress_${truck_id}" max="100" title="${info.Progress*100}%" value="${info.Progress*100}">${info.Progress*100}%</progress>`;
            var temp = row.insertCell(); temp.innerHTML = info["Average Temperature"];
        }
    }
}

function read_GET_data() {
    var url_string = window.location;
    var url = new URL(url_string);
    return url.searchParams;
}