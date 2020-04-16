$(document).ready(function(){
    $.ajax({
        url: 'data.csv',
        dataType: "text",
        contentType: "charset=utf-8",
    }).done(grafica);


    function grafica(data){
        console.log(data);
        var datos = data.split(/\r?\n|\r/);
        console.log(datos);
        var datos0 = datos[0].split(',');
        var datos1 = datos[1].split(',');
        console.log(datos0);
        console.log(datos1);
        var alldata = new Array;
        for( var i=0; i<datos.length; i++){
			if(i%100 == 0){
				alldata.push(datos[i].split(','));
			}
        }
        console.log(alldata);
        console.log(alldata.length + " length");
        var v1 = new Array;
        var v2 = new Array;
        var v3 = new Array;
        for( var i=1; i<alldata.length; i++){
            v1.push(alldata[i][0]);
			v2.push(alldata[i][1]);
			var perse = (parseFloat(alldata[i][1])/100) * parseFloat(alldata[i][2]);
            v3.push( perse );
        }
        console.log(v1);
        console.log(v2);
        console.log(v3);
		var config = {
			type: 'line',
			data: {
				labels: v1,
				datasets: [{
					label: 'EQUITY',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: v2,
					fill: false,
				}, {
					label: 'DRAWDOWN',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: v3,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
					text: 'Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

		var ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new Chart(ctx, config);
    }
});