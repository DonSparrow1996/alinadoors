$(function(){
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 150) {
            $('.homepage_header').slideDown(200);         //Проявление меню по скролу
        } else {
            $('.homepage_header').hide();
        }
    });
});

$(document).ready(function() {
        const $images = $('.main_door img');
        let index = 0;

        $images.hide().eq(index).addClass('active').show();				//Автоматическая смена картинки

        setInterval(function() {
            $images.eq(index).removeClass('active').hide();
            index = (index + 1) % $images.length;
            $images.eq(index).addClass('active').show();
        }, 3000);
});

function smoothScroll(selector) {
  $(document).ready(function () {
    $(selector).on("click", function (event) {
      //event.preventDefault();

      var targetClass = $(this).data("target");          //Авто скроллинг по клику
      var target = $(targetClass);

      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          600
        );
      }
    });
  });
}
smoothScroll("nav a");
smoothScroll(".main_scroll_double_arrow");
smoothScroll(".choise_model");


// Сохранение data-target перед переходом
$(document).on('click', 'a[data-target]', function (e) {
    var target = $(this).data('target');
    if (target) {
        sessionStorage.setItem('autoClickTarget', target);
    }
});
// Клик на нужную ссылку после загрузки												Авто скроллинг по клику с других страничек
$(document).ready(function () {
    var targetToClick = sessionStorage.getItem('autoClickTarget');
    if (targetToClick) {
        var $linkToClick = $('a[data-target="' + targetToClick + '"]').first();
        if ($linkToClick.length) {
            $linkToClick[0].click();
        }
        sessionStorage.removeItem('autoClickTarget');
    }
});


function closeMenuOnClick() {
  $(document).ready(function () {
    $(".menu a").on("click", function () {        //Закрытие бургера при клике на навигационную ссылку (при экране 767px)
      if ($(window).width() <= 819) {
        $(".close_burger").trigger("click");
      }
    });
  });
}
closeMenuOnClick();

$(function() {
	var i=0;
	$('.doors_photos li, .doors_flat .doors_photos .flat_door_photo').click(function(){
        i++;
        if (i==1) {
        	$(this).addClass('open_foto');          											//Открытие фото на полный экран
        } else {
        	$(this).removeClass('open_foto'); 
        	i=0;
        }
    });
});

$(document).ready(function() {
  	$('.control_arrow_next').click(function() {
    	const $listItems = $('.photo_all li');
    	const $active = $listItems.filter('.active');
    	let nextIndex = $active.index() + 1;

    	if (nextIndex >= $listItems.length) {
      	nextIndex = 0;
    	}

    	$active.removeClass('active');
    	$listItems.eq(nextIndex).addClass('active');
    	$('.photo_index').text('0' + [nextIndex + 1]);					//Слайдер в товарах
    });
    $('.control_arrow_previous').click(function() {
    	const $listItems = $('.photo_all li');
    	const $active = $listItems.filter('.active');
    	let nextIndex = $active.index() - 1;

    	if (nextIndex <=  -1) {
      	nextIndex = $listItems.length - 1;
    	}

    	$active.removeClass('active');
    	$listItems.eq(nextIndex).addClass('active');
    	$('.photo_index').text('0' + [nextIndex + 1]);
    });
});

$(function() {

	$('.reviews_slider, .gallery_slider').slick({			//Слайдер галереи и отзывов
      infinite: true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
	  centerMode: true,
  	  variableWidth: true,
      responsive: [
	    {
	      breakpoint: 1359,
	      settings: {
	        slidesToShow: 3,
	      }
	    },
	    {
	      breakpoint: 820,
	      settings: {
	        slidesToShow: 1,
	      }
	    }
    ]
    });

});

$(function(){
    $('#one-head').click(function(){
        $('#one').slideToggle().toggleClass('active');
        $('#two, #three, #four').removeClass('active').slideUp();
    });
    $('#two-head').click(function(){
        $('#two').slideToggle().toggleClass('active');
        $('#one, #three, #four').removeClass('active').slideUp();
    });
    $('#three-head').click(function(){
        $('#three').slideToggle().toggleClass('active');
        $('#one, #two, #four').removeClass('active').slideUp();                     //Аккордеон на faq
    });
    $('#four-head').click(function(){
        $('#four').slideToggle().toggleClass('active');
        $('#one, #two, #three').removeClass('active').slideUp();
    });
});

$(function(){
  $('.burger').click(function(){
    $('nav').slideDown(300);            					//Бургер
  });
  $('.close_burger').click(function(){
      $('nav').hide();
  });
});


//----------------------------------------------Скрипты для формы-------------------------------------------------------------------------

$(function() {
    function validateInput($input) {
        var val = $input.val().replace(/[^0-9]/g, '');
        val = val ? parseInt(val) : '';

        if (val !== '' && val < 1) val = 1;
        if (val > 20) val = 20;

        $input.val(val);
    }

    $('.doors_count_input').on('input', function() {
        validateInput($(this));
    });

    $('.doors_count_input').on('keypress', function(e) {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });

    $('.doors_count_input').on('paste', function(e) {
        e.preventDefault();
        var paste = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
        paste = paste.replace(/[^0-9]/g, '');
        paste = paste ? parseInt(paste) : '';

        if (paste !== '' && paste < 1) paste = 1;
        if (paste > 20) paste = 20;

        document.execCommand('insertText', false, paste.toString());
    });

    $('.count_more').on('click', function() {
        var $input = $('.doors_count_input');
        var val = parseInt($input.val()) || 0;
        if (val < 20) {
            $input.val(val + 1);
        } else {
            $input.val(20);
        }
        $('.doors_count_input').trigger('input');
    });

    $('.count_less').on('click', function() {
        var $input = $('.doors_count_input');
        var val = parseInt($input.val()) || 0;
        if (val > 1) {
            $input.val(val - 1);
        } else {
            $input.val(1);
        }
        $('.doors_count_input').trigger('input');
    });
});


$(document).ready(function() {
    let updateTotalPrice = function() {
        if (!$('.main_form').hasClass('white_door')) return;

        let count = parseInt($('.doors_count_input').val()) || 0;
        let priceText = $('.money_price').text().replace(/[^\d.]/g, '');
        let price = parseFloat(priceText) || 0;
        let total = price * count;
        $('.form_total_price').text(`£${total.toFixed(2)}`);
    };

    // Клик по белой двери
    $('.doors_white .order_now').on('click', function(e) {
        e.preventDefault();
        $('.form_around').addClass('active');
        $('.main_form').addClass('white_door').removeClass('flat_door');
        $('.form_count_title').text('White door');
        updateTotalPrice(); // сразу обновим сумму при открытии
    });

    // Клик по плоской входной двери
    $('.doors_flat .order_now').on('click', function(e) {
        e.preventDefault();
        $('.form_around').addClass('active');
        $('.main_form').addClass('flat_door').removeClass('white_door');
        $('.form_count_title').text('Flat entrance steel door');
        $('.form_total_price').text('Price on request');
    });

    // Автообновление суммы при изменении количества, только если white_door активна
    $('.doors_count_input').on('input change', function() {
        updateTotalPrice();
    });

    // Кнопка закрытия формы
    $('.form_close, .form_bin').on('click', function(e) {
        e.preventDefault();
        $('.form_around').removeClass('active');
        $('.form_top').removeClass('hide');
        $('.main_form').removeClass('white_door flat_door');
        $('.form_count_title').text('');
        $('.form_total_price').text('');
        $('.doors_count_input').val('');
        $('.user_data_input').val('');
    });
});

$(document).ready(function () {

	$('.form_order_button').on('click', function (e) {
		e.preventDefault();

		const $form = $(this).closest('.main_form');
		const $checkbox = $form.find('.form_consent_checkbox');
		const $firstName = $form.find('input[name="first_name"]');
		const $lastName = $form.find('input[name="last_name"]');
		const $phone = $form.find('input[name="phone_number"]');

		// Очистка прошлых ошибок
		$checkbox.removeClass('checkbox_error');
		$firstName.removeClass('input_error');
		$lastName.removeClass('input_error');
		$phone.removeClass('input_error');

		let hasError = false;

		// Проверка обязательных полей
		if (!$firstName.val().trim()) {
			$firstName.addClass('input_error');
			hasError = true;
		}
		if (!$lastName.val().trim()) {
			$lastName.addClass('input_error');
			hasError = true;
		}
		if (!$phone.val().trim()) {
			$phone.addClass('input_error');
			hasError = true;
		}

		// Проверка согласия
		if (!$checkbox.is(':checked')) {
			$checkbox.addClass('checkbox_error');
			hasError = true;
		}

		if (hasError) return;
	});
});
