var SurveysForUserObject1 = function () {
	
    var self = this;
    self.IdSurvey = ko.observable();
    self.Title = ko.observable();
    self.Description = ko.observable();
    self.IsPublic = ko.observable();
    self.IsAnonymous = ko.observable();
    self.IsTest = ko.observable();
    self.ActiveSurveysCount = ko.observable(0);
    self.CompletedSurveysCount = ko.observable(0);
    self.currentActiveSurveysList = ko.observableArray();
    self.DescriptionAcc = ko.observable();
    self.EndSurveyDescriptionAcc = ko.observable();    
    
    self.GetActiveSurveysForUser=function(){
    	var r = $.Deferred();
//    	var urlString = "https://jy3ac4e94dbe.hana.ondemand.com/SurveyRocks/";
    		 var params={};
    			params.lang="en";
    			$.ajax({
    		        dataType: "json",
    		        data: JSON.stringify(params),
    		        cache: false,
    		        crossDomain: true,
    		        url: urlString + "services/GetActiveSurveysForUser.xsjs",
    		        type: 'POST',
    		        error: function (x, s, m) {
    		            
    		        },
    		        success: function (res) {
	    		        	self.currentActiveSurveysList(res);
	    		        	console.log(res);
	    		        	self.ActiveSurveysCount(res.length);
    		        	r.resolve(res);
    		        	
    		        }
    		    });    	
		return r;
    };
    
    self.goToSurvey = function($data) {
//    	debugger;
//     	goToSurveyRedirect($data.IdSurvey);
//    	console.log($data);
    	
//    	surveysForUserObject.Title($data.Title);	
    	surveysForUserObject.IdSurvey($data.IdSurvey);
//    	surveysForUserObject.Title(surveysObject.Title());	
//    	surveysForUserObject.Description(surveysObject.Description);
//    	surveysForUserObject.IsPublic(surveysObject.IsPublic);
//    	surveysForUserObject.IsAnonymous(surveysObject.IsAnonymous);
    	
    	$.mobile.changePage($('#feedback_start'));	
//     	localStorage.setItem("currS",$data.IdSurvey);
    	//surveysObject.GetSurveyById(IdSurvey,"param").done(function(){
    	//	CurrentQuestionNewInstance;
    	//});
	    if(homeModelObject.IsAccessibility()){
	    	GetReader().done(function() {
				if(homeModelObject.ScreenReader() === 1){
					window.open(urlString+'jaws.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
				}else if(homeModelObject.ScreenReader() === 2){
					window.open(urlString+'zoom_text.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
				}else if(homeModelObject.ScreenReader() === undefined){
					window.open(urlString + 'accessibility_help.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
				}	
	    	});
    	};
    };
};

homeModelObject.checkUser().done(function(){
	homeModelObject.getUserHomeInfo().done(function(){
//		$("#accessibility_agreement1").checkboxradio('refresh');
		if(getCookie('ids')){
			CheckIfSelectedParticipants();
		}
		if(homeModelObject.IsAccessibility() && location.hash === "#home_screen"){
			GetReader();
		}
	});
});

var surveysForUserObject = new SurveysForUserObject1();
surveysForUserObject.GetActiveSurveysForUser();

ko.applyBindings(homeModelObject, document.getElementById("home_screen"));

ko.applyBindings(surveysForUserObject, document.getElementById("content_current_surveys"));
ko.applyBindings(surveysForUserObject, document.getElementById("feedback_start"));
///////////////
ko.applyBindings(currentQuestionObject, document.getElementById("header_content_text"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_write_message_feedback_text"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_text"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_rating"));



ko.applyBindings(currentQuestionObject, document.getElementById("header_options"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_options"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_options"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_numeric_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("content_feedback_numeric_rating"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_numeric_rating"));

ko.applyBindings(currentQuestionObject, document.getElementById("header_survey_page"));
ko.applyBindings(currentQuestionObject, document.getElementById("survey_page_content"));
ko.applyBindings(currentQuestionObject, document.getElementById("controls_feedback_survey_page"));

ko.applyBindings(currentQuestionObject, document.getElementById("feedback_info_content"));  


ko.applyBindings(homeModelObject, document.getElementById("content_account_settings"));

$(document).on('pagebeforeshow', '#page_surveys_list', function () {
//	SpaceSelect();
console.log("a");    

//$(window.document.activeElement).on("triggerHandler",function(){
//	document.activeElement.scrollIntoViewIfNeeded();
//	console.log(this)
//})
//
//window.document.activeElement.onfocus = function(){
//	document.activeElement.scrollIntoViewIfNeeded();
//	console.log(this)
//}

});

goToSurveyRedirect = function (IdSurvey) {
	console.log(IdSurvey);
//	document.cookie = "currS="+IdSurvey;
	//surveysObject.GetSurveyById(IdSurvey,"param").done(function(){
	//	CurrentQuestionNewInstance;
	//});
	$.mobile.changePage($('#feedback_start'));
    if(homeModelObject.IsAccessibility()){
    	GetReader().done(function() {
			if(homeModelObject.ScreenReader() === 1){
				window.open(urlString+'jaws.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
			}else if(homeModelObject.ScreenReader() === 2){
				window.open(urlString+'zoom_text.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
			}else if(homeModelObject.ScreenReader() === undefined){
				window.open(urlString + 'accessibility_help.html', '_blank', 'location=yes,height=700,width=800,scrollbars=yes,status=yes');
			}	
    	});
	};
	//location.href = urlString + "index2.html#feedback_start";   
	//$.mobile.changePage($('#feedback_start'), { allowSamePageTransition: true });
};

$(document).on('pagebeforeshow', '#home_screen', function () {
//	console.log('accessibility');
//	SpaceSelect();
});


$('#btn_feedback_start_next').click(function(){	
	currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	fillCurrentQuestionValues(question);
	surveyNavigate();
});


$(window).on("navigate", function (event, data) {
	  var direction = data.state.direction;
	  var locat = window.location.hash;
	  console.log( data.state );
	  handleSurveyNavigationExceptions();
	  if(locat=='#feedback_text' || locat=='#feedback_rating' || locat=='#feedback_options' || locat=='#feedbackInfo' || locat=='#feedback_numeric_rating' || locat=='#survey_page' || locat=='#feedback_matrix'){
	  }
	  
});

var handleSurveyNavigationExceptions=function(){
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

$('#btn_feedback_start_previous').click(function(){
	
	resetViewModelObject(currentQuestionObject);
	$.mobile.changePage($('#page_surveys_list'));
});

//$(document).on('pagebeforeshow', 'index_accessibility.html', function () {
//	
//	
//});

$(document).on('pagebeforeshow', '#feedback_start', function () {

	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
	}else{	
	$.when(function(){
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
				
			}).then(function(){
		
		if (surveysForUserObject.IdSurvey()) {
			////debugger;
			surveysObject.GetSurveyById(surveysForUserObject.IdSurvey(),"param",document.cookie).done(CurrentQuestionNewInstance, function(){
				//debugger;
				if(surveysObject.Description()!=null){
					var desc = surveysObject.Description().replace(/<br\s*[\/]?>/gi, '\n').replace(/&nbsp;/gi, ' ').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/(&nbsp;|(<([^>]+)>))/ig,'').split("{ManagerName}").join(homeModelObject.ManagerName());
					surveysForUserObject.DescriptionAcc(desc);
					document.title=surveysObject.Title();
				}
				
				if(surveysObject.EndSurveyDescription()!=null){
					var descEnd = surveysObject.EndSurveyDescription().replace(/<br\s*[\/]?>/gi, '\n').replace(/&nbsp;/gi, ' ').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/(&nbsp;|(<([^>]+)>))/ig,'');
					surveysForUserObject.EndSurveyDescriptionAcc(descEnd);
				}
				
			});	
		}
		else location.href = "index_accessibility.html#home_screen";		
	});
	}
	HotKeys();
//	SpaceSelect();
});


$(document).on('pagebeforeshow', '#feedback_text', function () {
	if(surveysForUserObject.IdSurvey()==undefined){
		return;
	}
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	console.log(currentQuestionObject.IdQuestionType() + "<<");
	if(currentQuestionObject.IdQuestionType()=="6" || currentQuestionObject.IdQuestionType()=="1"){
		$("#message_txt_area_"+currentQuestionObject.IdSurveyQuestions()).removeClass("message_expandable message_d2");
		$("#message_txt_area_"+currentQuestionObject.IdSurveyQuestions()).addClass("message_simpleMSG");
	}	
});

$(document).on('pageshow', '#feedback_text', function () {	
	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
	}else{
//	$("input[type='checkbox'][name='cantSayCheckBox']").checkboxradio();
//	$("input[type='checkbox'][name='cantSayCheckBox']").prop('checked', currentQuestionObject.AllowCantSayValue()).checkboxradio('refresh');	
	autosize(this);
	$('textarea').trigger('keydown');
	ResetValidation();

		$('#text_question'+currentQuestionObject.IdSurveyQuestions()).off('keydown').on('keydown', function(event) {
			if(event.keyCode !== 9){
				$('#text_question'+currentQuestionObject.IdSurveyQuestions()).parent().parent().next().find('#message_txt_area_'+currentQuestionObject.IdSurveyQuestions()).focus();
			}
			
		});

	}
});

$(document).on('pagebeforeshow', '#feedback_rating', function () {
	
	if(surveysForUserObject.IdSurvey()==undefined){
		return;		
	}else{	
	$("#min_tick_slide").text(currentQuestionObject.QuestionOptions()[0].TextDescription());
	$("#max_tick_slide").text(currentQuestionObject.QuestionOptions()[currentQuestionObject.QuestionOptions().length-1].TextDescription());
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	console.log(currentQuestionObject.NumericAnswer() + " fff");
//	if(!currentQuestionObject.AllowCantSayValue()){
//		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+currentQuestionObject.NumericAnswer()+"]").prop('checked', true);
//
//	}
	if(currentQuestionObject.NumericAnswer()){
//		$("#odg3219_4").prop("checked",true);
		$("#odg_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).prop("checked", true);
		$("#odg_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).attr("aria-checked", true);
		$("#odg_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).trigger('click');
	}
		if(!currentQuestionObject.NumericAnswer()){			
			currentQuestionObject.NumericAnswer(undefined);  
		}	
	}
});


$(document).on('pageshow', '#feedback_rating', function () {	

	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
	}else{
	
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
	}
	ResetValidation();
	if(!currentQuestionObject.IsMultiChoice()){}
	Radio();
});

$('#btn_send_feedback,#btn_send_feedback').click(function(){
//	feedback.SendFeedback();
	$.mobile.changePage($('#feedbackInfo'));
});

function goToHomePage(){
//	if(confirm("You're about to refresh the window! Any filled survey data will be lost!")){
		location.href = urlString + 'index_accessibility.html#home_screen';
//	}	
	console.log("sfksdjhgkvjsdhvjkbxcjhvb xc");
	
}

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
//dejan funkcijata e tuka zapolnenje na numericValuie idiotu
function chooseOptionAnswer(val){
	if(!currentQuestionObject.IsMultiChoice()){
	//debugger;
	var value=val.toString();
	currentQuestionObject.NumericAnswer(value);
	currentQuestionObject.AllowCantSayValue(false); // remove cant say
	if(checkOptionEndSurveyByValue(value)){
		currentQuestionObject.OptionEndSurveyValue("1");
	}
	else{
		currentQuestionObject.OptionEndSurveyValue("0");
	}
	//Skip Logic
	console.log("Skip Logic");
	console.log(currentQuestionObject.NumericAnswer());
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
};


$(document).on('pagebeforeshow', '#feedback_options', function () {
//	debugger;
	$.mobile.ignoreContentEnabled=true;
	// $.mobile.keepNative = "button";
	var btn;
	$(".dropbtn").on("keypress click", function(ev){
		//		debugger;
		var idBtn = $(this).data("index");
		var navQuestion = $(this).parents('nav');
		$(this).text("Choose...");
		$(this).next().find("span").attr("data-check", "false");
		if(currentQuestionObject.NumericAnswerForMulti().length >= 1){
			for(var i=0;i< currentQuestionObject.NumericAnswerForMulti().length;i++){	
				if(currentQuestionObject.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1) == idBtn){
					currentQuestionObject.NumericAnswerForMulti.splice(i, 1);
					console.log(currentQuestionObject.NumericAnswerForMulti())
				}
			}
		} 
		
		btn = this;
		if($(this).next().css("display")=="none"){
			$(this).next().css("display", "block");			
		}else if($(this).next().css("display")=="block"){ 
			$(this).next().css("display", "none");
		}
		ev.preventDefault();
	});

	$(".ddlValOpts").on("keypress click", function(ev){
	//		debugger;
		ChosText = $(this).text();
		$(btn).text(ChosText);
		if($(this.parentElement.parentElement).css("display")=="none"){
			$(this.parentElement.parentElement).css("display", "block");			
		}else if($(this.parentElement.parentElement).css("display")=="block"){
			$(this.parentElement.parentElement).css("display", "none");
		}
		setTimeout(function(){ 
			$(btn).focus();
		}, 10);
		ev.preventDefault();
	});	
	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}
var i;
document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
//	if(!currentQuestionObject.AllowCantSayValue()){
////		$("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions() +"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
//		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
//
//	}
//	if(currentQuestionObject.NumericAnswer()){
//		console.log($("#odg"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).prop());
//		$("#odg"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).prop('aria-checked', true);
////	$("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions() +"][value="+current_question.NumericAnswer()+"]").prop('aria-checked', true);
//
//	
////	$("#feedback_rating_options_" + currentQuestionObject.IdSurveyQuestions() + ">input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions() +"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
////	$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
////		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+currentQuestionObject.NumericAnswer()+"]").prop('checked', true);
//	}
		 
	if(!currentQuestionObject.AllowCantSayValue()){
		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
	}
		
//		if(!currentQuestionObject.AllowCantSayValue()){
//			$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
//		}
	
		if(currentQuestionObject.NumericAnswer() && currentQuestionObject.NumericAnswer() != "-1"){
//			debugger;
			$("#odg_options_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).attr("checked", true);
			$("#odg_options_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).trigger('click');
			$("#odg_options_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).attr("aria-checked", true);

		} else if(currentQuestionObject.NumericAnswerForMulti() && currentQuestionObject.IsMultiChoice()==1) {
//			debugger;
			for(var i=0; i<current_question.NumericAnswerForMulti().length;i++){
				$("#odg_options_checkbox" + "_" + currentQuestionObject.IdSurveyQuestions() + "_" + currentQuestionObject.NumericAnswerForMulti()[i]).attr('aria-checked', true);
				$("#odg_options_checkbox" + "_" + currentQuestionObject.IdSurveyQuestions() + "_" + currentQuestionObject.NumericAnswerForMulti()[i]).prop('checked', true);
			}
		} else if (currentQuestionObject.NumericAnswerForMulti() && currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.IdQuestionType != "7"){
		//	debugger;
			for(var i=0; i<current_question.NumericAnswerForMulti().length;){
//			console.log("indexDrpDwn "+current_question.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1))				
//			console.log("value "+current_question.NumericAnswerForMulti()[i].slice([i].indexOf("."))) 
				for(var x=0;x < currentQuestionObject.DropdownsOptions().length;){
//					console.log(currentQuestionObject.DropdownsOptions()[x]);
					if(currentQuestionObject.DropdownsOptions()[x].ddlOrderNumber == current_question.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1)){
						for(var y=0;y< currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions.length;y++){
							if(currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].Value == current_question.NumericAnswerForMulti()[i].slice([i].indexOf("."))){
								$("."+ currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).parents("ul").prev().text(currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].Description);
								$("."+ currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).attr("data-check", "true");
							}else {
//								console.log("sledna opcija " + currentQuestionObject.DropdownsOptions()[0].ddlQuestionOptions[0].Value)
							}
						}
						if(currentQuestionObject.DropdownsOptions().length == (x + 1) || current_question.NumericAnswerForMulti().length == (i + 1)){
							return;
						}
						x++;
						i++;	
					}else {
						x++;
//						console.log(currentQuestionObject.DropdownsOptions()[x]);
					}
				}
			}
		}else if (currentQuestionObject.NumericAnswerForMulti() && currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.IdQuestionType == "7"){
			console.log(current_question);
			for(var i=0; i<current_question.NumericAnswerForMulti().length;i++){
				console.log(current_question.NumericAnswerForMulti()[i]);
				for(var x=0;x < currentQuestionObject.DropdownsOptions().length;){
					console.log(currentQuestionObject.DropdownsOptions()[i]);
					if(current_question.NumericAnswerForMulti().length <= currentQuestionObject.DropdownsOptions().length){
						$("#datepicker_" + currentQuestionObject.IdSurveyQuestions() + "_" + x).val(current_question.NumericAnswerForMulti()[i]);
						$("#datepicker_" + currentQuestionObject.IdSurveyQuestions() + "_" + x).attr("aria-label", "You pick a " + current_question.NumericAnswerForMulti()[i] + " date");
						x++;
						i++;
					}
				}
			}
			console.log(current_question.NumericAnswerForMulti())
		}
			if(!currentQuestionObject.NumericAnswer()){			
				currentQuestionObject.NumericAnswer(undefined);  
			}
			if(!currentQuestionObject.NumericAnswerForMulti()){			
				currentQuestionObject.NumericAnswerForMulti(undefined);  
			}		
});


$(document).on('pageshow', '#feedback_options', function () {
	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}
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
	if(!currentQuestionObject.IsMultiChoice()){
		Radio();		
	}else if(currentQuestionObject.IsMultiChoice()==1 && currentQuestionObject.IdQuestionType()!=="7"){
		$(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions()).on('change', function(e){	

				currentQuestionObject.NumericAnswerForMulti([]);
				for(var i=0; i<$(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions()).length;i++){
					if($($(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions())[i]).prop("checked")==true){
						currentQuestionObject.NumericAnswerForMulti.push($($(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions())[i]).val());
						$($(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions())[i]).attr("aria-checked",true);
						console.log(currentQuestionObject.NumericAnswerForMulti());	
					}else {
						$($(".inputForMultiChoiceOptions" + currentQuestionObject.IdSurveyQuestions())[i]).attr("aria-checked",false);
					}
				}				
			});	
		} else if(currentQuestionObject.IdQuestionType() == "7"){
			
			var dateFormFormated = new Date(currentQuestionObject.DateFrom());
			var dateToFormated = new Date(currentQuestionObject.DateTo());
			
		 	for(var i=0;i < currentQuestionObject.HowManyDropdowns();){
				 allDate(currentQuestionObject.DateFrom(), currentQuestionObject.DateTo());
				$('.datepicker'+[i]).datepicker({
					showOn: 'button',
					buttonImage: 'https://dequeuniversity.com/assets/images/calendar.png',
					buttonImageOnly: false,
					dayNamesShort: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
					showButtonPanel: true,
					closeText: 'Close',
					onClose: removeAria
				});
				// $('.datepicker'+[i]).attr("aria-label", "Please write international date format between  " + currentQuestionObject.DateFrom() + " and " + currentQuestionObject.DateTo() + " or go next to choice from datepicker");
				$('.ui-datepicker-trigger').attr('aria-describedby', 'datepickerLabel');
				//$('.ui-datepicker-trigger').children().attr('tabindex', '0');
				$('.ui-datepicker-trigger').attr('aria-label', "Press space for datepicker to choose date from " + currentQuestionObject.DateFrom() + " to " + currentQuestionObject.DateTo());
				// $('.ui-datepicker-trigger').attr('title', "Press space for datepicker to choose date from " + currentQuestionObject.DateFrom() + " to " + currentQuestionObject.DateTo());				
				dayTripper();
				i++;
			}

			$(".date").on("change", function(e) {
				currentQuestionObject.NumericAnswerForMulti([]);
				for(var i=0;i < currentQuestionObject.HowManyDropdowns();i++){
					if($("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val()){ //something is selected
						var currentValueFormated = new Date($("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val())
						if(currentValueFormated >= dateFormFormated && currentValueFormated <= dateToFormated){
							currentQuestionObject.NumericAnswerForMulti.push($("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val());
							$(this).focus();
							$(this).attr("aria-label", "You pick a " + $("#datepicker_"+currentQuestionObject.IdSurveyQuestions()+'_'+i).val() + " date");
						}else {
							$(this).attr("aria-label", "Out of Range, please write international date format between  " + currentQuestionObject.DateFrom() + " and " + currentQuestionObject.DateTo() + " or go next to choice from datepicker");
							$(this).focus();
							$(this).val("");
						}
					} 
						console.log(currentQuestionObject.NumericAnswerForMulti());
				}
					$(this).focus();
					
			})

		}
		
		$(".ddlValOpts").on('keypress click', function($data) {
//			debugger;
			var classs = $(this).attr("class");
			var classsForCheck = classs.slice(11);
			var idOnList = this.parentElement.parentElement.id;
			console.log($("#" + idOnList).prev().text())
			var navQuestion = $(this).parents('nav');
			console.log(idOnList);
			console.log(navQuestion.length);
			currentQuestionObject.NumericAnswerForMulti([]);

			for(var i =0; i < $("#" + idOnList).children().length;i++){
				if($("#" + idOnList).children().eq(i).find("span").attr("class").slice(11)==classsForCheck){
					console.log($("#" + idOnList).children().eq(i).find("span").attr("class").slice(11))
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "true");
				}else {
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "false");
				}
			}		
//			 debugger;
			for(var x=0;x< navQuestion.find('span').length;x++){
				if(navQuestion.find('span').eq(x).attr("data-check") == "true"){
					var tempVal = navQuestion.find('span').eq(x).parent().parent().data("index") + "." +  navQuestion.find('span').eq(x).val();
					currentQuestionObject.NumericAnswerForMulti.push(tempVal);	
					console.log(currentQuestionObject.NumericAnswerForMulti());
				}
			}	
			currentQuestionObject.AllowCantSayValue(false); // remove cant say
			currentQuestionObject.SkipToPageValue(undefined);
			currentQuestionObject.SkipToPageId(undefined);
			currentQuestionObject.OptionEndSurveyValue(undefined);

			$(this.parentElement.parentElement).css("display", "none");
			$(this).parent().parent().focus();
		});


});


function chooseRatingAnswer(val){
	var value=val.toString();
	currentQuestionObject.NumericAnswer(value);
	currentQuestionObject.AllowCantSayValue(false); // remove cant say
	//Skip Logic
	console.log("Skip Logic");
	console.log(currentQuestionObject.NumericAnswer());
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
};


$(document).on('pagebeforeshow', '#feedback_numeric_rating', function () {	
	var btn;

	$(".dropbtnDDLSimpleRating").on("keypress click", function(ev){
//		debugger;
		var idBtn = $(this).data("index");
		var navQuestion = $(this).parents('nav');
		$(this).text("Choose...");
		$(this).next().find("span").attr("data-check", "false");
		if(currentQuestionObject.NumericAnswerForMulti().length >= 1){
			for(var i=0;i< currentQuestionObject.NumericAnswerForMulti().length;i++){	
				if(currentQuestionObject.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1) == idBtn){
					currentQuestionObject.NumericAnswerForMulti.splice(i, 1);
					console.log(currentQuestionObject.NumericAnswerForMulti())
				}
			}
		} 
		
		btn = this;
		if($(this).next().css("display")=="none"){
			$(this).next().css("display", "block");			
		}else if($(this).next().css("display")=="block"){ 
			$(this).next().css("display", "none");
		}
		ev.preventDefault();
	});

	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}
	document.title="Question "+currentQuestionObject.QuestionNo()+"/"+currentQuestionObject.TotalQuestionNo();
	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	if(!currentQuestionObject.AllowCantSayValue()){
		$("input[name=photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"][value="+current_question.NumericAnswer()+"]").prop('checked', true);
	}
//	$("#feedback_rating_options_"+currentQuestionObject.IdSurveyQuestions()+">input:radio").change(function(){
//    	currentQuestionObject.NumericAnswer($(this).val());
//
//	});
//	
	if(currentQuestionObject.NumericAnswer()){
		$("#odg_num_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).attr("checked", true);
		$("#odg_num_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).attr("aria-checked", true);
		$("#odg_num_rating_"+currentQuestionObject.IdSurveyQuestions() +"_"+currentQuestionObject.NumericAnswer()).trigger('click');
		
	}

	if (currentQuestionObject.NumericAnswerForMulti() && currentQuestionObject.IsMultiChoice()==3){
//		debugger;
		for(var i=0; i<current_question.NumericAnswerForMulti().length;){
//			console.log("indexDrpDwn "+current_question.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1))				
//			console.log("value "+current_question.NumericAnswerForMulti()[i].slice([i].indexOf("."))) 
			for(var x=0;x < currentQuestionObject.DropdownsOptions().length;){
//					console.log(currentQuestionObject.DropdownsOptions()[x]);
				if(currentQuestionObject.DropdownsOptions()[x].ddlOrderNumber == current_question.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1)){
					for(var y=0;y< currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions.length;y++){
						if(currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].Value == current_question.NumericAnswerForMulti()[i].slice([i].indexOf("."))){
							$("."+ currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).parents("ul").prev().text(currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].Value);
							$("."+ currentQuestionObject.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).attr("data-check", "true");
						}else {
//								console.log("sledna opcija " + currentQuestionObject.DropdownsOptions()[0].ddlQuestionOptions[0].Value)
						}
					}
					if(currentQuestionObject.DropdownsOptions().length == (x + 1) || current_question.NumericAnswerForMulti().length == (i + 1)){
						return;
					}
					x++;
					i++;
				}else {
					x++;
//						console.log(currentQuestionObject.DropdownsOptions()[x]);
				}
			}
		}
	}

	
	$(".ddlValRat").on("keypress click", function(ev){
//		debugger;
		ChosText = $(this).text();
		$(btn).text(ChosText);
		if($(this.parentElement.parentElement).css("display")=="none"){
			$(this.parentElement.parentElement).css("display", "block");			
		}else if($(this.parentElement.parentElement).css("display")=="block"){
			$(this.parentElement.parentElement).css("display", "none");
		}
		setTimeout(function(){ 
			$(btn).focus();
		}, 10);
		ev.preventDefault();
	});	
	
	
});
$(document).on('pageshow', '#feedback_numeric_rating', function () {	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}
	//resizeSurveyTitleHeight();
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

	$(".ddlValRat").on('keypress click', function($data) {
//			debugger;
			var classs = $(this).attr("class");
			var classsForCheck = classs.slice(classs.indexOf(" ")+1);
			var idOnList = this.parentElement.parentElement.id;
			console.log($("#" + idOnList).prev().text())
			var navQuestion = $(this).parents('nav');
			console.log(idOnList);
			console.log(navQuestion.length);
			currentQuestionObject.NumericAnswerForMulti([]);

			for(var i =0; i < $("#" + idOnList).children().length;i++){
				if($("#" + idOnList).children().eq(i).find("span").attr("class").slice(classs.indexOf(" ")+1)==classsForCheck){
					console.log($("#" + idOnList).children().eq(i).find("span").attr("class").slice(classs.indexOf(" ")+1))
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "true");
				}else {
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "false");
				}
			}		
//			 debugger;
			for(var x=0;x< navQuestion.find('span').length;x++){
				if(navQuestion.find('span').eq(x).attr("data-check") == "true"){
					var tempVal = navQuestion.find('span').eq(x).parent().parent().data("index") + "." +  navQuestion.find('span').eq(x).val();
					currentQuestionObject.NumericAnswerForMulti.push(tempVal);	
					console.log(currentQuestionObject.NumericAnswerForMulti());
				}
			}	
			currentQuestionObject.AllowCantSayValue(false); // remove cant say
			currentQuestionObject.SkipToPageValue(undefined);
			currentQuestionObject.SkipToPageId(undefined);
			currentQuestionObject.OptionEndSurveyValue(undefined);

			$(this.parentElement.parentElement).css("display", "none");
			$(this).parent().parent().focus();
		});

	ResetValidation();
	Radio();
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




$(document).on('pagebeforeshow', '#survey_page', function () {
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}

	$(document).on("mobileinit", function () {
		$.mobile.ignoreContentEnabled=true;
	});

	var btn;
	$(".dropbtnDDLSimpleRatingOnPage").on("keypress click", function(ev){
//		debugger;
		btn = this;
		var idBtn = $(this).data("index");
		var idQuestion = $(this).parent().attr("id").slice(32);
		$(this).text("Choose...");
		$(this).next().find("span").attr("data-check", "false");
		for(var x=0;x < currentQuestionObject.PageQuestions().length;x++){
			if(currentQuestionObject.PageQuestions()[x].IdSurveyQuestions() == idQuestion){
				for(var i=0;i< currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti().length;i++){	
					if(currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1) == idBtn){
						currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti.splice(i, 1);
						console.log(currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti())
					}
				}
			} 
		}

		if($(this).next().css("display")=="none"){
			$(this).next().css("display", "block");			
		}else if($(this).next().css("display")=="block"){
			$(this).next().css("display", "none");
		}
		ev.preventDefault();		
	});
	
	$(".ddlValRatOnPage").on("keypress click", function(ev){
//		debugger;
		ChosText = $(this).text();
		$(btn).text(ChosText);
		if($(this.parentElement.parentElement).css("display")=="none"){
			$(this.parentElement.parentElement).css("display", "block");			
		}else if($(this.parentElement.parentElement).css("display")=="block"){
			$(this.parentElement.parentElement).css("display", "none");
		}
		setTimeout(function(){ 
			$(btn).focus();
		}, 10);
		ev.preventDefault();	
	});
	
	var btn;
	$(".dropbtnOnPage").on("keypress click", function(ev){
//		debugger;
		btn = this;
		var idBtn = $(this).data("id");
		var idQuestion = $(this).parent().attr("id").slice(33);
		$(this).text("Choose...");
		$(this).next().find("span").attr("data-check", "false");
		for(var x=0;x < currentQuestionObject.PageQuestions().length;x++){
			if(currentQuestionObject.PageQuestions()[x].IdSurveyQuestions() == idQuestion){
				for(var i=0;i< currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti().length;i++){	
					if(currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1) == idBtn){
						currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti.splice(i, 1);
						console.log(currentQuestionObject.PageQuestions()[x].NumericAnswerForMulti())
					}
				}
			} 
		}

		if($(this).next().css("display")=="none"){
			$(this).next().css("display", "block");			
		}else if($(this).next().css("display")=="block"){
			$(this).next().css("display", "none");
		}
		ev.preventDefault();		
	});
	
	$(".ddlValOnPage").on("keypress click", function(ev){
//		debugger;
		ChosText = $(this).text();
		$(btn).text(ChosText);
		if($(this.parentElement.parentElement).css("display")=="none"){
			$(this.parentElement.parentElement).css("display", "block");			
		}else if($(this.parentElement.parentElement).css("display")=="block"){
			$(this.parentElement.parentElement).css("display", "none");
		}
		setTimeout(function(){ 
			$(btn).focus();
		}, 10);
		ev.preventDefault();	
	});
	
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
});


$(document).on('pageshow', '#survey_page', function () {
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
		return;
	}
	
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
	
//	if(!currentQuestionObject.IsMultiChoice()){
//		Radio();		
//	}else {
		$(".inputForMultiChoiceOptionsPage").off().on('change', function(event){
			$.mobile.ignoreContentEnabled = true;
				var i;
				var idto = this.id;
				var valval = this.value;
				$.each(currentQuestionObject.PageQuestions(), function(index, value) {
					console.log(idto);
					console.log(valval);	
					
					if (idto.indexOf("odg"+value.IdSurveyQuestions()+"_") >= 0){
						if($("#"+idto).is(":checked")){
							$("#"+idto).attr("aria-checked", "true");
							console.log($("#"+idto).val());
							currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push($("#"+idto).val());
							$("#"+idto).focus();
							console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti());
	//						value.AllowCantSayValue(false);
						}else{
							$("#"+idto).attr("aria-checked", "false");
							for (var i=currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti().length-1; i>=0; i--) {
							    if (currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti()[i] === $("#"+idto).val()) {
							    	currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.splice(i, 1);
							    	console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti())
	//						    	value.AllowCantSayValue(false);		
							    }
							}
						}
					}
//					currentQuestionObject.PageQuestions()[index].NumericAnswer(undefined);
					currentQuestionObject.PageQuestions()[index].AllowCantSayValue(false); // remove cant say
//					currentQuestionObject.SkipToPageValue(value.QuestionOptions()[i].SkipToPageNumber());
//	    			currentQuestionObject.SkipToPageId(value.QuestionOptions()[i].SkipToIdPage());
//					currentQuestionObject.PageQuestions()[index].OptionEndSurveyValue(undefined);
			    });
		});
		
		$(".ddlValRatOnPage").on('keypress click', function($data){
//			debugger;
			var classs = $(this).attr("class");
			var classsForCheck = classs.slice(classs.indexOf(" ")+1);
			var idOnList = this.parentElement.parentElement.id;
			var navQuestion = $(this).parents('nav');
			console.log(idOnList);
			console.log(navQuestion);

			$.each(currentQuestionObject.PageQuestions(), function(index, value) {
//			debugger;
			if(navQuestion.attr('class').slice(-1) == index){				
				currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti([]);
			}
			
			for(var i =0; i < $("#" + idOnList).children().length;i++){
				if($("#" + idOnList).children().eq(i).find("span").attr("class").slice(classs.indexOf(" ")+1)==classsForCheck){
					console.log($("#" + idOnList).children().eq(i).find("span").attr("class").slice(classs.indexOf(" ")+1))
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "true")
				}else {
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "false")
				}
			}

			if(navQuestion.attr('class').slice(-1) == index){
				for(var x=0;x< navQuestion.find('span').length;x++){
					if(navQuestion.find('span').eq(x).attr("data-check") == "true"){
						var tempVal = navQuestion.find('span').eq(x).parent().parent().data("index") + "." +  navQuestion.find('span').eq(x).val(); 	
						currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push(tempVal);	
						console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti());
					}
				}
			}	
			
//			currentQuestionObject.PageQuestions()[index].NumericAnswer(undefined);
			currentQuestionObject.PageQuestions()[index].AllowCantSayValue(false); // remove cant say
//			currentQuestionObject.SkipToPageValue(value.QuestionOptions()[i].SkipToPageNumber());
//			currentQuestionObject.SkipToPageId(value.QuestionOptions()[i].SkipToIdPage());
//			currentQuestionObject.PageQuestions()[index].OptionEndSurveyValue(undefined);
		});	
		$(this.parentElement.parentElement).css("display", "none");
		$(this).parent().parent().focus();
	});		
		
		
		$(".ddlValOnPage").on('keypress click', function($data){
			var classs = $(this).attr("class");
			var classsForCheck = classs.slice(13);
			var idOnList = this.parentElement.parentElement.id;
			var navQuestion = $(this).parents('nav');
			console.log(idOnList);
			console.log(navQuestion);

			$.each(currentQuestionObject.PageQuestions(), function(index, value) {
//			debugger;
			if(navQuestion.attr('class').slice(-1) == index){				
				currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti([]);
			}
			
			for(var i =0; i < $("#" + idOnList).children().length;i++){
				if($("#" + idOnList).children().eq(i).find("span").attr("class").slice(13)==classsForCheck){
					console.log($("#" + idOnList).children().eq(i).find("span").attr("class").slice(13))
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "true")
				}else {
					$("#" + idOnList).children().eq(i).find("span").attr("data-check", "false")
				}
			}

			if(navQuestion.attr('class').slice(-1) == index){
				for(var x=0;x< navQuestion.find('span').length;x++){
					if(navQuestion.find('span').eq(x).attr("data-check") == "true"){
						var tempVal = navQuestion.find('span').eq(x).parent().parent().data("index") + "." +  navQuestion.find('span').eq(x).val(); 	
						currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti.push(tempVal);	
						console.log(currentQuestionObject.PageQuestions()[index].NumericAnswerForMulti());
					}
				}
			}	
//			currentQuestionObject.PageQuestions()[index].NumericAnswer(undefined);
			currentQuestionObject.PageQuestions()[index].AllowCantSayValue(false); // remove cant say
//			currentQuestionObject.SkipToPageValue(value.QuestionOptions()[i].SkipToPageNumber());
//			currentQuestionObject.SkipToPageId(value.QuestionOptions()[i].SkipToIdPage());
//			currentQuestionObject.PageQuestions()[index].OptionEndSurveyValue(undefined);
		});	
		$(this.parentElement.parentElement).css("display", "none");
		$(this).parent().parent().focus();
		return false;
	});
//		event.preventDefault();
//	}	
	
	$("input[type='radio']").change( function($data){
		console.log($data)
		var i;
		var idto = this.id;
		var valval = this.value;
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			console.log(idto);
			console.log(valval);
			
			if (idto.indexOf("odg"+value.IdSurveyQuestions()+"_") >= 0){
				value.NumericAnswer(valval);
				value.AllowCantSayValue(false); // remove cant say
				$("#"+idto).attr("aria-checked", "true");
				console.log("change change change "+valval);
				
				
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
		autosize(value);
	});
	
	$('textarea').trigger('keydown');
	ResetValidation();
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
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).prop('checked', true);
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).attr('aria-checked', true);
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
					if(value.NumericAnswer()!==undefined){
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).prop('checked', true);
						$("#odg"+value.IdSurveyQuestions() +"_"+value.NumericAnswer()).attr('aria-checked', true);
					}
					
				}
			}
			else 
				if(value.IdQuestionType()==="6"){
//				$("#cantSayCheckBoxText_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.TextAnswer() && value.TextAnswer()!=="" && value.TextAnswer()!==" "){				
					$("#message_txt_area_"+value.IdSurveyQuestions()).val(value.TextAnswer());
				}
			}
		});
    }
	else{
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if(value.IdQuestionType()==="4"){//rating
				// remove cant say
//				$("input[id*=cantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()+"]").prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
					if(value.AllowCantSayValue() && value.NumericAnswerForMulti().length == 0){
						// remove cant say
//						$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
					}
					else{
						// remove cant say
//						$(".DIVcantSayCheckBoxNumericRating_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
						if(value.NumericAnswer()!==undefined && value.NumericAnswer() != "-1"){
							console.log(value.NumericAnswer()+" - rate");
							console.log($("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]"));
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").attr('aria-checked', true);
							
						}else if(value.NumericAnswerForMulti()!==undefined && value.IsMultiChoice()==3){
							for(var i=0; i<value.NumericAnswerForMulti().length;){
							//  debugger;
	//						console.log("indexDrpDwn "+value.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1))				
	//						console.log("value "+value.NumericAnswerForMulti()[i].slice([i].indexOf(".")))
								for(var x=0;x < value.DropdownsOptions().length;){
	//								console.log(value.DropdownsOptions()[x]);
								// debugger;
									if(value.DropdownsOptions()[x].ddlOrderNumber == value.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1)){
										for(var y=0;y< value.DropdownsOptions()[x].ddlQuestionOptions.length;y++){
											// debugger;
											if(value.DropdownsOptions()[x].ddlQuestionOptions[y].Value == value.NumericAnswerForMulti()[i].slice([i].indexOf("."))){
												// $("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).parents("ul").prev().text(value.DropdownsOptions()[x].ddlQuestionOptions[y].Value);
												$("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyQuestions + [index] + "" + [x] + "" + [y]).parents("ul").prev().text(value.DropdownsOptions()[x].ddlQuestionOptions[y].Value);

												console.log($("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyQuestions + [index] + "" + [x] + "" + [y]));
												console.log(value.DropdownsOptions()[x].ddlQuestionOptions[y].Value);

												// $("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).attr("data-check", "true");
												$("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyQuestions + value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions + "" + [x] + "" + [y]).attr("data-check", "true");
											}else {
	//											console.log("sledna opcija " + currentQuestionObject.DropdownsOptions()[0].ddlQuestionOptions[0].Value)
											}
										}
										if(value.DropdownsOptions().length == (x + 1) || value.NumericAnswerForMulti().length == (i + 1)){
											return;
										}
										x++;
										i++;
									}else {
										// if(currentQuestionObject.DropdownsOptions().length == (x + 1) || current_question.NumericAnswerForMulti().length == (i + 1)){
										// 	return;
										// }
										x++;
	//									console.log(currentQuestionObject.DropdownsOptions()[x]);
									}
								}
							}
						}						
					}

//					ace
			$("#feedback_rating_options_" + value.IdSurveyQuestions() + ">input:radio").change(function(){
					value.NumericAnswer($(this).val());
					if(checkPageOptionEndSurvey(value.IdSurveyQuestions(), $(this).val())){
						value.OptionEndSurveyValue("1");
					}
					else{
						value.OptionEndSurveyValue("0");
					}
				});
			}
			else if(value.IdQuestionType()==="5"){//options
				// remove cant say
//				$("input[id*=cantSayCheckBoxOptions_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				
				if(value.AllowCantSayValue() && (value.NumericAnswerForMulti().length == 0 || value.NumericAnswerForMulti()==undefined)){
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).addClass("photo_radios_inactive");
				}
				else{
					// remove cant say
//					$(".DIVcantSayCheckBoxOptions_"+value.IdSurveyQuestions()).removeClass("photo_radios_inactive");
					if(value.NumericAnswer()!==undefined && (value.NumericAnswerForMulti().length == 0 || value.NumericAnswerForMulti()==undefined)){
							$("input[id*=odg"+value.IdSurveyQuestions() +"][value="+value.NumericAnswer()+"]").prop('checked', true);
					} else if(value.NumericAnswerForMulti()!==undefined && value.IsMultiChoice()==1){
						console.log("kolku si glup!!!!! ne vlagaj tukaAAAAAA")
						for(var i=0; i<value.NumericAnswerForMulti().length;i++){
							$("input[id=odg"+value.IdSurveyQuestions() + "_" + "checkbox" + "_" + value.NumericAnswerForMulti()[i]).attr('checked', true);
							$("input[id=odg"+value.IdSurveyQuestions() + "_" + "checkbox" + "_" + value.NumericAnswerForMulti()[i]).attr('aria-checked', true);
						}						
					}
					else if(value.NumericAnswerForMulti()!==undefined && value.IsMultiChoice()==3){
						for(var i=0; i<value.NumericAnswerForMulti().length;){
							// debugger;
//						console.log("indexDrpDwn "+value.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1))				
//						console.log("value "+value.NumericAnswerForMulti()[i].slice([i].indexOf(".")))
							for(var x=0;x < value.DropdownsOptions().length;){
//								console.log(value.DropdownsOptions()[x]);
								if(value.DropdownsOptions()[x].ddlOrderNumber == value.NumericAnswerForMulti()[i].slice(0, [i].indexOf(".") - 1)){
									for(var y=0;y< value.DropdownsOptions()[x].ddlQuestionOptions.length;y++){
										if(value.DropdownsOptions()[x].ddlQuestionOptions[y].Value == value.NumericAnswerForMulti()[i].slice([i].indexOf("."))){
											$("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).parents("ul").prev().text(value.DropdownsOptions()[x].ddlQuestionOptions[y].Description);
											$("."+ value.DropdownsOptions()[x].ddlQuestionOptions[y].IdSurveyOptions+ "" + [x] + "" + [y]).attr("data-check", "true");
										}else {
//											console.log("sledna opcija " + currentQuestionObject.DropdownsOptions()[0].ddlQuestionOptions[0].Value)
										}
									}
									if(value.DropdownsOptions().length == (x + 1) || value.NumericAnswerForMulti().length == (i + 1)){
										return;
									}
									x++;
									i++;
								}else {
									// if(currentQuestionObject.DropdownsOptions().length == (x + 1) || current_question.NumericAnswerForMulti().length == (i + 1)){
									// 	return;
									// }
									x++;
//									console.log(currentQuestionObject.DropdownsOptions()[x]);
								}
							}
						}
					}
				}
			}
			else if(value.IdQuestionType()==="6"){
//				$("input[id*=cantSayCheckBoxText_"+value.IdSurveyQuestions()).prop('checked', value.AllowCantSayValue()).checkboxradio('refresh');
				if(value.TextAnswer() && value.TextAnswer()!=="" && value.TextAnswer()!==" "){				
					$("#message_txt_area_"+value.IdSurveyQuestions()).val(value.TextAnswer());
				}
			} else if(value.IdQuestionType()==="7"){ //datepicker
				var dateFormFormated = new Date(value.DateFrom())
				var dateToFormated = new Date(value.DateTo())

				allDate(currentQuestionObject.DateFrom(), currentQuestionObject.DateTo());
				for(var i=0;i < value.HowManyDropdowns();){
					$('.datepicker'+[i]).datepicker({
						showOn: 'button',
						buttonImage: 'https://dequeuniversity.com/assets/images/calendar.png',
						buttonImageOnly: false,
						dayNamesShort: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
						showButtonPanel: true,
						closeText: 'Close',
						onClose: removeAria
					});
					// $('.datepicker'+[i]).attr("aria-label", "Please write international date format between  " + value.DateFrom() + " and " + value.DateTo() + " or go next to choice from datepicker");
					$('.ui-datepicker-trigger').attr('aria-describedby', 'datepickerLabel');
					//$('.ui-datepicker-trigger').children().attr('tabindex', '0');
					$('.ui-datepicker-trigger').attr('aria-label', "Press space for datepicker to choose date from " + value.DateFrom() + " to " + value.DateTo());
					// $('.ui-datepicker-trigger').attr('title', "Date picker to choose date from " + value.DateFrom() + " to " + value.DateTo());
					
					
					dayTripper();
					i++;
				}

				$(".dateOnPage").on("keydown change", function(e) {
					console.log(this.value)
					value.NumericAnswerForMulti([]);
					for(var i=0;i < value.HowManyDropdowns();i++){
						var currentValueFormatedPage = new Date($("#datepicker_OnPage"+value.IdSurveyQuestions()+'_'+i).val())
						if($("#datepicker_OnPage"+value.IdSurveyQuestions()+'_'+i).val()){ //something is selected
							if(currentValueFormatedPage >= dateFormFormated && currentValueFormatedPage <= dateToFormated){
								value.NumericAnswerForMulti.push($("#datepicker_OnPage"+value.IdSurveyQuestions()+'_'+i).val());
								$(this).attr("aria-label", "You pick a " + $("#datepicker_OnPage"+value.IdSurveyQuestions()+'_'+i).val() + " date");
							}else {
								$(this).attr("aria-label", "Out of Range, please write international date format between  " + value.DateFrom() + " and " + value.DateTo() + " or go next to choice from datepicker");
								$(this).focus();
								$(this).val("");
							}

						}
						console.log(value.NumericAnswerForMulti());
					}
					$(this).focus();
				})

				for(var i=0; i<value.NumericAnswerForMulti().length;i++){
					console.log(value.NumericAnswerForMulti()[i]);
					for(var x=0;x < value.DropdownsOptions().length;){
						console.log(value.DropdownsOptions()[i]);
						$("#datepicker_OnPage" + value.IdSurveyQuestions() + "_" + x).val(value.NumericAnswerForMulti()[i]);
						$("#datepicker_OnPage" + value.IdSurveyQuestions() + "_" + x).attr("aria-label", "You pick a " + $("#datepicker_OnPage"+value.IdSurveyQuestions()+'_'+x).val() + " date");
						x++;
						i++;
					}
				}
			}
			
			if(value.IdQuestionType()==="1" || value.IdQuestionType()==="6"){
				$('#text_question'+currentQuestionObject.PageQuestions()[index].IdSurveyQuestions()).off('keydown').on('keydown', function(event) {
					console.log("accessibility-pages: "+currentQuestionObject.PageQuestions()[index].IdSurveyQuestions());
					if(event.keyCode !== 9){
						$('#text_question'+currentQuestionObject.PageQuestions()[index].IdSurveyQuestions()).parent().parent().find('#message_txt_area_'+currentQuestionObject.PageQuestions()[index].IdSurveyQuestions()).focus();
					}					
				});
			}
		});
	}	
});  


$(document).on('pagebeforeshow', '#account_settings', function () {
//	$("#accessibility_agreement1").checkboxradio('refresh');
	
	if(homeModelObject.IsAccessibility()){
		GetReader();
	}	
});

$(document).on('pageshow', '#feedbackInfo', function () {	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
	}else{	
		$("#feedbackInfo .header").text(localizationViewModel.momentLocalizaton().reached_end_of_survey)		
	}
});

$(document).on('pagebeforeshow', '#feedbackInfo', function () {
	
		
});

$(document).on('pageshow', '#surveyEnd', function () {	
	if(surveysForUserObject.IdSurvey()==undefined){
		$.mobile.changePage($('#page_surveys_list'));
	}else{		
	}
});

$(document).on('pagebeforeshow', '#surveyEnd', function () {
	
		
});


$('.btn-home').click(function(){
//	currentQuestionObject = null;
//	surveysObject = null;
	$.mobile.changePage($('#page_surveys_list'));
});


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
	var x=0;
	for(x=0;x<currentQuestionObject.QuestionOptions().length;x++){
		if(parseInt(currentQuestionObject.QuestionOptions()[x].Value())==parseInt(recognizeType)){
			//$('#imgMerchantLogo').attr('src', currentQuestionObject.QuestionOptions()[x].ImageUrl());
			//$image.attr('src',currentQuestionObject.QuestionOptions()[x].ImageUrl());
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
	$('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
	//console.log(recognizeType + "<- recognizeType");
}

function HotKeys(){

	$(window).off('keydown').on('keydown', function(event) {
		if(event.ctrlKey && event.keyCode == 32) {
		    console.log("Ctrl + space event captured!");
		    event.preventDefault();
		    if(currentQuestionObject.QuestionNo()===0){
		    	$('#btn_feedback_start_next').click();
		    } else {
		    	console.log("coj malku");
		    	switch(location.hash){
		    	case "#survey_page":
		    		currentQuestionObject.survey_page_next_click();
		    		break;
		    	case "#feedback_text":
//		    		$("#"+document.activeElement.id).blur();
		    		document.activeElement.blur();
		    		currentQuestionObject.feedback_text_next_click();
		    		break;
		    	case "#feedback_rating":
		    		currentQuestionObject.feedback_rating_next_click();
		    		break;
		    	case "#feedback_options":
		    		currentQuestionObject.feedback_options_next_click();
		    		break;
		    	case "#feedback_numeric_rating":
		    		currentQuestionObject.feedback_numeric_rating_next_click();
		    		break;
		    	case "#feedback_matrix":
		    		currentQuestionObject.feedback_matrix_next_click();
		    		break;
		    	case "#feedbackInfo":
		    		currentQuestionObject.SaveFeedback();
		    		break;
		    	}
		    }
		  }
		else if(event.ctrlKey && event.keyCode == 83) { 
		    console.log("Ctrl + S event captured!");
		    event.preventDefault();
		    if((currentQuestionObject.QuestionNo()>1) && (location.hash != "#feedbackInfo")){
		    	surveysObject.saveSurveyTempAnswers();
		    }
		  }
		else if(event.ctrlKey && event.keyCode == 8) { 
			console.log("Ctrl + backspace event captured!");
			event.preventDefault();
			if(currentQuestionObject.QuestionNo()>1){
		    	switch(location.hash){
		    	case "#survey_page":
		    		currentQuestionObject.survey_page_back_click();
		    		break;
		    	case "#feedback_text":
//		    		$("#"+document.activeElement.id).blur();
		    		document.activeElement.blur();
		    		currentQuestionObject.feedback_text_back_click();
		    		break;
		    	case "#feedback_rating":
		    		currentQuestionObject.feedback_rating_back_click();
		    		break;
		    	case "#feedback_options":
		    		currentQuestionObject.feedback_options_back_click();
		    		break;
		    	case "#feedback_numeric_rating":
		    		currentQuestionObject.feedback_options_back_click();
		    		break;
		    	case "#feedback_matrix":
		    		currentQuestionObject.feedback_matrix_next_click();
		    		break;
		    	case "#feedbackInfo":
		    		surveyNavigate();
		    		break;
		    	}
			}
		}else if(event.keyCode == 32 || event.keyCode == 13) {
			console.log("Space event captured!");
			if(location.hash === "#account_settings" || location.hash === "#feedback_options" || location.hash === "#survey_page" || location.hash === "#feedback_matrix"){
				console.log("Spaceeeeeeeeeeeeeeeeeeeeee!");
				if(location.hash === "#survey_page"){
//					console.log($(':focus'));
//					console.log("what is it: "+$(':focus')[0].type);
//					$(':focus').click();
					if($(':focus')[0].type === 'checkbox'){
						console.log("in4eeeeeeeeee");
						event.preventDefault();
					}
				}else if(currentQuestionObject.IsMultiChoice() == 3){console.log("go go goooo")}
				else{
					event.preventDefault();
				}
			}
				if(location.hash === "#account_settings"){
					console.log("focus: "+$(':focus')[0].id);
				var focusId = $(':focus')[0].id;
				if(focusId === "accessibility_agreement1") {
					$('#accessibility_agreement1').prop('checked', !$('#accessibility_agreement1').is(":checked"));
					homeModelObject.IsAccessibility($('#accessibility_agreement1').is(":checked"));
	//				console.log("focusId");
				}  else {
	//				console.log("focus");
	//				$(':focus').trigger('click');
					$(':focus').click();
				}
			} else {
//				console.log("focus");
//					$(':focus').trigger('click');
				$(':focus').click();
			}
		} 
	});	
};

//function SpaceSelect(){
//	if(location.hash==='#feedback_start' || location.hash==='home_screen' || location.hash==='#page_surveys_list'){
//	$(window).off('keydown').on('keydown', function(event) {
//		if(event.keyCode == 32 || event.keyCode == 13) {
//			console.log("Space event captured!");
//			event.stopImmediatePropagation();
//			console.log("focus; "+$(':focus'));
//			$(':focus').trigger('click');
//		}
//	});
//	} else {
//		return;
//	}
//};

HotKeys();

function Radio(){
$("input[name='photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"']").on("change focus", function(){
	console.log("this vtornikot: "+this);
	$("input[name='photo_questions_"+currentQuestionObject.IdSurveyQuestions()+"']").attr('aria-checked',false);
		if($(this).is(":checked")){
			$(this).attr('aria-checked',true);
		}
	});
};


var myfunction = function(data){
	var element = $("#"+data);
	var classForPrepend = $("#" + data).parent().attr('class').slice(13);
	var label = element.next();
	var labelIndex = $("." + classForPrepend).find("label").index(label);
	
	$("#"+data).detach();
	$("." + classForPrepend).find("label").eq(labelIndex).before(element);
	element.css("margin-right", "8px");
	element.focus();
};

	var isChrome = !!window.chrome && !!window.chrome.webstore;
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	
	if( !isChrome && !isIE){ 
		alert("Some of the benefits do not work perfectly");
	}

