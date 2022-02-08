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
            $('#id-photos').addClass('d-none');
            $('#id-photo').empty();

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
        $('#id-button').addClass('disabled');
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
              button.text('valider');
              $('#col-text').removeClass('d-none');
              $('#id-button').removeClass('disabled');
              $('#accordion-body').append(`<span>${response.description}</span>`);
              
              $.ajax({
                type: 'post',
                url: '/photos/',
                data: {'description': response.description},
                success: function(photos) {
                  let phot = photos.photos;
                  $('#id-photos').removeClass('d-none');
                  for (let i = 0; i < phot.length; i++) {
                    $('#id-photo').append(
                      `<div class="col-12 col-md-6 col-lg-3">
                          <div class="card">
                              <img src="${phot[i].src.landscape}" alt="${phot[i].alt}" class="card-img img-card-size">
                          </div>
                      </div>`
                    )
                  }
                }
              })
            }
        })
    })
})
