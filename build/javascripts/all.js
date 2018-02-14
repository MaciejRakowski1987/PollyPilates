$().ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
  navigation: true,
    onLeave: function(index, nextIndex, direction) {
    }
  });
});


function highlightButtonOnDropdownActive() {
  var activeClass = 'header__nav-item--active';
  var dropdownButtonSelector = '.header__nav-item--dropdownButton'

  $(dropdownButtonSelector).on('mouseenter', function(){
    $(this).addClass(activeClass);
  });

  $('.header__nav-item:not(' + dropdownButtonSelector + ')').on('mouseenter', function(){
    $(dropdownButtonSelector).removeClass(activeClass);
  });

  $('.dropdown').on('mouseleave', function() {
    $(dropdownButtonSelector).removeClass(activeClass);
  });
}

$(document).ready(function(){
    $(".mobileNav").click(function(){
        $(".mobileNav__nav").slideToggle();
    });
});

function highlightNavigationLinks() {

  $('.header__nav-item a').on('click', function() {
    var navigationLinks = $('.header__nav-item');
    navigationLinks.each(function(index, item) {
      $(item).removeClass('header__nav-item--active');
    })

    $(this).parent().addClass('header__nav-item--active');
  })

  $(document).on('scroll', function() {
    var navigationLinks = $('.header__nav-item a');
    var navigationElementHeight = $('.header__nav').height();
    var fromTop = $(this).scrollTop()
    var currentSection;

    $('.section').each(function(){
      var sectionOffset = $(this).offset().top;

      if (sectionOffset - 1 < fromTop + navigationElementHeight) {
        currentSection = $(this)
      }

      function isLastSection() {
        return ($(window).scrollTop() >= $(document).height() - $(window).height())
      }

      var id = isLastSection() ? 'contact' : currentSection.attr('id');

      navigationLinks.each(function(index, item) {
        $(item).parent().removeClass('header__nav-item--active');
      })

      navigationLinks.each(function(index, item) {
        if ($(this).data('scroll-to') === id) {
          $(item).parent().addClass('header__nav-item--active');
        }
      })
    })
  })
}

function animateScrollToSection() {
  var callback = function() {
    console.log('koniec animacji')
  }

  $('.header__nav-item a').on('click', function() {
    var navigationBarHeight = $('.header__nav').height();
    var scrollOffset = $('#' + this.dataset.scrollTo).offset().top - navigationBarHeight;

    $('body, html').animate({'scrollTop': scrollOffset}, 500, 'swing', callback);
  })
}


$(document).ready(function(){
  highlightButtonOnDropdownActive();
  animateScrollToSection();
  highlightNavigationLinks();
});
