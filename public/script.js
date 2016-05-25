// add an event listener to the shorten button for when the user clicks it
$('.btn-primary').on('click', function(){
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/history',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
        // display the shortened URL to the user that is returned by the server
      console.log(data);
    }
  });

});