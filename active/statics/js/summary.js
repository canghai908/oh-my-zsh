/// <reference path="../highcharts.js" />


Highcharts.theme = {
	title: '',
	chart: {
		backgroundColor: 'rgba(0,0,0,0)'
	},
	legend: {
		enabled: false
	},
	xAxis: {
		lineWidth: 0,
		labels: {
			enabled: false
		},
		tickWidth: 0
	},
	yAxis: {
		lineWidth: 0,
		title: '',
		gridLineColor: 'rgba(0,0,0,0)',
		labels: {
			enabled: false
		}
	},
	exporting: {
		enabled: false
	},
	plotOptions: {
		line: {
			lineWidth: 3,
			color: '#fff',
			marker: {
				enabled: false
			},
		},
		spline: {
			color: '#fff'
		},
		pie: {
			color:'#fff',
			borderWidth: 2
		}
	}
};
Highcharts.setOptions(Highcharts.theme);
