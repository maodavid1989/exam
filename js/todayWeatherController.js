var global={
	url : 'http://api.openweathermap.org/data/2.5/weather?',
	q: 'Taipei,TW',
	units : '&units=metric',
	appid : '&APPID=9252bb5e85d423a673024acf2f9131ea'
	
}
	
	$( document ).ready(function() {
		$('#wTable2').hide();
		$('#tnotfound').hide();
		
		$( "#search" ).click(function() {
			var city=$('#city').val();
			var country=$('#country').val();
			
			$('#wTable').show();
			$.blockUI({message:""});
			
			
			var urlLink=global.url+"q="+city+","+country+global.units+global.appid;
			
			$.ajax({  
                url: urlLink,
			    dataType:'json',  
				success : function(data, textStatus, xhr) {
					switch(data.cod){
						case 200:
							var weather=data.weather[0].main;
							var description=data.weather[0].description
							getImg(description);
							$("#detail").empty().append("<span style='font-size: 24pt'>"+weather+"</span><br/>"
												+"<span style='font-size: 16pt'>"+description+"</span>");
							$("#humidity").text(data.main.humidity+"%");
							$("#temperature").empty().append(data.main.temp_min+'<sup>o</sup>C ~ '
													+data.main.temp_max+'<sup>o</sup>C');
							$('#tnotfound').hide();
							$('#wTable2').show();
							break;
						case '404':
							$('#tnotfound').show();
							$('#wTable').hide();
							$('#wTable2').hide();
							break;
					}
					$.unblockUI();
					
				}, 
                error: function(xhr, status, error) {
					$.unblockUI();
					alert(xhr.responseText);
				}                     
			});
		});
	});

	
	function getImg(description){
		if(description.indexOf("cloud")>-1){
			$("#weatherImg").attr("src","../img/cloud.png");
		}else if(description.indexOf("rain")>-1){
			$("#weatherImg").attr("src","../img/rain.png");
		}else if(description.indexOf("clear")>-1){
			$("#weatherImg").attr("src","../img/clear.png");
		}else{
			$("#weatherImg").attr("src","../img/na.png");
		}
		$("#weatherImg").attr("width",200);
		$("#weatherImg").attr("height",200);
		$("#weatherImg").show();
		
	}
	
