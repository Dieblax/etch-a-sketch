$(document).ready(function() {

	makeGrid(64);

	var opacity = 1;

	var mode = 'black';

	blackMode(opacity);

	$('#clear').on('click', function() {
		clear();
	});

	$('#menu-btn').on('click', function() {
		$('#menu').toggleClass('show');
		$(this).toggleClass('open');
		$('#icon').toggleClass('open');
	});

	$('#icon').on('click', function() {
		$('.grid').toggleClass('hidegrid');
		$('tr').toggleClass('hidegrid');
		$('td').toggleClass('hidegrid');
	})

	$('#menu button').on('mousedown', function() {
		$(this).css({'margin-top': '+=2px', 'margin-left': '+=2px', 'margin-bottom': '-=2px', 'box-shadow': 'none'});
	});

	$('#menu button').on('mouseup', function() {
		$(this).css({'margin-top': '-=2px', 'margin-left': '-=2px', 'margin-bottom': '+=2px', 'box-shadow': '2.5px 4.33px 5px 0px rgba( 0, 0, 0, 0.3)'});
	});

	$('#colors button').on('mouseup', function() {
		$('#colors button').removeClass('active');
		$('#colors button').prop('disabled', false);
		$(this).prop('disabled', true);
		$(this).addClass('active');
		mode = $(this).text().replace(/\s+/g,"").replace(/(\r\n|\n|\r)/gm,"").toLowerCase();
		keepGoing(mode, opacity);
		if ($(this).prop('id') != 'btn2') {
			$('#btn2 span').removeClass('hov');
			$('#btn2').css({'background-color': '#fefdff'});
		} 
	})

	$('#clear').on('mousedown', function() {
		$(this).css({'margin-top': '+=2px', 'margin-left': '+=2px', 'margin-bottom': '-=2px', 'box-shadow': 'none'});
	});

	$('#clear').on('mouseup', function() {
		$(this).css({'margin-top': '-=2px', 'margin-left': '-=2px', 'margin-bottom': '+=2px', 'box-shadow': '2.5px 4.33px 5px 0px rgba( 0, 0, 0, 0.3)'});
	});

	$('#color-btn').click(function(event) {
		event.preventDefault();
		$('#pressure-slider').hide();
		$('#grid-sizes').hide();
		$('#colors').toggle();
		$('#grid-btn').removeClass('go-down');
	});

	$('#btn2').on('mouseenter', function() {
		var color = getRandomColor();
		$(this).css({'background-color': color});
		$('#btn2 span').addClass('hov');
	});

	$('#btn2').on('mouseleave', function() {
		$(this).css({'background-color': '#FEFDFF'}); 
		$('#btn2 span').removeClass('hov');
	});

	$('#grid-btn').click(function(event) {
		event.preventDefault();
		$('#pressure-slider').hide();
		$('#grid-sizes').toggle();
		$('#colors').hide();
		$('#grid-btn').removeClass('go-down');
	});

	$('#btn4').click(function() {
		makeGrid(32);
		keepGoing(mode, opacity);
	});

	$('#btn5').click(function() {
		makeGrid(64);
		keepGoing(mode, opacity);
	});

	$('#btn6').click(function() {
		makeGrid(96);
		keepGoing(mode, opacity);
	});

	//slider that changes pen.pressure (jQuery ui slider)
    $( "#pressure-slider" ).slider({
      value:100,
      min: 0,
      max: 100,
      step: 10,
      slide: function( event, ui ) {
        	$( "#amount" ).val( ui.value );
        	$(this).find('.ui-slider-handle').text(ui.value/100);
        	opacity = $('.ui-slider-handle').text();
        	keepGoing(mode, opacity);
      },
      create: function(event, ui) {
            var v=$(this).slider('value')/100;
            $(this).find('.ui-slider-handle').text(v);
            opacity = $('.ui-slider-handle').text();
            keepGoing(mode, opacity);
      }
    });

    $('#pressure-slider').removeClass('ui-slider-horizontal ui-widget ui-widget-content ui-corner-all');

    $('#pressure-btn').click(function(event) {
		event.preventDefault();
		$('#pressure-slider').toggle();
		$('#grid-sizes').hide();
		$('#colors').hide();
		$('#grid-btn').toggleClass('go-down');
	});

});

function makeGrid(size) {
	$('.grid').empty();
	for (var i = 0; i < size; i++) {

		$('.grid').append('<tr id='+i+'></tr>');

		for (var j = 0; j < size; j++) {

			$('#'+i).append('<td class = "cell"></td>');
		}
	}
}

function blackMode(opacity) {
	$('td').hover(function() {
		if ($(this).css('opacity') < 1) {
			$(this).css({'background-color' : 'black' , 'opacity': '+=' + opacity});
		}
		else {
			$(this).css({'background-color' : 'black' , 'opacity': opacity});
		}
	});	
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return '#' + r + g + b;
}

function randomMode(opacity) {
	$('td').hover(function() {
		$(this).css({'background-color' : getRandomColor() , 'opacity': opacity});
	});
}

function getRandomAlpha() {
	var a = (Math.floor(Math.random() * 10))/10;
	return 'rgba(0,0,0,' + a + ')';
}

function greyscaleMode(opacity) {
	$('td').hover(function() {
		$(this).css({'background-color' : getRandomAlpha() , 'opacity': opacity});
	});
}

function clear() {
	$('td').css({'background-color': 'transparent'});
}

function keepGoing(mode, opacity) {
	switch(mode) {
		case 'black':
			blackMode(opacity);
			break;
		case 'random':
			randomMode(opacity);
			break;
		case 'greyscale':
			greyscaleMode(opacity);
			break;
		default:
			blackMode();
			break;
	}
}

