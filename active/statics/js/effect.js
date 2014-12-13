var effect = {
	activtyState: "",
	chart: "",
	userid: "",
	activityId: "",
	startTime: "",
	init: function() {
		effect.effectSummary()
	},
	getSummary: function(D, C) {
		$("#subnav").children().removeClass("status");
		$("#AllList").html("");
		$("#detailPage").html("");
		switch (D) {
			case 1:
				$("#effectShareCount").addClass("status");
				effect.effectShareCount();
				break;
			case 2:
				$("#effectShareLevel").addClass("status");
				effect.effectShareLevel();
				break;
			case 3:
				$("#effectArea").addClass("status");
				effect.effectArea();
				break;
			case 4:
				$("#effectPrize").addClass("status");
				effect.effectPrize();
				break
		}
	},
	effectPrize: function() {
		$("#showChart").hide();
		if (effect.activtyState == "1" || effect.activtyState == "5" || effect.activtyState == "6") {
			$("#AllList").setTemplateElement("templatePrizeInfo");
			$("#AllList").processTemplate("")
		} else {
			if (effect.startTime > new Date()) {
				$("#AllList").setTemplateElement("templatePrizeInfo");
				$("#AllList").processTemplate("")
			} else {
				$.ajax({
					url: "./data/activity/GetGetPrizeInfos/success.json",
					type: "get",
					cache: false,
					data: {
						activityId: effect.activityId
					},
					success: function(B) {
						$("#AllList").setTemplateElement("templatePrizeInfo");
						$("#AllList").processTemplate(B.prizeSummarys);
						$("a[name='0']").parent().html("0")
					}
				})
			}
		}
	},
	effectShareLevel: function() {
		$("#showChart").hide();
		if (effect.activtyState == "1" || effect.activtyState == "5" || effect.activtyState == "6") {
			$("#AllList").setTemplateElement("templateShareLevelView");
			$("#AllList").processTemplate("")
		} else {
			$.ajax({
				url: "./data/activity/GetEffectShareLevelViews/success.json",
				type: "get",
				cache: false,
				data: {
					activityId: effect.activityId,
					pageindex: 1
				},
				success: function(B) {
					$("#AllList").setTemplateElement("templateShareLevelView");
					$("#AllList").processTemplate(B.effectShareLevelViews);
					effect.createPagerSelect(B.pagerInfo, 2)
				}
			})
		}
	},
	effectArea: function() {
		$("#showChart").hide();
		if (effect.activtyState == "1" || effect.activtyState == "5" || effect.activtyState == "6") {
			$("#AllList").setTemplateElement("templateAreaViews");
			$("#AllList").processTemplate("")
		} else {
			$.ajax({
				url: "./data/activity/GetEffectAreaViews/success.json",
				type: "get",
				cache: false,
				data: {
					activityId: effect.activityId,
					pageindex: 1
				},
				success: function(B) {
					$("#AllList").setTemplateElement("templateAreaViews");
					$("#AllList").processTemplate(B.effectAreaViews);
					effect.createPagerSelect(B.pagerInfo, 3)
				}
			})
		}
	},
	effectShareCount: function() {
		$("#showChart").hide();
		if (effect.activtyState == "1" || effect.activtyState == "5" || effect.activtyState == "6") {
			$("#AllList").setTemplateElement("templateShareCountView");
			$("#AllList").processTemplate("")
		} else {
			$.ajax({
				url: "./data/activity/GetEffectShareCountView/success.json",
				type: "get",
				cache: false,
				data: {
					activityId: effect.activityId,
					pageindex: 1
				},
				success: function(B) {
					$("#AllList").setTemplateElement("templateShareCountView");
					$("#AllList").processTemplate(B.effectShareCountView);
					effect.createPagerSelect(B.pagerInfo, 1)
				}
			})
		}
	},
	effectSummary: function() {
		$("#subnav").children().removeClass("status");
		$("#effectSummary").addClass("status");
		$(".hd_left span").each(function(D, C) {
			$(C).children("a:first").attr("class", "cell_" + (D + 1) + "_cur")
		});
		if (effect.activtyState == "1" || effect.activtyState == "5" || effect.activtyState == "6") {
			$("#showChart").hide();
			$("#AllList").setTemplateElement("templateSummaryView");
			$("#AllList").processTemplate("")
		} else {
			$("#showChart").show();
			$.ajax({
				url: "./data/activity/GetEffectSummaryView/success.json",
				type: "get",
				cache: false,
				data: {
					activityId: effect.activityId,
					pageindex: 1
				},
				dataType: "json",
				success: function(B) {
					$("#chartContainer").show();
					$("#AllList").setTemplateElement("templateSummaryView");
					$("#AllList").processTemplate(B.EffectSummaryTable);
					$("a[name='0']").parent().html("0");
					effect.createChart(B.EffectSummaryView);
					effect.createPagerSelect(B.pagerInfo, 0)
				}
			})
		}
	},
	createPagerSelect: function(D, F) {
		var E = D.PageIndex;
		if (D.RecordCount > D.PageSize) {
			$(".pagination").pagination(D.RecordCount, {
				items_per_page: D.PageSize,
				num_display_entries: 6,
				current_page: 0,
				num_edge_entries: 1,
				prev_show_always: true,
				next_show_always: true,
				callback: function(A) {
					effect.loadTableList(A + 1, F)
				}
			})
		} else {
			$(".fc_pages").html("")
		}
	},
	filterCity: function() {
		$("div[name='0']").removeAttr("onclick");
		$("div[name='0']").addClass("jian")
	},
	loadTableList: function(H, E) {
		var F = "";
		var G = "";
		switch (E) {
			case 0:
				F = "./data/activity/GetEffectSummaryTable/success.json";
				G = "templateSummaryView";
				break;
			case 1:
				F = "./data/activity/GetEffectShareCountView/success.json";
				G = "templateShareCountView";
				break;
			case 2:
				F = "./data/activity/GetEffectShareLevelViews/success.json";
				G = "templateShareLevelView";
				break;
			case 3:
				F = "./data/activity/GetEffectAreaViews/success.json";
				G = "templateAreaViews";
				break
		}
		$.ajax({
			url: F,
			type: "get",
			cache: false,
			data: {
				activityId: effect.activityId,
				pageindex: H
			},
			dataType: "json",
			success: function(A) {
				$("#AllList").setTemplateElement(G);
				switch (E) {
					case 0:
						$("#AllList").processTemplate(A);
						$("a[name='0']").parent().html("0");
						break;
					case 1:
						$("#AllList").processTemplate(A.effectShareCountView);
						break;
					case 2:
						$("#AllList").processTemplate(A.effectShareLevelViews);
						break;
					case 3:
						$("#AllList").processTemplate(A.effectAreaViews);
						break;
					case 4:
						$("#AllList").processTemplate(A.effGetPrizeViews);
						break
				}
			}
		})
	},
	createChart: function(R) {
		var M = [],
			X = [],
			N = [],
			V = [];
		var T = new Date();
		$.each(R, function(B, A) {
			if (B == 0) {
				T = A.Date
			}
			M.push(A.ViewCount);
			X.push(A.ShareCount);
			N.push(A.CanGetPrizeCount);
			V.push(A.ExchangePrizeCount)
		});
		var U = function() {
			return '<span style="color:#9D9D9D;">' + Highcharts.dateFormat("%m.%d", this.value) + "</span>"
		};
		var S = function() {
			var A = new Date(this.x);
			return "日期：" + A.getFullYear() + "-" + (A.getMonth() + 1) + "-" + A.getDate() + " " + this.series.name + "：" + this.y
		};
		var P = "";
		var Q = 3600 * 1000 * 24;
		T = new Date(parseInt(T.substr(6)));
		var O = Date.UTC(T.getFullYear(), T.getMonth(), T.getDate());
		var W = {
			chart: {
				renderTo: "chartContainer",
				type: "line",
				height: 227
			},
			title: {
				text: P
			},
			xAxis: {
				labels: {
					formatter: U,
					type: "datetime"
				},
				useHtml: true,
				type: "datetime"
			},
			yAxis: {
				labels: {
					formatter: function() {
						return '<span style="color:#9D9D9D;">' + this.value + "</span>"
					}
				}
			},
			tooltip: {
				formatter: S,
				style: {
					fontFamily: "微软雅黑",
					padding: 10,
					fontWeight: "bold"
				}
			},
			plotOptions: {
				series: {
					marker: {
						enabled: true
					}
				}
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: "浏览量",
				data: M,
				color: "#00a3e7",
				pointInterval: Q,
				pointStart: O
			}, {
				name: "分享量",
				color: "#766bb4",
				data: X,
				pointInterval: Q,
				pointStart: O
			}, {
				name: "获奖人数",
				color: "#eb6751",
				data: N,
				pointInterval: Q,
				pointStart: O
			}, {
				name: "已兑奖人数",
				color: "#41c3a6",
				data: V,
				pointInterval: Q,
				pointStart: O
			}]
		};
		if (M.length == 1) {
			W.plotOptions.series.marker.enabled = true
		}
		if (M.length <= 7) {
			W.xAxis.tickInterval = 24 * 3600 * 1000
		}
		if (X.length == 1) {
			W.plotOptions.series.marker.enabled = true
		}
		if (X.length <= 7) {
			W.xAxis.tickInterval = 24 * 3600 * 1000
		}
		if (N.length == 1) {
			W.plotOptions.series.marker.enabled = true
		}
		if (N.length <= 7) {
			W.xAxis.tickInterval = 24 * 3600 * 1000
		}
		if (V.length == 1) {
			W.plotOptions.series.marker.enabled = true
		}
		if (V.length <= 7) {
			W.xAxis.tickInterval = 24 * 3600 * 1000
		}
		effect.chart = new Highcharts.Chart(W);
		effect.BindChartEvent()
	},
	BindChartEvent: function() {
		$(".hd_left span").unbind("click").bind("click", function() {
			var F = $(this).children("a:first");
			var D = F.attr("class");
			var E = F.attr("title");
			if (D.indexOf("_cur") > 0) {
				D = D.replace("_cur", "");
				F.attr({
					"class": D
				});
				$.each(effect.chart.series, function(A, B) {
					if (B.name == E) {
						B.hide()
					}
				})
			} else {
				D = D + "_cur";
				F.attr({
					"class": D
				});
				$.each(effect.chart.series, function(A, B) {
					if (B.name == E) {
						B.show()
					}
				})
			}
		})
	},
	padLeft: function(H, J, L) {
		if (H.length >= J) {
			return H
		} else {
			var I = J - H.toString().length;
			var G = "";
			for (var K = 0; K < I; K++) {
				G = G + L.toString()
			}
			return G + H
		}
	},
	show: function(H, E, G) {
		if ($(H).attr("class") != "jia jian") {
			$(".a").hide()
		}
		$("div[name='1']").removeClass("jian");
		if (!$(H).parents("tr").next().is(".a")) {
			$.ajax({
				url: "/activity/GetEffectAreaCitys",
				type: "get",
				cache: false,
				data: {
					province: E,
					activityId: G
				},
				success: function(C) {
					if (C != "") {
						var B = C.effectAreaViews;
						if (B.length > 0) {
							$(H).addClass("jian");
							var D = "";
							D += '<tr class="a">';
							D += '<td colspan="5" style="padding:0px;">';
							D += '<table class="summary_table2">';
							for (var A = 0; A < B.length; A++) {
								D += '<tr class="tr_border">';
								D += '<td style="width:78px;text-align:left;padding-left:48px;">' + B[A].Area + "</td>";
								D += '<td style="width:142px">' + B[A].ViewCount + "</td>";
								D += '<td style="width:132px">' + B[A].ShareCount + "</td>";
								D += '<td style="width:126px">' + B[A].Rate + "%</td>";
								D += '<td style="width:472px">';
								D += '<div class="percentage_bg clearfix">';
								D += '<div class="sub_percentage" style="width: ' + B[A].Rate + '%;"></div>';
								D += "</div>";
								D += "</td>";
								D += "</tr>"
							}
							D += "</table>";
							D += "</td>";
							D += "</tr>";
							$(H).parents("tr").after(D);
							var J = $(".summary_table2 .tr_border");
							J.each(function(L, I) {
								$(I).hover(function() {
									$(this).addClass("hover")
								}, function() {
									$(this).removeClass("hover")
								})
							})
						}
					}
				}
			})
		} else {
			var F = $(H).parents("tr").next(".a");
			if (F.is(":hidden")) {
				F.slideDown(100);
				$(H).addClass("jian")
			} else {
				F.slideUp(100);
				$(H).removeClass("jian")
			}
		}
	}
};