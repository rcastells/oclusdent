function myMap() {

var myLatlng = { lat: 41.376692, lng: 2.115948 };

var mapOptions = {
    center: myLatlng,
    zoom: 16
}

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Oclusdent',
    text: 'Oclusdent'
});

}