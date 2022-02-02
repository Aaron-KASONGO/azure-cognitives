$(document).ready(function() {
    $('#id_img').change(function(){
        const file = this.files[0];
        console.log(file);
        if (file){
          let reader = new FileReader();
          reader.onload = function(event){
            console.log(event.target.result);
            $('#id-image').attr('src', event.target.result);
            $('#ig-image').attr('src', event.target.result);
            $('#id-div').removeClass('d-none');

            if (!($('#col-text').hasClass('d-none'))) {
              $('#col-text').addClass('d-none');
              $('#accordion-body').remove('span');
            }
          }
          reader.readAsDataURL(file);
        }
    })

    $('#id-button').click(function() {
      $('#id_img').click();
    })

    $('#accordion-button').click(function(event) {
      event.preventDefault();
    })

    $('#accordion-button1').click(function(event) {
      event.preventDefault();
    })

    $('#id-form').submit(function(e) {
        e.preventDefault(); // prevent form submit

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        let form = $(this);
        let formData = new FormData(form.get(0));

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        });

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              console.log(response.description);
              $('#col-text').removeClass('d-none');
              $('#accordion-body').append(`<span>${response.description}</span>`);
            }
        })
    })
})
