$(document).on('turbolinks:load', function() { 
  function buildHTML(article, now){


    var html = `<div class="article">
                  <div class="card">`
    if(article.image.url !== null){
      html = html + `<div class="card-image-orgin">
                      <img class="article-image" src="${article.image.url}">
                      </div>`
      }                

    html = html + `<div class="card-content">
                    </div>
                    <div class="card-action">`
    if(article.title === ""){
      html = html + `<a data-method="get" href="/articles/${article.id}">無題</a>`
    }else{
      html = html + `<a data-method="get" href="/articles/${article.id}">${article.title}</a>`
    }
    html = html + `<div class="card-info">
                    <p class="card-time">
                    ${now}
                    </p>
                    <p class="card-creater">
                    CreatedBy : ${article.nickname}
                    </p>
                    </div>
                    </div>
                    </div>
                    </div>`
    return html;
  }        

  function orderDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, ("0"+(date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/,  ("0"+date.getDate()).slice(-2));
    format = format.replace(/HH/, ("0"+date.getHours()).slice(-2));
    format = format.replace(/TT/, ("0"+date.getMinutes()).slice(-2));
    return format;
  }

  $('.js-modal-open').on('click',function(){
      $('.js-modal').fadeIn();
      return false;
  });
  $('.js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      return false;
  });

  $('#new_article').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(article){
      var now = new Date(article.created_at);
      now = orderDate(now, 'YYYY/MM/DD HH:TT');
      var card = $('.articles');
      var html = buildHTML(article, now);
      card.prepend(html);
      $('.articles .card-content:first').html(article.content.replace(/\r?\n/g, '<br>'));
      //T.B.D
      a=$(".article");
      console.log(a[0].scrollHeight)
      $(".contents").animate({scrollTop:0}, 300, 'swing');
      $('.title-area').val('')
      $('.materialize-textarea').val('')
      $('.form__box__input__img').val('')
      $(".form__box__submit").removeAttr("disabled");
      $('.js-modal').fadeOut();
    })
    .fail(function(){
      alert('error');
      $(".form__box__submit").removeAttr("disabled");
    })
  })
});