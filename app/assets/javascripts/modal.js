$(document).on('turbolinks:load', function() { 
  function buildHTML(article, now){
    var html = `<div class="article">
                  <div class="card">
                    <div class="card-content">
                      <p>${article.content}</p>
                    </div>
                    <div class="card-action">`
    if(article.title === ""){
      html = html + `<a href="#">無題</a>`
    }else{
      html = html + `<a href="#">${article.title}</a>`
    }
    html = html + `<a data-method="get" href="/articles/12/edit"><i class="fa fa-edit"></i>
            </a><a rel="nofollow" data-method="delete" href="/articles/12"><i class="fa fa-trash"></i>
            </a><div class="card-info">
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
      // $('.articles').animate({scrollTop:0}, 300, 'swing');
      // var targetTop = $('.articles .article:first').offset().top;
      card.animate({scrollTop:card[0].scrollHeight}, 300, 'swing');
      // console.log(targetTop)
      // $('html,body').animate({
      //     scrollTop: 500
      // }, 500);
      $('.title-area').val('')
      $('.materialize-textarea').val('')
      $(".form__box__submit").removeAttr("disabled");
      $('.js-modal').fadeOut();
    })
    .fail(function(){
      alert('error');
      $(".form__box__submit").removeAttr("disabled");
    })
  })
});