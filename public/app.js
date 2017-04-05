jQuery.ajax('/albums/', {
  method: 'GET',
  success: function(data) {
    data.forEach(function(album) {
      var item = document.createElement("li");
      item.innerHTML = album.name;
      item.onclick = function () { GetAlbumInfo(album.id); };
      $("#album-list").append(item);
    });
  },
  error: function(xhr, status) {
    // If the status was not OK (200), we had an error
    console.log('Error: ' + status);
  }
});

$("#upload").submit(function() {
  return false;
});

GetAlbumInfo = function(id) {
  jQuery.ajax('/albums/' + id, {
    method: 'GET',
    success: function(data) {
      $("#album-info").empty();

      var title = document.createElement("h2");
      title.innerHTML = data.name;
      var description = document.createElement("p");
      description.innerHTML = data.description;
      $("#album-info").append(title);
      $("#album-info").append(description);
    },
    error: function(xhr, status) {
      // If the status was not OK (200), we had an error
      console.log('Error: ' + status);
    }
  });
};

AddAlbum = function() {
  album = {
    name: $('#inputName').value(),
    description: $('#inputDescription').value(),
    image: $('#inputImage').value()
  };

  jQuery.ajax('/albums/', {
    method: 'POST',
    data: JSON.stringify(album),
    error: function(xhr, status) {
      // If the status was not OK (200), we had an error
      console.log('Error: ' + status);
    }
  });
}
