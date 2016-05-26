$('.btn-primary').on('click', function(e){
  e.preventDefault();
  window.location = "/api/results?search=" + $('#url-field').val();
});