/// <reference path="../app.js" />
/// <reference path="../functionality.js" />
/// <reference path="../ViewModels/ViewModels.js" />

var UserEmailAddress="";

//#region Loading
$(document).ready(function () {
	loadingSplashScreen();
    if (!window.location.hash) {
//        if (localStorage.getItem('a')){
//        	location.hash = "home_screen";
//        }
//
//            //else location.href = urlString;
//        else http ? location.href = urlString : location.hash = "initial_screen";
    }

    //$.noConflict();
    ////window.location.hash = 'home';
    $.mobile.initializePage();
    $.support.cors = true;
   // $.mobile.allowCrossDomainPages = true;

    if ($.browser.name == "msie" && $.browser.versionNumber < 10) {
        $(".loading").hide();
        //if ($.browser.name == "msie" && $.browser.versionNumber < 10) {
        $("#browserText").html("<a href=\"http://browser-update.org/update.html\" class=\"link_pop_br\"><img class=\"slika_br_pop\" src=\"browser_popup.jpg\"/></a>");
        $("#browserPopup").popup();
        setTimeout(function () {
            $('#browserPopup').popup('open');
        }, 300);
        $(document).on("popupafterclose", '#browserPopup', function () {
            localStorage.clear();
           // window.location.href = "http://daremat.com/initial/index.html";
        });
    }
});

function previewParticipationRate(){
//	window.history.pushState("Title", "#preview_participation_rate" );
	homeModelObject.checkIfSessionExpired().done(function(data){
		if(homeModelObject.IsLoggedIn()){
			if(surveyReports.IsMultiSurveyReport()==0){
				$.mobile.changePage($('#preview_participation_rate'), { allowSamePageTransition: true });
			}
			else{
				$.mobile.changePage($('#survey_clones'), { allowSamePageTransition: true });
			}

		}
	});
}

$(document).on('pagebeforeshow', '#survey_clones', function(){
	homeModelObject.checkIfSessionExpired().done(function(data){
		if(homeModelObject.IsLoggedIn()){
			participationRateViewModel.getClonesForSurvey().done(function(){
				$(".btns_goToSurvey").button();
			});

//			participationRateViewModel.getClonesForSurvey();
//			$(".btns_goToSurvey").button();



		}else{
			window.onbeforeunload = null;
		}
		});



});


$('#btn_olderNotifications').click(function () {
    if (!$('#olderUl').is(':visible')) {
        $('#olderUl').show();
        $('#img_older').attr('src', "./img/hide_all_button.svg");
        $('#olderNotifications').html(localizationViewModel.momentLocalizaton().hide_older);
    }
    else {
        $('#olderUl').hide();
        $('#img_older').attr('src', "./img/show_all_button.svg");
        $('#olderNotifications').html(localizationViewModel.momentLocalizaton().show_older);
    }
});

$("#btn_sign_out_desktop").click(function () {

	homeModelObject.doLogout("Logged out successfully.");

});
SignOutMobile=function () {
	console.log("LogOut");
	homeModelObject.doLogout("Logged out successfully.");
}

function previewMaster(){
	 var params={};
	 params.IdMasterSurvey = parseInt(getCookie('idMaster'));

	 $.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/CheckPreviewMaster.xsjs",
	        type: 'POST',
	        error: function (x, s, m) {

	        },
	        success: function (res) {
	        	console.log(res);
	        	if(res.HasAccess!=1){
    				alert("Sorry but you have not access to preview this survey.");

	        	} else if(res.IsMaster!=1){
	        		alert("Sorry but the link is incorrect.");
	        	}else{
	        		surveysObject.IsMaster(true);
	        		surveysForUserObject.IdSurvey(params.IdMasterSurvey);
	        		goToSurveyRedirect(params.IdMasterSurvey);
	        	}


	        	 deleteCookie('idMaster');
	        }
	 });


}

function leftPanelSetup() {
    /*if (!localStorage.getItem('t')) {
        $('.left_panel_user').show();
        $('.left_panel_generic').show();
        $("#btn_notifications_desktop").fadeOut();
        $("#btn_sign_out_desktop").html("Sign In")
        $("#menu_container").hide();

    } else {
        $('.left_panel_user').show();
        $('.left_panel_generic').hide();
        $("#btn_notifications_desktop").fadeIn();
        $("#menu_container").show();
       // $("#btn_sign_out_desktop").html("Sign Out")
    }*/
}

$(function () {
    var pages = $('div[data-role="page"]');

    for (var i = 0; i < pages.length; i++) {
        /*console.log(pages[i]);*/

        var panel = $(pages[i]).children('div[data-role="panel"]')[0];
        if (panel) {
            ko.applyBindings(homeModelObject, document.getElementById($(panel).attr("id")));


        }

    }
    leftPanelSetup();
});


ko.applyBindings(participationRateViewModel, document.getElementById("content_survey_clones"));

ko.applyBindings(homeModelObject, document.getElementById("headerPart"));
ko.applyBindings(homeModelObject, document.getElementById("content_home_screen"));
ko.applyBindings(homeModelObject, document.getElementById("content_account_settings"));

//ko.applyBindings(homeModelObject, document.getElementById("engage"));//v
//ko.applyBindings(homeModelObject, document.getElementById("l_panel_leaderboard"));//v
ko.applyBindings(homeModelObject, document.getElementById("left_panel_leaderboard_engage11"));//v
ko.applyBindings(homeModelObject, document.getElementById("left_panel_leaderboard_engage"));//v

//ko.applyBindings(homeModelObject, document.getElementById("content_my_surveys"));//v

ko.applyBindings(leaderboardObject, document.getElementById("leaderboard"));
ko.applyBindings(userNotifications, document.getElementById("notifications_content"));
ko.applyBindings(userNotifications, document.getElementById("notifications_header"));

ko.applyBindings(sentSurveysForUser, document.getElementById("content_sent_surveys"));
ko.applyBindings(sentSurveysForUser, document.getElementById("left_panel_sent_surveys"));
//ko.applyBindings(sentSurveysForUser, document.getElementById("list_sent_surveys"));

//ko.applyBindings(createSurvey, document.getElementById('create_content'));
//ko.applyBindings(createSurvey, document.getElementById('create_survey_questions'));
//ko.applyBindings(createSurvey, document.getElementById('h1_question_steps_controls'));
//ko.applyBindings(createSurvey, document.getElementById('content_survey_steps'));

ko.applyBindings(createSurvey, document.getElementById('content_create'));
ko.applyBindings(createSurvey, document.getElementById("h1_survey_create_controls"));
//ko.applyBindings(createSurvey, document.getElementById("h1_survey_create_controls_mobile"));


//ko.applyBindings(createSurvey, document.getElementById('create_survey_questions'));
ko.applyBindings(createSurvey, document.getElementById('question_steps'));
ko.applyBindings(createSurvey, document.getElementById('h1_question_steps_controls'));
ko.applyBindings(createSurvey, document.getElementById('h1_question_steps_controls_mobile'));
ko.applyBindings(createSurvey, document.getElementById('content_survey_steps'));

ko.applyBindings(colleaguesListViewModel, document.getElementById("content_recognize_colleagues1"));
ko.applyBindings(selectedColleguesListView, document.getElementById('SelectedColleguesListContainer_desktop'));
ko.applyBindings(selectedColleguesListView, document.getElementById('SelectedColleguesListContainer_mobile'));


homeModelObject.checkUser().done(function(){
	homeModelObject.getUserHomeInfo().done(function(){
		//reportResultOptions.GetOrgUnit();
		document.getElementById("counter_home_active_surveys").innerHTML = homeModelObject.ActiveSurveysForUserCounter();
//		document.getElementById("counter_home_active_surveys_mobile").innerHTML = homeModelObject.ActiveSurveysForUserCounter();
		document.getElementById("counter_sent_surveys").innerHTML = homeModelObject.SentSurveysForUserCounter();
		document.getElementById("counter_sent_surveys_mobile").innerHTML = homeModelObject.SentSurveysForUserCounter();
		document.getElementById("counter_home_results").innerHTML = homeModelObject.SurveyReportsForUserInAppCounter();
//       	document.getElementById("counter_home_results_mobile").innerHTML = homeModelObject.SurveyReportsForUserInAppCounter();
       	document.getElementById("counter_home_results_SurveyPulse").innerHTML = homeModelObject.SurveyPulseForUserInAppCounter();
//       	document.getElementById("counter_home_results_SurveyPulse_mobile").innerHTML = homeModelObject.SurveyPulseForUserInAppCounter();
       	//document.getElementById("counter_active_pulse_surveys").innerHTML = homeModelObject.ActivePulseSurveysForUser();
       	//document.getElementById("counter_active_pulse_surveys_mobile").innerHTML = homeModelObject.ActivePulseSurveysForUser();


//		sentSurveysForUser.GetSentSurveysForUser();
//		.done(function(){

//			});

//		userNotifications.GetUserNotReadNotifications();
//		userNotifications.GetUserReadNotifications();
		ko.applyBindings(surveysForUserObject, document.getElementById("content_current_surveys"));
//		surveyReports.GetListSurveyReports();
		 if(location.hash === "#leaderboard" && leaderboardObject.RankText()===""){
				homeModelObject.checkIfSessionExpired();

				handleSurveyNavigationExceptions();
				leaderboardObject.GetUserRanking();
				leaderboardObject.GetListRankingLeaderboard();

				$("#percentage").addClass("animate_percentage_remove").delay(1)
			    .queue(function() {
			        $(this).removeClass("animate_percentage_remove");
			        $(this).dequeue();
			    });
		 }
		});
	console.log("user check finished");
//	surveysForUserObject.GetActiveSurveysForUser().done(function(){

//		ko.applyBindings(surveysForUserObject, document.getElementById("content_current_surveys"));


		//document.getElementById("counter_home_results").innerHTML = surveysForUserObject.CompletedSurveysCount();
		//document.getElementById("counter_home_results_mobile").innerHTML = surveysForUserObject.CompletedSurveysCount();
//		surveyReports.GetListSurveyReports();



//	}).done(leaderboardObject.GetUserRanking).done(leaderboardObject.GetListRankingLeaderboard);
});




/*ko.applyBindings(feedback, document.getElementById("content_write_message_feedback1"));
ko.applyBindings(feedback, document.getElementById("content_write_message_feedback2"));
ko.applyBindings(feedback, document.getElementById("content_write_message_feedback3"));
ko.applyBindings(feedback, document.getElementById("content_write_message_feedback4"));
ko.applyBindings(feedback, document.getElementById("content_write_message_feedback5"));
ko.applyBindings(feedback, document.getElementById("content_feedback6"));
ko.applyBindings(feedback, document.getElementById("content_feedback7"));
ko.applyBindings(feedback, document.getElementById("content_feedback8"));
ko.applyBindings(feedback, document.getElementById("content_feedback9"));
ko.applyBindings(feedback, document.getElementById("content_feedback10"));
ko.applyBindings(feedback, document.getElementById("feedbackQuestionsInfo"));
ko.applyBindings(feedback, document.getElementById("feedbackQuestionsInfo_mobile"));*/
goToSurveyRedirect = function (IdSurvey) {
	console.log(IdSurvey);
	document.cookie = "currS="+IdSurvey;
//	localStorage.setItem("currS", IdSurvey);
	//surveysObject.GetSurveyById(IdSurvey,"param").done(function(){
	//	CurrentQuestionNewInstance;
	//});
	$.mobile.changePage($('#feedback_start'));
	//location.href = urlString + "index2.html#feedback_start";
	//$.mobile.changePage($('#feedback_start'), { allowSamePageTransition: true });
};

goToPulseSurveyRedirect = function(IdSurvey){
	console.log("pulse survey id:" + IdSurvey);
	document.cookie = "currS="+IdSurvey;
	//$.mobile.changePage($('#feedback_start'));
	if (getCookie('currS')) {
		surveysObject.GetSurveyById(getCookie('currS'),"param",document.cookie).done(function(){
			CurrentQuestionNewInstancePulse().done(function(){

				currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
				fillCurrentQuestionValues(question);
				surveyNavigate();

			})

//			if(currentQuestionObject.IdQuestionType()){
//				switch(currentQuestionObject.IdQuestionType()){
//				case "1": case "6":
//					window.history.pushState("Title", "#feedback_text" );
//					$.mobile.changePage($('#feedback_text'), { allowSamePageTransition: true });
//					break;
//				case "2":
//					window.history.pushState("Title", "#feedback_rating" );
//					$.mobile.changePage($('#feedback_rating'), { allowSamePageTransition: true });
//					break;
//				case "3": case "5":
//					window.history.pushState("Title", "#feedback_options" );
//					$.mobile.changePage($('#feedback_options'), { allowSamePageTransition: true });
//					break;
//				case "4":
//					window.history.pushState("Title", "#feedback_numeric_rating" );
//					$.mobile.changePage($('#feedback_numeric_rating'), { allowSamePageTransition: true });
//					break;
//				}
//				if(currentQuestionObject.IsPage()==="1"){
//					window.history.pushState("Title", "#survey_page" );
//					$.mobile.changePage($('#survey_page'), { allowSamePageTransition: true });
//				}
//			}
//			else{
//				//r.resolve();
//			}

		});
	};


};


$(document).on('pagebeforeshow', '#home_screen', function () {
	if(homeModelObject.IsLoggedIn()){
		homeModelObject.checkIfSessionExpired();
		loadingSplashScreen();
		$('#surveysApp_search').val('');
	}
});

$(document).on('pageshow', '#home_screen', function () {
	refreshChartInitial();
	if(getCookie('ids') && !homeModelObject.IsAccessibility()){
//		setTimeout(function(){
		homeModelObject.getUserHomeInfo().done(function() {
			CheckIfSelectedParticipants();
		});
//		},500)
//		goToSurveyRedirect(sessionStorage.getItem('ids'));
	}else if(getCookie('idMaster')){
		if(homeModelObject.Username()){
			previewMaster();
		}else{
			homeModelObject.getUserHomeInfo().done(function() {
				 previewMaster();
			});
		}
	}

	Schortcut();
});



$(document).on('pageshow', '#surveyEnd', function () {
	$(".homeBtn").on('click', function(){
		homeModelObject.checkUser().done(function() {
			homeModelObject.getUserHomeInfo().done(function(){
				document.getElementById("counter_home_active_surveys_mobile").innerHTML = homeModelObject.ActiveSurveysForUserCounter();
				document.getElementById("counter_home_active_surveys").innerHTML = homeModelObject.ActiveSurveysForUserCounter();
				document.getElementById("counter_sent_surveys").innerHTML = homeModelObject.SentSurveysForUserCounter();
				document.getElementById("counter_sent_surveys_mobile").innerHTML = homeModelObject.SentSurveysForUserCounter();
			});
		});
	});
});

$(document).on('pageshow', '#survey_results', function () {
	surveysObjectForApp.isPulseSurvey(0);

		homeModelObject.checkUser().done(function() {
			homeModelObject.getUserHomeInfo().done(function(){
				document.getElementById("counter_home_results").innerHTML = homeModelObject.SurveyReportsForUserInAppCounter();
		       	document.getElementById("counter_home_results_mobile").innerHTML = homeModelObject.SurveyReportsForUserInAppCounter();
			});
		});
});

$(document).on('pageshow', '#sent_surveys', function () {
		homeModelObject.checkUser().done(function() {
			homeModelObject.getUserHomeInfo().done(function(){
				document.getElementById("counter_sent_surveys").innerHTML = homeModelObject.SentSurveysForUserCounter();
				document.getElementById("counter_sent_surveys_mobile").innerHTML = homeModelObject.SentSurveysForUserCounter();
			});
		});
});

$(document).on('pagebeforeshow', '#current_surveys', function () {
	homeModelObject.checkIfSessionExpired();
	handleSurveyNavigationExceptions();

	surveysForUserObject.GetActiveSurveysForUser().done(function(){
			$('.btns_goToSurvey').button();
	});
	Schortcut();
});


$(document).on('pagebeforeshow', '#survey_results_options', function(){
	surveysObjectForApp.isPulseSurvey(0);
	$(document).unbind('ajaxStart');
	reportResultOptions.ManagerByBusinessPartn();
	Schortcut();
});

$(document).on('pagebeforehide', '#survey_results_options', function(){
	$('.loading').fadeIn();
	$(document).ajaxStart(function (xhr, setting) {
	    $('.loading').fadeIn();

	});
	if(window.location.hash!='#chart_results'){
		reportResultOptions.selectedPermType1(undefined);
		reportResultOptions.selectedPermType2(undefined);		
	}
	//reportResultOptions.goBackForBP(0);
});

$(document).on('pagebeforeshow', '#notifications', function () {
	homeModelObject.checkIfSessionExpired().done(function(data){
		if(homeModelObject.IsLoggedIn()){
			changeNotifiPageTitle();
			userNotifications.GetUserNotReadNotifications();
			userNotifications.GetUserReadNotifications();
			Schortcut();


		}else{
			window.onbeforeunload = null;
		}
		});

});


function changeNotifiPageTitle(){
	document.title = userNotifications.CountNotificationsNotRead() + ' Notifications';
	console.log(userNotifications.CountNotificationsNotRead() + ' document.title = ');
};

$(document).on('pageshow', '#leaderboard', function () {

});

$(document).on('pagebeforeshow', '#leaderboard', function () {
	homeModelObject.checkIfSessionExpired();

	/*$("#percentage").removeClass("animate_percentage");
	*/
	handleSurveyNavigationExceptions();
	leaderboardObject.GetUserRanking();
	leaderboardObject.GetListRankingLeaderboard();

	$("#percentage").addClass("animate_percentage_remove").delay(1)
    .queue(function() {
        $(this).removeClass("animate_percentage_remove");
        $(this).dequeue();
    });

	Schortcut();
});

$(document).on('pageshow', '#create_survey', function () {
	homeModelObject.checkIfSessionExpired();
	Schortcut();
//	$("#inputField").on('click', function(){
//		setTimeout(function(){ $("#footer").removeClass("ui-fixed-hidden"); }, 0);
//
//	})
});
$(document).on('pageshow', '#account_settings', function () {
	homeModelObject.checkIfSessionExpired();
//	$("#selectLanguageList").text('')
//	setTimeout(function(){
		homeModelObject.getUserHomeInfo().done(function(){
			$("#account_email").text(homeModelObject.Email())
			$("#account_first_name").text(homeModelObject.FullName());
//			$("#selectLanguageList").val();
		});
//	}, 0);


	Schortcut();
	$("#selectLanguageList").selectmenu("refresh");
});
$(document).on('pagebeforeshow', '#account_settings', function () {
	homeModelObject.checkIfSessionExpired();
	homeModelObject.getPhoto(homeModelObject.Id(),20);

	$("#selectLanguageList").on('change', function(){
		homeModelObject.getPhoto(homeModelObject.Id(),20);
	});

});

$(document).on('pagebeforeshow', '#my_surveys', function() {
	homeModelObject.checkIfSessionExpired();
	$('#surveysApp_search').val('');

	surveysObjectForApp.getPulseSurveysByUser().done(function(){
		refreshSemiCircle();
		$(".image_mh").append('<p class="changeText">View Result</p>')
		$(this).find('#changeText').css('opacity', '0');
	});

});

$(document).on('pageshow', '#my_surveys', function () {
	homeModelObject.checkIfSessionExpired();


	$('#surveysApp_search').on('keyup', function(){
//		debugger;
			if($('#surveysApp_search').val()){
				getMySurveysApp().done(function(){
					refreshSemiCircle();
				});
			}else {
				surveysObjectForApp.getPulseSurveysByUser().done(function(){
					refreshSemiCircle();
				});
			}
    });


	Schortcut();
});


$(document).on('pagebeforeshow', '#editMy_surveys', function () {
	homeModelObject.checkIfSessionExpired();

	if(surveysObjectForApp.IsActive()===1) {
		$("#checkboxIsActive").prop('checked', true);
		$(".activeOrNot").html(" Active").css('color', 'green');
		$(".activeOrNot").css('font-weight', 'bold');
		$("#checkboxIsActive").checkboxradio("refresh");
	}else {
		$("#checkboxIsActive").prop('checked', false);
		$(".activeOrNot").html(" Inactive").css('color', 'red');
		$(".activeOrNot").css('font-weight', 'bold');
	    $("#checkboxIsActive").checkboxradio("refresh");
	}

	$("#checkboxIsActive").on("click",function(){
		  if($(this).prop("checked")==true){
		    $(".activeOrNot").html(" Active").css("color","green");
		    $("#checkboxIsActive").checkboxradio("refresh");
		  }else{
		    $(".activeOrNot").html(" Inactive").css("color","red");
		  }
	});

	$.mobile.activePage.trigger('create');
	Schortcut();
});

$(document).on('pageshow', '#editMy_surveys', function () {
	homeModelObject.checkIfSessionExpired();


	$("#checkboxIsActive").on('click', function(){
		var params={};
		params.IdSurvey = surveysObjectForApp.IdSurvey();
		console.log(params.IdSurvey);
		if($("#checkboxIsActive").prop("checked")===true) {
			params.IsActive = 1;
		}else {
			params.IsActive = 0;
		}

		$.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/saveEditedPulseSurvey.xsjs?action=2",
	        type: 'POST',
	        error: function (x, s, m) {
//	        	console.log(x);
//	        	console.log(s);
//	        	console.log(m);
	        	homeModelObject.checkIfSessionExpired();
	        },
	        success: function () {

	        }
	    });
	});

});


$(document).on('pagebeforeshow', '#result_pulse_surveys', function () {
	homeModelObject.checkIfSessionExpired();

	$(".result_reports").removeAttr('id');
	$(".Result_pulseSurvey").attr('id', 'full_container_results');



	refreshResultsChartData();


	Schortcut();
});

$(document).on('pageshow', '#engage', function () {
	homeModelObject.checkIfSessionExpired();

	engagePulseSurveys.isPulseSurvey(0);
	engagePulseSurveys.getPulseSurveysList().done(function(){
			$('.btns_goToSurvey').button();
	});

	Schortcut();
});



function hehe(){
	  var elm = document.getElementById("percentage");
	  var newone = elm.cloneNode(true);
	  elm.parentNode.replaceChild(newone, elm);

};


$(document).on('pagebeforeshow', '#feedback1', function () {

});

$('#btn_feedback1_next').click(function(){

});

/*$('#btn_account_settings2_home').click(function () {
    if (!navigator.userAgent.indexOf("Android") > -1) $.mobile.changePage($('#home_screen'), { transition: 'slide', reverse: true });
});*/
/*$('#btn_account_settings2_left').click(function () {
    if (!navigator.userAgent.indexOf("Android") > -1) $.mobile.changePage($('#account_settings2'), { transition: 'slide', reverse: false });
});*/
$('#btn_account_settings2').click(function () {
    if (!navigator.userAgent.indexOf("Android") > -1) $.mobile.changePage($('#account_settings2'), { transition: 'slide', reverse: false });
});

$(window).on("navigate", function (event, data) {
	  var direction = data.state.direction;
	  var locat = window.location.hash;

	  if(locat == "#survey_results_options"){
		  if (direction == 'back') {
			  backToSurvey_results_options();
		  }
	  }

	  console.log( data.state );
	  handleSurveyNavigationExceptions();
	  if(locat=='#feedback_text' || locat=='#feedback_rating' || locat=='#feedback_options' || locat=='#feedbackInfo' || locat=='#feedback_numeric_rating' || locat=='#survey_page' || locat=='#feedback_matrix'){
		  /*window.location.hash="no-back-button";
		  event.stopImmediatePropagation();
		  event.preventDefault();
		  return false;*/
		  /*window.location.hash="no-back-button";
		  window.location.hash="no-back-button";//again because google chrome don't insert first hash into history
		  window.onhashchange=function(){window.location.hash="no-back-button";}*/
		  //window.history.forward();
		 // History.pushState({state:2,rand: Math.random()},"SurveyRocks", "#no_back");
		 // history.pushState(null, null, "#no_back");

//		  window.history.pushState(null, null, "#no_back");
	  }

	});

/*window.addEventListener('popstate', function(event) {
	  var locat = window.location.hash;

	  if(locat=='#feedback_text' || locat=='#feedback_rating' || locat=='#feedback_options' || locat=='#feedbackInfo'){
		//  History.pushState({state:2,rand: Math.random()},"SurveyRocks", "#no_back");
		  window.history.pushState(null, null, "#no_back");
	  }
});*/

//window.onbeforeunload = function() { window.history.forward(1); };

var surveyParticipationRate=[];
function GetSurveyRatesForLast4weeks(){
	var r = $.Deferred();
  	$.ajax({
        dataType: "json",
        data: JSON.stringify({}),
        cache: false,
        crossDomain: true,
        url: urlString + "services/GetInvitationAndParticipationRatesForLast4weeks.xsjs",
        type: 'POST',
        error: function (x, s, m) {

        },
     success: function (res) {
    	 surveyParticipationRate=res;
    	 r.resolve(res);
     }
    });
  	return r;
}


function refreshChartInitial(){
	$('#canvas_home').remove();
	$('#canvas_home_mobile').remove();
    var canvas1 = $('<canvas id="canvas_home" width="420" height="143" />', { id: 'canvas_home', height: 143, widtH: 420});
    var canvas2 = $('<canvas id="canvas_home_mobile" width="1024" height="348" />', { id: 'canvas_home_mobile', height: 348, widtH: 1024});
  	$('#div_canvas_home').append(canvas1);
  	$('#div_canvas_home_mobile').append(canvas2);
  	var canvas_chart= document.getElementById('canvas_home');
  	var canvas_chart_mobile = document.getElementById('canvas_home_mobile');
  	var ctx = canvas_chart.getContext("2d");
  	//var ctx_mobile = canvas_chart_mobile.getContext("2d");

  	var month = new Array();
  	month[0] = "Jan";
  	month[1] = "Feb";
  	month[2] = "Mar";
  	month[3] = "Apr";
  	month[4] = "May";
  	month[5] = "Jun";
  	month[6] = "Jul";
  	month[7] = "Aug";
  	month[8] = "Sep";
  	month[9] = "Oct";
  	month[10] = "Nov";
  	month[11] = "Dec";


	 var date2=new Date();
	 var date1=new Date();
	 date1.setDate(date1.getDate() - 6);
  	var week4=month[date1.getMonth()] + date1.getDate()+'-'+month[date2.getMonth()] + date2.getDate();

  	date1.setDate(date1.getDate() - 7);
  	date2.setDate(date2.getDate() - 7);
  	var week3=month[date1.getMonth()] + date1.getDate()+'-'+month[date2.getMonth()] + date2.getDate();

  	date1.setDate(date1.getDate() - 7);
  	date2.setDate(date2.getDate() - 7);
  	var week2=month[date1.getMonth()] + date1.getDate()+'-'+month[date2.getMonth()] + date2.getDate();

  	date1.setDate(date1.getDate() - 7);
  	date2.setDate(date2.getDate() - 7);
  	var week1=month[date1.getMonth()] + date1.getDate()+'-'+month[date2.getMonth()] + date2.getDate();



//  	if(urlString=="https://xs04a6fd67e86.hana.ondemand.com/SurveyRocks/"){
//  	  	//za xs04
//  		var xLabels=['Aug03-Aug09','Aug10-Aug16','Aug17-Aug23','Aug24-Aug30'];
//  	}else{
  	//za jy3 i xs03
  	  	var xLabels=[week1,week2,week3,week4];
//  	}

  	GetSurveyRatesForLast4weeks().done(function(){

  	var data0=[],data1=[],data2=[],label0='',label1='',label2='';
  	if(surveyParticipationRate.length>=1){
  		data0=surveyParticipationRate[0].data;

  		label0=surveyParticipationRate[0].SurveTitle.substring(0, 27);
  		if(surveyParticipationRate[0].SurveTitle.length>30)
  		{
  			label0+='...';
  		}

  	}
  	if(surveyParticipationRate.length>=2){
  		data1=surveyParticipationRate[1].data;
  		label1=surveyParticipationRate[1].SurveTitle.substring(0, 27);
  		if(surveyParticipationRate[1].SurveTitle.length>30)
  		{
  			label1+='...';
  		}

  	}
  	if(surveyParticipationRate.length>=3){
  		data2=surveyParticipationRate[2].data;
  		label2=surveyParticipationRate[2].SurveTitle.substring(0, 27);
  		if(surveyParticipationRate[2].SurveTitle.length>30)
  		{
  			label2+='...';
  		}

  	}


  	var lineChartData = {
			labels : xLabels,
			datasets : [
				{
					label: label0,
					fillColor : "rgba(80,34,115,0.2)",
					strokeColor : "rgba(80,34,115,1)",
					pointColor : "rgba(80,34,115,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(80,34,115,1)",
					data : data0,
				}
				,
				{
					label: label1,
					fillColor : "rgba(248,185,40,0.2)",
					strokeColor : "rgba(248,185,40,1)",
					pointColor : "rgba(248,185,40,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(248,185,40,1)",
					data : data1,
				}
				,
				{
					label: label2,
					fillColor : "rgba(246,124,55,0.2)",
					strokeColor : "rgba(246,124,55,1)",
					pointColor : "rgba(246,124,55,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(248,185,40,1)",
					data : data2,
				}
			]

		};


  	var max=0;
  	for(var i=0;i<surveyParticipationRate.length;i++){
  		console.log(max);
  		var curMax=Math.max.apply(null, surveyParticipationRate[i].data);
  		if(max<curMax){
  			max=curMax;
  		}
  	}

	max+=10;
	var step  = (max/5).toFixed(0);
	var start = 0;
	var chartDesktop = new Chart(ctx).Line(lineChartData, {
		responsive: true,
		scaleOverride: true,
		scaleSteps: Math.ceil((max-start)/step),
		scaleStepWidth: step,
		scaleStartValue: start,
		// String - Template string for single tooltips
		tooltipTemplate:"<%= value %> : <%= datasetLabel %>",
		// String - Template string for multiple tooltips
		multiTooltipTemplate: "<%= value %> : <%= datasetLabel %>",
	});
/*	var chartMobile = new Chart(ctx_mobile).Line(lineChartData, {
		responsive: true,
		scaleOverride: true,
		scaleSteps: Math.ceil((max-start)/step),
		scaleStepWidth: step,
		scaleStartValue: start,
		// String - Template string for single tooltips
		tooltipTemplate: "<%= value %> : <%= datasetLabel %>",
		// String - Template string for multiple tooltips
		multiTooltipTemplate: "<%= value %> : <%= datasetLabel %>",
	});*/

	});
};

var resetViewModel = function ( obj, whitelist ) {
    for ( var prop in obj ) {
        if ( obj.hasOwnProperty( prop ) && ko.isObservable( obj[ prop ] ) && whitelist.indexOf( prop ) === -1 ) {
            obj[ prop ]( undefined );
        }
    }
};

var resetViewModelObject = function(viewObject){
	resetViewModel(viewObject,[]);
};

var handleSurveyNavigationExceptions=function(){
	//var r = $.Deferred();
	if (currentQuestionObject.IdQuestionType()){
		switch(currentQuestionObject.IdQuestionType()){
		case "1": case "6":
			window.history.pushState("Title", "#feedback_text" );
			$.mobile.changePage($('#feedback_text'), { allowSamePageTransition: true });
			//r.resolve();
			break;
		case "2":
			window.history.pushState("Title", "#feedback_rating" );
			$.mobile.changePage($('#feedback_rating'), { allowSamePageTransition: true });
			//r.resolve();
			break;
		case "3": case "5": case "7":
			window.history.pushState("Title", "#feedback_options" );
			$.mobile.changePage($('#feedback_options'), { allowSamePageTransition: true });
			//r.resolve();
			break;
		case "4":
			window.history.pushState("Title", "#feedback_numeric_rating" );
			$.mobile.changePage($('#feedback_numeric_rating'), { allowSamePageTransition: true });
			//r.resolve();
			break;
		case "8":
			window.history.pushState("Title", "#feedback_matrix" );
			$.mobile.changePage($('#feedback_matrix'), { allowSamePageTransition: true });
			//r.resolve();
			break;
		}
		if(currentQuestionObject.IsPage()==="1"){
			window.history.pushState("Title", "#survey_page" );
			$.mobile.changePage($('#survey_page'), { allowSamePageTransition: true });
			//r.resolve();
		}
	}
	else{
		//r.resolve();

	}
	//return r;
};



/*$().ready(function() {
	var $scrollingDiv = $("#title_quest_div_top");

	$(window).scroll(function(){
		if($(window).width()<901){
		$scrollingDiv.finish().animate({"marginTop": ($(window).scrollTop() + 0) + "px"}, 0, "slow" );
		}
	});
});
*/



/* --------------------------- Survey pages: --------------------------- */

ko.applyBindings(surveysObject, document.getElementById("feedback_start"));
//ko.applyBindings(surveysObject, document.getElementById("content_feedback_start"));
//ko.applyBindings(surveysObject, document.getElementById("bottom_note"));
ko.applyBindings(surveysObject, document.getElementById("paymentinfo_recognize_content"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_content_text"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_text"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_text_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_write_message_feedback_text"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_rating_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_rating"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_options"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_options"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_options_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_options"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_numeric_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_numeric_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_numeric_rating_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_numeric_rating"));

ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_numeric_rating_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_numeric_rating"));


ko.applyBindings(currentQuestionObject, document.getElementById("header_matrix"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_matrix"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_matrix_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_matrix"));

ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_matrix_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_matrix"));




ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_options_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_options"));

ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_rating_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_rating"));

ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_text_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_feedback_text"));

ko.applyBindings(currentQuestionObject, document.getElementById("feedbackInfo_controlls_header_desktop"));
ko.applyBindings(currentQuestionObject, document.getElementById("feedbackInfo_controlls_footer_desktop"));


ko.applyBindings(currentQuestionObject, document.getElementById("header_survey_page"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_survey_page"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_survey_page_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_survey_page2"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_survey_page_mobile"));
ko.applyBindings(currentQuestionObject, document.getElementById("right_controlgroup_survey_page"));

ko.applyBindings(currentQuestionObject, document.getElementById("survey_page_content"));



$('#controls_feedback_survey_page2').click(function(){
	currentQuestionObject.survey_page_next_click();
});


//ko.applyBindings(testSurveyPage, document.getElementById("survey_page"));

//ko.applyBindings(surveyReports, document.getElementById("content_survey_results"));

$(document).on('pagecreate', '#feedback_start', function () {
	/*alert('before create');
	handleSurveyNavigationExceptions();*/
});


$(document).on('pagebeforeshow', '#survey_page', function () {
//	$("select").selectmenu({ style: 'dropdown' });

	for(var j=0;j<currentQuestionObject.PageQuestions().length;j++){
		if(currentQuestionObject.PageQuestions()[j].IsMultiChoice()==3){
			if(currentQuestionObject.PageQuestions()[j].IdQuestionType()==="7"){
				
				if($(".datepicker").not('#survey_page .datepicker').length > 0){
					$(".datepicker").not('#survey_page .datepicker').remove();
				}
				
				console.log('IdQuestionType()===7');
				for(var i=0;i < currentQuestionObject.PageQuestions()[j].HowManyDropdowns();i++){


					$("#datepicker_"+currentQuestionObject.PageQuestions()[j].IdSurveyQuestions()+'_'+i).val(currentQuestionObject.PageQuestions()[j].NumericAnswerForMulti()[i])

					$("#datepicker_"+currentQuestionObject.PageQuestions()[j].IdSurveyQuestions()+'_'+i).datepicker("refresh");
				}
			}else{
				for(var i=0;i < currentQuestionObject.PageQuestions()[j].HowManyDropdowns();i++){
					$("#odg"+currentQuestionObject.PageQuestions()[j].IdSurveyQuestions()+"_"+i).selectmenu({ style: 'dropdown' });
					$("#odg"+currentQuestionObject.PageQuestions()[j].IdSurveyQuestions()+"_"+i).val(currentQuestionObject.PageQuestions()[j].NumericAnswerForMulti()[i]);
					$("#odg"+currentQuestionObject.PageQuestions()[j].IdSurveyQuestions()+"_"+i).selectmenu("refresh");
				}
			}
		}
		
		if(currentQuestionObject.PageQuestions()[j].IdQuestionType()==="8"){
			currentQuestionObject.PageQuestions()[j].MatrixAnswers().forEach(function(element) {
				if(currentQuestionObject.PageQuestions()[j].IsMultiChoice()==0){
					  $('#'+element.RadioId).prop("checked", true);
				}else{
					element.CheckboxId.forEach(function(checkbox) {
						$('#'+checkbox).prop("checked", true);
					});

				}
			}); 

		}
	}


	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	$("textarea").val("");

	$(window).scroll(function() {
			if($(window).scrollTop() > 49){
				$('.scroller_panel').addClass('DescScroll');
			} else {
				$(".scroller_panel").removeClass("DescScroll");
			}
	});

	showDescription();
	$.mobile.activePage.trigger('create');

});


$(document).on('pageshow', '#survey_page', function () {
	var oldVal = "";
	$("textarea").on('change keyup paste drop', function() {

		autosize(this);

		var currentVal = $(this).val();

	    var idto = this.id;
	    $.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if (idto.indexOf(value.IdSurveyQuestions()) >= 0){
				value.TextAnswer(currentVal);
				return;
			}
	    });
	});		



	$(".ddlOptionsOnPage").off().on('change', function($data){
		console.log($data)
		var i;
		var idto = this.id;
		var valval = this.value;
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			console.log(idto);
			console.log(valval);


			if (idto.indexOf("odg"+value.IdSurveyQuestions()+"_") >= 0){
				if(currentQuestionObject.PageQuestions()[index].IsMultiChoice()==3){ //dropdowns

					currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti([]);
					for(var i=0;i < currentQuestionObject.PageQuestions()[index].HowManyDropdowns();i++){
						console.log(parseInt($("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val(),0));
						if(parseInt($("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val(),0)!=NaN && $("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val()!=""){ //something is selected
							currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push($("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val());

//							$("#odg"+value.IdSurveyQuestions()+"_"+i).selectmenu("refresh");

						}
						if(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti().length===0){
							currentQuestionObject.PageQuestions()[index].NumericAnswer("-1");	
						}else{
							currentQuestionObject.PageQuestions()[index].NumericAnswer(undefined);
						}
//							$("#odg"+value.IdSurveyQuestions()+"_"+i).selectmenu({ style: 'dropdown' });
						$("#odg"+value.IdSurveyQuestions()+"_"+i).selectmenu("refresh");
					}
				}
			}
	    });
	});



	$(".radioForMultiOptions, .radioForMultiChoiceMultiPage").off().on('click', function($data){
		console.log($data)
		var i;
		var idto = this.id;
		var valval = this.value;
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			console.log(idto);

			if (idto.indexOf("odg"+value.IdSurveyQuestions()+"_") >= 0){
				if(currentQuestionObject.PageQuestions()[index].IsMultiChoice()!=3){
					if($("#"+idto).is(":checked")){
						console.log($("#"+idto).val());
						currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push($("#"+idto).val());
						console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti());
						value.AllowCantSayValue(false);
					}else{
						for (var i=currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti().length-1; i>=0; i--) {
						    if (currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti()[i] === $("#"+idto).val()) {
						    	currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.splice(i, 1);
						    	//console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti())
						    	value.AllowCantSayValue(false);

						    }
						}
					}
					if(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti().length===0){
						currentQuestionObject.PageQuestions()[index].NumericAnswer("-1");	
					}else{
						currentQuestionObject.PageQuestions()[index].NumericAnswer(undefined);
					}
				}else{ //dropdowns

					currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti([]);
					for(var i=0;i < currentQuestionObject.PageQuestions()[index].HowManyDropdowns();i++){
						if(parseInt($("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val(),0)){ //something is selected
							currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push($("#odg"+value.IdSurveyQuestions()+"_"+i+" option:selected").val());
						}
					}

				}
			}
	    });
	});

	
	
	
	$(".matrixRadio").off().on('click', function($data){
		console.log($data)
		var i;
		var idto = this.id; 
		var val = this.value;
		var name = this.name;
		$.each(currentQuestionObject.PageQuestions(), function(indexQ, valueQ) {

			if (idto.indexOf("_idQ"+valueQ.IdSurveyQuestions()+"_") >= 0){
				i=idto.substr(0, idto.indexOf('_')); 		
				
				currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i]={TextAnswer:name,NumericAnswer:[val],RadioId:idto}
				
			}
	    });
	});
	
	
	$(".matrixCheckbox").off().on('click', function($data){
		console.log($data)
		var i;
		var idto = this.id; 
		var val = this.value;
		var name = this.name;
		var isChecked=$(this).is(':checked');
		$.each(currentQuestionObject.PageQuestions(), function(indexQ, valueQ) {

			if (idto.indexOf("_idQ"+valueQ.IdSurveyQuestions()+"_") >= 0){
				i=idto.substr(0, idto.indexOf('_')); 		
				
				
				if(isChecked) //check
				{	
					if(!currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i]){ //first check per option
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i]={TextAnswer:name,NumericAnswer:[val],CheckboxId:[idto]}
			
					}else{ //there is at least one checked rating for this option
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].NumericAnswer.push(val); 
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].CheckboxId.push(idto);
					}
				
				}else{ //uncheck
					if(currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].NumericAnswer.length===1){ //last checked rating per this option
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers().splice(i,1);
					}else{ // there is at least one more checked rating left per this option
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].NumericAnswer.splice(currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].NumericAnswer.indexOf(val),1); 
						currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].CheckboxId.splice(currentQuestionObject.PageQuestions()[indexQ].MatrixAnswers()[i].CheckboxId.indexOf(idto),1);
						
					}
					
				}
				
				
				
				
				
				
				
				
				
				
				
				
			}
	    });
	});
	
	$("input[type='radio']").on('change touchend', function($data){

		var i;
		var idto = this.id;
		var valval = this.value;
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			console.log(idto);
			console.log(valval);


			if (idto.indexOf("odg"+value.IdSurveyQuestions()+"_") >= 0){
				value.NumericAnswer(valval);
				value.AllowCantSayValue(false); // remove cant say
				console.log(value.NumericAnswer());


				if(value.IsSkippingQuestion()){
					currentQuestionObject.SkipToPageValue(undefined);
	    			currentQuestionObject.SkipToPageId(undefined);
					for(i=0;i<value.QuestionOptions().length;i++){
			    		if(value.NumericAnswer()==value.QuestionOptions()[i].Value()){
			    			console.log(value.QuestionOptions()[i].Value());
			    			console.log(value.QuestionOptions()[i].SkipToPageNumber());
			    			console.log(value.QuestionOptions()[i].SkipToIdPage());
			    			currentQuestionObject.SkipToPageValue(value.QuestionOptions()[i].SkipToPageNumber());
			    			currentQuestionObject.SkipToPageId(value.QuestionOptions()[i].SkipToIdPage());

			    		}
			    	}
				}

    			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageValue(currentQuestionObject.SkipToPageValue());
    			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageId(currentQuestionObject.SkipToPageId());

				if(currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0){
        			currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());

		    	}else{
		    		currentQuestionObject.NextQuestionNo(currentQuestionObject.QuestionNo()+1);
		    	}
				return;
			}
	    });
	});

	$.each($('textarea'),function(index,value){
		//console.log(value);
		autosize(value);
	});
	
	
	
	for(var i=0; i < currentQuestionObject.PageQuestions().length; i++){
		if(currentQuestionObject.PageQuestions()[i].IdQuestionType() == 6 && currentQuestionObject.PageQuestions()[i].TextareaSmall() == 1){						
			
			$("#message_txt_area_box_" + currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("min-height", "50px");
			var el = $("#message_txt_area_" + currentQuestionObject.PageQuestions()[i].IdSurveyQuestions());
			if(el.val() == ""){
				el.attr("rows", 1).css({"min-height":"50px", "height":""});
			}
			else if (el.val() != ""){			
				//el.css("height","").attr("rows",1).height(el[0].scrollHeight - d);
				el.attr("rows", 1).css({"min-height":"50px", "height":""}).height(el[0].scrollHeight); //-d;
			}
			
			el.on("input", function(){
				
				if(el.val() == ""){
					el.attr("rows", 1).css({"min-height":"50px", "height":""});					
				}
				
//				if(/Android|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent)){
//					var s = el[0].scrollHeight;
//					$(el).css("height", "auto").css("height", this.scrollHeight);
//					$("html").scrollTop(s);
//				}
			});
		}
	}
	

	$('textarea').trigger('keydown');
	ResetValidation();
	Schortcut();
});

$(document).on('pageshow', '#survey_page', function () {


	// remove cant say
//    $("input[type='checkbox'][name='cantSayCheckBox']").checkboxradio();

    var userAgent = window.navigator.userAgent;
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        $.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if(value.IdQuestionType()==="4"){//rating
				// remove cant say
//				$("#cantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.AllowCantSayValue()){
					// remove cant say
//					$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
				}
				else{
					// remove cant say
//					$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
					if(value.NumericAnswer()){
						//alert(value.NumericAnswer()+" - rate");
						//$("#feedback_rating_options_" + value.IdSurveyQuestions() + ">input[name=photo_questions_"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true).change();
						//$("input[id=odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).prop('checked', true);
						//$("input[name=photo_questions_"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).prop('checked', true);
					}

				}
			}
			else
				if(value.IdQuestionType()==="5"){//options
					// remove cant say
//				$("#cantSayCheckBoxOptions_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.AllowCantSayValue()){
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
				}
				else{
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
					if(value.NumericAnswer()!==undefined || value.NumericAnswerForMulti()!==undefined){
						//alert(value.NumericAnswer()+" - opt");
						//$("input[id=odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).attr('checked', 'checked');
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).prop('checked', true);
						for(var i=0; i<value.NumericAnswerForMulti().length;i++){
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswerForMulti()[i]+"]").prop('checked', true);

						}
					}

				}

			}
			else
				if(value.IdQuestionType()==="6"){
//				$("#cantSayCheckBoxText_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.TextAnswer() && value.TextAnswer()!=="" && value.TextAnswer()!==" "){
					$("#message_txt_area_"+value.IdSurveyQuestions()).val(value.TextAnswer());
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
				}
				else{
					if(value.AllowCantSayValue()){
//						$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).addClass("message_txt_area_inactive");
					}
					else{
//						$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
					}
				}
				if(value.AllowCantSayValue()){
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).addClass("message_txt_area_inactive");
				}
				else{
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
				}
			}
			else if(value.IdQuestionType()==="7"){ //datepicker

				console.log(value.DateFrom(),value.DateTo());
//					$('.datepicker').datepicker(
//							{
//
//			        	minDate : value.DateFrom(),
//			        	maxDate : value.DateTo()
//			    	}
//				);						
				if($("input.datepicker").not(".ui-input-text .ui-body-d").length > 0){
					$("input.datepicker").not(".ui-input-text .ui-body-d").remove();				
				}
				
				for(var i=0;i < value.HowManyDropdowns(); i++){
										
					$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).datepicker({
						minDate : value.DateFrom(),
						maxDate : value.DateTo()
					});
										
				}
				
				$(".datepicker").change(function() {
//						debugger;
					value.NumericAnswerForMulti([]);
					for(var i=0;i < value.HowManyDropdowns();i++){
						if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).val()){ //something is selected
							value.NumericAnswerForMulti.push($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).val());
							
							if(value.NumericAnswerForMulti().length == value.HowManyDropdowns()){
//									if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent().css("border") != ""){ // if element has validation error border
//										$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent().css("border","none");
//									}	
								if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent()[0].style.border != "" ){
									$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent()[0].style.border = "none";
								}
							}

						}
					}

					value.AllowCantSayValue(false); // remove cant say
					value.SkipToPageValue(undefined);
					value.SkipToPageId(undefined);
					value.OptionEndSurveyValue(undefined);
				});
			}
		});
    }
	else{
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if(value.IdQuestionType()==="4"){//rating
				// remove cant say
//				$("input[id*=cantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()+"]").prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
					if(value.AllowCantSayValue()){
						// remove cant say
//						$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
					}
					else{
						// remove cant say
//						$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
						if(value.NumericAnswer()){
							console.log(value.NumericAnswer()+" - rate");
							console.log($("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]"));
							//$("#feedback_rating_options_" + value.IdSurveyQuestions() + ">input[name=photo_questions_"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true).change();
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);
							//$("input[name=photo_questions_"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);

						}

					}
			}
			else if(value.IdQuestionType()==="5"){//options
				// remove cant say
//				$("input[id*=cantSayCheckBoxOptions_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');

				if(value.AllowCantSayValue()){
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
				}
				else{
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
					if(value.NumericAnswer()!==undefined || value.NumericAnswerForMulti()!==undefined){
						//$("#cantSayCheckBoxText_").value(value.TextAnswer());
							//$("#feedback_rating_options_" + value.IdSurveyQuestions() + ">input[name=photo_questions_"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true).change();
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);
							for(var i=0; i<value.NumericAnswerForMulti().length;i++){
								$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswerForMulti()[i]+"]").prop('checked', true);

							}
					}
				}

//				ace
				$("#feedback_rating_options_" + value.IdSurveyQuestions() + ">input:radio").change(function(){

					    	console.log("change");
					    	console.log("value.IdSurveyQuestions(): "+value.IdSurveyQuestions());
					    	console.log("checkPageOptionEndSurvey: "+checkPageOptionEndSurvey(value.IdSurveyQuestions(), $(this).val()));
//
						    	value.NumericAnswer($(this).val());
						    	if(checkPageOptionEndSurvey(value.IdSurveyQuestions(), $(this).val())){
						    		value.OptionEndSurveyValue("1");
						    	}
						    	else{
						    		value.OptionEndSurveyValue("0");
						    	}
//					    	});
				});

			}
			else if(value.IdQuestionType()==="6"){
//				$("input[id*=cantSayCheckBoxText_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.TextAnswer() && value.TextAnswer()!=="" && value.TextAnswer()!==" "){
					$("#message_txt_area_"+value.IdSurveyQuestions()).val(value.TextAnswer());
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
				}
				else{
					if(value.AllowCantSayValue()){
//						$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).addClass("message_txt_area_inactive");
					}
					else{
//						$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
					}
				}
				if(value.AllowCantSayValue()){
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).addClass("message_txt_area_inactive");
				}
				else{
//					$(".DIVmessage_txt_area_cantSayCheckBoxText_"+value.IdSurveyQuestions()).removeClass("message_txt_area_inactive");
				}
			}else if(value.IdQuestionType()==="7"){ //datepicker

				console.log(value.DateFrom(),value.DateTo());
//				$('.datepicker').datepicker(
//						{
//
//		        	minDate : value.DateFrom(),
//		        	maxDate : value.DateTo()
//		    	}
//			);						
				if($("input.datepicker").not(".ui-input-text .ui-body-d").length > 0){
					$("input.datepicker").not(".ui-input-text .ui-body-d").remove();				
				}
				
				for(var i=0;i < value.HowManyDropdowns(); i++){
										
					$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).datepicker({
						minDate : value.DateFrom(),
						maxDate : value.DateTo()
					});
										
				}
				
				$(".datepicker").change(function() {
//					debugger;
					value.NumericAnswerForMulti([]);
					for(var i=0;i < value.HowManyDropdowns();i++){
						if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).val()){ //something is selected
							value.NumericAnswerForMulti.push($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).val());
							
							if(value.NumericAnswerForMulti().length == value.HowManyDropdowns()){
//								if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent().css("border") != ""){ // if element has validation error border
//									$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent().css("border","none");
//								}
								if($("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent()[0].style.border != "" ){
									$("#datepicker_"+value.IdSurveyQuestions()+'_'+i).parent().parent()[0].style.border = "none";
								}
							}

						}
					}

					value.AllowCantSayValue(false); // remove cant say
					value.SkipToPageValue(undefined);
					value.SkipToPageId(undefined);
					value.OptionEndSurveyValue(undefined);
					});


			}
		});		
	}




/*
	var oldVal = "";
	$("textarea").on('change keyup paste', function() {

		var currentVal = $(this).val();

	    if(currentVal == oldVal) {
	        return; //check to prevent multiple simultaneous triggers
	    }
	    oldVal = currentVal;
	    var idto = this.id;
	    $.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if (idto.indexOf(value.IdSurveyQuestions()) >= 0){
				value.TextAnswer(currentVal);
				return;
			}
	    });
	});

*/



});


$(document).on('pagebeforeshow', '#feedback_start', function () {
	//alert('before show');
	$.when(
			function(){
				//var r = $.Deferred();
				if(currentQuestionObject.IdQuestionType()){
					switch(currentQuestionObject.IdQuestionType()){
					case "1": case "6":
						window.history.pushState("Title", "#feedback_text" );
						$.mobile.changePage($('#feedback_text'), { allowSamePageTransition: true });
						//r.resolve();
						break;
					case "2":
						window.history.pushState("Title", "#feedback_rating" );
						$.mobile.changePage($('#feedback_rating'), { allowSamePageTransition: true });
						//r.resolve();
						break;
					case "3": case "5": case "7":
						window.history.pushState("Title", "#feedback_options" );
						$.mobile.changePage($('#feedback_options'), { allowSamePageTransition: true });
						//r.resolve();
						break;
					case "4":
						window.history.pushState("Title", "#feedback_numeric_rating" );
						$.mobile.changePage($('#feedback_numeric_rating'), { allowSamePageTransition: true });
						//r.resolve();
						break;
					case "8":
						window.history.pushState("Title", "#feedback_matrix" );
						$.mobile.changePage($('#feedback_matrix'), { allowSamePageTransition: true });
						//r.resolve();
						break;
					}
					if(currentQuestionObject.IsPage()==="1"){
						window.history.pushState("Title", "#survey_page" );
						$.mobile.changePage($('#survey_page'), { allowSamePageTransition: true });
						//r.resolve();
					}
				}
				else{

					//r.resolve();
				}
				//return r;
			}
	).then(function(){
		if (getCookie('currS')) {
			surveysObject.GetSurveyById(getCookie('currS'),"param",document.cookie).done(CurrentQuestionNewInstance); //<- Ova go menuvam vo redirektot od index.html
		}
		else location.href = "index.html";
	});

});

$(document).on('pageshow', '#feedback_start', function () {

	$('.loading').fadeOut();
	Schortcut();
});

$('#btn_feedback_start_next,#btn_feedback_start_next_mobile').click(function(){
	currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	fillCurrentQuestionValues(question);
	surveyNavigate();
});

$('#btn_feedback_start_previous,#btn_feedback_start_previous_mobile').click(function(){
	homeModelObject.checkIfSessionExpired();

	resetViewModelObject(currentQuestionObject);
	$.mobile.changePage($('#current_surveys'));
});

$(document).on('pagebeforeshow', '#feedback_text', function () {
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	console.log(currentQuestionObject.IdQuestionType() + "<<");
	if(currentQuestionObject.IdQuestionType()=="6"){
		$(".message_txt_area").removeClass("message_expandable message_d2");
		$(".message_txt_area").addClass("message_simpleMSG");
	}
	else if(currentQuestionObject.IdQuestionType()=="1"){
		$(".message_txt_area").addClass("message_expandable message_d2");
		$(".message_txt_area").removeClass("message_simpleMSG");
	}

});

$("#icon_delete_searchsent_surveys").click(function() {
	$("#search-basic").val('');
	sentSurveysForUser.search('');
});


$(document).on('pagebeforeshow', '#feedback_rating', function () {

	if (engagePulseSurveys.isPulseSurvey()==1){
		var images = new Array();
		function preload() {
			for (i = 0; i < preload.arguments.length; i++) {
				images[i] = new Image()
				images[i].src = preload.arguments[i]
			}
		}
		preload(
				"images/SurveyTemplates/feel1.png",
				"images/SurveyTemplates/feel2.png",
				"images/SurveyTemplates/feel3.png",
				"images/SurveyTemplates/feel4.png",
				"images/SurveyTemplates/feel5.png",
				"images/SurveyTemplates/rate_star1.png",
				"images/SurveyTemplates/rate_star2.png",
				"images/SurveyTemplates/rate_star3.png",
				"images/SurveyTemplates/rate_star4.png",
				"images/SurveyTemplates/rate_star5.png"
		);
	}
	$("#min_tick_slide").text(currentQuestionObject.QuestionOptions()[0].TextDescription());
	$("#max_tick_slide").text(currentQuestionObject.QuestionOptions()[currentQuestionObject.QuestionOptions().length-1].TextDescription());
	var maxRate = currentQuestionObject.QuestionOptions().length;
	$("#imgMerchantLogo").removeAttr('src');
		//resizeSurveyTitleHeight();
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	console.log(currentQuestionObject.NumericAnswer() + " fff");
		$('#slider-feedback-rating').attr({ min: currentQuestionObject.RateFrom(), max: currentQuestionObject.RateTo(), step: currentQuestionObject.RateStep(),value:undefined});

		if(currentQuestionObject.NumericAnswer()){
			if(!currentQuestionObject.AllowCantSayValue()){
				$('#slider-feedback-rating').val(currentQuestionObject.NumericAnswer());
				$(".image_gift_cart").removeClass("card_logo_initial");
				$(".outt").css("display", "block");
			}
			else{
				//$('#slider-feedback-rating').val(currentQuestionObject.RateTo());
				$('#slider-feedback-rating').val(undefined);
				$(".image_gift_cart").addClass("card_logo_initial");
				$(".outt").css("display", "none");
			}

			$('#slider-feedback-rating').slider("refresh");
		}
		else{
			//$('#slider-feedback-rating').val(currentQuestionObject.RateTo());
			$('#slider-feedback-rating').val(undefined);
			//currentQuestionObject.NumericAnswer($('#slider-feedback-rating').val());
			currentQuestionObject.NumericAnswer(undefined);
			$(".image_gift_cart").addClass("card_logo_initial");
			$(".outt").css("display", "none");
		}

		$( '#slider-feedback-rating' ).on( 'slidestart', function( event ) {
			$(".image_gift_cart").removeClass("card_logo_initial");
			$(".outt").css("display", "block");
		});

		$('#slider-feedback-rating').on( 'change', function( event ) {

			/*$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
			currentQuestionObject.NumericAnswer($('#slider-feedback-rating').val());*/
			//if(engagePulseSurveys.isPulseSurvey()==1 && maxRate!=5){
			if(engagePulseSurveys.isPulseSurvey()==1){
				changeAwardImageAnniversariesForPulseSurvey(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),maxRate);
			}else{
				changeAwardImageAnniversaries(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),$('#text_feedback-rating'));
			}
		});
		$('#slider-feedback-rating').on( 'slidestop', function( event ) {
			$(".image_gift_cart").removeClass("card_logo_initial");
			$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
			currentQuestionObject.NumericAnswer($('#slider-feedback-rating').val());
			currentQuestionObject.AllowCantSayValue(false); // remove cant say

//			changeAwardImageAnniversaries(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),$('#text_feedback-rating'));


			//Skip Logic
			console.log("Skip Logic");
	    	currentQuestionObject.SkipToPageValue(undefined);
			currentQuestionObject.SkipToPageId(undefined);

	    	for(i=0;i<currentQuestionObject.QuestionOptions().length;i++){
	    		if(currentQuestionObject.NumericAnswer()==currentQuestionObject.QuestionOptions()[i].Value()){
	    			currentQuestionObject.SkipToPageValue(currentQuestionObject.QuestionOptions()[i].SkipToPageNumber());
	    			currentQuestionObject.SkipToPageId(currentQuestionObject.QuestionOptions()[i].SkipToIdPage());
	    		}
	    	}
	    	if(currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0){
    			currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());

	    	}else{
	    		currentQuestionObject.NextQuestionNo(currentQuestionObject.QuestionNo()+1);
	    	}
			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageValue(currentQuestionObject.SkipToPageValue());
			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageId(currentQuestionObject.SkipToPageId());
			//Skip Logic End

		});
		$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
		$('#slider-feedback-rating').slider("refresh");
		if(maxRate == 5 && engagePulseSurveys.isPulseSurvey()==0){
			changeAwardImageAnniversaries(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),$('#text_feedback-rating'));
		}else{
			if(maxRate == 5 && engagePulseSurveys.isPulseSurvey()==1){
				changeAwardImageAnniversariesForPulseSurvey(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),maxRate);
			}
		}
});



$(document).on('pagebeforeshow', '#feedback_options', function () {



		//resizeSurveyTitleHeight();
	if(currentQuestionObject.IdQuestionType()==="7"){
		console.log('IdQuestionType()===7');
		for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){


			$("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val(currentQuestionObject.NumericAnswerForMulti()[i])

			$("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).datepicker("refresh");
		}
	}else{
		for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){

			$("#feedback_dropdown_options_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).selectmenu({ style: 'dropdown' });
			$("#feedback_dropdown_options_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val(currentQuestionObject.NumericAnswerForMulti()[i])

			$("#feedback_dropdown_options_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).selectmenu("refresh");
		}
	}


	var i;
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		if(!currentQuestionObject.AllowCantSayValue() && currentQuestionObject.IdQuestionType()!="7"){
			$("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions() +"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
			for(var i=0; i<current_question.NumericAnswerForMulti().length;i++){
				$("#feedback_rating_options_" + current_question.IdSurveyQuestions() + ">input[name=photo_questions_"+current_question.IdSurveyQuestions() +"][value="+current_question.NumericAnswerForMulti()[i]+"]").prop('checked', true);

			//	$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswerForMulti()[i]+"]").prop('checked', true);

			}
		}
		if(currentQuestionObject.IsMultiChoice()===0 && currentQuestionObject.IdQuestionType()!=="7"){

			$(".radioForOptions").change(function(){
						currentQuestionObject.NumericAnswer($(this).val());
						currentQuestionObject.AllowCantSayValue(false); // remove cant say
						if(checkOptionEndSurveyByValue($(this).val())){
							currentQuestionObject.OptionEndSurveyValue("1");
						}
						else{
							currentQuestionObject.OptionEndSurveyValue("0");
						}
						//Skip Logic
						currentQuestionObject.SkipToPageValue(undefined);
						currentQuestionObject.SkipToPageId(undefined);

						for(i=0;i<currentQuestionObject.QuestionOptions().length;i++){
							if(currentQuestionObject.NumericAnswer()==currentQuestionObject.QuestionOptions()[i].Value()){
								currentQuestionObject.SkipToPageValue(currentQuestionObject.QuestionOptions()[i].SkipToPageNumber());
								currentQuestionObject.SkipToPageId(currentQuestionObject.QuestionOptions()[i].SkipToIdPage());
							}
						}
						if(currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0){
							currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());

						}else{
							currentQuestionObject.NextQuestionNo(currentQuestionObject.QuestionNo()+1);
						}
						surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageValue(currentQuestionObject.SkipToPageValue());
						surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageId(currentQuestionObject.SkipToPageId());
						//Skip Logic End

					}
			);
		}else if(currentQuestionObject.IsMultiChoice()===1 && currentQuestionObject.IdQuestionType()!=="7"){

			$(".radioForMultiOptions").click(function(){
				currentQuestionObject.NumericAnswerForMulti([]);
				//console.log(currentQuestionObject.NumericAnswerForMulti());
						for(var i=0;i < $("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input:checkbox").length;i++){
							if($("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input:checkbox")[i].checked==true){
								currentQuestionObject.NumericAnswerForMulti.push($("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input:checkbox")[i].value);
				//				console.log(currentQuestionObject.NumericAnswerForMulti());
							}
						}

						currentQuestionObject.AllowCantSayValue(false); // remove cant say
						currentQuestionObject.SkipToPageValue(undefined);
						currentQuestionObject.SkipToPageId(undefined);
						currentQuestionObject.OptionEndSurveyValue(undefined);


					}
			);
		}else if(currentQuestionObject.IsMultiChoice()===3 && currentQuestionObject.IdQuestionType()!=="7"){

			$(".ddlOptions").change(function() {

				currentQuestionObject.NumericAnswerForMulti([]);
						for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){
							if($("#feedback_dropdown_options_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val()){ //something is selected
								currentQuestionObject.NumericAnswerForMulti.push($("#feedback_dropdown_options_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val());

							}
						}

						currentQuestionObject.AllowCantSayValue(false); // remove cant say
						currentQuestionObject.SkipToPageValue(undefined);
						currentQuestionObject.SkipToPageId(undefined);
						currentQuestionObject.OptionEndSurveyValue(undefined);

					});
		}else if(currentQuestionObject.IdQuestionType()==="7"){
			$('.datepicker').datepicker(
					{

	        	minDate : currentQuestionObject.DateFrom(),
	        	maxDate : currentQuestionObject.DateTo()
	    	}
		);
			$(".datepicker").change(function() {

				currentQuestionObject.NumericAnswerForMulti([]);
				for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){
					if($("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val()){ //something is selected
						currentQuestionObject.NumericAnswerForMulti.push($("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val());

					}
				}

				currentQuestionObject.AllowCantSayValue(false); // remove cant say
				currentQuestionObject.SkipToPageValue(undefined);
				currentQuestionObject.SkipToPageId(undefined);
				currentQuestionObject.OptionEndSurveyValue(undefined);			});


		}

$('select').attr('data-role', 'none', 'data-enhance', 'false');
$('select').attr('data-enhance', 'false');
//$.mobile.ignoreContentEnabled = true;
$.mobile.keepNative = "select,input";
$.mobile.activePage.trigger('create');
});

$(document).on('pagebeforeshow', '#feedback_numeric_rating', function () {
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	//resizeSurveyTitleHeight();
	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	if(!currentQuestionObject.AllowCantSayValue()){
		//$("input[name=photo_questions_"+currentQuestionObject.QuestionNo()+"][value="+current_question.NumericAnswer()+"]").attr('checked', 'checked');
		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
	}
	
	for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){

		$("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).selectmenu({ style: 'dropdown' });
		$("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val(currentQuestionObject.NumericAnswerForMulti()[i])

		$("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).selectmenu("refresh");
	}
	
	if(currentQuestionObject.IsMultiChoice()===3){

		$(".ddlOptions").change(function() {

			currentQuestionObject.NumericAnswerForMulti([]);
					for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){
						console.log(parseInt($("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val(),0));

						if(parseInt($("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val(),0)!=NaN&&$("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val()!=""){ //something is selected
							currentQuestionObject.NumericAnswerForMulti.push($("#feedback_dropdown_numeric_"+currentQuestionObject.IdSurveyQuestions()+'_'+i+" option:selected").val());

						}
					}

					currentQuestionObject.AllowCantSayValue(false); // remove cant say
					currentQuestionObject.SkipToPageValue(undefined);
					currentQuestionObject.SkipToPageId(undefined);
					currentQuestionObject.OptionEndSurveyValue(undefined);

				}


		);
	}
	
	
	
	$("#feedback_rating_options_"+currentQuestionObject.IdSurveyQuestions()+">input:radio").change(

			    function(){
			    	currentQuestionObject.NumericAnswer($(this).val());
			    	currentQuestionObject.AllowCantSayValue(false); // remove cant say
			    	$("input[name=photo_questions_" + currentQuestionObject.IdSurveyQuestions() + "][value=" + $(this).val() + "]").prop('checked', true);
			    	/*if(checkOptionEndSurveyByValue($(this).val())){
			    		currentQuestionObject.OptionEndSurveyValue("1");
			    	}
			    	else{
			    		currentQuestionObject.OptionEndSurveyValue("0");
			    	}*/

			    	//Skip Logic
			    	console.log("Skip Logic");
			    	currentQuestionObject.SkipToPageValue(undefined);
	    			currentQuestionObject.SkipToPageId(undefined);

			    	for(i=0;i<currentQuestionObject.QuestionOptions().length;i++){
			    		if(currentQuestionObject.NumericAnswer()==currentQuestionObject.QuestionOptions()[i].Value()){
			    			currentQuestionObject.SkipToPageValue(currentQuestionObject.QuestionOptions()[i].SkipToPageNumber());
			    			currentQuestionObject.SkipToPageId(currentQuestionObject.QuestionOptions()[i].SkipToIdPage());
			    		}
			    	}
			    	if(currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0){
            			currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());

			    	}else{
			    		currentQuestionObject.NextQuestionNo(currentQuestionObject.QuestionNo()+1);
			    	}
        			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageValue(currentQuestionObject.SkipToPageValue());
        			surveysObject.QuestionList()[currentQuestionObject.QuestionNo()-1].SkipToPageId(currentQuestionObject.SkipToPageId());
			    	//Skip Logic End

			    }
			);
});
$(document).on('pageshow', '#feedback_numeric_rating', function () {
	// remove cant say
//	$("#cantSayCheckBoxNumericRating_"+currentQuestionObject.IdSurveyQuestions()).checkboxradio();
//	$("#cantSayCheckBoxNumericRating_"+currentQuestionObject.IdSurveyQuestions()).prop('checked', currentQuestionObject.AllowCantSayValue()).checkboxradio('refresh');
	if(currentQuestionObject.AllowCantSayValue()){
		// remove cant say
//		$(".DIVcantSayCheckBoxNumericRating_"+currentQuestionObject.IdSurveyQuestions()).addClass("photo_radios_inactive");
	}
	else{
		// remove cant say
//		$(".DIVcantSayCheckBoxNumericRating_"+currentQuestionObject.IdSurveyQuestions()).removeClass("photo_radios_inactive");
	}
	ResetValidation();
	Schortcut();
});


$(document).on('pagebeforeshow', '#feedback_matrix', function () {
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	var index=0;
	
	currentQuestionObject.MatrixAnswers().forEach(function(element) {
		if(currentQuestionObject.IsMultiChoice()==0){
			  $('#'+element.RadioId).prop("checked", true);
		}else{
			element.CheckboxId.forEach(function(checkbox) {
				$('#'+checkbox).prop("checked", true);
			});

		}
	}); 

	
	
	$(".matrixRadio").off().on('click', function($data){
		index=this.id.substr(0, this.id.indexOf('_')); 		
		
		currentQuestionObject.MatrixAnswers()[index]={TextAnswer:this.name,NumericAnswer:[this.value],RadioId:this.id}
		
//		currentQuestionObject.MatrixAnswers().filter(String).length; counter of chosen answer
	});
	
	$(".matrixCheckbox").off().on('click', function($data){
		
		
		index=this.id.substr(0, this.id.indexOf('_')); 
		if($(this).is(':checked')) //check
		{	
			if(!currentQuestionObject.MatrixAnswers()[index]){ //first check per option
				currentQuestionObject.MatrixAnswers()[index]={TextAnswer:this.name,NumericAnswer:[this.value],CheckboxId:[this.id]}
	
			}else{ //there is at least one checked rating for this option
				currentQuestionObject.MatrixAnswers()[index].NumericAnswer.push(this.value); 
				currentQuestionObject.MatrixAnswers()[index].CheckboxId.push(this.id);
			}
		
		}else{ //uncheck
			if(currentQuestionObject.MatrixAnswers()[index].NumericAnswer.length===1){ //last checked rating per this option
				currentQuestionObject.MatrixAnswers().splice(index,1);
			}else{ // there is at least one more checked rating left per this option
				currentQuestionObject.MatrixAnswers()[index].NumericAnswer.splice(currentQuestionObject.MatrixAnswers()[index].NumericAnswer.indexOf(this.value),1); 
				currentQuestionObject.MatrixAnswers()[index].CheckboxId.splice(currentQuestionObject.MatrixAnswers()[index].CheckboxId.indexOf(this.id),1);
				
			}
			
		}
		
		
//		currentQuestionObject.MatrixAnswers().filter(String).length; counter of chosen answer
	});
});
 
$(document).on('pageshow', '#feedback_options', function () {
	$("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions()+">select").remove();



	// remove cant say
//	$("input[type='checkbox'][name='cantSayCheckBox']").checkboxradio();
//	$("input[type='checkbox'][name='cantSayCheckBox']").prop('checked', currentQuestionObject.AllowCantSayValue()).checkboxradio('refresh');
	if(currentQuestionObject.AllowCantSayValue()){
		// remove cant say
//		$(".photo_radios").addClass("photo_radios_inactive");
	}
	else{
		// remove cant say
//		$(".photo_radios").removeClass("photo_radios_inactive");
	}
	ResetValidation();
	Schortcut();
});

$(document).on('pageshow', '#feedback_rating', function () {
	// remove cant say
//	$("#cantSayCheckBoxRating").checkboxradio();
//	$("#cantSayCheckBoxRating").prop('checked', currentQuestionObject.AllowCantSayValue()).checkboxradio('refresh');
	if(currentQuestionObject.AllowCantSayValue()){
		// remove cant say
//		$("#content_feedback_rating").addClass("content_feedback_rating_inactive");
	}
	else{
		// remove cant say
//		$("#content_feedback_rating").removeClass("content_feedback_rating_inactive");
	}
//	ResetValidation();
	Schortcut();
});

$(document).on('pageshow', '#feedbackInfo', function () {
	//resetViewModelObject(currentQuestionObject);
	//resetViewModelObject(surveysObject);
	//surveysObject.IdSurvey(undefined);
	Schortcut();
});


$(document).on('pageshow', '#feedback_text', function () {
	//resizeSurveyTitleHeight();
	//$("#cantSayCheckBoxText").checkboxradio();
//	$("input[type='checkbox'][name='cantSayCheckBox']").checkboxradio();
//	$("input[type='checkbox'][name='cantSayCheckBox']").prop('checked', currentQuestionObject.AllowCantSayValue()).checkboxradio('refresh');
//	if(currentQuestionObject.AllowCantSayValue()){
//		$("#message_txt_area").addClass("message_txt_area_inactive");
//	}
//	else{
//		$("#message_txt_area").removeClass("message_txt_area_inactive");
//	}
	autosize(this);
	$('textarea').trigger('keydown');
	ResetValidation();
	Schortcut();	

	var el = $("#message_txt_area_" + currentQuestionObject.IdSurveyQuestions());
	//d = get the element height without padding + margin + border
	var d = el.innerHeight() - el.height();
	
	if((currentQuestionObject.IdQuestionType() == 1 || currentQuestionObject.IdQuestionType() == 6) && currentQuestionObject.TextareaSmall() == 1){
		
		$("#message_txt_area_box_" + currentQuestionObject.IdSurveyQuestions()).css("min-height", "50px");		
		
		if(el.val() == ""){
			el.attr("rows", 1).css({"min-height":"50px", "height":""});
		}		
		else if (el.val() != ""){					
			el.attr("rows", 1).css({"min-height":"50px", "height":""}).height(el[0].scrollHeight);			
		}							

		el.on("input", function(){
			if(el.val() == ""){
				el.attr("rows", 1).css({"min-height":"50px", "height":""});
			}
		});
	}else if((currentQuestionObject.IdQuestionType() == 1 || currentQuestionObject.IdQuestionType() == 6) && currentQuestionObject.TextareaSmall() == 0){
		
		
		el.attr("rows", 8).css({"min-height":"", "height":""});
		if(el.val() != ""){
			//el.css("height", "auto").css("height", el[0].scrollHeight);
			el.attr("rows", 8).css("height", "auto").css("height", el[0].scrollHeight + d);			
		}
		else if(el.val() == ""){
			el.attr("rows", 8).css({"min-height":"", "height":""});
		}
		
		el.on("input", function(){
			if(el.val() == ""){
				el.css({"min-height":"", "height":""});
			}		
		});		
	}
});


$('#btn_send_feedback,#btn_send_feedback').click(function(){
//	feedback.SendFeedback();
	$.mobile.changePage($('#feedbackInfo'));
});

$(document).on('pagehide', '#feedbackInfo', function () {
	/*feedback.t1(0);
	feedback.t2(0);
	feedback.t3(0);
	feedback.t4(0);
	feedback.t5(0);
	feedback.r1(0);
	feedback.r2(0);
	feedback.r3(0);
	feedback.r4(0);
	feedback.r5(0);
	feedback.f1(0);
	feedback.f1(0);
	feedback.f1(0);
	feedback.f1(0);
	feedback.f1(0);*/
});


function checkOptionEndSurveyByValue(optionValue){
	var endE = false;
	$.each(currentQuestionObject.QuestionOptions(), function(key, value) {
		if(value.Value() === optionValue){
			if(value.OptionEndSurvey()=="1"){
				endE = true;
				return false;
			}
			else{
				endE = false;
			}
		}
	});
	return endE;
};

//ace
function checkPageOptionEndSurvey(id, optionValue){
	var endE = false;
	$.each(currentQuestionObject.PageQuestions(), function(index, val) {
		if(val.IdSurveyQuestions() === id){
			$.each(currentQuestionObject.PageQuestions()[index].QuestionOptions(), function(key, value) {
				if(value.Value() === optionValue){
					if(value.OptionEndSurvey()=="1"){
						endE = true;
						return false;
					}
					else{
						endE = false;
					}
				}
			});
		}
	});
	return endE;
};

function changeAwardImageAnniversaries(recognizeType,$image,$text){
	var rateSystemImages = parseInt(currentQuestionObject.QuestionOptions()[0].ImageUrl());

	var images = [
		"images/SurveyTemplates/rate_star1.png",
		"images/SurveyTemplates/rate_star2.png",
		"images/SurveyTemplates/rate_star3.png",
		"images/SurveyTemplates/rate_star4.png",
		"images/SurveyTemplates/rate_star5.png"
	];
	/*$.each(currentQuestionObject.QuestionOptions(), function(key, value) {
		if(value.Value==recognizeType){
			$('#imgMerchantLogo').attr('src', value.ImageUrl);
			console.log(value.ImageUrl);
			return false;
		}
		console.log(value.ImageUrl);
		//console.log(value.Value);
	});
	console.log(currentQuestionObject);*/

	var x=0;
	for(x=0;x<currentQuestionObject.QuestionOptions().length;x++){
		if(parseInt(currentQuestionObject.QuestionOptions()[x].Value())==parseInt(recognizeType)){
			//$('#imgMerchantLogo').attr('src', currentQuestionObject.QuestionOptions()[x].ImageUrl());
			if(engagePulseSurveys.isPulseSurvey()==1 && rateSystemImages==2){
				$image.attr('src',images[x]);
			}else{
				$image.attr('src',currentQuestionObject.QuestionOptions()[x].ImageUrl());
			}
			if(currentQuestionObject.QuestionOptions()[x].TextDescription()!=null && currentQuestionObject.QuestionOptions()[x].TextDescription()!=undefined && currentQuestionObject.QuestionOptions()[x].TextDescription()!="" && currentQuestionObject.QuestionOptions()[x].TextDescription()!=" "){
				$("#text_feedback_rating_description").html(currentQuestionObject.QuestionOptions()[x].TextDescription());
				$(".award_points").removeClass('award_points_visiblenone');
			}
			else{
				$(".award_points").addClass('award_points_visiblenone');
			}

			//console.log(currentQuestionObject.QuestionOptions()[x].ImageUrl());
			break;
		}

	}

	/*switch(parseInt(recognizeType)){
	case 1:
		$image.attr('src','/SurveyRocks/img/verybad.png');
		$text.html('Very Bad');
		$.get( "/JobPts/htmlTemplates/award1.html", function(data) {
			$('#create_recognize_text_mobile_anniversaries,#create_recognize_text_desktop_anniversaries').html(data);

		}).always(function() {
		 $('.loading').hide();
	  });
		break;
	case 2:
		$image.attr('src','/SurveyRocks/img/bad.png');
		$text.html('Bad');
		$.get( "/JobPts/htmlTemplates/award2.html", function(data) {
			$('#create_recognize_text_mobile_anniversaries,#create_recognize_text_desktop_anniversaries').html(data);
		}).always(function() {
			 $('.loading').hide();
		  });
		break;
	case 3:
		$image.attr('src','/SurveyRocks/img/neutral.png');
		$text.html('Neutral');
		$.get( "/JobPts/htmlTemplates/award3.html", function(data) {
			$('#create_recognize_text_mobile_anniversaries,#create_recognize_text_desktop_anniversaries').html(data);
		}).always(function() {
			 $('.loading').hide();
		  });
		break;
	case 4:
		$image.attr('src','/SurveyRocks/img/good.png');
		$text.html('Good');
		$.get( "/JobPts/htmlTemplates/award4.html", function(data) {
			$('#create_recognize_text_mobile_anniversaries,#create_recognize_text_desktop_anniversaries').html(data);
		}).always(function() {
			 $('.loading').hide();
		  });
		break;
	case 5:
		$image.attr('src','/SurveyRocks/img/verygood.png');
		$text.html('Very Good');
		$.get( "/JobPts/htmlTemplates/award5.html", function(data) {
			$('#create_recognize_text_mobile_anniversaries,#create_recognize_text_desktop_anniversaries').html(data);
		}).always(function() {
			 $('.loading').hide();
		  });
		break;
	case 5:
		$image.attr('src','/JobPts/Mobile/img/Award6_Spotlight.png');
		$text.html('Very Good');
		break;
	}*/
	$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
	console.log(recognizeType + "<- recognizeType");
}


function changeAwardImageAnniversariesForPulseSurvey(rating,$image,max_rate){

	var first = 1;
	var last = max_rate;
	var ratingSystemImg = parseInt(currentQuestionObject.QuestionOptions()[0].ImageUrl());

	if(ratingSystemImg == 1){
		var img1 = "images/SurveyTemplates/feel1.png";
		var img2 = "images/SurveyTemplates/feel2.png";
		var img3 = "images/SurveyTemplates/feel3.png";
		var img4 = "images/SurveyTemplates/feel4.png";
		var img5 = "images/SurveyTemplates/feel5.png";
	}else{
		var img1 = "images/SurveyTemplates/rate_star1.png";
		var img2 = "images/SurveyTemplates/rate_star2.png";
		var img3 = "images/SurveyTemplates/rate_star3.png";
		var img4 = "images/SurveyTemplates/rate_star4.png";
		var img5 = "images/SurveyTemplates/rate_star5.png";
	}


	var getQuestionTextDescription = function(questionsArray, ratingValue){

		for(var i = 0; i < questionsArray.length; i++){
			if(parseInt(questionsArray[i].Value()) == ratingValue){
				if(questionsArray[i].TextDescription()!=null && questionsArray[i].TextDescription()!=undefined && questionsArray[i].TextDescription()!="" && questionsArray[i].TextDescription()!=" "){
					$("#text_feedback_rating_description").html(questionsArray[i].TextDescription());
					$(".award_points").removeClass('award_points_visiblenone');
				}
				else{
					$(".award_points").addClass('award_points_visiblenone');
				}
				break;
			}
		}
	};

	$("#imgMerchantLogo").removeAttr('src');


	if(max_rate == 5){
		if(rating==first){
			$image.attr('src',img1);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+1){
	    	$image.attr('src',img2);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+2){
	    	$image.attr('src',img3);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+3){
	    	$image.attr('src',img4);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == last){
	    	$image.attr('src',img5);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	}
	else if(max_rate == 6){
		if(rating==first){
			$image.attr('src',img1);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+1){
	    	$image.attr('src',img2);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+2 || rating == first+3){
	    	$image.attr('src',img3);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == last-1){
	    	$image.attr('src',img4);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == last){
	    	$image.attr('src',img5);
	    	getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	}
	else if(max_rate == 7 || max_rate == 8 || max_rate == 9 || max_rate == 10){
		if(rating == first){
			$image.attr('src',img1);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == first+1 || rating == first+2){
	    	$image.attr('src',img2);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating > first+2 && rating < last-2){
	    	$image.attr('src',img3);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == last-1 || rating == last-2){
	    	$image.attr('src',img4);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	    else if(rating == last){
	    	$image.attr('src',img5);
			getQuestionTextDescription(currentQuestionObject.QuestionOptions(),rating);
	    }
	}

	$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
}


//$('#box').keyup(function () {
//	var temp;
//	var title;
//	var valThis = $(this).val();
//	$('#list_sent_surveys>li').each(function(){
//
//		title=$('.card_title_history').text().toLowerCase();
//		console.log(title);
//
//		(title.indexOf(valThis) > 0) ? $('#list_sent_surveys>li').show() : $('#list_sent_surveys>li').hide();
//		//title=null;
//		//temp=title;
//		//temp=$(this).text(); --list item
//		$('#temp').text(title);
//		$('#temp').text(title.indexOf(valThis));
//
////	     var text = $(this).text().toLowerCase();
////	        (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
//	   });
//
//});

//$('#box').keyup(function(){
//	   var valThis = $(this).val();
//	    $('#list_sent_surveys>li').each(function(){
//	     var text = $(this).text().toLowerCase();
//	        (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
//	   });
//	});



$(document).on('pagebeforeshow', '#sent_surveys', function () {
	homeModelObject.checkIfSessionExpired();
//	sentSurveysForUser.GetSentSurveysForUser();
	sentSurveysForUser.query.subscribe(sentSurveysForUser.search);
//	if(jQuery.browser.mobile)
//	{
//	   console.log('You are using a mobile device!');
//	   $('#list_sent_surveys').attr("id","list_sent_surveys_mobile");
//	}
//	else
//	{
//	   console.log('You are not using a mobile device!');
//	   $('#list_sent_surveys').attr("id","list_sent_surveys_desktop");
//	}

});

$(document).on('pageshow', '#sent_surveys', function () {
	sentSurveysForUser.GetSentSurveysForUser().done(function(){
	$('#list_sent_surveys').listview('refresh');
	});
	Schortcut();
});

//v
ko.applyBindings(surveyReports, document.getElementById("content_survey_results"));
//v
ko.applyBindings(surveyReports, document.getElementById("controlls_resultsReports_header_desktop"));

//v
ko.applyBindings(surveyReports, document.getElementById("controlls_resultsReports_footer_mobile"));
//ko.applyBindings(reportResultOptions, document.getElementById("content_survey_results_options1"));

//ko.applyBindings(reportResultOptions, document.getElementById("survey_results_options"));
ko.applyBindings(reportResultOptions, document.getElementById("content_survey_results_options1_mobile"));
//ko.applyBindings(reportResultOptions, document.getElementById("managers_content_div"));
//ko.applyBindings(reportResultOptions, document.getElementById("managers_content_div_search"));

ko.applyBindings(reportResultOptions, document.getElementById("controlls_header_desktop_survey_results_options1"));

//v ko.applyBindings(surveyReports, document.getElementById("survey_results_chart_title"));

ko.applyBindings(surveyReports, document.getElementById("left_panel_survey_results"));

ko.applyBindings(surveyReports, document.getElementById("left_panel_chart_results"));
ko.applyBindings(surveysObjectForApp, document.getElementById("content_my_surveys_app"));
ko.applyBindings(surveysObjectForApp, document.getElementById("editing_questionPulseSurvey"));


ko.applyBindings(reportResultOptions, document.getElementById("managers_content_div_search"));

ko.applyBindings(surveyReports, document.getElementById("controlls_header_desktop_participation_rate"));
ko.applyBindings(surveyReports, document.getElementById("controlls_footer_mobile_participation_rate"));

$(document).on('pagebeforeshow', '#survey_results', function () {
	surveyReports.CurrentChartData().TresholdCheck(undefined);
	homeModelObject.checkIfSessionExpired().done(function(data){
		if(homeModelObject.IsLoggedIn()){

			surveyReports.GetListSurveyReports().done(function(){
				$('.btns_goToSurvey').button();
			});
			//surveyReports.GetListSurveyReports();

			//refreshResultsChartData(350);

			//var canvas_chart= document.getElementById('canvas_home');

		}else{
			window.onbeforeunload = null;
		}
		});






});

showResultsChartData = function(idSurvey){
	$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
	//refreshResultsChartData(idSurvey);
};

$(document).on('pageshow', '#survey_results', function () {
	Schortcut();
	$(".Result_pulseSurvey").removeAttr('id');
	$(".result_reports").attr('id', 'full_container_results');
	//clear temp manager object when going back from #survey_results_options page, and the flag for back
	if(reportResultOptions.selectedTempMngByBP()!=undefined){
		reportResultOptions.selectedTempMngByBP(undefined);
	}
	if(reportResultOptions.goBackForBP()==1){
		reportResultOptions.goBackForBP(0);
	}
	reportResultOptions.ResultsList([]);
	//debugger;
	clearFlagsForGeoTab();
	clearFlagsForMngTab();
});


$(document).on('pagebeforeshow', '#survey_results_options', function () {

	if(reportResultOptions.goingBack() == 1){
		reportResultOptions.goingBack(0);

	}else{
		if(surveyReports.IdSurveyType()==5){
			surveyReports.ReportFiltersExist(undefined);
			$("#ddl_permTypesList1").selectmenu().selectmenu('refresh');
			$("#ddl_permTypesList1").on('change',function(){
				reportResultOptions.getPermanentTypesForUser2();
				$.mobile.activePage.trigger('create');
				$(".datePerm").children().first().css({"float": "left", "width": 45+'%'});
				$(".datePerm").children().last().css({"float": "right", "width": 45+'%'});
				
				 var minDate = moment(new Date()).subtract(1,'month').date(1).format('L'); 
				 var today = moment(new Date()).format('L');
				 if(reportResultOptions.selectedPermType1()!=undefined){
						 $('#dateFrom').datepicker({
						 	minDate: minDate,
						 	maxDate: today,
						 	onSelect : function(selectedDate) {
								$("#dateUntil").datepicker("option", "minDate", selectedDate);
							}
						});
					 
					 	$('#dateUntil').datepicker({
							minDate : minDate,
							maxDate : today,
							onSelect : function(selectedDate) {
								$("#dateFrom").datepicker("option", "maxDate", selectedDate);
							}
						});	 
				 }
				 else{
					reportResultOptions.selectedPermType2(undefined);
				 }
				 
			});
	
			reportResultOptions.getPermanentTypesForUser();
		}
		else{		
			reportResultOptions.IndividualOrCumulative(undefined);
			reportResultOptions.SelectedOrgUnit(undefined);
			reportResultOptions.SelectedCumulativeManager(undefined);
			
			$('input[name=radio_results_options]').checkboxradio();
			$('input[name=radio_results_options]').attr("checked", false);
			$('input[name=radio_results_options]').checkboxradio('refresh');
			
			$('#searchParamInput').val("");
			
			if(homeModelObject.IsBusinessPartner()){
				reportResultOptions.GetManagersList();
			}
			else if(homeModelObject.IsManager()){
				reportResultOptions.GetOrgUnitsList();
				reportResultOptions.GetOrgUnitsListAssignedToMng();
				
				reportResultOptions.GetCumulativeMngsList();
			}
			
			if($(".ov_lb").first().attr("id")=="ChooseManagersTabBtn" || $(".ov_lb").first().attr("id")=="ChooseOptionTabBtn"){
				$(".ov_lb").first().click();
				$(".ov_lb").last().removeClass("lb_clicked");
				$("#GeoContent").hide();
				$("#ManagersContent").show();
				$("#ManagerByBP").selectmenu();
				if($("#SearchBPandManager").children().children().length===0){
					$("#searchParamInput").addClass("ui-input-text ui-body-d").wrap("<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-d'></div>");
				}
			}else{
				if($(".ov_lb").first().attr("id")=="ViewOtherTabBtn"){
					$(".ov_lb").last().removeClass("lb_clicked");
					$("#GeoContent").hide();
				}
				
			}
			
			surveyReports.checkFiltersForReport().done(function(){
				$("#ddl_geoGroupList").selectmenu().selectmenu("refresh");
			});
			
			if (getCookie("lang")) {
				$("#searchParamInput").attr("placeholder", localizationViewModel.momentLocalizaton().search_manager);
			}
			reportResultOptions.DemoGroups()[0].optionName = localizationViewModel.momentLocalizaton().country;
			reportResultOptions.DemoGroups()[1].optionName = localizationViewModel.momentLocalizaton().division;
//			reportResultOptions.DemoGroups()[2].optionName = localizationViewModel.momentLocalizaton().region;
			reportResultOptions.DemoGroups()[3].optionName = localizationViewModel.momentLocalizaton().board_area;	
		}

	}
	
});

//ko.applyBindings(participationRateViewModel, document.getElementById("id_ParticipationRate"));
ko.applyBindings(participationRateViewModel, document.getElementById("content_participation_rate"));
//ko.applyBindings(participationRateViewModel, document.getElementById("controlls_header_desktop_participation_rate"));
//ko.applyBindings(participationRateViewModel, document.getElementById("controlls_footer_mobile_participation_rate"));

//$(document).on('pagebeforeshow', '#preview_participation_rate', function () {
//
//
//	console.log(participationRateViewModel.SelectedIdSurvey());
//
//});

$(document).on('pageshow', '#preview_participation_rate', function () {
	$('.loading').fadeOut();
	$("#id_DivForChart").html('');
		
	var params = {};
	if(participationRateViewModel.SelectedIdClone() == 0 || participationRateViewModel.SelectedIdClone() == undefined){
		params.SelectedSurvey = surveyReports.IdSurvey();		
	}else{
		params.SelectedSurvey = participationRateViewModel.SelectedIdClone();	
	}
	
	if(reportResultOptions.SelectedCumulativeManager() != undefined || reportResultOptions.SelectedManagerByBusiness() != undefined){
		if(reportResultOptions.SelectedCumulativeManager()){
			params.SelectedManager = reportResultOptions.SelectedCumulativeManager();		
		}else{
			params.SelectedManager = reportResultOptions.SelectedManagerByBusiness();
		}		
	}else{
		params.SelectedManager = homeModelObject.Username();
	}
	
	$.ajax({
        dataType: "json",
        data: JSON.stringify(params),
        cache: false,
        crossDomain: true,
        url: urlString + "services/CheckThresholdIndividualParticipationRate.xsjs",
        type: 'POST',
        error: function (x, s, m) {            
        },
        success: function (res) {        	
        	participationRateViewModel.CloneSurveyThresholdStatus(res.CloneSurveyThresholdStatus); //<-- check survey threshold for selected manager
        	participationRateViewModel.selectedCloneSurveyThreshold(res.CloneSurveyThreshold); 
        }
	}); 	
	
}); 

$(document).on('pagebeforehide', '#preview_participation_rate', function(){
	console.log("pagebeforehide");
	participationRateViewModel.EmptyData();
	$("#id_DivForChart").html('');
	participationRateViewModel.selectedCloneSurveyTitle(undefined);
	participationRateViewModel.inDrilldown(0);
});

$("#id_Criteria,#id_ChartType").change(function(){
	if(participationRateViewModel.GlobalOrIndividual()=='Global' || participationRateViewModel.GlobalOrIndividual()=='Individual'){
		//participationRateView.selectedSubCriteria('');
		if(participationRateViewModel.selectedCriteria()==undefined){
			$("#div_Criteria").show();
		}else{

			if(participationRateViewModel.selectedCriteria()!=0&&participationRateViewModel.selectedChartType()=='Basic Column'){
				$("#div_SubCriteria").show();
			 	var values = $("#id_Criteria>option").map(function() { return $(this).val(); }).get();
			 	console.log(values);
			 	console.log(values[1]);
			 	console.log(values[2]);
			 	console.log(values[3]);
			 	$('#id_SubCriteria').html('');
			 	$('#id_SubCriteria').append("<option value='0' disabled selected>-Choose sub criteria...</option>");
			 	for(var i=1;i<values.length;i++){
				 	if(participationRateViewModel.selectedCriteria()!=values[i]){
					 	$('#id_SubCriteria').append("<option value='"+values[i]+"'>"+values[i]+"</option>");
				 	}
			 	}

			}
			else{
				$('#id_SubCriteria').html('');
				$("#div_SubCriteria").hide();
			}
		}


	}else{
		$("#div_Criteria").hide();
		$('#id_SubCriteria').html('');
		$("#div_SubCriteria").hide();

	}




});

$("#id_ChartType").change(function(){
	$("#id_DivForChart").html('');
	if(participationRateViewModel.GlobalOrIndividual()=='Global'){
		$("#div_Criteria").show();
	}
});

$(document).on('pagecreate', '#chart_results', function () {



	/*if(surveyReports.CurrentChartData().PagesNumberList().length>0){
		//$("#resultPage_1").prop('checked', true).checkboxradio('refresh');
		refreshResultsChartData();
	}*/
	/*if(surveyReports.CurrentChartData().PagesNumberList().length==1){
		$('#controls_results_radios_header').html('');
	}*/
});

$(document).on('pagebeforecreate', '#chart_results', function () {

	//ko.applyBindings(surveyReports.CurrentChartData(), document.getElementById("controls_results_radios_header"));

	/*$('#survey_results_chart_title').html('');
	$('#survey_results_chart_title').html(surveyReports.CurrentChartData().Title());*/

});
$(document).on('pagebeforehide', '#chart_results', function () {
	if(window.location.hash != '#survey_results_options'){
		reportResultOptions.selectedPermType1(undefined);
		reportResultOptions.selectedPermType2(undefined);	
	}
});
$(document).on('pagebeforeshow', '#chart_results', function () {
	$('#mngFullName_or_OrgUnit').html('');
	if(reportResultOptions.IndividualOrCumulative()==1){
		if(homeModelObject.IsBusinessPartner()){
			if(getCookie("lang") == 'de'){
				$("#mngFullName_or_OrgUnit").html("für Manager: <b>"+reportResultOptions.FullName()+"</b>");
			}else if(getCookie("lang") == 'fr'){
				$("#mngFullName_or_OrgUnit").html("pour Manager: <b>"+reportResultOptions.FullName()+"</b>");
			} else {
				$("#mngFullName_or_OrgUnit").html("for Manager: <b>"+reportResultOptions.FullName()+"</b>");
			}

		}else{
			if(getCookie("lang") == 'de'){
				$("#mngFullName_or_OrgUnit").html("für Manager: <b>"+homeModelObject.FirstName()+" "+homeModelObject.LastName()+"</b>");
			}else if(getCookie("lang") == 'fr'){
				$("#mngFullName_or_OrgUnit").html("pour Manager: <b>"+homeModelObject.FirstName()+" "+homeModelObject.LastName()+"</b>");
			} else {
				$("#mngFullName_or_OrgUnit").html("for Manager: <b>"+homeModelObject.FirstName()+" "+homeModelObject.LastName()+"</b>");
			}
		}
	}else if(reportResultOptions.IndividualOrCumulative()==2){
		for(var i=0;i<reportResultOptions.OrgUnitsList().length;i++){
			if(reportResultOptions.OrgUnitsList()[i].OrgUnitID==reportResultOptions.SelectedOrgUnit()){
				if(getCookie("lang") == 'de'){
					$("#mngFullName_or_OrgUnit").html("für OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "und alle OrgUnits unten"+"</b>");
				}else if(getCookie("lang") == 'fr'){
					$("#mngFullName_or_OrgUnit").html("pour OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "et tous les OrgUnits ci-dessous"+"</b>");
				} else {
					$("#mngFullName_or_OrgUnit").html("for OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "and all OrgUnits below"+"</b>");
				}
			}
		}
	}else if(reportResultOptions.IndividualOrCumulative()==3){
		if(getCookie("lang") == 'de'){
			$("#mngFullName_or_OrgUnit").html("für Manager: <b>"+reportResultOptions.SelectedCumulativeManagerFullName()+"</b>");
		}else if(getCookie("lang") == 'fr'){
			$("#mngFullName_or_OrgUnit").html("pour Manager: <b>"+reportResultOptions.SelectedCumulativeManagerFullName()+"</b>");
		}else {
			$("#mngFullName_or_OrgUnit").html("for Manager: <b>"+reportResultOptions.SelectedCumulativeManagerFullName()+"</b>");
		}
	}else if(reportResultOptions.IndividualOrCumulative()==4){
		for(var i=0;i<reportResultOptions.OrgUnitsList().length;i++){
			if(reportResultOptions.OrgUnitsList()[i].OrgUnitID==reportResultOptions.SelectedOrgUnitAssignedToMng()){
				if(getCookie("lang") == 'de'){
					$("#mngFullName_or_OrgUnit").html("für OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "und alle OrgUnits unten"+"</b>");
				}else if(getCookie("lang") == 'en'){
					$("#mngFullName_or_OrgUnit").html("for OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "and all OrgUnits below"+"</b>");
				} else {
					$("#mngFullName_or_OrgUnit").html("pour OrgUnit: <b>"+reportResultOptions.OrgUnitsList()[i].OrgUnitName+ " " + "et tous les OrgUnits ci-dessous"+"</b>");
				}
			}
		}
	}
	else if(reportResultOptions.selectedGeoGroup() && reportResultOptions.GeoGroupValue()){
		//$("#mngFullName_or_OrgUnit").html("for Manager: <b>"+reportResultOptions.SelectedCumulativeManagerFullName()+"</b>");
		if(reportResultOptions.selectedGeoGroup()=="Country"){
			$("#mngFullName_or_OrgUnit").html(localizationViewModel.momentLocalizaton().for_loc + " " + localizationViewModel.momentLocalizaton().country +": " + "<b>"+reportResultOptions.CountryName()+"</b>");
		}else if(reportResultOptions.selectedGeoGroup()=="Division"){
			$("#mngFullName_or_OrgUnit").html(localizationViewModel.momentLocalizaton().for_loc + " " +localizationViewModel.momentLocalizaton().division +": " + "<b>"+reportResultOptions.GeoGroupValue()+"</b>");
		}else if(reportResultOptions.selectedGeoGroup()=="Region"){
			$("#mngFullName_or_OrgUnit").html(localizationViewModel.momentLocalizaton().for_loc + " " +localizationViewModel.momentLocalizaton().region +": " + "<b>"+reportResultOptions.GeoGroupValue()+"</b>");
		}
		else if(reportResultOptions.selectedGeoGroup()=="Board Area"){
			$("#mngFullName_or_OrgUnit").html(localizationViewModel.momentLocalizaton().for_loc + " " +localizationViewModel.momentLocalizaton().board_area +": " + "<b>"+reportResultOptions.GeoGroupValue()+"</b>");
		}
	}
	else if(reportResultOptions.selectedPermType1()!=undefined){
		if(reportResultOptions.selectedPermType2()!=undefined){
			$("#mngFullName_or_OrgUnit").html("Type 1: <b>"+ reportResultOptions.selectedPermType1() + "</b> Type 2: <b>"+ reportResultOptions.selectedPermType2()+"</b>");
		}else{
			$("#mngFullName_or_OrgUnit").html("Type 1: <b>"+ reportResultOptions.selectedPermType1()+"</b>");
			
		}
	}

});



$(document).on('pageshow', '#chart_results', function () {

	$('#controls_results_radios_header').html('');
	/*$.each(surveyReports.CurrentChartData().PagesNumberList(), function (index, value) {
		$("<div><input type=\"radio\" onchange=\"refreshResultsChartData()\" id=\"resultPage_" + value + "\" value=\""+ value +"\" name=\"radioResultsPage\" class=\"invite_check\" /><label for=\"resultPage_" + value + "\" style=\"z-index: 99999;\">Page "+ value +"</label></div>").appendTo("#controls_results_radios_header");
		$("#controls_results_radios_header").trigger('create');
		$("#resultPage_"+value).checkboxradio('refresh');
	});
*/
	if(surveyReports.CurrentChartData().PagesNumberList().length>0){
		//$("#resultPage_1").prop('checked', true).checkboxradio('refresh');

		refreshResultsChartData();
	}
//	else{
//			$('#full_container_results').html('');
//	}
	/*if(surveyReports.CurrentChartData().PagesNumberList().length==1){
		$('#controls_results_radios_header').html('');
	}*/


	//$("[name='radioResultsPage']").removeAttr('checked');
	//$("[name='radioResultsPage']").checkboxradio('refresh');

	if(surveyReports.CurrentChartData().TresholdCheck()==0){
		$("#previewPraticipationRate").css('display', 'none');
	}
	else{
		if(surveyReports.IdSurveyType!=5){
			$("#previewPraticipationRate").css('display', 'none');			
		}
		else{
			$("#previewPraticipationRate").css('display', 'block');			
		}
	}

	surveyReports.currentPageFilter();
    surveyReports.currentGroupFilter();
    Schortcut();
});



ko.applyBindings(engagePulseSurveys, document.getElementById("pulseSurveyTable"));



function Schortcut(){
	if(location.hash !== "#home_screen"){
		$(window).off('keydown');
	}
	else {
		$(window).off('keydown').on('keydown', function(event) {
			if(event.altKey && event.keyCode == 81) {
//			    console.log("Alt + q event captured!");
			    event.preventDefault();
			    homeModelObject.changeAccessibilityModeOn();
			  }
			event.stopImmediatePropagation();
		});
	}
};

//for request_support_email
//$('#lnk_request_support_email').click(function () {
//
//	 $.mobile.changePage($('#request_support_email'));
//
//});



$('#id-support-reasons-list-desktop>a, #id-support-reason-list-mobile>a').click(function(){
	$('#id-support-reasons-list-desktop>a, #id-support-reason-list-mobile>a').removeClass('message_checked');

	$(this).addClass('message_checked');
});




$(document).on('pagebeforeshow', '#request_support_email', function () {
//	 $.when(homeModelObject.checkSapUser().then(homeModelObject.getUserHomeInfo).then(homeModelObject.getUserHomeInfo1).then(homeModelObject.getCreatedGiftsList).then(notificationsViewModel.getNotificationsHomeInfoRecognize))
//    .done(function(){

   	 console.log(homeModelObject.FirstName());
   	    $("#lbl_RequesterFullname").text(homeModelObject.FirstName()+' '+homeModelObject.LastName());
   	    $("#lbl_RequesterEmail").text(homeModelObject.Email());
   	    $("#lbl_RequesterFullname_mob").text(homeModelObject.FirstName()+' '+homeModelObject.LastName());
   	    $("#lbl_RequesterEmail_mob").text(homeModelObject.Email());


//    });
});






$("#btn_support_email_send_mobile, #btn_support_email_send").click(function (element) {

    if ($("#support_message").val()=='') {
    	alert(localizationViewModel.momentLocalizaton().write_a_message);
//    			getValueForLocalization("write_a_message")

    }
    else {
    	if($('#id-support-reason-list-mobile>a.message_checked>div').text()==''&&$('#id-support-reasons-list-desktop>a.message_checked>div').text()==''){
    		if(element.currentTarget.id == "btn_support_email_send_mobile"){
    		alert(localizationViewModel.momentLocalizaton().choose_one_support_reason_mobile);
//    		getValueForLocalization("choose_one_support_reason")
    		}
    		else{
    			alert(localizationViewModel.momentLocalizaton().choose_one_support_reason);
    		}
    	}
    	else{



    	var fullname=homeModelObject.FirstName()+' '+homeModelObject.LastName();

    	var email=homeModelObject.Email();
       var msg=$("#support_message").val()+'<br>';
       msg+=' <strong>Support Reason: </strong>'+$.trim($('#id-support-reason-list-mobile>a.message_checked>div').text())+$.trim($('#id-support-reasons-list-desktop>a.message_checked>div').text());
       msg+='<br><strong>Skype callback: </strong>';
       if($('#skype_callback_desired').is(':checked'))
    	   msg+='is required.';
       else
    	   msg+='is NOT required.';
       console.log(msg);



    	$.ajax({
	        dataType: "json",
	        data: JSON.stringify({ fullname: fullname, email: email, message: msg }),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/insertSupportMailInMailScheduler.xsjs",
	        type: 'POST',
	        error: function (x, s, m) {

	        },
	     success: function (res) {
	    if(res==1){
	    	alert("Thank you! Your support request has been successfully sent to the SurveyRocks support center. ");
//	    	location.reload();
	    	window.close();
	    }

     }
	    });

    	}
    }
});

var search_colleagues=function(IdUsers,SearchParam){
	unbindSplashScreen();
	jQuery.support.cors = true;
	var params={};
	params.IdUsers=IdUsers;
	params.searchParam = SearchParam;

	$.ajax({
    	data:JSON.stringify(params),
        dataType: "json",
        //async: false,
        cache: false,
        crossDomain: true,
        //async:false,
        url: urlString + "services/GetUsersList.xsjs",
        type: 'POST',
        //contentType: "application/json;charset=utf-8",
        error: function (x, s, m) {
            //  //alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
        },
        beforeSend: function(){

        	 $('.loading').hide();
        },
        success: function (data) {
            var entity;
            //var list = JSON.parse(data);
            colleaguesListViewModel.ColleaguesList([]);
            if($('#search_colleagues_input').val().length>0){
            for(var x=0;x<data.length;x++){
            	entity = new ColleaguesModel();
            	//entity = ko.mapping.fromJS(data[x]);
            	entity.IdUsers(data[x].IdUsers);
            	entity.Id(data[x].Id);
            	entity.FullName(data[x].FullName);
            	entity.FirstName(data[x].FirstName);
            	entity.Username(data[x].Username);
            	entity.ZipCode(data[x].ZipCode);
            	entity.City(data[x].City);
            	entity.Country(data[x].Country);
            	entity.Email(data[x].Email);
            	entity.JobTitle(data[x].JobTitle);
            	entity.OrgUnit(data[x].OrgUnit);
            	entity.UserImage(data[x].UserImage);
            	colleaguesListViewModel.getPhoto(entity);
            	colleaguesListViewModel.ColleaguesList.push(entity);

            	//console.log(colleaguesListViewModel.ColleaguesList());
            }
            $.mobile.activePage.trigger('create');
            setTimeout(function(){
            for(var x=0;x<selectedColleguesListView.SelectedColleguesContainer().length;x++){
            	if(colleaguesListViewModel.matchElementForSelection(selectedColleguesListView.SelectedColleguesContainer()[x])){
            		$('#' + selectedColleguesListView.SelectedColleguesContainer()[x].IdUsers() + 'event').attr('checked', 'checked').checkboxradio("refresh");
            	}
            }
            },300);
            }
        		/*if(!recognizeInfo.amount){
        			recognizeInfo={};
                	recognizeInfo.amount = 0;
        		} */
            //console.log(recognizeInfo.IdUsers);
            //$('#colleagues_list').listview('refresh');

        }
    }).always(function() {
		 $('.loading').hide();

	  });;


};

var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();

$('#search_colleagues_input').keyup(function () {
	   // $('.ui-input-text').keyup(function () {

	        if ($(this).val().length > 0) {

	            $('.on_top_friends').addClass("hide_helper_firends");
	            $(".on_top_friends").hide();

	            if($(this).val().length==3){
	            		search_colleagues(homeModelObject.IdUsers(),$('#search_colleagues_input').val());
	            }
	            else{
	            delay(function(){
	            		search_colleagues(homeModelObject.IdUsers(),$('#search_colleagues_input').val());
	            },300);
	            }
	        }

	        else {
	        	colleaguesListViewModel.ColleaguesList([]);
	            $('.on_top_friends').removeClass("hide_helper_firends");
	            $(".on_top_friends").show();
	        }

	        $('.ui-input-clear').click(function () {
	        	colleaguesListViewModel.ColleaguesList([]);
	            $('.on_top_friends').removeClass('hide_helper_firends');
	            $(".on_top_friends").show();
	        });
	    	$('#colleagues_list').listview('refresh');



	});

$(document).on('pagebeforeshow', '#create_survey', function () {
//	debugger;
//	ko.applyBindings(createSurvey, document.getElementById('create_content'));
//	ko.applyBindings(colleaguesListViewModel, document.getElementById("content_recognize_colleagues1"));
//	ko.applyBindings(selectedColleguesListView, document.getElementById('SelectedColleguesListContainer_desktop'));

//	$('#search_colleagues_input').val('');
//	colleaguesListViewModel.ColleaguesList([]);
	$('#question_minus_btn').off().on('click', function(){
		createSurvey.question_minus();
	});
	$('#question_plus_btn').off().on('click', function(){
		createSurvey.question_plus();
	});

	$.mobile.activePage.trigger('create');
});

$(document).on('pagebeforeshow', '#create_survey_questions', function () {

	if(!myIsNaN(createSurvey.createSurveyArray()[createSurvey.myStepsIndex()].IdQuestionType())){
		if(location.history !== '#create_survey_participants'){
			createSurvey.GetQuestionTypes().done(function(){
//				$("input[name='imageCheckBox'"+createSurvey.myStepsIndex()+"']").checkboxradio().checkboxradio("refresh");
			});
		}
	}
	location.history = location.hash;
	$.mobile.activePage.trigger('create');

});


$(document).on('pagebeforeshow', '#create_survey_participants', function () {
	location.history = location.hash;
});

$('#btn_next_survey_steps, #btn_next_survey_steps_mobile').click(function(){

//	if(selectedColleguesListView.SelectedColleguesContainer().length==0){
//		alert("Select employee.");
//	}
//	else
	if(!createSurvey.Title()){
		alert("Please insert title for your survey.");
	}
	else{
		if(location.hash === "#create_survey"){
			page = 1;
		} else{
			page = 0;
		}
		createSurvey.myStepsIndex(0);
		createSurvey.insertNew();
		$.mobile.changePage($('#create_survey_questions'));

		createSurvey.next_survey_steps(page);
	}
});

$('#btn_create_users_list').click(function(){
	var questionsArray = ko.mapping.toJS(createSurvey.createSurveyArray());
	var participants = ko.mapping.toJS(selectedColleguesListView.SelectedColleguesContainer());
	if(participants.length>0){
//		console.log(participants.length);
		var params={};
		params.Title=createSurvey.Title();
	//	console.log(participants);
		params.createSurveyArray= questionsArray;
		params.SelectedColleguesContainer= participants;
	//	console.log(params.createSurveyArray);
	//    jQuery.support.cors = true;
	    $.ajax({
	        //async: false,
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	//        crossDomain: true,
	        url: urlString + "services/CreateSurvey.xsjs",
	        type: 'POST',
	        error: function (x, s, m) {

	        },
	        success: function (data) {
	        	console.log('send');
	        }
		  }).always(function() {
			 $('.loading').hide();
	         location.reload();
	  });
	}else{
		alert("Select participants.")
	}
});

$('#btn_create_users_list_mobile').on('touchstart', function(){
	var questionsArray = ko.mapping.toJS(createSurvey.createSurveyArray());
	var participants = ko.mapping.toJS(selectedColleguesListView.SelectedColleguesContainer());
	if(participants.length>0){
//		console.log(participants.length);
		var params={};
		params.Title=createSurvey.Title();
		//	console.log(participants);
		params.createSurveyArray= questionsArray;
		params.SelectedColleguesContainer= participants;
		//	console.log(params.createSurveyArray);
		//    jQuery.support.cors = true;
		$.ajax({
			//async: false,
			dataType: "json",
			data: JSON.stringify(params),
			cache: false,
			//        crossDomain: true,
			url: urlString + "services/CreateSurvey.xsjs",
			type: 'POST',
			error: function (x, s, m) {

			},
			success: function (data) {
				console.log('send');
			}
		}).always(function() {
			$('.loading').hide();
			location.reload();
		});
	}else{
		alert("Select participants.")
	}
});

var refreshSemiCircle = function(){

	var fil, strok;
//	surveysObjectForApp.getPulseSurveysByUser().done(function() {
		if(surveysObjectForApp.getListOfSurveysForApp().length>0){


			$.each(surveysObjectForApp.getListOfSurveysForApp(), function(index, value) {
				 document.getElementById('appChartSurv' + value.IdSurvey).innerHTML = "";
				 var actual = surveysObjectForApp.getListOfSurveysForApp()[index].NumberAnsweredParticipant;
				 var total = surveysObjectForApp.getListOfSurveysForApp()[index].NumberInvatedParticipant;
				 var procent=0;
				 procent = actual / total;
				 procent = procent * 100;
				 procent = parseInt(procent);

				 if(procent == 100){
					 fil = "#BCED91";
					 strok = "#009C20";
				 }else{
					 fil = null;
					 strok = "rgb(68, 152, 212)";
				 }

				 var circle = new ProgressBar.SemiCircle('#appChartSurv' + value.IdSurvey, {
					    color: strok,
					    strokeWidth: 6,
					    trailWidth: 5,
					    fill: fil,
					    duration: 2000,
					    text: {
					    	style: {
					    		color: 'rgb(100,100,100)'
					    	}
					    },
					    step: function(state, bar) {
					        bar.setText(actual+' / '+total);
					        //bar.setText((bar.value() * 100).toFixed(0)+'%');
					    }
					});
				 	circle.text.style.top = '34px';
				 	circle.text.style.fontSize = '1rem';
					circle.animate(procent/100, function() {
					    circle.animate(procent/100);
					});
			 });

		}
//	});

};


function getMySurveysApp(){
	var r = $.Deferred();
	$(document).off("ajaxStart");
//	unbindSplashScreen();
    	var params={};
    	params.Username=homeModelObject.Username();
    	params.InputParam=$('#surveysApp_search').val();
        jQuery.support.cors = true;
        $.ajax({
            //async: false,
            dataType: "json",
            data: JSON.stringify(params),
            cache: false,
            crossDomain: true,
            url: urlString + "services/GetSurveysForApp.xsjs?action=2",
            type: 'POST',
            error: function (x, s, m) {

            },
            success: function (data) {
            	surveysObjectForApp.getListOfSurveysForApp([]);
            	surveysObjectForApp.getListOfSurveysForApp(data);
            	r.resolve(data);
            }
  	  }).always(function() {
    		 $('.loading').hide();
	  });
	return r;
}

function myIsNaN(o) {
    return typeof(o) === 'number' && isNaN(o);
}

//console.log = function() {};
