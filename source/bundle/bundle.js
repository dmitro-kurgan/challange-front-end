import '../components/scss/style.scss';

import '../components/js/bootstrap.min';

import '../components/js/bootstrap-select';

$('.checkbox').each(function() {
		$(this).click(function(e) {
  		e.preventDefault();
  		if(!$(this).hasClass('checked')) {
			$(this).addClass('checked').find('input').attr('checked', true);
		}
  		else {
	    	$(this).removeClass('checked').find('input').attr('checked', false);
		}
	});
});

var request = new XMLHttpRequest();
request.open('GET', 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', true);
request.onload = function () {
	var data = JSON.parse(this.response),
	data_1 = data.changes.percent,
	data_2 = data.changes.price,
	per = {1: data_1.hour, 2: data_1.day, 3: data_1.week, 4: data_1.month},
	money = {1: data_2.hour, 2: data_2.day, 3: data_2.week, 4: data_2.month};

	function getPercent() {    
        $.each(per, function(index, value) {
        	for(var i = 1; i < 4; i++) {
        		$('#change' + [i] + '_' + index).children().text(value + '%');
        	}    
        });
	};

  	function getPrice() {
      	$.each(money, function(index, value) {
            for(var i = 1; i < 4; i++) {
        		$('#change' + [i] + '_' + index).children().text(value + '$');
        	}
      	});
  	};

  	getPercent();

  	$.each([1,2,3], function(index, value) {
      	$('#check'+ value).click(function(e) {
      		e.preventDefault();
      		if(!$(this).hasClass('checked')) {
				$.each(per, function(i, val) {
					$('#change' + value + '_' + i).children().text(val + '%');
		        });
			}
      		else {
      			$.each(money, function(i, val) {
					$('#change' + value + '_' + i).children().text(val + '$');
				});		    	
  			}
        });
  	});
      
 	$('.main__item-list > li').each(function() {
		var item = $(this).find('span')
		if(!item.text().indexOf('-')) {
			item.addClass('main__item-val--minus')
		}
		else {
			item.removeClass('main__item-val--minus')
		}
	});

	$.each({1: 'USD', 2: 'EUR', 3: 'RUB', 4: 'GBR'}, function(index, value) {
		$('li[data-original-index=' + index + ']').click(function() {
			$('.checkbox').removeClass('checked').find('input').attr('checked', false);
			getPercent();

			request.open('GET', 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC' + value, true);
			request.onchange = function() {
				var data = JSON.parse(this.response);
			}
			request.send();
		});
	});
}

request.send();