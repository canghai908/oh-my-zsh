/// <reference path="../highcharts.js" />


Highcharts.theme = {
	title: '',
	colors: ['#00A3E7', '#766BB4', '#EB6751', '#41C3A6'],
	chart: {
		backgroundColor: 'rgba(0,0,0,0)'
	},
	legend: {
		enabled: false
	},
	xAxis: {
		lineWidth: 1,
		labels: {
		},
		tickWidth: 0
	},
	yAxis: {
		title: '',
		tickPixelInterval: 50,
		gridLineColor: '#DBDBDB',
		min: 0
	},
	exporting: {
		enabled: false
	},
	plotOptions: {
		line: {
			lineWidth: 2,
			marker: {
				enabled: false
			}
		},
		spline: {
			color: '#fff'
		},
		pie: {
			color: '#fff',
			borderWidth: 2
		}
	}
};
Highcharts.setOptions(Highcharts.theme);
