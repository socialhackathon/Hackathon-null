$(document).ready(function() {
  $('#exampleInputPassword1, #exampleConfirmPassword').on('keyup', function () {
    if ($('#exampleInputPassword1').val() == $('#exampleConfirmPassword').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else
      $('#message').html('Not Matching').css('color', 'red');
  });
  $('#avatar-file').change(function() {
     if($('#avatar-file').val() != '') {
         var form = new FormData();
         form.append('attachment', $('#avatar-file').prop('files')[0]);
         $.ajax({
             url: $('#upload-avatar-form').attr('action'),
             data: form,
             type: 'POST',
             dataType: 'json',
             cache: false,
             contentType: false,
             processData: false
         }).done(function(result) {
             if(!result.success) {
                 $('#avatar-errors').append('<p class="text-danger">' + result.message + '</p>');
             } else {
                 $('#avatar').val(result.data);
                 $('#avatar-preview').attr('src', result.data);
             }
         });
       }
  });
  $('#choice-avatar-form').click(function() {
      $('#avatar-file').click();
      return false;
  });
  $("#send-event-join-request").on('click', function() {
    $.get('/events/' + $('#send-event-join-request').attr('event_id') + '/join', function(result) {
      $("#send-event-join-request").replaceWith($("<div class='btn btn-primary'>Вы являетесь участником </div>"));
    })
  });
});
