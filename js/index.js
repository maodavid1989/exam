    
	$('#main li').click(function () {
        $('li').removeAttr('style');
		$(this).css("background-color", "#E7EBFF");
		$(this).css("border-color", "#2a9fcd");
		$(this).css("font-weight", "bold");
		load_html($(this).text());
    });
	
	function load_html(text){
		if(text === "Data Analysis"){
			document.getElementById("content").innerHTML='<object type="text/html" data="template\\dataAnalysis.html" style="width:100%; height: 500px;"></object>';
		}else if(text === "Today's Weather"){
			document.getElementById("content").innerHTML='<object type="text/html" data="template\\todayWeather.html" style="width:100%; height: 500px;"></object>';
		}
	}
	