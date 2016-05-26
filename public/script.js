$('.btn-primary').on('click', function(){
  $.ajax({
    url: '/api/results',
    type: 'POST',
    dataType: 'JSON',
    data: {searchTerm: $('#url-field').val()},
    success: function(data){
      console.log(data);
    }
  });
});