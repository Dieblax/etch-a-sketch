$(document).ready(function() {

	//Make grid
	makeGrid(64);

	//create pen object with pressure and color
	var pen = {'pressure' : '1', 'color' : 'black'};

	function draw(pen, $td) {
	$td.css({'opacity' : '+=' + pen.pressure, 'background-color' : pen.color});
	}

	$('#clear').on('click', function() {
		$('td').css({'background-color': 'transparent'});
	});

	$('#menu-btn').on('click', function() {
		$('#menu').toggleClass('show');
		$(this).toggleClass('open');
	});

	$('#menu button').on('mousedown', function() {
		$(this).css({'margin-top': '+=2px', 'margin-left': '+=2px', 'margin-bottom': '-=2px', 'box-shadow': 'none'});
	});

	$('#menu button').on('mouseup', function() {
		$(this).css({'margin-top': '-=2px', 'margin-left': '-=2px', 'margin-bottom': '+=2px', 'box-shadow': '2.5px 4.33px 5px 0px rgba( 0, 0, 0, 0.3)'});
	});

	$('#color-btn').click(function(event) {
		event.preventDefault();
		$('#pressure-slider').hide();
		$('#grid-sizes').hide();
		$('#colors').toggle();
		$('#grid-btn').removeClass('go-down');
	});

	$('#btn1').on('mousedown', function() {
		
		pen.color = 'black';
	});

	$('#btn2').on('mouseenter', function() {
		var color = getRandomColor();
		$(this).css({'background-color': color});
		$('#btn2 span').addClass('hov');
	});

	$('#btn2').on('mouseleave', function() {
		var color = getRandomColor();
		$(this).css({'background-color': '#FEFDFF'}); 
		$('#btn2 span').removeClass('hov');
	});

	$('#btn3').on('mousedown', function() {
		function draw(pen, $td) {
		$td.css({'opacity' : '+=' + pen.pressure, 'background-color' : getRandomColor()});
		}
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
		$('.cell').mouseenter(function() {
		draw(pen, $(this));
		});
	});

	$('#btn5').click(function() {
		makeGrid(64);
		$('.cell').mouseenter(function() {
		draw(pen, $(this));
		});
	});

	$('#btn6').click(function() {
		makeGrid(96);
		$('.cell').mouseenter(function() {
		draw(pen, $(this));
		});
	});

	//when a cell is hovered, it is painted in pen.color with opacity pen.pressure
	$('.cell').mouseenter(function() {
		draw(pen, $(this));
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
        	pen.pressure = $('.ui-slider-handle').text();
      },
      create: function(event, ui) {
            var v=$(this).slider('value')/100;
            $(this).find('.ui-slider-handle').text(v);
            pen.pressure = $('.ui-slider-handle').text();
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

function getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return '#' + r + g + b;
}

function changePressure(pen, pressure) {
	pen.pressure = pressure;
}

function makeGrid(size) {
	$('.grid').empty();
	for (var i = 0; i < size; i++) {

		$('.grid').append('<tr id='+i+'></tr>');

		for (var j = 0; j < size; j++) {

			$('#'+i).append('<td class = "cell"></td>');
		}
	}
}

