

$(function () {


  /* ========================================================================= */
  /*	Udpate Heading Size on Window Resize
  /* ========================================================================= */
  function UpdateHeadingSize () {
    $('#heading').height(window.innerHeight - 40)
  }

  window.onresize = function(event) {
    UpdateHeadingSize();
  };
  window.onload = function (event) {
    UpdateHeadingSize();
  };


  /* ========================================================================= */
  /*	Image Gallery
  /* ========================================================================= */
  popup = {
    init: function(){
      $('figure').click(function(){
        popup.open($(this));
      });

      $(document).on('click', '.popup img', function(){
        return false;
      }).on('click', '.popup', function(){
        popup.close();
      })
    },
    open: function($figure) {
      $('.gallery').addClass('pop');
      $popup = $('<div class="popup" />').appendTo($('body'));

      $fig = $figure.clone().appendTo($('.popup'));
      $fig_img = $fig.data('image');
      $('img', $fig).width(window.innerWidth / 1.4).attr('src', $fig_img);
      $fig.css({
        top: (window.innerHeight / 2) - ($('img', $fig).height() / 2) ,
        left: (window.innerWidth / 2) - ($('img', $fig).width() / 2)
      });

      $bg = $('<div class="bg" />').appendTo($('.popup'));
      $close = $('<div class="close"><svg><use xlink:href="#close"></use></svg></div>').appendTo($fig);
      $shadow = $('<div class="shadow" />').appendTo($fig);
      src = $('img', $fig).attr('src');
      $shadow.css({backgroundImage: 'url(' + src + ')'});
      $bg.css({backgroundImage: 'url(' + src + ')'});
      setTimeout(function(){
        $('.popup').addClass('pop');
      }, 10);
    },
    close: function(){
      $('.gallery, .popup').removeClass('pop');
      setTimeout(function(){
        $('.popup').remove()
      }, 100);
    }
  }

  popup.init()

  /* ========================================================================= */
  /*	Menu item highlighting
  /* ========================================================================= */

  $('nav').singlePageNav({
    offset: $('nav').outerHeight() + 10,
    filter: ':not(.external)',
    speed: 1000,
    currentClass: 'active',
    easing: 'easeInOutExpo',
    updateHash: true
  });

  /* ========================================================================= */
  /*	Bitcoin address in modal
  /* ========================================================================= */
  
  $('#bitcoin-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var address = button.data('address');
    var modal = $(this);
    modal.find('#crypto_address').text(address);
    $('#crypto_qr_code').empty().qrcode({
      text: "Bitcoin:" + address
    });
  });

});