;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		$('.sb-menu-trigger, .mn-item-has-submenu > .mn-link').off('click');

		// Toggle Navigation
		$('.sb-menu-trigger').on('click', function(event) {
			event.preventDefault();

			$(this).add('.main-navigation').toggleClass('active');
			$('body').toggleClass('no-scroll');		
		});

		// Toggle Subnav
		$('.mn-item-has-submenu > .mn-link').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.mn-menu-item').toggleClass('active')
				.siblings().removeClass('active');

			$(this).siblings('.mn-menu-submenu').slideToggle()
				.closest('.mn-menu-item').siblings().find('.mn-menu-submenu').slideUp();
		});

		$win.on('load', function() {
			$('.front .list-articles').eq(0).addClass('slider-main');

			// Init Main Slider
			if( $('.front .la-slider').length ) {
				var $sliderMain =  $('.front .la-slider').clone();

				$('.front .la-slider').detach();
				
				$sliderMain.prependTo('.front .slider-main');
				
				$sliderMain.find('.la-item-content').each(function() {
					var $sliderPrev = $('<div class="slider-prev"><i class="ico-arrow-left"></i></div>');
					var $sliderNext = $('<div class="slider-next"><i class="ico-arrow-right"></i></div>');

					$(this).append($sliderPrev);
					$(this).append($sliderNext);
				});

				$sliderMain.add( $sliderMain.find('*') ).removeAttr('style');

				$sliderMain.find('.slider-content').carouFredSel({
					width: '100%',
					height: 'variable',
					responsive: true,
					swipe: {
						onTouch: true
					},
					items: {
						height: 'variable'
					},
					auto: {
						play: true,
						timeoutDuration: 3000
					},
					onCreate: function() {
						$('.slider-main .la-item-img').wrap('<div class="la-item-image"></div>');

						setTimeout(function() {
							$('.slider-main').addClass('loaded');
							$('.slider-main .la-slider').addClass('loaded');
						}, 2000);
					}
				});
			}

			if( $('.slider-blog').length ) {
				$('.slider-blog').carouFredSel({
					width: '85%',
					height: 'variable',
					responsive: true,
					swipe: {
						onTouch: true
					},
					auto: {
						play: false,
					},
					onCreate: function() {
						$('.slider-blog .la-item').eq(0).addClass('active');
					},
					scroll: {
						onBefore: function() {
							$('.slider-blog .la-item').removeClass('active');
						},
						onAfter: function() {
							$('.slider-blog .la-item').eq(0).addClass('active');							
						}
					}
				});
			}

			if( $('.slider-sectors').length ) {
				$('.slider-sectors .slides').carouFredSel({
					width: '100%',
					height: 'variable',
					responsive: true,
					swipe: {
						onTouch: true
					},
					auto: {
						play: false,
					},
					prev: '.slider-sectors .slider-prev',
					next: '.slider-sectors .slider-next'
				});
			}
		});
		
		// Wrap elements
		if( $('.list-articles.alaune .la-list .la-item .la-item-img').length ) {
			$('.list-articles.alaune .la-list .la-item .la-item-img').each(function() {
				$(this).wrap('<div class="la-item-image"></div>');
			});
		}

		if( $('.list-articles.blog .la-item').length ) {
			$('.list-articles.blog .la-item').wrapAll('<div class="slider-blog"></div>');
		}

		if( $('body.article_list .list-articles .la-list .la-item-img').length ) {
			$('body.article_list .list-articles .la-list .la-item-img').each(function() {
				$(this).wrap('<div class="la-item-image"></div>');
			});
		}

		if( $('body.article_list .gla-item-img').length ) {
			$('body.article_list .gla-item-img').each(function() {
				$(this).wrap('<div class="gla-item-image"></div>');
			});
		}

		if( $('.article-wrapper .article-content h3, .article-wrapper .article-content h4').length ) {
			$('.article-wrapper .article-content h3, .article-wrapper .article-content h4').wrapInner('<span></span');
		}
	});

})(jQuery, window, document);
