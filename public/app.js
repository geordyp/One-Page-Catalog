jQuery.ajax('/albums/', {
  method: 'GET',
  success: function(data) {
    data.forEach(function(album) {
      var item = document.createElement("li");
      item.innerHTML = album.name;
      item.onclick = function () { displayAlbumInfo(album.id); };
      $("#item-list").append(item);
    });
  },
  error: function(xhr, status) {
    // If the status was not OK (200), we had an error
    console.log('Error: ' + status);
  }
});

displayAlbumInfo = function(id) {
  console.log("made it!" + id);
};

// console.log("OUTSIDE");
