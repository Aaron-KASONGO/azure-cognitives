$(document).ready(function() {
    $('#id_img').change(function(){
        const file = this.files[0];
        console.log(file);
        if (file){
          let reader = new FileReader();

          reader.onload = function(event){
            $('#id-image').attr('src', event.target.result);
            $('#ig-image').attr('src', event.target.result);
            $('#id-div').removeClass('d-none');
            $('#btn-submit').removeClass('disabled');

            if (!($('#col-text').hasClass('d-none'))) {
              $('#col-text').addClass('d-none');
              $('#accordion-body').empty();
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

        let spinner = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'
        let button = $('#btn-submit');

        button.addClass('disabled');
        button.html(spinner);

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
              button.text('valider');
              $('#col-text').removeClass('d-none');
              $('#accordion-body').append(`<span>${response.description}</span>`);
              
              // $.ajax({
              //   type: 'post',
              //   url: '/photos/',
              //   data: response.description,
              //   success: function(photos) {
              //     $()
              //   }
              // })
            }
        })
    })
})
