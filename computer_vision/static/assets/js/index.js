$(document).ready(function() {
    $('#id_img').change(function(){
        const f = this.files[0];
        console.log(this.files[0]);
        
        imageConversion.compressAccurately(f,200).then(res=>{
          //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
          console.log(res);
          const file = new File([res], "image.jpeg", {
            type: res.type,
          });
          console.log(file);
          this.files[0] = file;
          console.log(this.files[0]);
          if (file){
            let reader = new FileReader();
  
            reader.onload = function(event){
              // img_quality = 80;
              // output_format = 'jpg';
              // let img = jic.compress(event.target.result, img_quality, output_format);
              // console.log(img);
              $('#id-image').attr('src', event.target.result);
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
                data: {'description': response.description_en},
                success: function(photos) {
                  let phot = photos.photos;
                  $('#id-photos').removeClass('d-none');
                  for (let i = 0; i < phot.length; i++) {
                    $('#id-photo').append(
                      `<div class="col-12 col-sm-6 col-md-4 col-lg-3 d-inline mx-auto">
                          <div class="card d-inline">
                              <img src="${phot[i].src.landscape}" alt="${phot[i].alt}" class="card-img img-card-size d-inline">
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
