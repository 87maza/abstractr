$('.btn-primary').on('click', function(e){
  console.log(e)
  e.preventDefault();
  window.location = "/api/results?search=" + $('#url-field').val() + "&offset=" + 10;
});