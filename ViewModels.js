/*var FeedbackModel=function(){
	var self=this;
	self.t1=ko.observable();
	self.t2=ko.observable();
	self.t3=ko.observable();
	self.t4=ko.observable();
	self.t5=ko.observable();
	self.r1=ko.observable(1);
	self.r2=ko.observable(1);
	self.r3=ko.observable(1);
	self.r4=ko.observable(1);
	self.r5=ko.observable(1);
	self.SendFeedback=function(){
		var feedbackObject={};
		feedbackObject.texts={};
		feedbackObject.texts.t1=self.t1();
		feedbackObject.texts.t2=self.t2();
		feedbackObject.texts.t3=self.t3();
		feedbackObject.texts.t4=self.t4();
		feedbackObject.texts.t5=self.t5();
		feedbackObject.ratings={};
		feedbackObject.ratings.r1={}
		feedbackObject.ratings.r1.value=parseInt(self.r1());
		feedbackObject.ratings.r2={};
		feedbackObject.ratings.r2.value=parseInt(self.r2());
		feedbackObject.ratings.r3={};
		feedbackObject.ratings.r3.value=parseInt(self.r3());
		feedbackObject.ratings.r4={};
		feedbackObject.ratings.r4.value=parseInt(self.r4());
		feedbackObject.ratings.r5={};
		feedbackObject.ratings.r5.value=parseInt(self.r5());
		feedbackObject.context={};
		feedbackObject.context.page="/b2b/orders";
		feedbackObject.context.view="payment";
		feedbackObject.context.lang="en";
		feedbackObject.context.attr1="1.3.15";
		feedbackObject.context.attr4="mobile";
		
		jQuery.support.cors = true;
		$.ajax({
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(feedbackObject),
	        cache: false,
	        crossDomain: true,       
	        //url: "https://feedback-d042416trial.hanatrial.ondemand.com:443/api/v2/apps/16e2695e-2c76-43e2-8cec-dd38c530cfe5/posts",
	        url: "https://feedback-p1940423439trial.hanatrial.ondemand.com:443/api/v2/apps/db7abb9c-fe21-4d0f-af4b-bbd436d4f80d/posts",
	        type: 'post', 
	        error: function (x, s, m) {
	
	            // //alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
	        },
	        success: function (res) {
	        	
	        }
	    });
	};
	self.getRatingValue=function(value){
		var result="";
		switch(parseInt(value())){
		case 1:
			result="Very Bad";
			break;
		case 2:
			result="Bad";
			break;
		case 3:
			result="Neutral";
			break;
		case 4:
			result="Good";
			break;
		case 5:
			result="Very Good";
			break;
		}
		return result;
	};
};*/
var version_no = $("#version_no").val();

function loadingSplashScreen(){
	$(document).on("ajaxStart.firstCall", function () {
		$('.loading').fadeIn();
    });
    $(document).on("ajaxStop", function () {
    	
    	$('.loading').fadeOut();
    	
    });
    $(document).on("ajaxError.firstCall", function () {
    	$('.loading').fadeOut();
    });
};

var unbindSplashScreen=function(){
	$(document).off(".firstCall");
}

var timeGlobal;

/*---------------------               from ViewModels2.js :              ---------------------*/
var LeaderboardObject = function () {
	var self = this;
	self.Username = ko.observable();
	self.NumberTakenSurveys = ko.observable(0);
	self.RankText = ko.observable('');
	self.RankImage = ko.observable('');
	self.NextRankNumberRemaining = ko.observable(0);
	self.NextRankText = ko.observable('');
	self.Percentage = ko.observable('0%');
	self.PercentagePixels = ko.observable('0%');
	//self.MaxNumberTakenSurveys = ko.observable(0);
	
	self.LeaderboardList = ko.observableArray();
	
	self.GetListRankingLeaderboard=function(){
		var r = $.Deferred();
    		 var params={};
    		 params.Username="0";
    		 var leaderboardSingleObject;
    		 self.LeaderboardList([]);
    			$.ajax({
    		        dataType: "json",
    		        data: JSON.stringify(params),
    		        cache: false,
    		        crossDomain: true,
    		        url: urlString + "services/GetLeaderboardRankingList.xsjs",
    		        type: 'POST',
    		        error: function (x, s, m) {
    		            
    		        },
    		        success: function (res) {
    		        	$.each(res, function(index, value) {
    		        		leaderboardSingleObject = new LeaderboardSingleObject();
    		        		leaderboardSingleObject.IdLeaderboard = index+1;
    		        		leaderboardSingleObject.NumberTakenSurveys = value.NumberTakenSurveys;
    		        		leaderboardSingleObject.FirstName = value.FirstName;
    		        		leaderboardSingleObject.Country = value.Country;
    		        		leaderboardSingleObject.RankText = checkRankingByNumberSurveys(value.NumberTakenSurveys).RankText;
    		        		self.LeaderboardList.push(leaderboardSingleObject);
    		        		
    		        	});
    		        	r.resolve(res);
    		        	
    		        }
    		    });    	
		return r;
    };
    
    self.GetUserRanking=function(){
    	if(homeModelObject.Username()!==undefined){
    		var r = $.Deferred();
	   		 var params={};
	   		 params.Username=homeModelObject.Username();
	   		 var leaderboardSingleObject;
	   		 self.LeaderboardList([]);
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/GetLeaderboardRankingList.xsjs",
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		     success: function (res) {
 		        	//console.log(res);
 		        	var checkR;
 		        	if(res[0]){
 		        		checkR = checkRankingByNumberSurveys(res[0].NumberTakenSurveys);
 		        		self.NumberTakenSurveys(res[0].NumberTakenSurveys);
 		        	} 
 		        	else{
 		        		console.log("NO surv taken");
 		        		checkR = checkRankingByNumberSurveys(0);
 		        		self.NumberTakenSurveys(0);
 		        	}
 		        		self.RankText(checkR.RankText);
		        		self.NextRankNumberRemaining(checkR.NextRankNumberRemaining);
		        		self.NextRankText(checkR.NextRankText);
		        		self.Percentage(checkR.Percentage);
		        		self.PercentagePixels(checkR.PercentagePixels);
		        		self.RankImage(checkR.RankImage);
 		        	r.resolve(res);
 		        	
 		        }
	   		    });    	
			return r;
    	}
    	
    };
	
};

var UserNotifications = function () { 
	var self = this;
	self.CountNotificationsNotRead = ko.observable(0);
	self.CountNotificationsRead = ko.observable(0);
	self.NotReadNotificationsList = ko.observableArray();
	self.ReadNotificationsList = ko.observableArray();
	
	self.GetUserNotReadNotifications=function(){
    	if(homeModelObject.IdUsers()!==undefined){
    		var r = $.Deferred();
	   		 var params={};
	   		 params.IdUsers=homeModelObject.IdUsers();
	   		 params.IsRead=0;
	   		 var notificationsObject;
	   		 self.NotReadNotificationsList([]);
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/GetNotificationsForUserIsRead.xsjs",
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		     success: function (res) {
 		        	if(res[0]){
 		        		self.CountNotificationsNotRead(res[0].CountNotifications);
 		        			$.each(res, function(index, value) {
 		        				notificationsObject = new NotificationsObject();
 		        				notificationsObject.IdNotifications(value.IdNotifications);
 		        				notificationsObject.Title(value.Title);
 		        				notificationsObject.Description(value.Description);
 		        				notificationsObject.IsRead(value.IsRead);
 		        				notificationsObject.RecivedTime(formatNotificationsDate(value.RecivedTime));
 	    		        		self.NotReadNotificationsList.push(notificationsObject);
 	    		        		
 	    		        	});
 		        	} 
 		        	else{
 		        		
 		        	}
 		        	r.resolve(res); 		        	
 		        }
	   		    });    	
			return r;
    	}
    	else{}
    	
    };
    
    self.GetUserReadNotifications=function(){
    	if(homeModelObject.IdUsers()!==undefined){
    		var r = $.Deferred();
	   		 var params={};
	   		 params.IdUsers=homeModelObject.IdUsers();
	   		 params.IsRead=1;
	   		 var notificationsObject;
	   		 self.ReadNotificationsList([]);
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/GetNotificationsForUserIsRead.xsjs",
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		     success: function (res) {
 		        	if(res[0]){
 		        		self.CountNotificationsRead(res[0].CountNotifications);
 		        			$.each(res, function(index, value) {
 		        				notificationsObject = new NotificationsObject();
 		        				notificationsObject.IdNotifications(value.IdNotifications);
 		        				notificationsObject.Title(value.Title);
 		        				notificationsObject.Description(value.Description);
 		        				notificationsObject.IsRead(value.IsRead);
 		        				notificationsObject.RecivedTime(formatNotificationsDate(value.RecivedTime));
 	    		        		self.ReadNotificationsList.push(notificationsObject);
 	    		        		
 	    		        	});
 		        	} 
 		        	else{
 		        		
 		        	}
 		        	r.resolve(res); 		        	
 		        }
	   		    });    	
			return r;
    	}
    	else{}
    	
    };
    
    
    self.UpdateNotReadNotifications=function($data){
    	console.log($data.IdNotifications());
    	if(homeModelObject.IdUsers()!==undefined){
    		var r = $.Deferred();
	   		 var params={};
	   		 params.IdNotifications=$data.IdNotifications();
	   		 params.IsRead=1;
	   		 params.IdUsers=homeModelObject.IdUsers();
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/NotificationChangeReadStatusForUser.xsjs",
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		     success: function (res) {
	   		    	console.log("okkkkkk!");
	   		    	self.GetUserNotReadNotifications();
	   		    	self.GetUserReadNotifications().done(function(){changeNotifiPageTitle();});
	   		    	homeModelObject.getUserHomeInfo();
 		        	r.resolve(res); 
 		        	
 		        }
	   		    });    	
			return r;
    	}
    	else{}
    };
    
};


var NotificationsObject = function () {
	var self = this;
	self.IdNotifications = ko.observable();
	self.Title = ko.observable('');
	self.Description = ko.observable('');
	self.IsRead = ko.observable();
	self.RecivedTime = ko.observable('');
};


var LeaderboardSingleObject = function () { 
	var self = this;
	self.IdLeaderboard = ko.observable();
	self.NumberTakenSurveys = ko.observable(0);
	self.FirstName = ko.observable('');
	self.Country = ko.observable(''); 
	self.RankText = ko.observable('');
};

function checkRankingByNumberSurveys(numb){
	var rankObject={};
	var numint = parseInt(numb,10);
	if(numint >= 0 && numint < 2){
		rankObject.RankText = "Newbie";
		rankObject.NextRankNumberRemaining = 2-numint;
		rankObject.NextRankText = "Rookie";
		rankObject.PercentagePixels = Math.round(((numint-0) / (2-0)) * 100)+'%';
		rankObject.Percentage = Math.round(((numint-0) / (2-0)) * 100)+'%';
		rankObject.RankImage = "img/newbie.png";
	}else if(numint >= 2 && numint < 4){
		rankObject.RankText = "Rookie";
		rankObject.NextRankNumberRemaining = 4-numint;
		rankObject.NextRankText = "Do-Gooder";
		rankObject.PercentagePixels = Math.round(((numint-2) / (4-2)) * 100)+'%';
		rankObject.Percentage = Math.round(((numint-2) / (4-2)) * 100)+'%';
		rankObject.RankImage = "img/rookie.png";
	}else if(numint >= 4 && numint < 6){
		rankObject.RankText = "Do-Gooder";
		rankObject.NextRankNumberRemaining = 6-numint;
		rankObject.PercentagePixels = Math.round(((numint-4) / (6-4)) * 100)+'%';
		rankObject.Percentage = Math.round(((numint-4) / (6-4)) * 100)+'%';
		rankObject.NextRankText = "Hero";
		rankObject.RankImage = "img/do-gooder.png";
	}else if(numint >= 6 && numint < 8){
		rankObject.RankText = "Hero";
		rankObject.NextRankNumberRemaining = 8-numint;
		rankObject.NextRankText = "Super Hero";
		rankObject.PercentagePixels = Math.round(((numint-6) / (8-6)) * 100)+'%';
		rankObject.Percentage = Math.round(((numint-6) / (8-6)) * 100)+'%';
		rankObject.RankImage = "img/hero.png";
	}else if(numint >= 8){
		rankObject.RankText = "Super Hero";
		rankObject.NextRankNumberRemaining = 0;
		rankObject.NextRankText = "";
		rankObject.PercentagePixels = '100%';
		rankObject.Percentage = Math.round((numint / 8) * 100)+'%';
		rankObject.RankImage = "img/super-hero.png";
	} else {
		rankObject.RankText = "Newbie";
	}
	return rankObject;	
};


var SurveysForUserObject = function () {
	
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
    
    
    self.GetActiveSurveysForUser=function(){
    	var r = $.Deferred();
//    	 var token = localStorage.getItem('t');
//    	 if(token){
    		 var params={};
    			params.lang=getCookie("lang");
    			$.ajax({
    		        dataType: "json",
    		        data: JSON.stringify(params),
    		        cache: false,
    		        crossDomain: true,
    		        url: urlString + "services/GetActiveSurveysForUser.xsjs",
//    		        + "?token="+encodeURIComponent(token),
    		        type: 'POST',
    		        error: function (x, s, m) {
    		            
    		        },
    		        success: function (res) {
	    		        	self.currentActiveSurveysList(res);
	    		        	console.log(res);
	    		        	self.ActiveSurveysCount(res.length);
	    		        	if(res.length==0){
	    		        		$("#msgEmptySurveyList").css("display","block");
	    		        	}else{
	    		        		$("#msgEmptySurveyList").css("display","none");
	    		        	}
    		        	r.resolve(res);
    		        	
    		        }
    		    });
//    	 }
    	
		return r;
    };
    
    self.goToSurvey = function($data) {
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
	    		goToSurveyRedirect($data.IdSurvey);
						
			}else{
				window.onbeforeunload = null;
			}
		});
    };
};

var SurveysObject = function () {
    var self = this;
    
    self.IdSurvey = ko.observable();
    self.IsMaster = ko.observable(false);
    self.IdSurveyType = ko.observable();
    self.Title = ko.observable();
    self.Description = ko.observable();
    self.DateFrom = ko.observable();
    self.DateUntil = ko.observable();
    self.IsAnonymous = ko.observable();
    self.IsTest = ko.observable();
    self.IsPublic = ko.observable();
    self.IsActive = ko.observable();
    self.SurveyEndedByOption = ko.observable(0);
    self.QuestionList = ko.observableArray();
    self.Username = ko.observable();
	self.EndSurveyDescription =  ko.observable();
	self.SurveyTreshold =  ko.observable();
	self.TextTreshold =  ko.observable();
	self.Disclaimer =  ko.observable();

//    self.query = ko.observable('');
    
    self.ReplaceDescriptionPlaceholders=function(){
    	var descStr=" ";
    	descStr=self.Description();
    	if(descStr){    		
    		descStr=descStr.split("{ManagerName}").join(homeModelObject.ManagerName());
    			//descStr.replace("{ManagerName}",homeModelObject.ManagerName());
    	}    	
    	return descStr;
    };
    
    self.ReplaceDisclaimer=function(){
    	var discStr=" ";
    	discStr=self.Disclaimer();
    	console.log(discStr)
    	if(discStr){    		
	    	if(discStr.localeCompare('The participation in this survey is voluntary and anonymous, please read the  <a href="https://jam4.sapjam.com/groups/jXPyfZtSiQEcvwnWp8bpSD/documents/BzCBvJP0z8cfIZlv2tCNxc/slide_viewer" target="_blank">Privacy Statement</a>  for further information. The agreed Threshold for numeric values is {Threshold for Reporting} and for text answers it is {Text Threshold}.') == 0 && getCookie('lang') == 'de'){
	    		discStr = 'Die Teilnahme an dieser Umfrage ist freiwillig und anonym. Bitte lies das '+' <a href="https://jam4.sapjam.com/groups/jXPyfZtSiQEcvwnWp8bpSD/documents/BzCBvJP0z8cfIZlv2tCNxc/slide_viewer" target="_blank">Privacy Statement</a> '+' für weitergehende Informationen. Die vereinbarte Mindestauswertungsgrenze für numerische Werte ist {Threshold for Reporting} und für Textantworten ist sie {Text Threshold}.';
	    	} else {
	    	    discStr=self.Disclaimer();
	    	}
    		discStr=discStr.split("{Threshold for Reporting}").join(self.SurveyTreshold());
    		discStr=discStr.split("{Text Threshold}").join(self.TextTreshold());
    			//descStr.replace("{ManagerName}",homeModelObject.ManagerName());
    	}    	
    	return discStr;
    };

    
    
    self.GetSurveyById=function(idparam,defferedParam,lang){
    	 var r = $.Deferred();
    	 var i;
//     	var token = localStorage.getItem('t');
//     	if(token){
 		var params={};
 		var surveyQuestionObject;
 		var questionOptionObject;
 		params.IdSurvey=idparam;
 		params.lang=getCookie("lang");
 		//params.lang='de';
 		console.log(params.lang);
 		//params.Username="P1940423439";
 		$.ajax({
 	        dataType: "json",
 	        data: JSON.stringify(params),
 	        cache: false,
 	        crossDomain: true,
 	        url: urlString + "services/GetSurvey.xsjs", 
// 	        		+"?token="+encodeURIComponent(token),
 	        type: 'POST',
 	        error: function (x, s, m) { 
 	            
 	        },
 	        success: function (res) {	
 	        	console.log(res);
 	        	self.QuestionList([]);
 	        	self.IdSurvey(res.IdSurvey);
 	        	self.IdSurveyType(res.IdSurveyType);
 	        	self.Title(res.Title);
 	        	self.Description(res.Description);
 	        	self.DateFrom(res.DateFrom);
 	        	self.DateUntil(res.DateUntil);
 	        	self.IsAnonymous(res.IsAnonymous);
 	        	self.IsTest(res.IsTest);
 	        	self.IsPublic(res.IsPublic);
				self.EndSurveyDescription(res.EndSurveyDescription);
				self.Disclaimer(res.Disclaimer); 
				self.SurveyTreshold(res.SurveyTreshold);
	            self.TextTreshold(res.TextTreshold);
 	        	//self.Username('P1940423439');
 	        	surveyQuestionObject=new SurveyQuestionObject();
 	        	questionOptionObject=new QuestionOptionObject();
 	        	var x=0,y=0;
 	        	for(x=0;x<res.Questions.length;x++){	        		
 	        		surveyQuestionObject=new SurveyQuestionObject();
 	        		surveyQuestionObject.AllowCantSayValue(false);
 	        		surveyQuestionObject.QuestionNo(res.Questions[x].QuestionNo);
 	        		surveyQuestionObject.PreviousQuestionNo(x);
 	        		
 	        		if(x==(res.Questions.length-1)){
 	        			surveyQuestionObject.NextQuestionNo(res.Questions[x].QuestionNo);
 	        		}else{
 	        			surveyQuestionObject.NextQuestionNo(res.Questions[x+1].QuestionNo);
 	        		}
 	        		surveyQuestionObject.SkipToPageValue(res.Questions[x].SkipToPageNumber);
 	        		surveyQuestionObject.SkipToPageId(res.Questions[x].SkipToIdPage);
 	        		surveyQuestionObject.IdSurveyQuestions(res.Questions[x].IdSurveyQuestions);
 	        		surveyQuestionObject.IdSurvey(res.Questions[x].IdSurvey);
 	        		surveyQuestionObject.IdQuestionType(res.Questions[x].IdQuestionType);
 	        		surveyQuestionObject.Title(res.Questions[x].Title);
 	        		surveyQuestionObject.Description(res.Questions[x].Description);
 	        		surveyQuestionObject.NumberOfOptions(res.Questions[x].NumberOfOptions);
 	        		surveyQuestionObject.ValueSameAsDescription(res.Questions[x].ValueSameAsDescription);
 	        		surveyQuestionObject.RateFrom(res.Questions[x].RateFrom);
 	        		surveyQuestionObject.RateTo(res.Questions[x].RateTo);
 	        		surveyQuestionObject.RateStep(res.Questions[x].RateStep);
 	        		surveyQuestionObject.AllowCantSay(res.Questions[x].AllowCantSay);	  
 	        		surveyQuestionObject.IsPage(res.Questions[x].IsPage);
 	        		surveyQuestionObject.IsMultiChoice(res.Questions[x].IsMultiChoice);
 	        		surveyQuestionObject.HowManyDropdowns(res.Questions[x].HowManyDropdowns);
 	        		surveyQuestionObject.DropdownsOptions(res.Questions[x].DropdownsOptions);
 	        		surveyQuestionObject.DateFrom(res.Questions[x].DateFrom);
 	        		surveyQuestionObject.DateTo(res.Questions[x].DateTo);
 	        		surveyQuestionObject.TextareaSmall(res.Questions[x].TextareaSmall);
 	        		for(y=0;y<res.Questions[x].QuestionOptions.length;y++){
 	        			questionOptionObject = new QuestionOptionObject();
 	        			questionOptionObject.Description(res.Questions[x].QuestionOptions[y].Description);
 		        		questionOptionObject.IdSurveyOptions(res.Questions[x].QuestionOptions[y].IdSurveyOptions);
 		        		questionOptionObject.IdSurveyQuestions(res.Questions[x].QuestionOptions[y].IdSurveyQuestions);
 		        		questionOptionObject.OptionEndSurvey(res.Questions[x].QuestionOptions[y].OptionEndSurvey);
 		        		questionOptionObject.SkipToIdPage(res.Questions[x].QuestionOptions[y].SkipToIdPage);
 		        		questionOptionObject.SkipToPageNumber(res.Questions[x].QuestionOptions[y].SkipToPageNumber);
 		        		questionOptionObject.Value(res.Questions[x].QuestionOptions[y].Value);
 		        		questionOptionObject.ImageUrl(res.Questions[x].QuestionOptions[y].ImageUrl);
 		        		questionOptionObject.TextDescription(res.Questions[x].QuestionOptions[y].TextDescription);
 		        		
 		        		surveyQuestionObject.QuestionOptions().push(questionOptionObject);
 	        		}	
 	        		if(surveyQuestionObject.IdQuestionType()==8) //matrix
        			{	for(y=0;y<res.Questions[x].QuestionRatings.length;y++){
	 	        			questionOptionObject = new QuestionOptionObject();
	 	        			questionOptionObject.Description(res.Questions[x].QuestionRatings[y].Description);
	 		        		questionOptionObject.IdSurveyRatings(res.Questions[x].QuestionRatings[y].IdSurveyRatings);
	 		        		questionOptionObject.IdSurveyQuestions(res.Questions[x].QuestionRatings[y].IdSurveyQuestions);
	 		        		questionOptionObject.OptionEndSurvey(res.Questions[x].QuestionRatings[y].OptionEndSurvey);
	 		        		questionOptionObject.SkipToIdPage(res.Questions[x].QuestionRatings[y].SkipToIdPage);
	 		        		questionOptionObject.SkipToPageNumber(res.Questions[x].QuestionRatings[y].SkipToPageNumber);
	 		        		questionOptionObject.Value(res.Questions[x].QuestionRatings[y].Value);
	 		        		questionOptionObject.ImageUrl(res.Questions[x].QuestionRatings[y].ImageUrl);
	 		        		questionOptionObject.TextDescription(res.Questions[x].QuestionRatings[y].TextDescription);
	 		        		
	 		        		surveyQuestionObject.QuestionRatings().push(questionOptionObject);
 	        			}
 	        			
        			
        			}
 	        		if(surveyQuestionObject.IsPage()=="1"){
 	        			for(z=0;z<res.Questions[x].PageQuestions.length;z++){
 	        				surveyQuestionObject1=new SurveyQuestionObject()
 	    	        		surveyQuestionObject1.AllowCantSayValue(false);
 	    	        		surveyQuestionObject1.QuestionNo(res.Questions[x].PageQuestions[z].QuestionNo);
 	    	        		surveyQuestionObject1.IdSurveyQuestions(res.Questions[x].PageQuestions[z].IdSurveyQuestions);
 	    	        		surveyQuestionObject1.IdSurvey(res.Questions[x].PageQuestions[z].IdSurvey);
 	    	        		surveyQuestionObject1.IdQuestionType(res.Questions[x].PageQuestions[z].IdQuestionType);
 	    	        		surveyQuestionObject1.Title(res.Questions[x].PageQuestions[z].Title);
 	    	        		surveyQuestionObject1.Description(res.Questions[x].PageQuestions[z].Description);
 	    	        		surveyQuestionObject1.NumberOfOptions(res.Questions[x].PageQuestions[z].NumberOfOptions);
 	    	        		surveyQuestionObject1.ValueSameAsDescription(res.Questions[x].PageQuestions[z].ValueSameAsDescription);
 	    	        		surveyQuestionObject1.RateFrom(res.Questions[x].PageQuestions[z].RateFrom);
 	    	        		surveyQuestionObject1.RateTo(res.Questions[x].PageQuestions[z].RateTo);
 	    	        		surveyQuestionObject1.RateStep(res.Questions[x].PageQuestions[z].RateStep);
 	    	        		surveyQuestionObject1.AllowCantSay(res.Questions[x].PageQuestions[z].AllowCantSay);	 
 	    	        		surveyQuestionObject1.SkipToPageValue(res.Questions[x].PageQuestions[z].SkipToPageNumber);
 	    	        		surveyQuestionObject1.SkipToPageId(res.Questions[x].PageQuestions[z].SkipToIdPage);
 	    	        		surveyQuestionObject1.IsMultiChoice(res.Questions[x].PageQuestions[z].IsMultiChoice);
// 	    	        		debugger;
 	    	        		surveyQuestionObject1.HowManyDropdowns(res.Questions[x].PageQuestions[z].HowManyDropdowns);
 	    	        		surveyQuestionObject1.DropdownsOptions(res.Questions[x].PageQuestions[z].DropdownsOptions);
 	    	        		surveyQuestionObject1.DateFrom(currentQuestionObject.formatDateTimeObj(res.Questions[x].PageQuestions[z].DateFrom));
 	    	        		surveyQuestionObject1.DateTo(currentQuestionObject.formatDateTimeObj(res.Questions[x].PageQuestions[z].DateTo));
 	    	        		surveyQuestionObject1.TextareaSmall(res.Questions[x].PageQuestions[z].TextareaSmall);
 	    	        		for(v=0;v<res.Questions[x].PageQuestions[z].QuestionOptions.length;v++){
 	    	        			questionOptionObject1 = new QuestionOptionObject();
 	    	        			questionOptionObject1.Description(res.Questions[x].PageQuestions[z].QuestionOptions[v].Description);
 	    		        		questionOptionObject1.IdSurveyOptions(res.Questions[x].PageQuestions[z].QuestionOptions[v].IdSurveyOptions);
 	    		        		questionOptionObject1.IdSurveyQuestions(res.Questions[x].PageQuestions[z].QuestionOptions[v].IdSurveyQuestions);
 	    		        		questionOptionObject1.OptionEndSurvey(res.Questions[x].PageQuestions[z].QuestionOptions[v].OptionEndSurvey);
 	    		        		questionOptionObject1.SkipToIdPage(res.Questions[x].PageQuestions[z].QuestionOptions[v].SkipToIdPage);
 	    		        		questionOptionObject1.SkipToPageNumber(res.Questions[x].PageQuestions[z].QuestionOptions[v].SkipToPageNumber);
 	    		        		if(questionOptionObject1.SkipToPageNumber()!=0 && questionOptionObject1.SkipToPageNumber()!=undefined){
 	    		        			surveyQuestionObject1.IsSkippingQuestion(true);
 	    		        		}
 	    		        		questionOptionObject1.Value(res.Questions[x].PageQuestions[z].QuestionOptions[v].Value);
 	    		        		questionOptionObject1.ImageUrl(res.Questions[x].PageQuestions[z].QuestionOptions[v].ImageUrl);
 	    		        		questionOptionObject1.TextDescription(res.Questions[x].PageQuestions[z].QuestionOptions[v].TextDescription);
 	    		        		
 	    		        		surveyQuestionObject1.QuestionOptions().push(questionOptionObject1);
 	    	        		}
 	    	        		
	 	    	        	if(surveyQuestionObject1.IdQuestionType()==8) //matrix
	 	           			{	for(v=0;v<res.Questions[x].PageQuestions[z].QuestionRatings.length;v++){
	 	    	        			questionOptionObject1 = new QuestionOptionObject();
	 	    	        			questionOptionObject1.Description(res.Questions[x].PageQuestions[z].QuestionRatings[v].Description);
	 	    		        		questionOptionObject1.IdSurveyRatings(res.Questions[x].PageQuestions[z].QuestionRatings[v].IdSurveyRatings);
	 	    		        		questionOptionObject1.IdSurveyQuestions(res.Questions[x].PageQuestions[z].QuestionRatings[v].IdSurveyQuestions);
	 	    		        		questionOptionObject1.OptionEndSurvey(res.Questions[x].PageQuestions[z].QuestionRatings[v].OptionEndSurvey);
	 	    		        		questionOptionObject1.SkipToIdPage(res.Questions[x].PageQuestions[z].QuestionRatings[v].SkipToIdPage);
	 	    		        		questionOptionObject1.SkipToPageNumber(res.Questions[x].PageQuestions[z].QuestionRatings[v].SkipToPageNumber);
	 	    		        		if(questionOptionObject1.SkipToPageNumber()!=0 && questionOptionObject1.SkipToPageNumber()!=undefined){
	 	    		        			surveyQuestionObject1.IsSkippingQuestion(true);
	 	    		        		}
	 	    		        		questionOptionObject1.Value(res.Questions[x].PageQuestions[z].QuestionRatings[v].Value);
	 	    		        		questionOptionObject1.ImageUrl(res.Questions[x].PageQuestions[z].QuestionRatings[v].ImageUrl);
	 	    		        		questionOptionObject1.TextDescription(res.Questions[x].PageQuestions[z].QuestionRatings[v].TextDescription);
	 	    		        		
	 	    		        		surveyQuestionObject1.QuestionRatings().push(questionOptionObject1);
	 	           				}
	 	    	        			
	 	           			
	 	           			}
 	    	        		
 	    	        		surveyQuestionObject.PageQuestions().push(surveyQuestionObject1);	
 	        			}
 	        			
 	        		}
 	        		self.QuestionList().push(surveyQuestionObject);
 	        	}
 	        	console.log("Survey load done");
 	        	
 	        	var params = {};
 	 	       	params.Username = homeModelObject.Username();
 	 	       	params.IdSurvey = idparam;
 	 	       	params.ActionFlag = 2;
 	 	       	
 	 	       	$.ajax({
 	 	   	        dataType: "json",
 	 	   	        data: JSON.stringify(params),
 	 	   	        cache: false,
 	 	   	        crossDomain: true,
 	 	   	        contentType: "application/json; charset=utf-8",
 	 	   	        url: urlString + "services/GetSurveyTempAnswers.xsjs",
 	 	   	        type: 'POST',
 	 	   	        error: function (x, s, m) {
 	 	   	            
 	 	   	        },
 	 	   	        success: function (res) {
 	 	   	        	console.log("ima");
// 	 	   	        	debugger;
// 	 	   	        	console.log("QuestionList: "+ self.QuestionList()[0]);
 	 	   	        	if(res[0]){
 	 	   	        	var QuestionNum;
	 	 	   	       for(var i = 0; i < self.QuestionList().length; i++){
	 	 	   	    	   for(var j = 0; j < res.length; j++){
		 	 	   	    	   if(self.QuestionList()[i].IsPage() == 1) { // multi questions page
		 	 	   	    		   for(var k = 0; k < self.QuestionList()[i].PageQuestions().length; k++){
			 	 	   	    			if(self.QuestionList()[i].PageQuestions()[k].IdSurveyQuestions() == res[j].IdSurveyQuestions) {
			 	 	   	    				if((self.QuestionList()[i].PageQuestions()[k].IsMultiChoice()==1)||(self.QuestionList()[i].PageQuestions()[k].IsMultiChoice()==3)){
			 	 	   	    					if(self.QuestionList()[i].PageQuestions()[k].IdQuestionType()=="7"){
			 	 	   	    						self.QuestionList()[i].PageQuestions()[k].NumericAnswerForMulti.push(res[j].TextAnswer);
			 	 	   	    						self.QuestionList()[i].PageQuestions()[k].NumericAnswer(undefined);
			 	 	   	    					} else {
				 	 	   	    					self.QuestionList()[i].PageQuestions()[k].NumericAnswerForMulti.push(res[j].NumericAnswer);
				 	 	   	    					self.QuestionList()[i].PageQuestions()[k].NumericAnswer(undefined);
			 	 	   	    					}
			 	 	   	    				}	
			 	 	   	    				if(self.QuestionList()[i].PageQuestions()[k].IdQuestionType()=="8"){ //matrix
				 	 	   	    				for(var o=0;o<self.QuestionList()[i].PageQuestions()[k].QuestionOptions().length;o++){
			 	 	   	    						if(self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[o].Description()==res[j].TextAnswer){
			 	 	   	    							if(self.QuestionList()[i].PageQuestions()[k].MatrixAnswers()[o]){
				 	 	   	    							self.QuestionList()[i].PageQuestions()[k].MatrixAnswers()[o].NumericAnswer.push(String(res[j].NumericAnswer));
				 	 	   	    							self.QuestionList()[i].PageQuestions()[k].MatrixAnswers()[o].CheckboxId.push(o+'_idQ'+self.QuestionList()[i].PageQuestions()[k].IdSurveyQuestions()+'_'+self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer);

			 	 	   	    								
			 	 	   	    							}else
		 	 	   	    								{
				 	 	   	    							var obj={};
			 	 	   	    								obj.TextAnswer=res[j].TextAnswer;
			 	 	   	    								obj.NumericAnswer=[String(res[j].NumericAnswer)];
			 	 	   	    								obj.CheckboxId=[o+'_idQ'+self.QuestionList()[i].PageQuestions()[k].IdSurveyQuestions()+'_'+self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer];
			 	 	   	    								obj.RadioId=o+'_idQ'+self.QuestionList()[i].PageQuestions()[k].IdSurveyQuestions()+'_'+self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer;

			 	 	   	    								self.QuestionList()[i].PageQuestions()[k].MatrixAnswers()[o]=obj;
		 	 	   	    								}
			 	 	   	    							
			 	 	   	    						}
			 	 	   	    						
			 	 	   	    						
			 	 	   	    					}
			 	 	   	    						
			 	 	   	    				
			 	 	   	    				}
			 	 	   	    				
				 	 	   	    			console.log("page match");
				 	 	   	    		self.QuestionList()[i].PageQuestions()[k].NumericAnswer(res[j].NumericAnswer);
				 	 	   	    		self.QuestionList()[i].PageQuestions()[k].TextAnswer(res[j].TextAnswer);
				 	 	   	    		self.QuestionList()[i].PageQuestions()[k].AllowCantSayValue(res[j].AllowCantSayValue === "true" ? true : false);
				 	 	   	    		
				 	 	   	    	if(self.QuestionList()[i].PageQuestions()[k].IdQuestionType()=="6"&&self.QuestionList()[i].PageQuestions()[k].SkipToPageValue()!=0)//simple TEXT
			 	 	   	    		{
				 	 	   	    	
				 	 	   	    					self.QuestionList()[i].PageQuestions()[k].IsSkippingQuestion(true);
				 	 	   	    					self.QuestionList()[i].SkipToPageValue(self.QuestionList()[i].PageQuestions()[k].SkipToPageValue());
				 	 	   	    					self.QuestionList()[i].SkipToPageId(self.QuestionList()[i].PageQuestions()[k].SkipToPageId());
				 	 	   	    				
				 	 	   	    					self.QuestionList()[i].NextQuestionNo(self.QuestionList()[i].PageQuestions()[k].SkipToPageValue());
				 	 	   	    					self.QuestionList()[self.QuestionList()[i].NextQuestionNo()-1].PreviousQuestionNo(self.QuestionList()[i].QuestionNo());
				 	 	   	    		
			 	 	   	    		}
				 	 	   	    		
				 	 	   	    		
				 	 	   	    		if(self.QuestionList()[i].PageQuestions()[k].IdQuestionType()=="5" ||self.QuestionList()[i].PageQuestions()[k].IdQuestionType()=="4"  )//simple option or simple rating
				 	 	   	    		{
				 	 	   	    			for(var m=0;m<self.QuestionList()[i].PageQuestions()[k].QuestionOptions().length;m++){
				 	 	   	    				if(self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].Value()==res[j].NumericAnswer&&self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].SkipToPageNumber()!=0&&self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].SkipToPageNumber()!=undefined){
				 	 	   	    					self.QuestionList()[i].PageQuestions()[k].IsSkippingQuestion(true);
				 	 	   	    					self.QuestionList()[i].SkipToPageValue(self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].SkipToPageNumber());
				 	 	   	    					self.QuestionList()[i].SkipToPageId(self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].SkipToIdPage());
				 	 	   	    				
				 	 	   	    					self.QuestionList()[i].NextQuestionNo(self.QuestionList()[i].PageQuestions()[k].QuestionOptions()[m].SkipToPageNumber());
				 	 	   	    					self.QuestionList()[self.QuestionList()[i].NextQuestionNo()-1].PreviousQuestionNo(self.QuestionList()[i].QuestionNo());
				 	 	   	    				
				 	 	   	    				}
				 	 	   	    			}
				 	 	   	    		}
				 	 	   	    	 }
		 	 	   	    		   }
		 	 	   	    	   }else{// single question page
		 	 	   	    		   
		 	 	   	    	   console.log("QuestionList: "+ self.QuestionList()[i].IdSurveyQuestions());
			 	 	   	    		if(self.QuestionList()[i].IdSurveyQuestions() == res[j].IdSurveyQuestions) {
			 	 	   	    			
		 	 	   	    				if(self.QuestionList()[i].IdQuestionType()!="8" &&((self.QuestionList()[i].IsMultiChoice()==1)||(self.QuestionList()[i].IsMultiChoice()==3))){
		 	 	   	    					if(self.QuestionList()[i].IdQuestionType()=="7"){
		 	 	   	    						self.QuestionList()[i].NumericAnswerForMulti.push(res[j].TextAnswer);
		 	 	   	    						self.QuestionList()[i].NumericAnswer(undefined);
		 	 	   	    					} else {
		 	 	   	    						self.QuestionList()[i].NumericAnswerForMulti.push(res[j].NumericAnswer);
		 	 	   	    						self.QuestionList()[i].NumericAnswer(undefined);
		 	 	   	    					}
		 	 	   	    				}
			 	 	   	    			console.log("match");
			 	 	   	    		self.QuestionList()[i].NumericAnswer(res[j].NumericAnswer);
			 	 	   	    		//self.QuestionList()[i].NumericAnswerForMulti(res[j].NumericAnswerForMulti);
			 	 	   	    		self.QuestionList()[i].TextAnswer(res[j].TextAnswer);
			 	 	   	    		self.QuestionList()[i].AllowCantSayValue(res[j].AllowCantSayValue === "true" ? true : false);
			 	 	   	    		
				 	 	  			if(self.QuestionList()[i].IdQuestionType()=="8"){ //matrix
	 	 	   	    					
	 	 	   	    					for(var o=0;o<self.QuestionList()[i].QuestionOptions().length;o++){
	 	 	   	    						if(self.QuestionList()[i].QuestionOptions()[o].Description()==res[j].TextAnswer){
	 	 	   	    							if(self.QuestionList()[i].MatrixAnswers()[o]){
		 	 	   	    							self.QuestionList()[i].MatrixAnswers()[o].NumericAnswer.push(String(res[j].NumericAnswer));
		 	 	   	    							self.QuestionList()[i].MatrixAnswers()[o].CheckboxId.push(o+'_'+self.QuestionList()[i].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer);
	 	 	   	    								
	 	 	   	    							}else
 	 	   	    								{
		 	 	   	    							var obj={};
	 	 	   	    								obj.TextAnswer=res[j].TextAnswer;
	 	 	   	    								obj.NumericAnswer=[String(res[j].NumericAnswer)];
	 	 	   	    								obj.CheckboxId=[o+'_'+self.QuestionList()[i].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer];
	 	 	   	    								obj.RadioId=o+'_'+self.QuestionList()[i].QuestionOptions()[o].IdSurveyOptions()+'_'+res[j].NumericAnswer;

	 	 	   	    								self.QuestionList()[i].MatrixAnswers()[o]=obj;
 	 	   	    								}
	 	 	   	    							
	 	 	   	    						}
	 	 	   	    						
	 	 	   	    						
	 	 	   	    					}
	 	 	   	    						
	 	 	   	    					
	 	 	   	    				}
			 	 	   	    		
			 	 	   	    		
			 	 	   	   	if((self.QuestionList()[i].IdQuestionType()=="1"||self.QuestionList()[i].IdQuestionType()=="6")&&self.QuestionList()[i].SkipToPageValue()!=0)//simple TEXT
	 	 	   	    		{
		 	 	   	    		
//		 	 	   	    	surveysObject.QuestionList()[2].PageQuestions()[1].SkipToPageValue()
		 	 	   	    	
		 	 	   	    					self.QuestionList()[i].IsSkippingQuestion(true);
		 	 	   	    					self.QuestionList()[i].SkipToPageValue(self.QuestionList()[i].SkipToPageValue());
		 	 	   	    					self.QuestionList()[i].SkipToPageId(self.QuestionList()[i].SkipToPageId());
		 	 	   	    				
		 	 	   	    					self.QuestionList()[i].NextQuestionNo(self.QuestionList()[i].SkipToPageValue());
		 	 	   	    					self.QuestionList()[self.QuestionList()[i].NextQuestionNo()-1].PreviousQuestionNo(self.QuestionList()[i].QuestionNo());
		 	 	   	    		
	 	 	   	    		}
			 	 	   	    		
					 	 	   	   	if(self.QuestionList()[i].IdQuestionType()=="5"||self.QuestionList()[i].IdQuestionType()=="3"|| self.QuestionList()[i].IdQuestionType()=="2"||self.QuestionList()[i].IdQuestionType()=="4")//simple option or option or simple rating or rating 
			 	 	   	    		{
			 	 	   	    			for(var n=0;n<self.QuestionList()[i].QuestionOptions().length;n++){
			 	 	   	    				if(self.QuestionList()[i].QuestionOptions()[n].Value()==res[j].NumericAnswer&&self.QuestionList()[i].QuestionOptions()[n].SkipToPageNumber()!=0&&self.QuestionList()[i].QuestionOptions()[n].SkipToPageNumber()!=undefined){
			 	 	   	    					self.QuestionList()[i].IsSkippingQuestion(true);
			 	 	   	    					self.QuestionList()[i].SkipToPageValue(self.QuestionList()[i].QuestionOptions()[n].SkipToPageNumber());
			 	 	   	    					self.QuestionList()[i].SkipToPageId(self.QuestionList()[i].QuestionOptions()[n].SkipToIdPage());
			 	 	   	    				
			 	 	   	    					self.QuestionList()[i].NextQuestionNo(self.QuestionList()[i].QuestionOptions()[n].SkipToPageNumber());
			 	 	   	    					self.QuestionList()[self.QuestionList()[i].NextQuestionNo()-1].PreviousQuestionNo(self.QuestionList()[i].QuestionNo());
			 	 	   	    				}
			 	 	   	    			}
			 	 	   	    		}
			 	 	   	    		
			 	 	   	    		
			 	 	   	    	}
	 	 	   	    	   }
			 	 	   	    
	 	 	   	    	   }
	 	 	   	       }
	 	 	   	       
	 	 	   	    	
	 	 	   	    	
	 	 	   	   		currentQuestionObject.QuestionNo(res[j-1].QuestionNo);
			    		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			    		fillCurrentQuestionValues(question);
 	 	   	        	}
 	 	   	        }
 	 	   	    });
 	 	       	
 	        	r.resolve(defferedParam);	        	
 	        }
 	    });
//     	}
 		return r;
	};
	

		
	self.GetSurveyFromObject=function(res){   	 	
	        	self.QuestionList([]);
	        	console.log(res);
	        	self.IdSurvey(res.IdSurvey);
	        	self.IdSurveyType(res.IdSurveyType);
	        	self.Title(res.Title);
	        	self.Description(res.Description);
	        	self.DateFrom(res.DateFrom);
	        	self.DateUntil(res.DateUntil);
	        	self.IsAnonymous(res.IsAnonymous);
	        	self.IsTest(res.IsTest);
	        	self.IsPublic(res.IsPublic);
	        	//self.Username('P1940423439');
	        	surveyQuestionObject=new SurveyQuestionObject();
	        	questionOptionObject=new QuestionOptionObject();
	        	var x=0,y=0;
	        	for(x=0;x<res.QuestionList.length;x++){	        		
	        		surveyQuestionObject=new SurveyQuestionObject();
	        		surveyQuestionObject.AllowCantSayValue(false);
	        		surveyQuestionObject.QuestionNo(res.QuestionList[x].QuestionNo);
	        		if(x==0){
 	        			surveyQuestionObject.PreviousQuestionNo(res.QuestionList[x].QuestionNo);
 	        		}else{
 	        			surveyQuestionObject.PreviousQuestionNo(res.QuestionList[x-1].QuestionNo);
 	        		}
 	        		
 	        		if(x==(res.Questions.length-1)){
 	        			surveyQuestionObject.NextQuestionNo(res.QuestionList[x].QuestionNo);
 	        		}else{
 	        			surveyQuestionObject.NextQuestionNo(res.QuestionList[x+1].QuestionNo);
 	        		}
 	        		surveyQuestionObject.SkipToPageValue(0);
 	        		surveyQuestionObject.SkipToPageId(0);
	        		surveyQuestionObject.IdSurveyQuestions(res.QuestionList[x].IdSurveyQuestions);
	        		surveyQuestionObject.IdSurvey(res.QuestionList[x].IdSurvey);
	        		surveyQuestionObject.IdQuestionType(res.QuestionList[x].IdQuestionType);
	        		surveyQuestionObject.Title(res.QuestionList[x].Title);
	        		surveyQuestionObject.Description(res.QuestionList[x].Description);
	        		surveyQuestionObject.NumberOfOptions(res.QuestionList[x].NumberOfOptions);
	        		surveyQuestionObject.ValueSameAsDescription(res.QuestionList[x].ValueSameAsDescription);
	        		surveyQuestionObject.RateFrom(res.QuestionList[x].RateFrom);
	        		surveyQuestionObject.RateTo(res.QuestionList[x].RateTo);
	        		surveyQuestionObject.RateStep(res.QuestionList[x].RateStep);
	        		surveyQuestionObject.AllowCantSay(res.QuestionList[x].AllowCantSay);	  
	        		surveyQuestionObject.IsPage(res.QuestionList[x].IsPage);
	        		surveyQuestionObject.TextAnswer(res.QuestionList[x].TextAnswer);
	        		surveyQuestionObject.NumericAnswer(res.QuestionList[x].NumericAnswer);
	        		surveyQuestionObject.DateFrom(res.QuestionList[x].DateFrom);
	        		surveyQuestionObject.DateTo(res.QuestionList[x].DateTo);
	        		for(y=0;y<res.QuestionList[x].QuestionOptions.length;y++){
	        			questionOptionObject = new QuestionOptionObject();
	        			questionOptionObject.Description(res.QuestionList[x].QuestionOptions[y].Description);
		        		questionOptionObject.IdSurveyOptions(res.QuestionList[x].QuestionOptions[y].IdSurveyOptions);
		        		questionOptionObject.IdSurveyQuestions(res.QuestionList[x].QuestionOptions[y].IdSurveyQuestions);
		        		questionOptionObject.OptionEndSurvey(res.QuestionList[x].QuestionOptions[y].OptionEndSurvey);
		        		questionOptionObject.SkipToIdPage(res.Questions[x].QuestionOptions[y].SkipToIdPage);
		        		questionOptionObject.SkipToPageNumber(res.Questions[x].QuestionOptions[y].SkipToPageNumber);
		        		questionOptionObject.Value(res.QuestionList[x].QuestionOptions[y].Value);
		        		questionOptionObject.ImageUrl(res.QuestionList[x].QuestionOptions[y].ImageUrl);
		        		questionOptionObject.TextDescription(res.QuestionList[x].QuestionOptions[y].TextDescription);
		        		
		        		surveyQuestionObject.QuestionOptions().push(questionOptionObject);
	        		}	
	        		
	        		for(y=0;y<res.QuestionList[x].QuestionRatings.length;y++){
	        			questionOptionObject = new QuestionOptionObject();
	        			questionOptionObject.Description(res.QuestionList[x].QuestionRatings[y].Description);
		        		questionOptionObject.IdSurveyRatings(res.QuestionList[x].QuestionRatings[y].IdSurveyRatings);
		        		questionOptionObject.IdSurveyQuestions(res.QuestionList[x].QuestionRatings[y].IdSurveyQuestions);
		        		questionOptionObject.OptionEndSurvey(res.QuestionList[x].QuestionRatings[y].OptionEndSurvey);
		        		questionOptionObject.SkipToIdPage(res.Questions[x].QuestionRatings[y].SkipToIdPage);
		        		questionOptionObject.SkipToPageNumber(res.Questions[x].QuestionRatings[y].SkipToPageNumber);
		        		questionOptionObject.Value(res.QuestionList[x].QuestionRatings[y].Value);
		        		questionOptionObject.ImageUrl(res.QuestionList[x].QuestionRatings[y].ImageUrl);
		        		questionOptionObject.TextDescription(res.QuestionList[x].QuestionRatings[y].TextDescription);
		        		
		        		surveyQuestionObject.QuestionRatings().push(questionOptionObject);
	        		}	
	        		
	        		if(surveyQuestionObject.IsPage()=="1"){
	        			for(z=0;z<res.QuestionList[x].PageQuestions.length;z++){
	        				surveyQuestionObject1=new SurveyQuestionObject()
	    	        		surveyQuestionObject1.AllowCantSayValue(false);
	    	        		surveyQuestionObject1.QuestionNo(res.QuestionList[x].PageQuestions[z].QuestionNo);
	    	        		surveyQuestionObject1.IdSurveyQuestions(res.QuestionList[x].PageQuestions[z].IdSurveyQuestions);
	    	        		surveyQuestionObject1.IdSurvey(res.QuestionList[x].PageQuestions[z].IdSurvey);
	    	        		surveyQuestionObject1.IdQuestionType(res.QuestionList[x].PageQuestions[z].IdQuestionType);
	    	        		surveyQuestionObject1.Title(res.QuestionList[x].PageQuestions[z].Title);
	    	        		surveyQuestionObject1.Description(res.QuestionList[x].PageQuestions[z].Description);
	    	        		surveyQuestionObject1.NumberOfOptions(res.QuestionList[x].PageQuestions[z].NumberOfOptions);
	    	        		surveyQuestionObject1.ValueSameAsDescription(res.QuestionList[x].PageQuestions[z].ValueSameAsDescription);
	    	        		surveyQuestionObject1.RateFrom(res.QuestionList[x].PageQuestions[z].RateFrom);
	    	        		surveyQuestionObject1.RateTo(res.QuestionList[x].PageQuestions[z].RateTo);
	    	        		surveyQuestionObject1.RateStep(res.QuestionList[x].PageQuestions[z].RateStep);
	    	        		surveyQuestionObject1.AllowCantSay(res.QuestionList[x].PageQuestions[z].AllowCantSay);
	    	        		surveyQuestionObject1.TextAnswer(res.QuestionList[x].PageQuestions[z].TextAnswer);
	    	        		surveyQuestionObject1.NumericAnswer(res.QuestionList[x].PageQuestions[z].NumericAnswer);
	    	        		surveyQuestionObject1.DateFrom(res.QuestionList[x].PageQuestions[z].DateFrom);
	    	        		surveyQuestionObject1.DateTo(res.QuestionList[x].PageQuestions[z].DateTo);
//	    	        		debugger;
	    	        		surveyQuestionObject1.NumericAnswerForMulti(res.QuestionList[x].PageQuestions[z].NumericAnswerForMulti);
	    	        		surveyQuestionObject1.MatrixAnswers(res.QuestionList[x].PageQuestions[z].MatrixAnswers);

	    	        		for(v=0;v<res.QuestionList[x].PageQuestions[z].QuestionOptions.length;v++){
	    	        			questionOptionObject1 = new QuestionOptionObject();
	    	        			questionOptionObject1.Description(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].Description);
	    		        		questionOptionObject1.IdSurveyOptions(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].IdSurveyOptions);
	    		        		questionOptionObject1.IdSurveyQuestions(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].IdSurveyQuestions);
	    		        		questionOptionObject1.OptionEndSurvey(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].OptionEndSurvey);
	    		        		questionOptionObject1.SkipToIdPage(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].SkipToIdPage);
	    		        		questionOptionObject1.SkipToPageNumber(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].SkipToPageNumber);
	    		        		if(questionOptionObject1.SkipToPageNumber()!=0 && questionOptionObject1.SkipToPageNumber()!=undefined){
 	    		        			surveyQuestionObject1.IsSkippingQuestion(true);
 	    		        		}
	    		        		questionOptionObject1.Value(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].Value);
	    		        		questionOptionObject1.ImageUrl(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].ImageUrl);
	    		        		questionOptionObject1.TextDescription(res.QuestionList[x].PageQuestions[z].QuestionOptions[v].TextDescription);
	    		        		
	    		        		surveyQuestionObject1.QuestionOptions().push(questionOptionObject1);
	    	        		}
	    	        		
	    	        		for(v=0;v<res.QuestionList[x].PageQuestions[z].QuestionRatings.length;v++){
	    	        			questionOptionObject1 = new QuestionOptionObject();
	    	        			questionOptionObject1.Description(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].Description);
	    		        		questionOptionObject1.IdSurveyRatings(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].IdSurveyRatings);
	    		        		questionOptionObject1.IdSurveyQuestions(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].IdSurveyQuestions);
	    		        		questionOptionObject1.OptionEndSurvey(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].OptionEndSurvey);
	    		        		questionOptionObject1.SkipToIdPage(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].SkipToIdPage);
	    		        		questionOptionObject1.SkipToPageNumber(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].SkipToPageNumber);
	    		        		if(questionOptionObject1.SkipToPageNumber()!=0 && questionOptionObject1.SkipToPageNumber()!=undefined){
 	    		        			surveyQuestionObject1.IsSkippingQuestion(true);
 	    		        		}
	    		        		questionOptionObject1.Value(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].Value);
	    		        		questionOptionObject1.ImageUrl(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].ImageUrl);
	    		        		questionOptionObject1.TextDescription(res.QuestionList[x].PageQuestions[z].QuestionRatings[v].TextDescription);
	    		        		
	    		        		surveyQuestionObject1.QuestionRatings().push(questionOptionObject1);
	    	        		}
	    	        		surveyQuestionObject.PageQuestions().push(surveyQuestionObject1);	
	        			}
	        			
	        		}
	        		self.QuestionList().push(surveyQuestionObject);
	        	}
	        	console.log("Survey load done");   
	};
	self.getObjectKeyValue=function(obj,key) {
		  
		  return obj[key]();
	}
	self.getObjectInArrayByKeyValue=function(array,key,value){
		var match = ko.utils.arrayFirst(array, function(item) {
		    return value === item[key]();
		});
		return match;
	}
	
	self.StartTime = function(){
		homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
				
//				var time = new Date();
//				var m = moment(time).format();
						
				$.ajax({
			        dataType: "json",
			        data: JSON.stringify({}),
			        cache: false,
			        crossDomain: true,
			        contentType: "application/json; charset=utf-8",
			        url: urlString + "services/GetServerTime.xsjs",
			        type: 'POST',
			        error: function (x, s, m) {
			            
			        },
			        success: function (res) {
			        	window.timeGlobal = res;
			        }
			    });
		
						
			}else{
				window.onbeforeunload = null;
			}
		});
				
		

	}
	
	self.saveSurveyTempAnswers = function(){
		homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
				
				var AnswersList = [];
				var AnswersObj = {};
				var CurrentObjectList = [];
				var str = '';
				if (getCookie("lang") == 'de') {
					str = "Alle deine Antworten werden gespeichert, außer jene auf der aktuellen Seite. Willst du fortsetzen?";
				} else if (getCookie("lang") == 'fr'){
					str = "Vos réponses seront sauvegardées, sauf les réponses de la page en cours. Voulez-vous continuer?";
				} else {
					str = "Your answers will be saved, except the answers of current page. Do you want to continue?";
				}
				
				if(confirm(str)){
				
				if(currentQuestionObject.IsPage()==="1"){
					for(var u = 0; u < currentQuestionObject.PageQuestions().length; u++){
						CurrentObjectList.push(currentQuestionObject.PageQuestions()[u].IdSurveyQuestions());
					}
				}
			
				for(var i = 0; i < self.QuestionList().length; i++){
					if(self.QuestionList()[i].IsPage() === "1"){
						for(var j = 0; j < self.QuestionList()[i].PageQuestions().length; j++){
							
						 if((self.QuestionList()[i].PageQuestions()[j].TextAnswer() !== undefined || self.QuestionList()[i].PageQuestions()[j].NumericAnswer() !== undefined || surveysObject.QuestionList()[i].PageQuestions()[j].NumericAnswerForMulti().length > 0 || surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers().filter(String).length > 0) && CurrentObjectList.indexOf(self.QuestionList()[i].PageQuestions()[j].IdSurveyQuestions()) === -1){
							if(surveysObject.QuestionList()[i].PageQuestions()[j].IdQuestionType()=='8'){
								 
								 for(var a=0; a<surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers().length; a++){
									 
									 if(surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers()[a].NumericAnswer.length>0){
										 debugger;
									 
								 		
										for(var m=0; m<surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers()[a].NumericAnswer.length; m++){
											AnswersObj = {};
										 	AnswersObj.Username=homeModelObject.Username();
											AnswersObj.IdSurvey=self.QuestionList()[i].PageQuestions()[j].IdSurvey();
											AnswersObj.IdSurveyQuestions=self.QuestionList()[i].PageQuestions()[j].IdSurveyQuestions();
											AnswersObj.StartTime = window.timeGlobal;
											console.log("StartTime: "+AnswersObj.StartTime);
											AnswersObj.AllowCantSayValue=self.QuestionList()[i].PageQuestions()[j].AllowCantSayValue().toString();
											AnswersObj.NumericAnswer=surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers()[a].NumericAnswer[m];
											AnswersObj.TextAnswer=surveysObject.QuestionList()[i].PageQuestions()[j].MatrixAnswers()[a].TextAnswer;
											AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
											AnswersObj.IsPage=self.QuestionList()[i].IsPage();
											AnswersObj.ActionFlag = 1;
											AnswersList.push(AnswersObj);
										
										}
										
															
								
									 }
								 }
							 }
							 
							 
							else if(((surveysObject.QuestionList()[i].PageQuestions()[j].IsMultiChoice()==1)||(surveysObject.QuestionList()[i].PageQuestions()[j].IsMultiChoice()==3) )&& surveysObject.QuestionList()[i].PageQuestions()[j].IsMultiChoice()!==undefined){
								 for(var a=0; a<surveysObject.QuestionList()[i].PageQuestions()[j].NumericAnswerForMulti().length; a++){
							 		AnswersObj = {};
								 	AnswersObj.Username=homeModelObject.Username();
									AnswersObj.IdSurvey=self.QuestionList()[i].PageQuestions()[j].IdSurvey();
									AnswersObj.IdSurveyQuestions=self.QuestionList()[i].PageQuestions()[j].IdSurveyQuestions();
									AnswersObj.StartTime = window.timeGlobal;
									console.log("StartTime: "+AnswersObj.StartTime);
									AnswersObj.AllowCantSayValue=self.QuestionList()[i].PageQuestions()[j].AllowCantSayValue().toString();
									if(self.QuestionList()[i].PageQuestions()[j].IdQuestionType()=="7"){
										AnswersObj.NumericAnswer=self.QuestionList()[i].PageQuestions()[j].NumericAnswer();
										AnswersObj.TextAnswer=surveysObject.QuestionList()[i].PageQuestions()[j].NumericAnswerForMulti()[a];
									}else{
										AnswersObj.NumericAnswer=surveysObject.QuestionList()[i].PageQuestions()[j].NumericAnswerForMulti()[a];//self.QuestionList()[i].PageQuestions()[j].NumericAnswer();
										AnswersObj.TextAnswer=self.QuestionList()[i].PageQuestions()[j].TextAnswer();
									}
									
									AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
									AnswersObj.IsPage=self.QuestionList()[i].IsPage();
									AnswersObj.ActionFlag = 1;
									AnswersList.push(AnswersObj);
								 } 
							
							 }
							 
							 
							 else {
								AnswersObj = {};
								AnswersObj.Username=homeModelObject.Username();
								AnswersObj.IdSurvey=self.QuestionList()[i].PageQuestions()[j].IdSurvey();
								AnswersObj.IdSurveyQuestions=self.QuestionList()[i].PageQuestions()[j].IdSurveyQuestions();
								AnswersObj.StartTime = window.timeGlobal;
								console.log("StartTime: "+AnswersObj.StartTime);
								AnswersObj.AllowCantSayValue=self.QuestionList()[i].PageQuestions()[j].AllowCantSayValue().toString();
								AnswersObj.NumericAnswer=self.QuestionList()[i].PageQuestions()[j].NumericAnswer();
								AnswersObj.TextAnswer=self.QuestionList()[i].PageQuestions()[j].TextAnswer();
								AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
								AnswersObj.IsPage=self.QuestionList()[i].IsPage();
								AnswersObj.ActionFlag = 1;
								AnswersList.push(AnswersObj);				
							 }
							}
						}
					} else {
						if(surveysObject.QuestionList()[i].IdQuestionType()=='8'){
							 
							 for(var a=0; a<surveysObject.QuestionList()[i].MatrixAnswers().length; a++){
								 
								 if(surveysObject.QuestionList()[i].MatrixAnswers()[a].NumericAnswer.length>0){
									 
								 debugger;
							 		
									for(var m=0; m<surveysObject.QuestionList()[i].MatrixAnswers()[a].NumericAnswer.length; m++){
										AnswersObj = {};
									 	AnswersObj.Username=homeModelObject.Username();
										AnswersObj.IdSurvey=self.QuestionList()[i].IdSurvey();
										AnswersObj.IdSurveyQuestions=self.QuestionList()[i].IdSurveyQuestions();
										AnswersObj.StartTime = window.timeGlobal;
										console.log("StartTime: "+AnswersObj.StartTime);
										AnswersObj.AllowCantSayValue=self.QuestionList()[i].AllowCantSayValue().toString();
										AnswersObj.NumericAnswer=surveysObject.QuestionList()[i].MatrixAnswers()[a].NumericAnswer[m];
										AnswersObj.TextAnswer=surveysObject.QuestionList()[i].MatrixAnswers()[a].TextAnswer;
										AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
										AnswersObj.IsPage=self.QuestionList()[i].IsPage();
										AnswersObj.ActionFlag = 1;
										AnswersList.push(AnswersObj);
									
									}
									
														
							
								 }
							 }
						 }
						
						else if(((surveysObject.QuestionList()[i].IsMultiChoice()==1)||(surveysObject.QuestionList()[i].IsMultiChoice()==3) )&& surveysObject.QuestionList()[i].IsMultiChoice()!==undefined){
							 for(var a=0; a<surveysObject.QuestionList()[i].NumericAnswerForMulti().length; a++){
						 		AnswersObj = {};
							 	AnswersObj.Username=homeModelObject.Username();
								AnswersObj.IdSurvey=self.QuestionList()[i].IdSurvey();
								AnswersObj.IdSurveyQuestions=self.QuestionList()[i].IdSurveyQuestions();
								AnswersObj.StartTime = window.timeGlobal;
								console.log("StartTime: "+AnswersObj.StartTime);
								AnswersObj.AllowCantSayValue=self.QuestionList()[i].AllowCantSayValue().toString();
								if(surveysObject.QuestionList()[i].IdQuestionType()=="7"){
									AnswersObj.NumericAnswer=self.QuestionList()[i].NumericAnswer();
									AnswersObj.TextAnswer=surveysObject.QuestionList()[i].NumericAnswerForMulti()[a];
								}else{
									AnswersObj.NumericAnswer=surveysObject.QuestionList()[i].NumericAnswerForMulti()[a];//self.QuestionList()[i].PageQuestions()[j].NumericAnswer();
									AnswersObj.TextAnswer=self.QuestionList()[i].TextAnswer();
								}
								
							
								AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
								AnswersObj.IsPage=self.QuestionList()[i].IsPage();
								AnswersObj.ActionFlag = 1;
								AnswersList.push(AnswersObj);
							 }
						 } 
						 
						 
						 
						 
						 else if(self.QuestionList()[i].TextAnswer() !== undefined || self.QuestionList()[i].NumericAnswer() !== undefined){
							AnswersObj = {};
							AnswersObj.Username=homeModelObject.Username();
							AnswersObj.IdSurvey=self.QuestionList()[i].IdSurvey();
							AnswersObj.IdSurveyQuestions=self.QuestionList()[i].IdSurveyQuestions();
							AnswersObj.StartTime = window.timeGlobal;
							AnswersObj.AllowCantSayValue=self.QuestionList()[i].AllowCantSayValue().toString();
							AnswersObj.NumericAnswer=self.QuestionList()[i].NumericAnswer();
							AnswersObj.TextAnswer=self.QuestionList()[i].TextAnswer();
							AnswersObj.QuestionNo=self.QuestionList()[i].QuestionNo();
							AnswersObj.IsPage=self.QuestionList()[i].IsPage();
							AnswersObj.ActionFlag = 1;
							AnswersList.push(AnswersObj);
						
						}
					}
				}
				
				console.dir("AnswersList: "+AnswersList[0]);
//				if(AnswersList[0] !== undefined){
				
					$.ajax({
				        dataType: "json",
				        data: JSON.stringify(AnswersList),
				        cache: false,
				        crossDomain: true,
				        contentType: "application/json; charset=utf-8",
				        url: urlString + "services/SurveyTempAnswers.xsjs",
				        type: 'POST',
				        error: function (x, s, m) {
				            
				        },
				        success: function (res) {
				        	console.log("SurveyTempAnswers");
				        	window.onbeforeunload = null;
//				        	location.reload();
				        }
				    });
					
//				} else {
//					console.log("alert nema");
				}		
			}else{
				window.onbeforeunload = null;
			}
		});
		

	}
	
};

 
var SurveysObjectForApp = function() {
	var self = this;
    self.getListOfSurveysForApp = ko.observableArray();
    self.getTitlesOfPulseSurvey = ko.observableArray();
    self.resultOfPulseMySurveys = ko.observableArray();
    self.IdSurvey = ko.observable();
    self.IdSurveyQuestions = ko.observable();
    self.TitlePulseSurvey = ko.observable();
    self.IsActive = ko.observable();
    self.isPulseSurvey = ko.observable();
	self.getIdSurveyPulseReport = ko.observable();
	
    
	self.getPulseSurveysByUser=function() {
		$(document).off("ajaxStart");
//		unbindSplashScreen();
		var r = $.Deferred();
  		 var params={};
  			params.Username = homeModelObject.Username();
  			$.ajax({
  		        dataType: "json",
  		        data: JSON.stringify(params), 
  		        cache: false,
  		        crossDomain: true,
  		        url: urlString + "services/GetSurveysForApp.xsjs?action=1",
  		        type: 'POST',
  		        error: function (x, s, m) {
  		            
  		        },
  		        success: function (res) {
//  		        	console.log(res + "Surveys for Appppppppppppppppppppppppppppppppppp");
  		        	self.getListOfSurveysForApp([]);
  		        	self.getListOfSurveysForApp(res);
  		        	r.resolve(res);
  		        	
  		        }
  		    }).always(function() {
  				 $('.loading').hide();
  			  });
  		return r;
	}
	
	self.editPulseSurvey=function($data) {
  		 var params={};
  			params.Username = homeModelObject.Username();
  			params.IdSurvey = $data.IdSurvey;
  			$.ajax({
  		        dataType: "json",
  		        data: JSON.stringify(params), 
  		        cache: false,
  		        crossDomain: true,
  		        url: urlString + "services/GetSurveysForApp.xsjs?action=3",
  		        type: 'POST',
  		        error: function (x, s, m) {
  		        	homeModelObject.checkIfSessionExpired();
  		        },
  		        success: function (res) {
  		        	self.getTitlesOfPulseSurvey(res);
  		        	self.TitlePulseSurvey(res[0].surveyTitle);
  		        	self.IsActive($data.IsActive);
  		        	self.IdSurvey($data.IdSurvey);
  		        	$.mobile.changePage($('#editMy_surveys'), { allowSamePageTransition: true });
  		        	
  		        }
  		    });
	}
	
	self.savePulseSurvey=function(){
 		 var params={};
			params.TitlePulseSurvey = $("#titlePulseSurvey").val();
			params.updatedQuestions=[];
			$(".allQuestionsIds").each(function(i,v){
				params.updatedQuestions.push({id:v.id, title:$(v).val()});
			});
			console.log(params.updatedQuestions);
			params.IdSurvey = self.IdSurvey();
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
		        url: urlString + "services/saveEditedPulseSurvey.xsjs?action=1",
		        type: 'POST',
		        error: function (x, s, m) {
//		        	console.log(x);
//		        	console.log(s);
//		        	console.log(m);
		        	homeModelObject.checkIfSessionExpired();
		        },
		        success: function () {
		        	alert("You successfully change Pulse Survey ");
		        	$.mobile.changePage($('#my_surveys'), { allowSamePageTransition: true });
		        }
		    });
	} 
	
	self.resultPulseSurvey=function($data){
		if($data.NumberAnsweredParticipant === 0){
			alert("There are no answers for this Report!");
		} else {
		surveysObjectForApp.isPulseSurvey(1);
 		 var params={};
			params.Username = homeModelObject.Username();
			params.IdSurvey = $data.IdSurvey;
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params), 
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetSurveysForApp.xsjs?action=4",
		        type: 'POST',
		        error: function (x, s, m) {
		        	homeModelObject.checkIfSessionExpired();
		        },
		        success: function (res) {
		        	console.log(res);
		        	self.getIdSurveyPulseReport(res[0].getIdSurveyPulseReport);
		        	
		        	surveyReports.GetCurrentChartData(self.getIdSurveyPulseReport(), 0).done(function(){
		        		$.mobile.changePage($('#result_pulse_surveys'), { allowSamePageTransition: true });			
		        	});
		        }
		    });
		
		}
	} 


	self.btnLinkSurvey = function($data){
			console.log("Im in!!!");
			// debugger;
			var id = $data.IdSurvey();
			var urlCopied = 'https://survey-ac4e94dbe.dispatcher.hana.ondemand.com/?id=' + id;
			urlCopied.toString();		
			var dummy = document.createElement("input");
			document.body.appendChild(dummy);

			dummy.setAttribute("id", "dummy_id");
			document.getElementById("dummy_id").value = urlCopied;				
			dummy.select();
 			document.execCommand("copy");
			dummy.setAttribute("type", "hidden");			
 				
 			$("#dummy_id").remove();
 			// $("#spanspan").fadeIn(1000);
 			// $("#spanspan").fadeOut(2000);
			 Schortcut();
	}
};

var SurveyQuestionObject = function() {
    var self = this;
    self.IdSurveyQuestions = ko.observable();
    self.QuestionNo = ko.observable();
    self.NextQuestionNo = ko.observable();
    self.PreviousQuestionNo = ko.observable();
    self.SkipToPageValue = ko.observable();
    self.SkipToPageId= ko.observable();
    self.IdSurvey = ko.observable();
    self.IdQuestionType = ko.observable();           
    self.Title = ko.observable();
    self.Description = ko.observable();
    self.NumberOfOptions = ko.observable();
    self.ValueSameAsDescription = ko.observable();
    self.RateFrom = ko.observable();
    self.RateTo = ko.observable();
    self.RateStep = ko.observable();
    self.AllowCantSayValue = ko.observable();
    self.AllowCantSay = ko.observable();
    self.Username = ko.observable();
    self.TextAnswer = ko.observable();
    self.NumericAnswer = ko.observable();
    self.NumericAnswerForMulti = ko.observableArray();
    self.MatrixAnswers = ko.observableArray();
    self.OptionEndSurveyValue = ko.observable();
    self.QuestionOptions = ko.observableArray();
    self.QuestionRatings = ko.observableArray();
    self.IsPage = ko.observable();
    self.PageQuestions = ko.observableArray();
    self.StartTime = ko.observable();
    self.EndTime = ko.observable();
    self.IsSkippingQuestion=ko.observable(false);
    self.IsMultiChoice = ko.observable();
    self.HowManyDropdowns = ko.observable();
    self.DropdownsOptions = ko.observableArray([]);    
    self.DateFrom = ko.observable();
    self.DateTo = ko.observable();
    self.TextareaSmall = ko.observable();
};

var QuestionOptionObject = function(){
	var self=this;	
	self.Description = ko.observable();
	self.IdSurveyOptions = ko.observable();
	self.IdSurveyRatings = ko.observable();
	self.IdSurveyQuestions = ko.observable();
	self.OptionEndSurvey = ko.observable();
	self.SkipToIdPage = ko.observable();
	self.SkipToPageNumber = ko.observable();
	self.Value = ko.observable();
	self.ImageUrl = ko.observable();
	self.TextDescription = ko.observable();
};	

/*var CurrentPageQuestionsObject = function(){
	var self=this;	
	self.IdSurveyQuestions = ko.observable();
	self.TextAnswer = ko.observable();
	self.NumericAnswer = ko.observable();
	self.AllowCantSayValue = ko.observable();
};	*/

var CurrentQuestionObject = function(){
	var self=this;
	self.IdSurveyQuestions = ko.observable();
	self.QuestionNo = ko.observable();
	self.TotalQuestionNo = ko.observable();
	self.NextQuestionNo = ko.observable();
	self.PreviousQuestionNo = ko.observable();
	self.IdSurvey = ko.observable();
	self.IdQuestionType = ko.observable();
	self.Title = ko.observable();
	self.Description = ko.observable();
	self.AllowCantSayValue = ko.observable();
	self.AllowCantSay = ko.observable();
    self.Username = ko.observable();
    self.RateFrom = ko.observable();
    self.RateTo = ko.observable();
    self.RateStep = ko.observable();
    self.TextAnswer = ko.observable();
    self.NumericAnswer = ko.observable();
    self.NumericAnswerForMulti = ko.observableArray();
    self.OptionEndSurveyValue = ko.observable();
    self.SkipToPageValue = ko.observable();
    self.SkipToPageId= ko.observable();
    self.QuestionOptions = ko.observableArray();
    self.QuestionRatings = ko.observableArray();
    self.IsAnonymous = ko.observable();
    self.IsTest = ko.observable();
    self.IsPage = ko.observable();
    self.PageQuestions = ko.observableArray();
    self.EndSurveyDescription = ko.observable();
    self.IsMultiChoice = ko.observable(false); 
    self.HowManyDropdowns = ko.observable();
    self.DropdownsOptions = ko.observableArray([]);    
    self.DateFrom = ko.observable();
    self.DateTo = ko.observable();
    self.TextareaSmall = ko.observable();
    self.MatrixAnswers = ko.observableArray();
    
    self.surveyCompletedPercentage =function() {
    	
        return parseInt(self.QuestionNo()/self.TotalQuestionNo()*100)+ "%";
    };
        
    
    self.formatDateTimeObj = function(dateParam) {
		if (dateParam != null) {
			
			var dateObj = moment(dateParam);
			var month = (dateObj.get('month') + 1).toString().length == 2 ? dateObj
					.get('month') + 1
					: '0' + (dateObj.get('month') + 1).toString();
			var day = (dateObj.get('date')).toString().length == 2 ? dateObj
					.get('date')
					: '0' + (dateObj.get('date')).toString();
			var year = dateObj.get('year');
			var hours = dateObj.get('hour').toString().length == 2 ? dateObj
					.get('hour')
					: '0' + dateObj.get('hour').toString();
			var minutes = dateObj.get('minutes').toString().length == 2 ? dateObj
					.get('minutes')
					: '0' + dateObj.get('minutes').toString();

			return month + "/" + day + "/" + year;
		} else {
			return "";
		}
	};
    self.feedback_text_next_click=function(){
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
//		    	debugger;
	    	//remove cant say
	    	if(currentQuestionObject.AllowCantSay()==="1" && (currentQuestionObject.TextAnswer()===""||currentQuestionObject.TextAnswer()===" "||currentQuestionObject.TextAnswer()===undefined)){
	   			currentQuestionObject.AllowCantSayValue(true);
	   			currentQuestionObject.TextAnswer(" ");
	   			
	   		}
	    	else{
	    		currentQuestionObject.AllowCantSayValue(false);
	    	}
	    	
	    	if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()){ //last question
	        	if(currentQuestionObject.TextAnswer() || currentQuestionObject.AllowCantSayValue()){
	    	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	    	   		//var cantSay = $("#cantSayCheckBoxText").is(":checked");
	    	   		
	    	   		if(currentQuestionObject.AllowCantSayValue()){
	    	   			current_question.TextAnswer(" ");
	    	   		}
	    	   		else{
	    	   			current_question.TextAnswer(currentQuestionObject.TextAnswer());
	    	   		}
	    	   		
	    	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
	    	   		window.history.pushState( "Title", "#feedbackInfo" );
	    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
	        	}
	        	else{
	        		//Different languages on alert
	        		if (getCookie("lang")=='de'){
	    				alert("Bitte geben Sie gültige Text Feedback!");
	    			} else if(getCookie("lang")=='fr'){
	        				alert("Veuillez insérer des commentaires de texte valide!");
	        			} else {
	        				alert("Please insert valid text feedback!");
	        			}
	        		Validation();
	        	}
	    	}
	    	else{
	//    		if(currentQuestionObject.AllowCantSay()==="1" && $("#cantSayCheckBoxText_" + currentQuestionObject.IdSurveyQuestions() + ":checked").is(":checked")){
	//        		currentQuestionObject.TextAnswer(" ");
	//        	}
	        	
	        	if(currentQuestionObject.TextAnswer()){
	    			var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
	    			current_question.TextAnswer(currentQuestionObject.TextAnswer());
	    			current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
	    			var previousQ=currentQuestionObject.QuestionNo();
	    			
	
	            		//Skip Logic
	            		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
	            			var lastSkipedQuestion;
	            			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
	            				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
	            			}else{ //skip to other survey page
	            				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
	            				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
	            			}
	            			
	            			
	            			var haveAnsweredQuestionsInSkippedPart=false;
	            			var i,y;
	            			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
	            				
	            			
	            				if(surveysObject.QuestionList()[i].IsPage()=="1"){
	            					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
	                					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
	                					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
	                						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
	                							haveAnsweredQuestionsInSkippedPart=true;
	                						}
	                					}else{//simple text
	                						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
	                							haveAnsweredQuestionsInSkippedPart=true;
	                						}
	                					}
	                	
	            				}
	            				}else{
	            					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
	
	            					if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
	            						if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
	            							haveAnsweredQuestionsInSkippedPart=true;
	            						}
	            					}else{//simple text or text
	            						if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
	            							haveAnsweredQuestionsInSkippedPart=true;
	            						}
	            					}
	
	            				}
	            			}
	            			
	            			if(haveAnsweredQuestionsInSkippedPart){
	            				
	            				var srt;
		          				  if(getCookie("lang")==="de"){
		        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
		        				  } else if(getCookie("lang")==="fr"){
		        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
		        				  }else {
		        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
		        				  }
	          				  
	            				if(confirm(str)){
	                    			  
	            					var i,y;
	                    			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
	
	                    				if(surveysObject.QuestionList()[i].IsPage()=="1"){
	                    					
	                    					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
	                    						
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
	                    				}
	                    				}else{
	                    					
	                    					surveysObject.QuestionList()[i].NumericAnswer(undefined);
	                    					surveysObject.QuestionList()[i].TextAnswer(undefined);
	                    					surveysObject.QuestionList()[i].AllowCantSayValue(false);
	                    					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
	
	                    				}
	                    			}
	                    			
	                    			if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
	                            	   	
	                        	   		window.history.pushState( "Title", "#feedbackInfo" );
	                        			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
	                    			}else{//skip to other survey page
	                    				
	                    				
	                    				var previousQ=currentQuestionObject.QuestionNo();
	                            		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	                    				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	                        			fillCurrentQuestionValues(question,previousQ);
	                        			surveyNavigate();
	                    			}
	//                    			currentQuestionObject.SkipToPageValue(undefined);
	//                    			currentQuestionObject.SkipToPageId(undefined);
	            				}
	            			}else{
	            				console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
	            				if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
	                        	   	
	                    	   		window.history.pushState( "Title", "#feedbackInfo" );
	                    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
	                			}else{//skip to other survey page
	                				
	                				
	                				var previousQ=currentQuestionObject.QuestionNo();
	                        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	                				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	                    			fillCurrentQuestionValues(question,previousQ);
	                    			surveyNavigate();
	                			}
	//                			currentQuestionObject.SkipToPageValue(undefined);
	//                			currentQuestionObject.SkipToPageId(undefined);
	            			}
	            			
	            		}
	            		//Skip Logic End 	
	            		else{
	            			var previousQ=currentQuestionObject.QuestionNo();
	                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	        				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	            			fillCurrentQuestionValues(question,previousQ);
	            			surveyNavigate();
	            		}
	            		
	        		
	    		}
	    		else{
	    			if(currentQuestionObject.AllowCantSay()==="1" && currentQuestionObject.AllowCantSayValue()){
	    				
	    				var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
	    				current_question.TextAnswer(" ");
	    				current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
	    				var previousQ=currentQuestionObject.QuestionNo();
	    				
	    				
	    				//Skip Logic
	            		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
	            			var lastSkipedQuestion;
	            			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
	            				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
	            			}else{ //skip to other survey page
	            				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
	            				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
	            			}
	            			
	            			
	            			var haveAnsweredQuestionsInSkippedPart=false;
	            			var i,y;
	            			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
	            				
	            			
	            				if(surveysObject.QuestionList()[i].IsPage()=="1"){
	            					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
	                					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
	                					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
	                						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
	                							haveAnsweredQuestionsInSkippedPart=true;
	                						}
	                					}else{//simple text
	                						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
	                							haveAnsweredQuestionsInSkippedPart=true;
	                						}
	                					}
	                	
	            				}
	            				}else{
	            					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
	
	            					if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
	            						if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
	            							haveAnsweredQuestionsInSkippedPart=true;
	            						}
	            					}else{//simple text or text
	            						if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
	            							haveAnsweredQuestionsInSkippedPart=true;
	            						}
	            					}
	
	            				}
	            			}
	            			
	            			if(haveAnsweredQuestionsInSkippedPart){
	            				
		            			var srt;
		          				  if(getCookie("lang")==="de"){
		        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
		        				  } else if(getCookie("lang")==="fr"){
		        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
		        				  }else {
		        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
		        				  }
	            	
	            				if(confirm(str)){
	                    			  
	            					var i,y;
	                    			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
	
	                    				if(surveysObject.QuestionList()[i].IsPage()=="1"){
	                    					
	                    					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
	                    						
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
	                    						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
	                    				}
	                    				}else{
	                    					
	                    					surveysObject.QuestionList()[i].NumericAnswer(undefined);
	                    					surveysObject.QuestionList()[i].TextAnswer(undefined);
	                    					surveysObject.QuestionList()[i].AllowCantSayValue(false);
	                    					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
	
	                    				}
	                    			}
	                    			
	                    			if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
	                            	   	
	                        	   		window.history.pushState( "Title", "#feedbackInfo" );
	                        			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
	                    			}else{//skip to other survey page
	                    				
	                    				
	                    				var previousQ=currentQuestionObject.QuestionNo();
	                            		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	                    				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	                        			fillCurrentQuestionValues(question,previousQ);
	                        			surveyNavigate();
	                    			}
	//                    			currentQuestionObject.SkipToPageValue(undefined);
	//                    			currentQuestionObject.SkipToPageId(undefined);
	            				}
	            			}else{
	            				console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
	            				if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
	                        	   	
	                    	   		window.history.pushState( "Title", "#feedbackInfo" );
	                    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
	                			}else{//skip to other survey page
	                				
	                				
	                				var previousQ=currentQuestionObject.QuestionNo();
	                        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	                				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	                    			fillCurrentQuestionValues(question,previousQ);
	                    			surveyNavigate();
	                			}
	//                			currentQuestionObject.SkipToPageValue(undefined);
	//                			currentQuestionObject.SkipToPageId(undefined);
	            			}
	            			
	            		}
	            		//Skip Logic End 	
	            		else{
	            			var previousQ=currentQuestionObject.QuestionNo();
	                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
	        				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	            			fillCurrentQuestionValues(question,previousQ);
	            			surveyNavigate();
	            		}
	        				
	        			
	    				
	    			}
	    			else{
	    				if (getCookie("lang")=='de'){
	        				alert("Bitte geben Sie gültige Text Feedback!");
	        			}
	    				else if(getCookie("lang")=='fr'){
	        				alert("Veuillez insérer des commentaires de texte valide!");
	        			} else {
	        				alert("Please insert valid text feedback!");
	        			}
	    				Validation();
	    			}
	    			
	    		}
	    	}
	    	
			}else{
			window.onbeforeunload = null;
			}
		});
    };
    
    self.feedbackInfo_back_click=function(){
    	
	    	homeModelObject.checkIfSessionExpired().done(function(data){	
				if(homeModelObject.IsLoggedIn()){
			    	
					if(surveysObject.SurveyEndedByOption()===1){
			    		currentQuestionObject.QuestionNo(currentQuestionObject.PreviousQuestionNo());
			    	}
			    	else{
			    		
			    	}
			    	surveysObject.SurveyEndedByOption(0);
			    	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
			    	fillCurrentQuestionValues(current_question);
			    	surveyNavigate();
					    	
				}else{
					window.onbeforeunload = null;
			}
		});
	    	
    
   };
    
    self.feedback_text_back_click=function(){
    	
    	homeModelObject.checkIfSessionExpired().done(function(data){	
				if(homeModelObject.IsLoggedIn()){
					
					var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
			    	if(currentQuestionObject.AllowCantSay()==="1" && $("#cantSayCheckBoxText_" + currentQuestionObject.IdSurveyQuestions() + ":checked").is(":checked") && currentQuestionObject.TextAnswer("")){
			    		currentQuestionObject.TextAnswer(" ");
			    	}
			    	
					current_question.TextAnswer(currentQuestionObject.TextAnswer());
					
			    	current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
			    	currentQuestionObject.QuestionNo(currentQuestionObject.PreviousQuestionNo());
			    	var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			    	fillCurrentQuestionValues(question);
			    	surveyNavigate();
			
							
				}else{
					window.onbeforeunload = null;
			}
		});
		    	
	
    };
    
    self.feedback_rating_next_click=function(){
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
    	
		    	// remove cant say
		    	if(currentQuestionObject.AllowCantSay()==="1"&&(currentQuestionObject.NumericAnswer()==undefined||currentQuestionObject.NumericAnswer()=="-1")){  
			    	currentQuestionObject.AllowCantSayValue(true);
				}else{
					currentQuestionObject.AllowCantSayValue(false);
				}
		    	
		    	// add cant say -> function checkRatingChange
		
		    	
		    	if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()){ //last question
		        	if(currentQuestionObject.NumericAnswer() || currentQuestionObject.AllowCantSayValue()){
		    	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		    	   		//var cantSay = $("#cantSayCheckBoxRating").is(":checked");
		    	   		if(currentQuestionObject.AllowCantSayValue()){
		    	   			current_question.NumericAnswer("-1");
		    	   		}
		    	   		else{
		    	   			current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		    	   			
		    	   		}
		    	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		    	   		window.history.pushState( "Title", "#feedbackInfo" );
		    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		        	}
		        	else{
		        		if (getCookie("lang")=='de'){
		        			alert("Bitte wählen Sie Bewertung Wert!");
		        		}
		        		else if (getCookie("lang")=='fr'){
		        			alert("Sélectionnez la valeur d'évaluation!");
		        		}else {
		        			alert("Please select rating value!");
		        		}
		        		Validation();
		        	}
		    	}
		    	else{
		    		if(currentQuestionObject.AllowCantSay()==="1"){ 
		    			// remove cant say       
		//    			$("#cantSayCheckBoxRating").is(":checked") &&
		        		if(currentQuestionObject.AllowCantSayValue()){     
		        			currentQuestionObject.NumericAnswer("-1");
		        		}
		        		else{
		//        			currentQuestionObject.NumericAnswer($("#rating-value-feedback-rating").val());
		        		}
		    		}
		
		        	if(currentQuestionObject.NumericAnswer()){
		        		
		        		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
		        		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		        		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		        		
		        		
		        		
		        		//Skip Logic
		        		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
		        			var lastSkipedQuestion;
		        			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
		        				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
		        			}else{ //skip to other survey page
		        				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
		        				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
		        			}
		        			
		        			
		        			var haveAnsweredQuestionsInSkippedPart=false;
		        			var i,y;
		        			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
		        				
		        			
		        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
		        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
		            					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
		            					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
		            						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
		            							haveAnsweredQuestionsInSkippedPart=true;
		            						}
		            					}else{//simple text
		            						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
		            							haveAnsweredQuestionsInSkippedPart=true;
		            						}
		            					}
		            	
		        				}
		        				}else{
		        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		        					if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
		        						if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
		        							haveAnsweredQuestionsInSkippedPart=true;
		        						}
		        					}else{//simple text or text
		        						if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
		        							haveAnsweredQuestionsInSkippedPart=true;
		        						}
		        					}
		
		        				}
		        			}
		        			
		        			if(haveAnsweredQuestionsInSkippedPart){
		        				

		            			var srt;
		          				  if(getCookie("lang")==="de"){
		        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
		        				  } else if(getCookie("lang")==="fr"){
		        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
		        				  }else {
		        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
		        				  }
		        			
		        				if(confirm(str)){
		                			  
		        					var i,y;
		                			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
		
		                				if(surveysObject.QuestionList()[i].IsPage()=="1"){
		                					
		                					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
		                						
		                						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
		                						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
		                						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
		                				}
		                				}else{
		                					
		                					surveysObject.QuestionList()[i].NumericAnswer(undefined);
		                					surveysObject.QuestionList()[i].TextAnswer(undefined);
		                					surveysObject.QuestionList()[i].AllowCantSayValue(false);
		                					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		
		                				}
		                			}
		                			
		                			if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
		                        	   	
		                    	   		window.history.pushState( "Title", "#feedbackInfo" );
		                    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		                			}else{//skip to other survey page
		                				
		                				
		                				var previousQ=currentQuestionObject.QuestionNo();
		                        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		                				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                    			fillCurrentQuestionValues(question,previousQ);
		                    			surveyNavigate();
		                			}
		//                			currentQuestionObject.SkipToPageValue(undefined);
		//                			currentQuestionObject.SkipToPageId(undefined);
		        				}
		        			}else{
		        				console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
		        				if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
		                	   		window.history.pushState( "Title", "#feedbackInfo" );
		                			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		                			
		            			}else{//skip to other survey page
		            				
		            				var previousQ=currentQuestionObject.QuestionNo();
		                    		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		            				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                			fillCurrentQuestionValues(question,previousQ);
		                			surveyNavigate();
		            			}
		//            			currentQuestionObject.SkipToPageValue(undefined);
		//            			currentQuestionObject.SkipToPageId(undefined);
		        			}
		        			
		        		}
		        		//Skip Logic End 	
		        		else{
		        			var previousQ=currentQuestionObject.QuestionNo();
		            		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		    				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		        			fillCurrentQuestionValues(question,previousQ);
		        			surveyNavigate();
		        		}
		        	}
		        	else{
		        		if (getCookie("lang")=='de'){
		        			alert("Bitte wählen Sie Bewertung Wert!");
		        		}
		        		else if (getCookie("lang")=='fr'){
		        			alert("Sélectionnez la valeur d'évaluation!");
		        		} else {
		        			alert("Please select rating value!");
		        		}
		        		Validation();
		        	}
		    	}
			    
		}else{
			window.onbeforeunload = null;
	
		}
	});
   };
    
    
    
    
    
    self.feedback_rating_back_click=function(){
		homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
		    	
					    	
					    	if(currentQuestionObject.AllowCantSay()==="1"){
					    		// remove cant say
					//    		$("#cantSayCheckBoxRating").is(":checked") && 
					    		if(currentQuestionObject.AllowCantSayValue()){
					    			currentQuestionObject.NumericAnswer("-1");
					    		}
					    		else{
					//    			currentQuestionObject.NumericAnswer($("#rating-value-feedback-rating").val());
					    		}
							}
					    	
						if(currentQuestionObject.NumericAnswer()){
					    		
					    		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
					    		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
					    		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
					    	}
					    	currentQuestionObject.QuestionNo(currentQuestionObject.PreviousQuestionNo());
					    	var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
					    	fillCurrentQuestionValues(question);
					    	console.log(question);
					    	surveyNavigate();
					    	
				}else{
					window.onbeforeunload = null;
			
				}
			});
	    };
	    
	    self.feedback_options_next_click=function(){
	    	homeModelObject.checkIfSessionExpired().done(function(data){	
				if(homeModelObject.IsLoggedIn()){
//debugger;					
			    	// remove cant say
			    	if(currentQuestionObject.AllowCantSay()==="1"&& ((currentQuestionObject.IsMultiChoice()==0 && (currentQuestionObject.NumericAnswer()==undefined||currentQuestionObject.NumericAnswer()=="-1")) || (currentQuestionObject.IsMultiChoice()!=0 && currentQuestionObject.NumericAnswerForMulti().length<currentQuestionObject.HowManyDropdowns()) || (currentQuestionObject.IsMultiChoice() != 0 && (currentQuestionObject.NumericAnswerForMulti()==undefined || currentQuestionObject.NumericAnswer()=="-1" || currentQuestionObject.NumericAnswerForMulti().length===0)))){  
				    	currentQuestionObject.AllowCantSayValue(true);
					}else{
						currentQuestionObject.AllowCantSayValue(false);
					}
			    	
			    	// add cant say
			//    	if(currentQuestionObject.AllowCantSay()==="1"&& $("#cantSayCheckBoxOptions_" + currentQuestionObject.IdSurveyQuestions()).is(":checked")){  
			//	    	currentQuestionObject.AllowCantSayValue(true);
			//		}else{
			//			currentQuestionObject.AllowCantSayValue(false);
			//		}
			    	
			    		
			    	if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()){ //last question
			        	if(currentQuestionObject.NumericAnswer()|| ((currentQuestionObject.NumericAnswerForMulti().length>0) && currentQuestionObject.IsMultiChoice()!=3 )||(currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.NumericAnswerForMulti().length==currentQuestionObject.HowManyDropdowns()) || currentQuestionObject.AllowCantSayValue()){
			    	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			    	   		//var cantSay = $("#cantSayCheckBoxOptions").is(":checked");
			    	   		if(currentQuestionObject.AllowCantSayValue()){
				    			if(currentQuestionObject.IdQuestionType()==="7"){
				    				current_question.TextAnswer(" ");
				    			} else {
				    				current_question.NumericAnswer("-1");
				    			}
			    	   			current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());

			    	   		}
			    	   		else if(currentQuestionObject.NumericAnswer()){
			    	   			current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
			    	   		}else if(currentQuestionObject.NumericAnswerForMulti().length>0){
			    	   			
			    	   			current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());

			    	   		}
			    	   		
			    	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
			    	   		window.history.pushState( "Title", "#feedbackInfo" );
			    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
			        	}
			        	else{
			        		
			        		 if (getCookie("lang")=='de'){
			         			alert("Bitte wählen Sie Option!");
			         		}
			        		
			        		 else if (getCookie("lang")=='fr'){
			        			alert("Sélectionnez option!");
			        		} else {
			        			alert("Please select option!");
			        		}
			        		 Validation();
			        	}
			    	}
			    	else{
			    		
			    		if(currentQuestionObject.AllowCantSay()==="1"&&currentQuestionObject.AllowCantSayValue()){  
			    			var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
			    			if(currentQuestionObject.IdQuestionType()==="7"){
			    				current_question.TextAnswer(" ");
			    			} else {
			    				current_question.NumericAnswer("-1");
			    			}
			        		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
	                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());

			        		var previousQ=currentQuestionObject.QuestionNo();
			        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
			        		
			        		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			        		fillCurrentQuestionValues(question,previousQ);	
			        		surveyNavigate();
			
			        	}
			        	else{
			        		if(((currentQuestionObject.NumericAnswer() || (currentQuestionObject.NumericAnswerForMulti().length>0)) && $('input[name=photo_questions_' + currentQuestionObject.IdSurveyQuestions() + ']:checked').val())||(currentQuestionObject.IsMultiChoice()==1 && currentQuestionObject.NumericAnswerForMulti().length>0)||(currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.NumericAnswerForMulti().length==currentQuestionObject.HowManyDropdowns())){  
			        			if(currentQuestionObject.OptionEndSurveyValue()==="1"){
			        				surveysObject.SurveyEndedByOption(1);
			        				var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
			        				current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
			                		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
			                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
			                		current_question.OptionEndSurveyValue("1");
			//        				currentQuestionObject.OptionEndSurveyValue("1");
			//                		var previousQ=currentQuestionObject.QuestionNo();
			        				currentQuestionObject.PreviousQuestionNo(currentQuestionObject.QuestionNo());
			//                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());        		
			//                		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			//                		fillCurrentQuestionValues(question,previousQ);
			        				
			        				//end Options
			                		
			                		var haveAnsweredQuestionsInEndSurveyPart=false;
			        				var i,y;
			        				var redirect = true;
			        				for(i=currentQuestionObject.QuestionNo();i<currentQuestionObject.TotalQuestionNo();i++){
			        					
			        				
			        					if(surveysObject.QuestionList()[i].IsPage()=="1"){
			        						for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			        	    					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
			        	    					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
			        	    						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
			        	    							haveAnsweredQuestionsInSkippedPart=true;
			        	    						}
			        	    					}else{//simple text
			        	    						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
			        	    							haveAnsweredQuestionsInEndSurveyPart=true;
			        	    						}
			        	    					}
			        	    	
			        					}
			        					}else{
			        						var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
			
			        						if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
			        							if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
			        								haveAnsweredQuestionsInEndSurveyPart=true;
			        							}
			        						}else{//simple text or text
			        							if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
			        								haveAnsweredQuestionsInEndSurveyPart=true;
			        							}
			        						}
			
			        					}
			        				}
			        				
			        				if(haveAnsweredQuestionsInEndSurveyPart){
			        					if(confirm("Your answer will end the survey and any subsequent questions that you have already answered will be deleted. Do you want to continue?")){
			        	        			
			        						var i,y;
			        	        			for(i=currentQuestionObject.QuestionNo();i<currentQuestionObject.TotalQuestionNo();i++){
			
			        	        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
			        	        					
			        	        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			        	        						
			        	        						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
			        	        						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
			        	        						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
			        	        				}
			        	        				}else{
			        	        					
			        	        					surveysObject.QuestionList()[i].NumericAnswer(undefined);
			        	        					surveysObject.QuestionList()[i].TextAnswer(undefined);
			        	        					surveysObject.QuestionList()[i].AllowCantSayValue(false);
			        	        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
			
			        	        				}
			        	        			}
			//        	        			redirect = true;
			        					} else {
			        						redirect = false;
			        					}
			        				}
			                		if(redirect){
				        				window.history.pushState( "Title", "#feedbackInfo" );
				            			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
				            			//self.EndSurveyByOption();
			                		}
			            		}
			            		else{
			            			var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
			            			if(current_question.IsMultiChoice()==0){
	            				
			            				current_question.NumericAnswer(currentQuestionObject.NumericAnswer());			            				
			            			} else if((current_question.IsMultiChoice()==1)||(current_question.IsMultiChoice()==3)){
			         
			            				current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());			            				
			            			}
			                		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
			                		current_question.OptionEndSurveyValue("0");
			
			
			                		//Skip Logic
			                		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
			                			var lastSkipedQuestion;
			                			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
			                				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
			                			}else{ //skip to other survey page
			                				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
			                				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
			                			}
			                			
			                			
			                			var haveAnsweredQuestionsInSkippedPart=false;
			                			var i,y;
			                			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
			                				
			                			
			                				if(surveysObject.QuestionList()[i].IsPage()=="1"){
			                					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			                    					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
			                    					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
			                    						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
			                    							haveAnsweredQuestionsInSkippedPart=true;
			                    						}
			                    					}else{//simple text
			                    						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
			                    							haveAnsweredQuestionsInSkippedPart=true;
			                    						}
			                    					}
			                    	
			                				}
			                				}else{
			                					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
			
			                					if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
			                						if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
			                							haveAnsweredQuestionsInSkippedPart=true;
			                						}
			                					}else{//simple text or text
			                						if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
			                							haveAnsweredQuestionsInSkippedPart=true;
			                						}
			                					}
			
			                				}
			                			}
			                			
			                			if(haveAnsweredQuestionsInSkippedPart){
			                				
			    	            			var srt;
			    	          				  if(getCookie("lang")==="de"){
			    	        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
			    	        				  } else if(getCookie("lang")==="fr"){
			    	        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
			    	        				  }else {
			    	        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
			    	        				  }
			    	          				  
			                				if(confirm(str)){
			                        			  
			                					var i,y;
			                        			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
			
			                        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
			                        					
			                        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			                        						
			                        						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
			                        						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
			                        						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
			                        				}
			                        				}else{
			                        					
			                        					surveysObject.QuestionList()[i].NumericAnswer(undefined);
			                        					surveysObject.QuestionList()[i].TextAnswer(undefined);
			                        					surveysObject.QuestionList()[i].AllowCantSayValue(false);
			                        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
			
			                        				}
			                        			}
			                        			
			                        			if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
			                                	   	
			                            	   		window.history.pushState( "Title", "#feedbackInfo" );
			                            			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
			                        			}else{//skip to other survey page
			                        				
			                        				
			                        				var previousQ=currentQuestionObject.QuestionNo();
			                                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
			                        				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			                            			fillCurrentQuestionValues(question,previousQ);
			                            			surveyNavigate();
			                        			}
			//                        			currentQuestionObject.SkipToPageValue(undefined);
			//                        			currentQuestionObject.SkipToPageId(undefined);
			                				}
			                			}else{
			                				console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
			                				if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
			                        	   		window.history.pushState( "Title", "#feedbackInfo" );
			                        			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
			                        			
			                    			}else{//skip to other survey page
			                    				
			                    				var previousQ=currentQuestionObject.QuestionNo();
			                            		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
			                    				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			                        			fillCurrentQuestionValues(question,previousQ);
			                        			surveyNavigate();
			                    			}
			//                    			currentQuestionObject.SkipToPageValue(undefined);
			//                    			currentQuestionObject.SkipToPageId(undefined);
			                			}
			                			
			                		}
			                		//Skip Logic End 	
			                		else{
			                			var previousQ=currentQuestionObject.QuestionNo();
			                    		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
			            				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			                			fillCurrentQuestionValues(question,previousQ);
			                			surveyNavigate();
			                		}
			                		
			            		}
			            	}
			        		else{
			        			
			        			if(currentQuestionObject.IsMultiChoice()==3 || currentQuestionObject.IdQuestionType()=="7"){ //dropdowns
			        				if (getCookie("lang")=='de'){
				             			alert("Bitte wählen Sie alle Optionen!");
				             		}
				        			 else if((getCookie("lang")=='fr')){
				            			alert("Sélectionnez toutes les options! ");
				            		} else {
				            			alert("Please select all options!");
				            		}
			        			}else{
			        				if (getCookie("lang")=='de'){
				             			alert("Bitte wählen Sie Option!");
				             		}
				        			 else if((getCookie("lang")=='fr')){
				            			alert("Sélectionnez option!");
				            		} else {
				            			alert("Please select option!");
				            		}
			        			}
			        			
			        			
			        			 
			        			 Validation();
			            	}
			        	}
			    		
			    	}
			    	
	    	
    	
				
				}else{
					window.onbeforeunload = null;
			}
		});
    };
    
    self.feedback_matrix_next_click=function(){
    	console.log("feedback_matrix_next_click");
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
				
		    	// remove cant say
		    	if(currentQuestionObject.AllowCantSay()==="1"&& (currentQuestionObject.MatrixAnswers().filter(String).length==0)){  
			    	currentQuestionObject.AllowCantSayValue(true);
				}else{
					currentQuestionObject.AllowCantSayValue(false);
				}

		    	
		    	if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()){ //last question
		        	if((currentQuestionObject.MatrixAnswers().filter(String).length>0) || currentQuestionObject.AllowCantSayValue()){
		    	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		    	   		//var cantSay = $("#cantSayCheckBoxOptions").is(":checked");
		    	   		
		    	   		if(currentQuestionObject.AllowCantSayValue()){
		    	   			current_question.NumericAnswer("-1");
	                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
		    	   		}
		    	   		else{
		    	   			if(currentQuestionObject.NumericAnswer() ){
			    	   			current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
			    	   		}
			    	   		if(currentQuestionObject.NumericAnswerForMulti().length>0){
			    	   			current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());

			    	   		}
			    	   		if(currentQuestionObject.MatrixAnswers().filter(String).length>0){
			    	   			current_question.MatrixAnswers(currentQuestionObject.MatrixAnswers());
			    	   		}
		    	   		}
		    	   			
		    	   	
		    	   		
		    	   		
		    	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		    	   		window.history.pushState( "Title", "#feedbackInfo" );
		    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		        	}
		        	else{
		        			if (getCookie("lang")=='de'){
		             			alert("Bitte wählen Sie alle Optionen!");
		             		}
		        			 else if((getCookie("lang")=='fr')){
		            			alert("Sélectionnez toutes les options! ");
		            		} else {
		            			alert("Please select all options!");
		            		}
		        
		        		
		        		
		        		Validation();
		        	}
		    	}
		    	else{
		    		if(currentQuestionObject.AllowCantSay()==="1" && currentQuestionObject.AllowCantSayValue()){
		        		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
		        		current_question.NumericAnswer("-1");
		        		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
		        		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
	    	   			current_question.MatrixAnswers(currentQuestionObject.MatrixAnswers());

		        		var previousQ=currentQuestionObject.QuestionNo();
		        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		        		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		        		fillCurrentQuestionValues(question,previousQ);	
		        		surveyNavigate();
		
		        	}
		        	else{
		        		if(currentQuestionObject.MatrixAnswers().filter(String).length>0){  
		        			if(currentQuestionObject.OptionEndSurveyValue()==1){
		            			//console.log("Ne moze dalje, option end survey e!");
		            			surveysObject.SurveyEndedByOption(1);
		        				var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
		                		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
			    	   			current_question.MatrixAnswers(currentQuestionObject.MatrixAnswers());

		                		current_question.OptionEndSurveyValue("1");
		                		var previousQ=currentQuestionObject.QuestionNo();
		                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());        		
		                		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                		fillCurrentQuestionValues(question,previousQ);
		                		
		        				window.history.pushState( "Title", "#feedbackInfo" );
		            			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		            		}
		            		else{
		            			var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
		                		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
			    	   			current_question.MatrixAnswers(currentQuestionObject.MatrixAnswers());

		                		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		                		
		
		                		
		                		
		                			var previousQ=currentQuestionObject.QuestionNo();
		                    		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		            				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                			fillCurrentQuestionValues(question,previousQ);
		                			surveyNavigate();
		                		
		            		}
		            	}
		        		else{
		        			
			        			if (getCookie("lang")=='de'){
			             			alert("Bitte wählen Sie alle Optionen!");
			             		}
			        			 else if((getCookie("lang")=='fr')){
			            			alert("Sélectionnez toutes les options! ");
			            		} else {
			            			alert("Please select all options!");
			            		}
			        		}
		        		 
		        			 Validation();
		            	}
		        	}
		    		
		    	
		    	
    	
			}else{
				window.onbeforeunload = null;
			}
		});
    }; 
    
    
    
    self.feedback_numeric_rating_next_click=function(){
    	console.log("feedback_numeric_rating_next_click");
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
				
		    	// remove cant say
		    	if(currentQuestionObject.AllowCantSay()==="1"&&((currentQuestionObject.IsMultiChoice()==0 && (currentQuestionObject.NumericAnswer()==undefined||currentQuestionObject.NumericAnswer()=="-1"))||(currentQuestionObject.IsMultiChoice()!=0 && currentQuestionObject.NumericAnswerForMulti().length<currentQuestionObject.HowManyDropdowns()))){  
			    	currentQuestionObject.AllowCantSayValue(true);
				}else{
					currentQuestionObject.AllowCantSayValue(false);
				}
		    	
		    	// add cant say
		//    	if(currentQuestionObject.AllowCantSay()==="1"&& $("#cantSayCheckBoxNumericRating_"+currentQuestionObject.IdSurveyQuestions()+":checked").is(":checked")){  
		//	    	currentQuestionObject.AllowCantSayValue(true);
		//		}else{
		//			currentQuestionObject.AllowCantSayValue(false);
		//		}
		    	
		    	
		    	if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()){ //last question
		        	if(currentQuestionObject.NumericAnswer() || (currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.NumericAnswerForMulti().length==currentQuestionObject.HowManyDropdowns()) || currentQuestionObject.AllowCantSayValue()){
		    	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		    	   		//var cantSay = $("#cantSayCheckBoxOptions").is(":checked");
		    	   		
		    	   		if(currentQuestionObject.AllowCantSayValue()){
		    	   			current_question.NumericAnswer("-1");
	                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());


		    	   		}
		    	   		else{
		    	   			if(currentQuestionObject.NumericAnswer() ){
			    	   			current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
			    	   		}
			    	   		if(currentQuestionObject.NumericAnswerForMulti().length>0){
			    	   			current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());

			    	   		}
		    	   		}
		    	   			
		    	   	
		    	   		
		    	   		
		    	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		    	   		window.history.pushState( "Title", "#feedbackInfo" );
		    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		        	}
		        	else{
		        		if(currentQuestionObject.IsMultiChoice()==3){
		        			if (getCookie("lang")=='de'){
		             			alert("Bitte wählen Sie alle Optionen!");
		             		}
		        			 else if((getCookie("lang")=='fr')){
		            			alert("Sélectionnez toutes les options! ");
		            		} else {
		            			alert("Please select all options!");
		            		}
		        		}
	        			else{
		        			if (getCookie("lang")=='de'){
			        			alert("Bitte wählen Sie Option!");
			        		}
			        		else if((getCookie("lang")=='fr')){
			        			alert("Sélectionnez option!");
			        		} else {
			        			alert("Please select option!");
			        		}
		        		}
		        		
		        		
		        		Validation();
		        	}
		    	}
		    	else{
		    		if(currentQuestionObject.AllowCantSay()==="1" && currentQuestionObject.AllowCantSayValue()){
		        		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
		        		current_question.NumericAnswer("-1");
		        		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
		        		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		        		var previousQ=currentQuestionObject.QuestionNo();
		        		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		        		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		        		fillCurrentQuestionValues(question,previousQ);	
		        		surveyNavigate();
		
		        	}
		        	else{
		        		if((currentQuestionObject.NumericAnswer() && $('input[name=photo_questions_' + currentQuestionObject.IdSurveyQuestions() + ']:checked').val())|| (currentQuestionObject.IsMultiChoice()==3 && currentQuestionObject.NumericAnswerForMulti().length==currentQuestionObject.HowManyDropdowns())){  
		        			if(currentQuestionObject.OptionEndSurveyValue()==1){
		            			//console.log("Ne moze dalje, option end survey e!");
		            			surveysObject.SurveyEndedByOption(1);
		        				var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
		                		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
		                		current_question.OptionEndSurveyValue("1");
		                		var previousQ=currentQuestionObject.QuestionNo();
		                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());        		
		                		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                		fillCurrentQuestionValues(question,previousQ);
		                		
		        				window.history.pushState( "Title", "#feedbackInfo" );
		            			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		            		}
		            		else{
		            			var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());		
		                		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		                		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());
		                		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
		                		
		
		                		//Skip Logic
		                		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
		                			var lastSkipedQuestion;
		                			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
		                				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
		                			}else{ //skip to other survey page
		                				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
		                				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
		                			}
		                			
		                			
		                			var haveAnsweredQuestionsInSkippedPart=false;
		                			var i,y;
		                			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
		                				
		                			
		                				if(surveysObject.QuestionList()[i].IsPage()=="1"){
		                					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
		                    					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
		                    					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
		                    						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
		                    							haveAnsweredQuestionsInSkippedPart=true;
		                    						}
		                    					}else{//simple text
		                    						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
		                    							haveAnsweredQuestionsInSkippedPart=true;
		                    						}
		                    					}
		                    	
		                				}
		                				}else{
		                					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		
		                					if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
		                						if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
		                							haveAnsweredQuestionsInSkippedPart=true;
		                						}
		                					}else{//simple text or text
		                						if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
		                							haveAnsweredQuestionsInSkippedPart=true;
		                						}
		                					}
		
		                				}
		                			}
		                			
		                			if(haveAnsweredQuestionsInSkippedPart){

		    	            				var srt;
		    	          				  if(getCookie("lang")==="de"){
		    	        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
		    	        				  } else if(getCookie("lang")==="fr"){
		    	        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
		    	        				  }else {
		    	        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
		    	        				  }

		                				if(confirm(str)){
		                        			  
		                					var i,y;
		                        			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
		
		                        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
		                        					
		                        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
		                        						
		                        						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
		                        						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
		                        						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
		                        				}
		                        				}else{
		                        					
		                        					surveysObject.QuestionList()[i].NumericAnswer(undefined);
		                        					surveysObject.QuestionList()[i].TextAnswer(undefined);
		                        					surveysObject.QuestionList()[i].AllowCantSayValue(false);
		                        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		
		                        				}
		                        			}
		                        			
		                        			if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
		                                	   	
		                            	   		window.history.pushState( "Title", "#feedbackInfo" );
		                            			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		                        			}else{//skip to other survey page
		                        				
		                        				
		                        				var previousQ=currentQuestionObject.QuestionNo();
		                                		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		                        				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                            			fillCurrentQuestionValues(question,previousQ);
		                            			surveyNavigate();
		                        			}
		//                        			currentQuestionObject.SkipToPageValue(undefined);
		//                        			currentQuestionObject.SkipToPageId(undefined);
		                				}
		                			}else{
		                				console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
		                				if(currentQuestionObject.SkipToPageId()==-1){ //skip to end survey page
		                        	   		window.history.pushState( "Title", "#feedbackInfo" );
		                        			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		                        			
		                    			}else{//skip to other survey page
		                    				
		                    				var previousQ=currentQuestionObject.QuestionNo();
		                            		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		                    				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                        			fillCurrentQuestionValues(question,previousQ);
		                        			surveyNavigate();
		                    			}
		//                    			currentQuestionObject.SkipToPageValue(undefined);
		//                    			currentQuestionObject.SkipToPageId(undefined);
		                			}
		                			
		                		}
		                		//Skip Logic End 	
		                		else{
		                			var previousQ=currentQuestionObject.QuestionNo();
		                    		currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
		            				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
		                			fillCurrentQuestionValues(question,previousQ);
		                			surveyNavigate();
		                		}
		            		}
		            	}
		        		else{
		        			
		        			if(currentQuestionObject.IsMultiChoice()==3){
			        			if (getCookie("lang")=='de'){
			             			alert("Bitte wählen Sie alle Optionen!");
			             		}
			        			 else if((getCookie("lang")=='fr')){
			            			alert("Sélectionnez toutes les options! ");
			            		} else {
			            			alert("Please select all options!");
			            		}
			        		}
		        			else{
			        			if (getCookie("lang")=='de'){
				        			alert("Bitte wählen Sie Option!");
				        		}
				        		else if((getCookie("lang")=='fr')){
				        			alert("Sélectionnez option!");
				        		} else {
				        			alert("Please select option!");
				        		}
			        		}
		        			 Validation();
		            	}
		        	}
		    		
		    	}
		    	
    	
			}else{
				window.onbeforeunload = null;
			}
		});
    };   
    self.feedback_options_back_click=function(){
    	
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
			  	var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());	
		    	// remove cant say
		    	//&& $("#cantSayCheckBoxNumericRating:checked").is(":checked")
		    	if(currentQuestionObject.AllowCantSay()==="1" && currentQuestionObject.AllowCantSayValue()){  
					current_question.NumericAnswer("-1");
		    	}
		    	else{
		    		if(currentQuestionObject.NumericAnswer() && $('input[name=photo_questions_' + currentQuestionObject.IdSurveyQuestions() + ']:checked').val()){  
		            	current_question.NumericAnswer(currentQuestionObject.NumericAnswer());
		            	if((currentQuestionObject.NumericAnswerForMulti().length>0) && ($('input[name=photo_questions_' + currentQuestionObject.IdSurveyQuestions() + ']:checked').val() || currentQuestionObject.IsMultiChoice()==3)){
		            		current_question.NumericAnswerForMulti(currentQuestionObject.NumericAnswerForMulti());		            		
		            	}
		    		}
		    	}
		    	current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());
				currentQuestionObject.QuestionNo(currentQuestionObject.PreviousQuestionNo());
				var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
				fillCurrentQuestionValues(question);	
				surveyNavigate();
		
			}else{
				window.onbeforeunload = null;
			}
		});
    	
    };
    self.survey_page_next_click=function(){
//    	debugger;
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
		    	console.log("survey_page_next_click");
		    	var previousQ;
		    	var okE = true;
		    	var endSurvey = false;
		    	var redirect=true;
		    	$.each(currentQuestionObject.PageQuestions(), function(key, value) {
		    		
		    		console.log(value);
		    		console.log(key);
					if(value.IdQuestionType()==="6"){//simple text
						if(value.SkipToPageValue()!=0){
							currentQuestionObject.SkipToPageValue(value.SkipToPageValue());
							currentQuestionObject.SkipToPageId(value.SkipToPageId());
						}
						if(value.AllowCantSay()==="1"){
							if(value.TextAnswer()===undefined || value.TextAnswer() === "" || value.TextAnswer() === " "){
								value.AllowCantSayValue(true);
								value.TextAnswer(" ");
							}
		//					if(value.AllowCantSayValue()===true){
		//						value.TextAnswer(" ");
		//					}
		//					else if(value.TextAnswer()===undefined || value.TextAnswer() === "" || value.TextAnswer() === " "){
		//						okE = false;
		//					}
						}
						else{
							if(value.TextAnswer()===undefined || value.TextAnswer() === "" || value.TextAnswer() === " "){
								okE = false;
							}
						}
					}
					else if(value.IdQuestionType()==="5"){//simple options
				    	
						// remove cant say
						if(value.IsMultiChoice()>0){
							if(value.AllowCantSay()==="1"&&(value.NumericAnswerForMulti()==undefined||value.NumericAnswerForMulti().length===0)){
					    		value.AllowCantSayValue(true);
							}else{
								value.AllowCantSayValue(false);
							}
						}else {
					    	if(value.AllowCantSay()==="1"&&(value.NumericAnswer()==undefined||value.NumericAnswer()=="-1")){  
					    		value.AllowCantSayValue(true);
							}else{
								value.AllowCantSayValue(false);
							}
						}
		
						 if(value.NumericAnswer()=="-1" && value.AllowCantSay()==="1" && value.AllowCantSayValue()===false){
		    	   			value.NumericAnswer(undefined);
		    	   			okE = false;
		    	   		}
						 else if(value.AllowCantSay()==="1"){
							if(value.AllowCantSayValue()===true){
								value.NumericAnswer("-1");
								value.OptionEndSurveyValue(undefined);
							}
							else if((value.NumericAnswer()===undefined) && (value.NumericAnswerForMulti()===undefined || value.NumericAnswerForMulti().length===0)){
								okE = false;
							}
						} 
						else{
							
							if(value.NumericAnswer()===undefined &&((value.IsMultiChoice()!=3 && value.NumericAnswerForMulti().length===0 )||(value.IsMultiChoice()==3 && value.NumericAnswerForMulti().length<value.HowManyDropdowns()))){
								okE = false;
							}else{
							}
						}
						 
		//				 ace
				     			if(value.OptionEndSurveyValue()==1){
				         			console.log("Option end survey e!");
				         			surveysObject.SurveyEndedByOption(1);
				     				currentQuestionObject.OptionEndSurveyValue("1");
				             		currentQuestionObject.PreviousQuestionNo(currentQuestionObject.QuestionNo());
				             		
				             		endSurvey=true;
				         		}            						
		
					}
					else if(value.IdQuestionType()==="4"){ //simple Rating
						
						// remove cant say
				    	if(value.AllowCantSay()==="1"&&(value.NumericAnswer()==undefined||value.NumericAnswer()=="-1")){  
				    		value.AllowCantSayValue(true);
						}else{
							value.AllowCantSayValue(false);
						}
				    	
						if(value.NumericAnswer()=="-1" && value.AllowCantSay()==="1" && value.AllowCantSayValue()===false){
		    	   			currentQuestionObject.PageQuestions()[key].NumericAnswer(undefined);
		    	   			okE = false;
		    	   		}
						else if(value.AllowCantSay()==="1"){
							if(value.AllowCantSayValue()===true){
								value.NumericAnswer("-1");
							}
							else if(value.NumericAnswer()===undefined || value.NumericAnswer()==="-1"){
								okE = false;
							}
						}  
						else{
						
							if(value.IsMultiChoice()==0){
								if(value.NumericAnswer()===undefined){
									okE = false;
								}
							}else{
								if(value.AllowCantSay()==="0" && (value.IsMultiChoice()==1 && value.NumericAnswerForMulti().length===0 )||(value.IsMultiChoice()==3 && value.NumericAnswerForMulti().length<value.HowManyDropdowns())){
									okE = false;
								}
								
							}
							
						}
					}
					else if(value.IdQuestionType()==="7"){
						
						if(value.AllowCantSay()==="1"){
			    	   		if(value.AllowCantSayValue()){
//			    	   			value.AllowCantSayValue(true);
			    	   			currentQuestionObject.PageQuestions()[key].TextAnswer(" ");
			    	   		}
						}else{
							value.AllowCantSayValue(false);
							if(value.NumericAnswerForMulti().length < value.HowManyDropdowns()){
								okE = false;								
							}
						}																									
					}else if(value.IdQuestionType()==="8"){
						
						if(value.AllowCantSay()==="1"){
			    	   		if(value.AllowCantSayValue()){
//			    	   			value.AllowCantSayValue(true);
			    	   			currentQuestionObject.PageQuestions()[key].TextAnswer(" ");
			    	   		}
						}else{
							value.AllowCantSayValue(false);
							if(value.MatrixAnswers().length <=0 ){
								okE = false;								
							}
						}																									
					}
			});
		    	
		    	if(okE==false){
		    		if (getCookie("lang")=='de'){
		    			alert("Bitte füllen Sie alle Fragen!");
		    		}else if((getCookie("lang")=='fr')){
		    			alert("Veuillez remplir toutes les questions!");
		    		} else {
		    			alert("Please fill all questions!");
		    		}
		    		Validation();
				}
				else{
					
			    	if(endSurvey){
			    		// ace ovde
			    		//end Options
			    		
						var haveAnsweredQuestionsInEndSurveyPart=false;
						var i,y;
						for(i=currentQuestionObject.QuestionNo();i<currentQuestionObject.TotalQuestionNo();i++){
							
						
							if(surveysObject.QuestionList()[i].IsPage()=="1"){
								for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			    					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
			    					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
			    						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
			    							haveAnsweredQuestionsInSkippedPart=true;
			    						}
			    					}else{//simple text
			    						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
			    							haveAnsweredQuestionsInEndSurveyPart=true;
			    						}
			    					}
			    	
							}
							}else{
								var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		
								if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
									if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
										haveAnsweredQuestionsInEndSurveyPart=true;
									}
								}else{//simple text or text
									if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
										haveAnsweredQuestionsInEndSurveyPart=true;
									}
								}
		
							}
						}
						
						if(haveAnsweredQuestionsInEndSurveyPart){
							if(confirm("Your answer will end the survey and any subsequent questions that you have already answered will be deleted. Do you want to continue?")){
			        			
								var i,y;
			        			for(i=currentQuestionObject.QuestionNo();i<currentQuestionObject.TotalQuestionNo();i++){
		
			        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
			        					
			        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
			        						
			        						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
			        						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
			        						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
			        				}
			        				}else{
			        					
			        					surveysObject.QuestionList()[i].NumericAnswer(undefined);
			        					surveysObject.QuestionList()[i].TextAnswer(undefined);
			        					surveysObject.QuestionList()[i].AllowCantSayValue(false);
			        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
		
			        				}
			        			}
								
							}else{
								redirect = false;
							}
						}
			    	}else{
			    		var skipToEndSurveyPage;
			    			
			    		if((currentQuestionObject.SkipToPageValue()!=undefined && currentQuestionObject.SkipToPageValue()!=0)||currentQuestionObject.SkipToPageId()==-1){
		        			var lastSkipedQuestion;
		        			if(currentQuestionObject.SkipToPageId()==-1){//skip to end survey page
		        				lastSkipedQuestion=currentQuestionObject.TotalQuestionNo();
		        			}else{ //skip to other survey page
		        				currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
		        				lastSkipedQuestion=currentQuestionObject.SkipToPageValue()-1;
		        			}
								
								var haveAnsweredQuestionsInSkippedPart=false;
								var i,y;
								for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
									
								
									if(surveysObject.QuestionList()[i].IsPage()=="1"){
										for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
					    					var IdQuestionType=surveysObject.QuestionList()[i].PageQuestions()[y].IdQuestionType();
					    					if(IdQuestionType==4 || IdQuestionType==5){ //simple rating or simple options
					    						if(surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer()!=undefined){
					    							haveAnsweredQuestionsInSkippedPart=true;
					    						}
					    					}else{//simple text
					    						if(surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer()!=undefined){
					    							haveAnsweredQuestionsInSkippedPart=true;
					    						}
					    					}
					    	
									}
									}else{
										var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
					
										if(IdQuestionType==2 || IdQuestionType==3 || IdQuestionType==4 || IdQuestionType==5){ //rating or options or simple rating or simple options
											if(surveysObject.QuestionList()[i].NumericAnswer()!=undefined){
												haveAnsweredQuestionsInSkippedPart=true;
											}
										}else{//simple text or text
											if(surveysObject.QuestionList()[i].TextAnswer()!=undefined){
												haveAnsweredQuestionsInSkippedPart=true;
											}
										}
					
									}
								}
								
								if(haveAnsweredQuestionsInSkippedPart){
									
			            				var srt;
			          				  if(getCookie("lang")==="de"){
			        					  str = "Ihre Antwort überspringt einige Fragen, die Sie bereits beantwortet haben. Möchten Sie fortfahren und Antworten löschen überspringt Teil";
			        				  } else if(getCookie("lang")==="fr"){
			        					  str = "Votre réponse est ignorer certaines questions auxquelles vous avez déjà répondu. Voulez-vous continuer et supprimer les réponses d'ignorer partie";
			        				  }else {
			        					  str = "Your answer will skip some questions that you have alreday answered. Do you want to continue and delete answers from skipping part?";
			        				  }
			          				  
									if(confirm(str)){
					        			
										var i,y;
					        			for(i=currentQuestionObject.QuestionNo();i<lastSkipedQuestion;i++){
					
					        				if(surveysObject.QuestionList()[i].IsPage()=="1"){
					        					
					        					for(y=0;y<surveysObject.QuestionList()[i].PageQuestions().length;y++){
					        						
					        						surveysObject.QuestionList()[i].PageQuestions()[y].NumericAnswer(undefined);
					        						surveysObject.QuestionList()[i].PageQuestions()[y].TextAnswer(undefined);
					        						surveysObject.QuestionList()[i].PageQuestions()[y].AllowCantSayValue(false);
					        				}
					        				}else{
					        					
					        					surveysObject.QuestionList()[i].NumericAnswer(undefined);
					        					surveysObject.QuestionList()[i].TextAnswer(undefined);
					        					surveysObject.QuestionList()[i].AllowCantSayValue(false);
					        					var IdQuestionType=surveysObject.QuestionList()[i].IdQuestionType();
					
					        				}
					        			}
										
										
					        			
					        			
					        			if(currentQuestionObject.SkipToPageId()==-1){
											skipToEndSurveyPage=true;
										}else{
											currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
							    			previousQ=currentQuestionObject.QuestionNo();
										}
		//			        			currentQuestionObject.SkipToPageValue(undefined);
		//			        			currentQuestionObject.SkipToPageId(undefined);
					        			
									}else{
										redirect = false;
									}
									
									
								}else{
									console.log("haveAnsweredQuestionsInSkippedPart: "+haveAnsweredQuestionsInSkippedPart);
									if(currentQuestionObject.SkipToPageId()==-1){
										skipToEndSurveyPage=true;
										
									}else{
										currentQuestionObject.NextQuestionNo(currentQuestionObject.SkipToPageValue());
						    			previousQ=currentQuestionObject.QuestionNo();
									}
									
		//			    			currentQuestionObject.SkipToPageValue(undefined);
		//			    			currentQuestionObject.SkipToPageId(undefined);
									
								}
							}
			    	}
					
			    	if(redirect){
					console.log("okE=true!");
					if(currentQuestionObject.QuestionNo()==currentQuestionObject.TotalQuestionNo()||skipToEndSurveyPage){
						window.history.pushState( "Title", "#feedbackInfo" );
		    			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
		    			
			    	}
					else{
		//				ace
						if(endSurvey!=false){
		//					if(endSurveyOption.OptionEndSurveyValue() == undefined){
		//						endSurveyOption.OptionEndSurveyValue("0");
		//					}
							if(currentQuestionObject.OptionEndSurveyValue() == "1"){
								window.history.pushState( "Title", "#feedbackInfo" );
			         			$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
							}
						}else {
							var previousQ=currentQuestionObject.QuestionNo();
							currentQuestionObject.QuestionNo(currentQuestionObject.NextQuestionNo());
				    		var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
				    		console.log("previousQ: "+previousQ);
				    		fillCurrentQuestionValues(question,previousQ);	
				    		surveyNavigate();
						}
					}
				}
					
				}
		    	
			}else{
			window.onbeforeunload = null;
			}
		});
   
    };
    self.survey_page_back_click=function(){
 //   	debugger;
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
			 	$.each(currentQuestionObject.PageQuestions(), function(key, value) {          
		            
					/*if(value.IdQuestionType()==="6"){
						if(value.AllowCantSay()==="1"){
							if(value.AllowCantSayValue()===true){
								value.TextAnswer(" ");
							}
							else if(value.TextAnswer()===undefined || value.TextAnswer() === "" || value.TextAnswer() === " "){
								okE = false;
							}
						}
						else{
							if(value.TextAnswer()===undefined || value.TextAnswer() === "" || value.TextAnswer() === " "){
								okE = false;
							}
						}
					}
					else*/ 
					if(value.IdQuestionType()==="5"){
						if(value.AllowCantSay()==="1"){
							if(value.AllowCantSayValue()===true){
								value.NumericAnswer("-1");
							}
							/*else if(value.NumericAnswer()===undefined || value.NumericAnswer()==="-1"){
								okE = false;
							}*/
						}
					}
					else if(value.IdQuestionType()==="4"){
						if(value.AllowCantSay()==="1"){
							if(value.AllowCantSayValue()===true){
								value.NumericAnswer("-1");
							}
							/*else if(value.NumericAnswer()===undefined || value.NumericAnswer()==="-1"){
								okE = false;
							}*/
						}
					}
			});

	    	currentQuestionObject.QuestionNo(currentQuestionObject.PreviousQuestionNo());
			var question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
			fillCurrentQuestionValues(question);	
			surveyNavigate();
		
						
			}else{
				window.onbeforeunload = null;
			}
		});
    	
   
    };
    
    self.DeleteSurveyTempAnswers = function() {
    
    	var params = {};
	       	params.Username = homeModelObject.Username();
	       	params.IdSurvey = surveysObject.QuestionList()[0].IdSurvey();
	       	params.ActionFlag = 3;
	       	
	       	$.ajax({
	   	        dataType: "json",
	   	        data: JSON.stringify(params),
	   	        cache: false,
	   	        crossDomain: true,
	   	        contentType: "application/json; charset=utf-8",
	   	        url: urlString + "services/GetSurveyTempAnswers.xsjs",
	   	        type: 'POST',
	   	        error: function (x, s, m) {
	   	            
	   	        },
	   	        success: function (res) {
	   	        	console.log("deleted");
	   	        }
	   	    });
	       	
    };
    
    self.SaveFeedback=function(){  	  
    	console.log("SaveFeedback");
    	homeModelObject.checkIfSessionExpired().done(function(data){	
    		console.log(homeModelObject.IsLoggedIn());
    		if(homeModelObject.IsLoggedIn()){

	   	/*if(currentQuestionObject.TextAnswer() || currentQuestionObject.NumericAnswer() || (currentQuestionObject.AllowCantSay()==="1" && (($("#cantSayCheckBoxOptions:checked").is(":checked")) || ($("#cantSayCheckBoxRating:checked").is(":checked")) || ($("#cantSayCheckBoxText:checked").is(":checked"))))){
	   		var current_question = surveysObject.getObjectInArrayByKeyValue(surveysObject.QuestionList(),"QuestionNo",currentQuestionObject.QuestionNo());
	   		var optionsCantSay = $("#cantSayCheckBoxOptions:checked").is(":checked");
	   		var ratingCantSay = $("#cantSayCheckBoxRating:checked").is(":checked");
	   		var textCantSay = $("#cantSayCheckBoxText:checked").is(":checked");
	   			   		
	   		if(currentQuestionObject.NumericAnswer()){	    			
	    		current_question.NumericAnswer(currentQuestionObject.NumericAnswer());	    		    			    			    	
	    	}else{	    		
	    		current_question.TextAnswer(currentQuestionObject.TextAnswer());
	    	}
	   		if(optionsCantSay || ratingCantSay){
	   			current_question.NumericAnswer("-1");
	   		}
	   		if(textCantSay){
	   			current_question.TextAnswer(" ");
	   		}
	   		current_question.AllowCantSayValue(currentQuestionObject.AllowCantSayValue());*/
	   		var idSurveyUserDefinition;	//za ako ne e anonymous da se zacuva!!!
	   		
	   		self.SendSurvey();
	   		self.DeleteSurveyTempAnswers();
	   		
//	   		self.SaveSurveyUserDefinition().done(function(data){	
//	   			
//	   			if(surveysObject.SurveyEndedByOption()===1){
//	   				console.log("Survey TEST or ended from option!");
////	   				self.SaveSurveyAnswers(data).done(function(){
//		   				resetViewModelObject(currentQuestionObject);
//			   			resetViewModelObject(surveysObject);
//			   			surveysObject.IdSurvey(undefined);
//			   			window.onbeforeunload = null;
//			   			//location.reload();
//			   			window.history.pushState("Title", "#surveyEnd" );
//						$.mobile.changePage($('#surveyEnd'), { allowSamePageTransition: true });
////	   				});
//	   			
//	   			
//	   			}
//	   			else{
//	   				self.SaveSurveyAnswers(data).done(function(){
//	   					resetViewModelObject(currentQuestionObject);
//	   		   			resetViewModelObject(surveysObject);
//	   		   			surveysObject.IdSurvey(undefined);
//	   		   			window.onbeforeunload = null;
//	   					//location.reload();
//		   		   		window.history.pushState("Title", "#surveyEnd" );
//						$.mobile.changePage($('#surveyEnd'), { allowSamePageTransition: true });
//	   					});
//	   			}
//	   		}
//	   		);
//	   		
//	   		self.DeleteSurveyTempAnswers();
	   		

	   		
		}
    	else{
    		window.onbeforeunload = null;
    	}
    });


   };	
   
   self.SendSurvey=function(){
   	var r = $.Deferred();
//   	var token = localStorage.getItem('t');
//   	if(token){
//   	debugger;
   	var params={}, idCountryParam,paramsList=[];
   	idCountryParam=homeModelObject.IdCountry()?homeModelObject.IdCountry():322;
   		params.IdSurvey=self.IdSurvey();    	
		params.IdCountry=idCountryParam;
		params.Username = homeModelObject.Username();
		params.Department = homeModelObject.StreetAddress1();
		params.Division = homeModelObject.Company();
		params.EmployeeManagerType = homeModelObject.EmployeeManagerType();
		params.SurveyStartOn = new Date();
		params.SurveyFinishedOn = new Date();
		params.IsAnonymous = self.IsAnonymous();
		params.Email=homeModelObject.Email();
		if(surveysObject.SurveyEndedByOption()){
			params.SurveyEndedByOption=surveysObject.SurveyEndedByOption();

		}else{
			params.SurveyEndedByOption=0;

		}
		if(surveysObject.IdSurveyType()==="1"){
			params.ManagerUsername=homeModelObject.ManagerUsername();
		}else{
			params.ManagerUsername=null;
		}
		
		for(x=0;x<surveysObject.QuestionList().length;x++){
    		if(surveysObject.QuestionList()[x].IsPage()==="1" && surveysObject.QuestionList()[x].PageQuestions().length>0){
    			$.each(surveysObject.QuestionList()[x].PageQuestions(), function(index, value) {		
    				if(((surveysObject.QuestionList()[x].PageQuestions()[index].IsMultiChoice()==1)||(surveysObject.QuestionList()[x].PageQuestions()[index].IsMultiChoice()==3)) && surveysObject.QuestionList()[x].PageQuestions()[index].NumericAnswerForMulti().length != 0){ 
    					for(var a=0; a<surveysObject.QuestionList()[x].PageQuestions()[index].NumericAnswerForMulti().length; a++){
							// debugger;
    						var val = surveysObject.QuestionList()[x].PageQuestions()[index].NumericAnswerForMulti()[a].toString()
							if(val.indexOf(".")!= -1){
								console.log(value)
								tempParams={};
								tempParams.IdSurveyQuestions=value.IdSurveyQuestions();
								tempParams.IdQuestionType=value.IdQuestionType();
//								debugger;
								if(surveysObject.QuestionList()[x].PageQuestions()[index].IdQuestionType()=="7")
								{
									tempParams.NumericAnswer = null;
									tempParams.TextAnswer = value.NumericAnswerForMulti()[a].substring(value.NumericAnswerForMulti()[a].indexOf(".") + 1);

								}else{
									tempParams.TextAnswer = null;
									tempParams.NumericAnswer = value.NumericAnswerForMulti()[a].substring(value.NumericAnswerForMulti()[a].indexOf(".") + 1);

								}
								
								tempParams.IsTest=surveysObject.IsTest();
								paramsList.push(tempParams); 
								console.log(paramsList);
							}else {
								console.log(value);
								tempParams={};
								tempParams.IdSurveyQuestions= value.IdSurveyQuestions();//surveysObject.QuestionList()[x].IdSurveyQuestions();
								tempParams.IdQuestionType= value.IdQuestionType();//surveysObject.QuestionList()[x].IdQuestionType();
//								debugger;
								if(surveysObject.QuestionList()[x].PageQuestions()[index].IdQuestionType()=="7")
								{
									tempParams.NumericAnswer = null;
									tempParams.TextAnswer = surveysObject.QuestionList()[x].PageQuestions()[index].NumericAnswerForMulti()[a];//  value.NumericAnswer();
		
								}else{

									tempParams.TextAnswer = null;
									tempParams.NumericAnswer = surveysObject.QuestionList()[x].PageQuestions()[index].NumericAnswerForMulti()[a];//  value.NumericAnswer();
		
								}
								
								tempParams.IsTest=surveysObject.IsTest();
								paramsList.push(tempParams); 
							}

    					}
    				}else if(value.MatrixAnswers().filter(String).length>0){
    					value.MatrixAnswers().forEach(function(element) {
        					
    						element.NumericAnswer.forEach(function(numAnswer) {
    							tempParams={};
    							tempParams.IdSurveyQuestions=value.IdSurveyQuestions();
    							tempParams.IdQuestionType=value.IdQuestionType();
    							tempParams.TextAnswer = element.TextAnswer;
    							tempParams.NumericAnswer = numAnswer;
    							tempParams.IsTest=surveysObject.IsTest();
    							paramsList.push(tempParams); 

    						});

        					
        				});
    					
    				}else if(value.TextAnswer() || value.NumericAnswer()){    
    					tempParams={};
    					tempParams.IdSurveyQuestions=value.IdSurveyQuestions();
    					tempParams.IdQuestionType=value.IdQuestionType();
    					tempParams.TextAnswer = value.TextAnswer() ? value.TextAnswer() : null;
    					tempParams.NumericAnswer = value.NumericAnswer() ? value.NumericAnswer() : null;
    					tempParams.IsTest=surveysObject.IsTest();
                		paramsList.push(tempParams); 
    				}else {
    					tempParams={};
    					tempParams.IdSurveyQuestions=value.IdSurveyQuestions();
    					tempParams.IdQuestionType=value.IdQuestionType();
    					tempParams.TextAnswer = null;
    					tempParams.NumericAnswer = null;
    					tempParams.IsTest=surveysObject.IsTest();
                		paramsList.push(tempParams);
    				}
   		}); 	
    		}
    		else{
    			console.log(surveysObject.QuestionList()[x].IsMultiChoice());
 //   			 debugger; 
    			tempParams={};
    			if(surveysObject.QuestionList()[x].TextAnswer() || surveysObject.QuestionList()[x].NumericAnswerForMulti().length>0){
    				if((((surveysObject.QuestionList()[x].IsMultiChoice()==1)||(surveysObject.QuestionList()[x].IsMultiChoice()==3))) && surveysObject.QuestionList()[x].NumericAnswerForMulti().length != 0){
//    					$.each(surveysObject.QuestionList()[x].NumericAnswerForMulti(), function( index, value ) {
    						for(var index=0;index<surveysObject.QuestionList()[x].NumericAnswerForMulti().length;index++){
    							var value=surveysObject.QuestionList()[x].NumericAnswerForMulti()[index].toString();
    						
							console.log(surveysObject.QuestionList()[x].NumericAnswerForMulti()[index])
							if(surveysObject.QuestionList()[x].NumericAnswerForMulti()[index]){
								console.log(value)
								tempParams={};
								tempParams.IdSurveyQuestions=surveysObject.QuestionList()[x].IdSurveyQuestions();
								tempParams.IdQuestionType=surveysObject.QuestionList()[x].IdQuestionType();
//								debugger;
								if(tempParams.IdQuestionType=="7")
								{
									tempParams.NumericAnswer = null;
									tempParams.TextAnswer = value.substring(value.indexOf(".") + 1);
								}else{

									tempParams.TextAnswer = null;
									console.log(value);
									tempParams.NumericAnswer = value.substring(value.indexOf(".") + 1);
								}
								tempParams.IsTest=surveysObject.IsTest();
								paramsList.push(tempParams); 
								console.log(paramsList);
							} else {
								tempParams={};
								tempParams.IdSurveyQuestions=surveysObject.QuestionList()[x].IdSurveyQuestions();
								tempParams.IdQuestionType=surveysObject.QuestionList()[x].IdQuestionType();
								tempParams.TextAnswer = null;
								tempParams.NumericAnswer = value;
	
								tempParams.IsTest=surveysObject.IsTest();
								paramsList.push(tempParams); 
								console.log(paramsList);
							}
    					}
//    					);
    				}else {   
    					tempParams={};
    					tempParams.IdSurveyQuestions=surveysObject.QuestionList()[x].IdSurveyQuestions();
    					tempParams.IdQuestionType=surveysObject.QuestionList()[x].IdQuestionType();
    					tempParams.TextAnswer = surveysObject.QuestionList()[x].TextAnswer() ? surveysObject.QuestionList()[x].TextAnswer() : null;
    					tempParams.NumericAnswer = surveysObject.QuestionList()[x].NumericAnswer() ? surveysObject.QuestionList()[x].NumericAnswer() : null;
    					
    					tempParams.IsTest=surveysObject.IsTest();
    					paramsList.push(tempParams);  
    				}
    			}else if(surveysObject.QuestionList()[x].MatrixAnswers().filter(String).length>0){
    				surveysObject.QuestionList()[x].MatrixAnswers().forEach(function(element) {
    					
						element.NumericAnswer.forEach(function(numAnswer) {
							tempParams={};
							tempParams.IdSurveyQuestions=surveysObject.QuestionList()[x].IdSurveyQuestions();
							tempParams.IdQuestionType=surveysObject.QuestionList()[x].IdQuestionType();
							tempParams.TextAnswer = element.TextAnswer;
							tempParams.NumericAnswer = numAnswer;
							tempParams.IsTest=surveysObject.IsTest();
							paramsList.push(tempParams); 

						});

    					
    				});
    				
    			}
    		}
    		      		
    	}
		params.Answers=paramsList;
//		console.log(params.Answers);
		
		console.log(params);
		$.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        contentType: "application/json; charset=utf-8",
	        url: urlString + "services/SendSurvey.xsjs",
	        type: 'POST',
	        error: function (x, s, m) {
	        },
	        success: function (res) {	 
	        	if(res.SURVEYCANBESAVED==0){
	        		 if (getCookie("lang")=='de'){
			 				alert("Bereits fertiggestellt haben Sie diesen Fragebogen aus! Ihre Antworten werden nicht gesichert!");
			 			}
			    		 else if(getCookie("lang")=='fr'){
			    			alert("Vous avez déjà terminé cette enquête ! Vos réponses ne seront pas sauvegardées!")
						}else {
							alert("You've already completed this survey! Your answers will not be saved!")
						}
	        	}else{
	        		console.log(res.SURVEYCANBESAVED);
	        		
	        	}
	        	
	        	
	        	resetViewModelObject(currentQuestionObject);
		   			resetViewModelObject(surveysObject);
		   			surveysObject.IdSurvey(undefined);
		   			window.onbeforeunload = null;
					//location.reload();
   		   		window.history.pushState("Title", "#surveyEnd" );
   		   		engagePulseSurveys.isPulseSurvey(0);
				$.mobile.changePage($('#surveyEnd'), { allowSamePageTransition: true });
	        	
	        	r.resolve(res);	        	
	        }
	    });
		return r;
   };
   
   
   
   
//    self.SaveSurveyUserDefinition=function(IdUserDefinition){
//    	var r = $.Deferred();
////    	var token = localStorage.getItem('t');
////    	if(token){
//    	var params={}, idCountryParam;
//    	idCountryParam=homeModelObject.IdCountry()?homeModelObject.IdCountry():322;
//    	params.IdSurvey=self.IdSurvey();    	
//		params.IdCountry=idCountryParam;
//		params.Username = homeModelObject.Username();
//		params.Department = homeModelObject.StreetAddress1();
//		params.Division = homeModelObject.Company();
//		params.SurveyStartOn = new Date();
//		params.SurveyFinishedOn = new Date();
//		params.IsAnonymous = self.IsAnonymous();
//		params.Email=homeModelObject.Email();
//		if(surveysObject.IdSurveyType()==="1"){
//			params.ManagerUsername=homeModelObject.ManagerUsername();
//		}
//		console.log(params);
//		$.ajax({
//	        dataType: "json",
//	        data: JSON.stringify(params),
//	        cache: false,
//	        crossDomain: true,
//	        contentType: "application/json; charset=utf-8",
//	        url: urlString + "services/InsertSurveyUserDefinition.xsjs",
//	        type: 'POST',
//	        error: function (x, s, m) {
//	        },
//	        success: function (res) {	        	
//	        	r.resolve(res);	        	
//	        }
//	    });
////    	}
//		return r;
//    };
//    self.SaveSurveyAnswers=function(surveyUserDefinition){
//    	var r = $.Deferred();
//    	homeModelObject.checkIfSessionExpired().done(function(data){	
//			if(homeModelObject.IsLoggedIn()){
//		    	console.log('vratena survey definition');
//		    	console.log(surveyUserDefinition);
//		    	if(surveyUserDefinition.SurveyCanBeSaved==1){
//		    		var IdSurveyDefinition=surveyUserDefinition.IdSurveyUserDefinition,x=0,params={},paramsList=[];    	
//		        	for(x=0;x<surveysObject.QuestionList().length;x++){
//		        		if(surveysObject.QuestionList()[x].IsPage()==="1" && surveysObject.QuestionList()[x].PageQuestions().length>0){
//		        			$.each(surveysObject.QuestionList()[x].PageQuestions(), function(index, value) {	
//		        				params={};
//		        				if(value.TextAnswer() || value.NumericAnswer()){
//			        				params.IdSurveyQuestions=value.IdSurveyQuestions();
//			        				params.IdSurveyUserDefinition=IdSurveyDefinition;
//			                		params.IdQuestionType=value.IdQuestionType();
//			                		params.Answer = value.TextAnswer() ? value.TextAnswer() : value.NumericAnswer();
//			                		params.IsTest=surveysObject.IsTest();
//			                		paramsList.push(params);  
//		        				}
//		        			});
//		        		}
//		        		else{
//		        			params={};
//		        			if(surveysObject.QuestionList()[x].TextAnswer() || surveysObject.QuestionList()[x].NumericAnswer()){
//			        			params.IdSurveyQuestions=surveysObject.QuestionList()[x].IdSurveyQuestions();
//			            		params.IdSurveyUserDefinition=IdSurveyDefinition;
//			            		params.IdQuestionType=surveysObject.QuestionList()[x].IdQuestionType();
//			            		params.Answer = surveysObject.QuestionList()[x].TextAnswer() ? surveysObject.QuestionList()[x].TextAnswer() : surveysObject.QuestionList()[x].NumericAnswer();
//			            		params.IsTest=surveysObject.IsTest();
//			            		paramsList.push(params);  
//		        			}
//		        		}
//		        		      		
//		        	}
//		        	console.log(paramsList);
//		        	$.ajax({
//		    	        dataType: "json",
//		    	        data: JSON.stringify(paramsList),    	        
//		    	        cache: false,
//		    	        crossDomain: true,
//		    	        contentType: "application/json; charset=utf-8",
//		    	        url: urlString + "services/InsertSurveyAnswer.xsjs",
//		    	        type: 'POST',
//		    	        error: function (x, s, m) {
//		    	            
//		    	        },
//		    	        success: function (res) {	        	
//		    	        	console.log("Survey Completed");
//		    	        	r.resolve(res);	
//		    	        }
//		    	    });
//		    	}
//		    	else{
//		    		
//		    		 if (getCookie("lang")=='de'){
//		 				alert("Sie haben bereits an dieser Umfrage abgeschlossen! Ihre Antworten werden nicht gespeichert!");
//		 			}
//		    		 else{
//		    			alert("You've already completed this survey! Your answers will not be saved!")
//					}
//		    	}
//		
//						
//			}else{
//				window.onbeforeunload = null;
//			}
//		});
//    	
//
//    	return r;
//    };
    self.EndSurveyByOption=function(){
    	/*if(surveysObject.IsTest()==="1"){
    		console.log("Survey TEST ended from option!");
        	$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
    	}
    	else{
    		var params={};
    		params.IdSurvey=surveysObject.IdSurvey();
    		params.Username=homeModelObject.Username();
    		params.SurveyStartedOn = new Date();
    		params.SurveyCompletedOn = new Date();
        	$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
    		$.ajax({
    	        dataType: "json",
    	        data: JSON.stringify(params),
    	        cache: false,
    	        crossDomain: true,
    	        url: urlString + "services/InsertSurveyParticipantOne.xsjs",
    	        type: 'POST',
    	        error: function (x, s, m) {
    	            
    	        },
    	        success: function (res) {	        	
    	        	console.log("Survey ended from option!");
    	        	$.mobile.changePage('#feedbackInfo', { allowSamePageTransition: true });
    	        }
    	    });
    	}*/
    	
    }
    
};



var FeedbackModel=function(){	
	self.getRatingValue=function(value){
		var result="";
		switch(parseInt(value())){
		case 1:
			result="Very Bad";
			break;
		case 2:
			result="Bad";
			break;
		case 3:
			result="Neutral";
			break;
		case 4:
			result="Good";
			break;
		case 5:
			result="Very Good";
			break;
		}
		return result;
	};
};

var TestSurveyPage = function() {
    var self = this;
    /*self.IdSurveyQuestions = ko.observable();
    self.QuestionNo = ko.observable();
    self.IdSurvey = ko.observable();
    self.IdQuestionType = ko.observable();           
    self.Title = ko.observable();
    self.Description = ko.observable();
    self.NumberOfOptions = ko.observable();
    self.ValueSameAsDescription = ko.observable();
    self.RateFrom = ko.observable();
    self.RateTo = ko.observable();
    self.RateStep = ko.observable();
    self.AllowCantSayValue = ko.observable();
    self.AllowCantSay = ko.observable();
    self.Username = ko.observable();
    self.TextAnswer = ko.observable();
    self.NumericAnswer = ko.observable();
    self.OptionEndSurveyValue = ko.observable();
    self.QuestionOptions = ko.observableArray();*/
    self.AllowCantSay = ko.observable("1");
    
    self.IdQuestionType = ko.observable(4);
    
    self.QuestionNo = ko.observable("5");
    self.TotalQuestionNo = ko.observable("12");
    self.PreviousQuestionNo = ko.observable("4");
    self.Description = ko.observable("Description (mobile) example 01");
    self.Title = ko.observable("Title (page level) example 01");
    self.AllowCantSay = ko.observable("1");
    self.TextAnswer = ko.observable("");
    
    self.QuestionOptions1 = ko.observableArray([{Description: "option 1", Value: "1"},{Description: "option 2", Value: "2"}]);
    self.QuestionOptions2 = ko.observableArray([{Description: "option 1", Value: "1"},{Description: "option 2", Value: "2"}]);
    
    self.testSurveyPageQuestions = ko.observableArray([]);
    
};

var SentSurveysObject=function(){
	var self=this;
	self.Title = ko.observable('');
	self.SurveyCompletedOn= ko.observable('');
	//self.query=ko.observable('');
	//self.Username=ko.observable();

};

var SentSurveysForUser=function(){
	var self=this;
	self.Title = ko.observable();
	self.SurveyCompletedOn= ko.observable();
	self.Username=ko.observable();
	self.CounterForSentSurveysForUser=ko.observable(0);
	self.SentSurveysForUserList = ko.observableArray([]);
	self.SentSurveysForUserList1 = ko.observableArray([]);
	self.query=ko.observable('');	
	
	 self.GetSentSurveysForUser=function(){
		 
	    	if(homeModelObject.IdUsers()!==undefined){
	    		var r = $.Deferred();
		   		 var params={};
		   		 params.Username=homeModelObject.Username();
		   		var sentSurveysObject;
		   		
		   		self.SentSurveysForUserList([]);
		   		self.SentSurveysForUserList1([]);
		   			$.ajax({
		   		        dataType: "json",
		   		        data: JSON.stringify(params),
		   		        cache: false,
		   		        crossDomain: true,
		   		        url: urlString + "services/GetSentSurveysForUser.xsjs",
		   		        type: 'POST',
		   		        error: function (x, s, m) {
		   		            
		   		        },
		   		     success: function (res) {
	 		        	if(res[0]){
	 		        		
	 		        			$.each(res, function(index, value) {
	 		        				sentSurveysObject = new SentSurveysObject();
	 		        				sentSurveysObject.Title(value.Title);
	 		        				var date=new Date(value.SurveyCompletedOn);
	 		        				var formatedDate=date.getDate()+" / "+(date.getMonth()+1)+" / "+date.getFullYear();
	 		        				sentSurveysObject.SurveyCompletedOn(formatedDate);
	 		        				
	 	    		        		self.SentSurveysForUserList.push(sentSurveysObject);
	 	    		        		self.SentSurveysForUserList1.push(sentSurveysObject);
	 	    		        		
	 	    		        	});
	 		        			self.CounterForSentSurveysForUser(res.length);
	 		        			
	 		        	} 
	 		        	else{
	 		        		
	 		        	}
	 		        	r.resolve(res); 		        	
	 		        }
		   		    });    	
				
	    	}
	    	else{}
	    	return r;
	    };
	    
	    
	    
	    self.search=function(value_search) {
	    	self.SentSurveysForUserList.removeAll();
	        if(value_search){
		    	 $.each(self.SentSurveysForUserList1(), function(index, value) {
		    		 if(value.Title().toLowerCase().indexOf(value_search.toLowerCase()) >= 0){
		    			 console.log();
		    			 self.SentSurveysForUserList.push(value);
		    		 }
		    	 });
		    	 
	        	$("#icon_delete_searchsent_surveys").css({display: "block"});
	        }
	        else{
	        	var tempArr = [];
	        	tempArr = self.SentSurveysForUserList1().slice();
	        	self.SentSurveysForUserList(tempArr);
	        	
	        	//self.SentSurveysForUserList(self.SentSurveysForUserList1()); 
	        	$("#icon_delete_searchsent_surveys").css({display: "none"});
	        	/*self.GetSentSurveysForUser();*/
	        }
	        $('#list_sent_surveys').listview('refresh');
	      }
	     
	
	
}

var LocaleModel=function(){
	var self=this;
	self.IdLocalizationConfiguration=ko.observable();
	self.Description=ko.observable();
	self.Description2=ko.observable();
	self.LanguageLocale=ko.observable();
	self.LangLocale=ko.observable();
	self.IsDefault=ko.observable();
};

var HomeModel = function () {
    var self = this;
    self.IdUsers = ko.observable();
    self.FirstName = ko.observable('');
    self.FullName = ko.observable('');
    self.LastName = ko.observable('');
    self.Id=ko.observable('');
    self.City=ko.observable('');
    self.ZipCode=ko.observable('');
    self.IsLoggedIn=ko.observable(false);
    self.ProfilePicture = ko.observable('img/profile_pic.svg');
    self.IdCountry=ko.observable();
    self.Country=ko.observable('');
    self.Region=ko.observable('');
    self.BoardArea=ko.observable('');
    self.Company=ko.observable("");
    self.StreetAddress1=ko.observable('');
    self.ManagerName=ko.observable();
    self.ManagerUsername=ko.observable();
    self.EmployeeManagerType = ko.observable();
    //self.Date = ko.observable(new Date().getDate());
   // self.Month = ko.observable(monthNames[new Date().getMonth()]);       
    self.Email = ko.observable();
    self.Username = ko.observable();
    self.UserLocale = ko.observable(); 
    self.ProfilePicture=ko.observable(undefined);
    self.IsManager=ko.observable(false);
    self.IsBusinessPartner=ko.observable(false);
    self.LocalizationSet=ko.observable(false);
    self.UserLocaleList=ko.observableArray();
    self.IdLocalizationConfiguration=ko.observable(0);
    self.UserLang = ko.observable();
    self.ActiveSurveysForUserCounter = ko.observable();
    self.SurveyReportsForUserInAppCounter = ko.observable();
    self.SentSurveysForUserCounter = ko.observable();
    self.NotificationsForUserIsReadCounter = ko.observable();
    self.SurveyPulseForUserInAppCounter = ko.observable();
    self.ActivePulseSurveysForUser = ko.observable();
    self.RankText = ko.observable();
    
    self.IsAccessibility=ko.observable();
    self.IsAccessibilityTemp=ko.observable();
    self.ScreenReader = ko.observable();
   /* self.IdLocalizationConfiguration.subscribe(function (newValue) {	
    	if(self.LocalizationSet()){
    		self.setUserLocale(newValue);    		
    	}	      
	});*/
    
    self.changeAccessibilityModeOff=function(){ 
    	location.href = urlString + "#home_screen"; 
  		$.mobile.changePage($('#account_settings'), { allowSamePageTransition: true });
    };
    self.changeAccessibilityModeOn=function(){ 
    	location.href = urlString + "index_accessibility.html#home_screen"; 
    };
    

    self.IsAccessibility.subscribe(function (newValue) {	
    	var params = {};
    	console.log(self.IsAccessibility());
    	console.log(self.IsAccessibilityTemp());
  		params.IsAccessibility = newValue;
  		console.log(params);
  		if(self.IsAccessibility()!=self.IsAccessibilityTemp()){
  			 $.ajax({
  	            //async: false,
  	            dataType: "json",
  	            data: JSON.stringify(params),
  	            cache: false,
  	            crossDomain: true,
  	            url: urlString + "services/ChangeAccessibilityMode.xsjs",
  	            type: 'post',           
  	            error: function (x, s, m) {
  	          	homeModelObject.checkIfSessionExpired();
  	            },
  	            success: function (data) {   
  	            	self.IsAccessibilityTemp(self.IsAccessibility());
		  	      	if(self.IsAccessibility()){
		  	      		GetReader();
		  	  		}
  	      		
  	            	if(data.IsAccessibility){
  	            		location.href = urlString + "index_accessibility.html#account_settings"; 
  	            		$("#selectReader").focus();
  	            	}else{
  	            		location.href = urlString + "#home_screen"; 
  	            		$.mobile.changePage($('#account_settings'), { allowSamePageTransition: true });
  	            	}
  	            }
  	        });
  		}

	});  
//    self.IsAccessibility.subscribe(function (newValue) {	
//    	if(!self.firstTime){
//    		// da si go najde povikuvanjeto na start, toj sto si go napravil! :-)
//    	  self.ChangeAccessibilityMode(newValue);
//    	}
//    	// ova go refreshira Jquery Mobile checkboxot so nova vrednost
//    	$("#accessibility_agreement1").checkboxradio('refresh') 
//    	 self.firstTime = null;
//	});
    
 
    self.setCookie=function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}
    self.getUserHomeInfo=function(){ 
    	var params = {};
		//unbindSplashScreen();   	
    	var r = $.Deferred();
//    	var token = localStorage.getItem('t');
//    	if(token){
    	params.IsManager = homeModelObject.IsManager() == true ? "1" : "0";
    	params.IsBusinessPartner = homeModelObject.IsBusinessPartner() == true ? "1" : "0";
  		params.IsRead=0;
    		return $.ajax({        
            	data:JSON.stringify(params),
                dataType: "json",
                cache: false,
                crossDomain: true,
                   url: urlString + "services/GetUserDetails.xsjs", 
//               		+"token="+encodeURIComponent(token),
                type: 'POST',
                error: function (x, s, m) {
                	
                },
                success: function (data) { 
                	console.log(data);
                	self.IdUsers(data.IdUsers);
                    self.FirstName(data.FirstName);
                    self.LastName(data.LastName); 
                    self.FullName(data.FirstName + " " +  data.LastName);
                    self.Email(data.Email);                                                               
                    self.Id(data.Id);
                    self.City(data.City);
                    self.ZipCode(data.ZipCode);
                    self.StreetAddress1(data.StreetAddress1);
                    self.Username(data.Username);
                    self.IdCountry(data.IdCountry);
                    self.Country(data.Country);
                    self.Region(data.Region);
                    self.BoardArea(data.BoardArea);
                    self.EmployeeManagerType(data.EmployeeManagerType);
                    var companyParam = data.Company?data.Company:"No Company";
                    self.Company(companyParam);
                    self.ManagerName(data.ManagerName);
                    self.ManagerUsername(data.ManagerUsername);
                    self.IsManager(data.IsManager);
                    self.IsBusinessPartner(data.IsBusinessPartner);
                    self.ActiveSurveysForUserCounter(data.ActiveSurveysForUserCounter);
                    self.SurveyReportsForUserInAppCounter(data.SurveyReportsForUserInAppCounter);
                    self.SentSurveysForUserCounter(data.SentSurveysForUserCounter);
                    self.NotificationsForUserIsReadCounter(data.NotificationsForUserIsReadCounter);
                    self.SurveyPulseForUserInAppCounter(data.SurveyPulseAppCounter);
                    self.ActivePulseSurveysForUser(data.ActivePulseSurveysForUser);
                    self.RankText(checkRankingByNumberSurveys(data.Rank).RankText);
                    if(!self.ProfilePicture()){
                    	self.getPhoto(self.Id(), 7);
                    } 
                    if(data.UserLocale){                    	
                    	self.UserLocale(data.UserLocale);                    	
                    	if(!self.LocalizationSet()){
                    		self.IdLocalizationConfiguration(data.IdLocalizationConfiguration);
                    		self.getUserLocaleList(data.IdLocalizationConfiguration);
                    		self.setLocale(self.UserLocale(),data.IdLocalizationConfiguration);
                        }
                    }
                    else{
                    	self.setDefaultUserLocale(); 
//                    	self.getUserLocaleList(data.IdLocalizationConfiguration);
                    	                   	
                    }
                    
                    self.IsAccessibilityTemp(data.IsAccessibility);
                    self.IsAccessibility(data.IsAccessibility);
                    var urlAccessibility=urlString+"index_accessibility.html";
                    if(data.IsAccessibility && location.href!=urlAccessibility){
                    	if(self.IsAccessibility()){
    		  	      		GetReader();
    		  	  		}
                    	location.href = urlAccessibility + "#home_screen";
                    }
                    r.resolve(data);
                }
            }).always(function() {
          		// $('.loading').hide();
       	  }); 
//    	}
    	return r;
    };
    self.setLocale=function(ui_language,local_conf){
    	self.setCookie("lang", ui_language,365); 
     	self.setCookie("local_set",local_conf,365);
		$("[data-localize]").localize("js/localization/localization", { language: ui_language, fileExtension : "json?v="+version_no });
		localizationViewModel.DataForLocalization();
	};
	self.setUserLocale=function(idLocalizationConfiguration){
        jQuery.support.cors = true;
        var params={};
        params.IdUsers=self.IdUsers();
        params.IdLocalizationConfiguration=self.IdLocalizationConfiguration();
        return $.ajax({        
         	data:JSON.stringify(params),
             dataType: "json",
             cache: false,
             crossDomain: true,
             url: urlString + "services/SetUserLocale.xsjs",
             type: 'POST',
             error: function (x, s, m) {
            		homeModelObject.checkIfSessionExpired();
             	return null;
             },
             success: function (data) {
            	self.UserLocale(data.SelectedLocale);
          		self.UserLang(data.LanguageLocale); 
            	 
          		self.IdLocalizationConfiguration(self.IdLocalizationConfiguration()); 
             	  setCookie("lang", data.LanguageLocale,365);  
             	  setCookie("locale", data.SelectedLocale,365);
             	  setCookie("local_set", self.IdLocalizationConfiguration(),365);
             	  $("[data-localize]").localize("js/localization/localization", { language: data.LanguageLocale, fileExtension : "json?v="+version_no });
             	 localizationViewModel.DataForLocalization();
           	  /*$.mobile.loadPage("#home_screen",true,{
           		 reloadPage : true
           	 });*/
           	 // location.href = "/JobPts/redirect.html"
              	if(!self.LocalizationSet()){
               		self.getUserLocaleList();  
               	  }           	  
               	  self.LocalizationSet(true);
               	//location.assign("#account_settings");
               	 document.cookie = "href="+stripQueryStringAndHash(url)+"#account_settings";
               	 window.location.reload();
             }
         }).always(function() {
       		 $('.loading').hide();
    	  });     
     };
	self.getUserLocaleList=function(dataParam){
    	self.UserLocaleList([]);
        jQuery.support.cors = true;
        var params={};
        params.IdUsers=self.IdUsers();
        return $.ajax({        
         	data:JSON.stringify(params),
             dataType: "json",
             cache: false,
             crossDomain: true,
             url: urlString + "services/GetUserLocaleList.xsjs",
             type: 'POST',
             error: function (x, s, m) {
             	
             },
             success: function (data) {   
            	 var x=0,localeModel=new LocaleModel();
            	 if(self.UserLocaleList().length==0){
            	 for(x=0;x<data.length;x++){
            		 localeModel=new LocaleModel()
            		 localeModel.IdLocalizationConfiguration(data[x].IdLocalizationConfiguration);
            		 localeModel.Description(data[x].Description);
            		 localeModel.Description2(data[x].Description2);
            		 localeModel.LanguageLocale(data[x].LanguageLocale);
            		 localeModel.LangLocale(data[x].LangLocale);
            		 localeModel.IsDefault(data[x].IsDefault);
            		 self.UserLocaleList.push(localeModel);
            	 }
            	 }
            	 self.LocalizationSet(true);
            	 self.IdLocalizationConfiguration(dataParam);
            	 
            	 $("#selectLanguageList").val(self.IdLocalizationConfiguration());
              	
          		$("#selectLanguageList").on("change",lang_change_callback);
          		if($("#selectLanguageList").is(":visible")){
          			$('#selectLanguageList').selectmenu('refresh');
          		}
//            	 setTimeout(function(){
//            		 $("#selectLanguageList").change(function(e){
//             			console.log($(this).val());
//             			if($(this).val()){			
//             				homeModelObject.setUserLocale($(this).val());
//             				self.setCookie("local_set",$(this).val(),365);
//             				localizationViewModel.DataForLocalization();
//             			}
//             		});
//            	 },500);
            	 
             }
         }).always(function() {
       		 $('.loading').hide();
    	  });     
     };
    /* self.changeLocale=function(){
 		//console.log($(this).val());
 		ui_language=$(this).val();
 		$("[data-localize]").localize("js/localization/localization", { language: ui_language })
 		//localStorage.setItem("lang",ui_language)
 		setCookie("lang",ui_language,365);
 	};*/
    self.getPhoto=function(id, type){
    	$.ajax({
            dataType: "json",
            // async: false,
//            data: JSON.stringify({}),
            cache: false,
            crossDomain: true,
            url: ssoSapUrl+ "GetUserPhoto64Dynamic?id="+id+"&type="+type, // self.Id() urlString + "services/AccountManagement.xsjs?idAction=2",
            type: 'GET',
            error: function (x, s, m) {

                // //alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
            },
            success: function (res) {
            	
            	//console.log("data:image/gif;base64,"+res.rezultat);
            	//$('#profilePicture').prop('src',"data:image/gif;base64,"+res.rezultat);
            	if(type===7){
            		self.ProfilePicture("data:image/gif;base64,"+res.rezultat);            		
            	}else if(type===20){
            		$("#id_profile_pic").attr('src',"data:image/jpg;base64,"+res.rezultat)
            	}
            }
        });
    };
    self.setDefaultUserLocale=function(){    	
       jQuery.support.cors = true;
       var params={};
       params.IdUsers=self.IdUsers();
       params.IdLocalizationConfiguration=self.IdLocalizationConfiguration()?self.IdLocalizationConfiguration():"0";
       return $.ajax({        
        	data:JSON.stringify(params),
            dataType: "json",
            cache: false,
            crossDomain: true,
            url: urlString + "services/SetDefaultUserLocale.xsjs",
            type: 'POST',
            error: function (x, s, m) {
            	
            },
            success: function (data) {   
            	self.UserLocale(data.Lang);
            	self.UserLang(data.UiLang);	
                self.IdLocalizationConfiguration(data.IdLocalizationConfiguration);
                self.setLocale(self.UserLocale()); 
             	self.setCookie("lang", data.Lang,365); 
             	self.setCookie("local_set",data.IdLocalizationConfiguration,365);
             	$("[data-localize]").localize("js/localization/localization", { language: data.UiLang, fileExtension : "json?v="+version_no });
             	localizationViewModel.DataForLocalization();
             	if(!self.LocalizationSet()){
              	  	self.getUserLocaleList();
              	  }
                self.LocalizationSet(true);
            }
        }).always(function() {
      		 $('.loading').hide();
   	  });     
    };   
    
    self.getUserHomeInfo1=function(){
    	unbindSplashScreen();

    	//loadingSplashScreen();
    	jQuery.support.cors = true;
        return $.ajax({
        	data:JSON.stringify(localStorage.getItem('a')),
            dataType: "json",
            cache: false,
            crossDomain: true,
            url: urlString + "services/GetUserDetails.xsjs?type=international",
            type: 'POST',
            error: function (x, s, m) {

            },
            success: function (data) {            	
                if (data.UserRank){ self.UserRank(data.UserRank);}
                else {
                	self.UserRank("Newbie");
                }
            }
        }).always(function() {
      		 //$('.loading').hide();
   	  });
    };

    self.checkUser=function(){
     //unbindSplashScreen();

     //loadingSplashScreen();
    var r = $.Deferred();
     var message = "Sorry!\nYour SAP account is not authorised to access SurveyRocks.\nYou will be redirected to login page.";
//     var token = localStorage.getItem('t');
//     if(token){
    	 return $.ajax({        
             data: JSON.stringify({}),
             cache: false,
             crossDomain: true,
             url: urlString + "services/CheckUser.xsjs",
//             		+"?token="+encodeURIComponent(token),
             type: 'POST',
             error: function (x, s, m) {
             	localStorage.removeItem('a');
             	//alert(m);
             },
             success: function (data, status, xhr) {			
                 if(!Boolean(data)){
                	 localStorage.removeItem('t');
                	 self.IsLoggedIn(false);
//                	 location.href=urlString;
                	 location.href=urlString+'Initial/index.html';
                	 alert(message);
                	 return false;
                 	}else{
                		self.IsLoggedIn(true);
                		console.log(data);
                		r.resolve();
                	}
            }
         }).always(function() {
       		 //$('.loading').hide();
    	  });
//     }else{
//    	 //location.href=ssoSapUrl + "SsoProviderRsa?appId=surveyrocks";
//    	 location.href=urlString + "Initial/";
//     }
    return r;
 };
 
 
	self.checkIfSessionExpired=function(){
		var r = $.Deferred();
     	$.ajax({
     	data:JSON.stringify({}),
         dataType: "json",
         async: true,
         cache: false,
         crossDomain: true,
         //async:false,
         url: urlString + "services/public/CheckSession.xsjs", //proveruva vo OAuthMembership
         type: 'POST',
         //contentType: "application/json;charset=utf-8",
         error: function (x, s, m) {
//              alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
	            alert("Currently we have a problem with sending data, please try a while.");
                window.location.reload();
         },
         success: function (data) {
         	if(data.SecurityToken==="unsafe"){
         		self.IsLoggedIn(false);
         		alert("Session is expired, page shall be reloaded.");
	   		 	window.location.reload();
         	}
         	console.log("checkIfSessionExpired"+self.IsLoggedIn());
         	r.resolve(data);
         }
 });
     	return r;
	};
 self.Logout=function(){
	 localStorage.removeItem('t');
	 location.href=urlString + "Initial/";
 };
 
 //simona
 self.checkLogin=function(){
	 console.log("Simona");
	 jQuery.support.cors = true;
 	$.ajax({
 	    url : "/sap/hana/xs/formLogin/token.xsjs",
 	    type : "GET",
 	    crossDomain: true,
 	    beforeSend: function(request) {
 	        request.setRequestHeader("X-CSRF-Token", "Fetch");
 	    },
 	    success : function(data, textStatus, XMLHttpRequest) {
 	        var token = XMLHttpRequest.getResponseHeader("X-CSRF-Token");
 	  	 console.log(token);

 	        if(token=='unsafe'){
 	        	window.location.reload();
 	        }    	        	       
 	    }
 	 });
 };
self.doLogout= function(msg){ 
	
	jQuery.support.cors = true;
		$.ajax({
		    url : "/sap/hana/xs/formLogin/token.xsjs",
		    type : "GET",
		    crossDomain: true,
		    beforeSend: function(request) {
		    	
		        request.setRequestHeader("X-CSRF-Token", "Fetch");
		    },
		    success : function(data, textStatus, XMLHttpRequest) {
		        var token = XMLHttpRequest.getResponseHeader("X-CSRF-Token");
		        
		        $.ajax({
		        url : "/sap/hana/xs/formLogin/logout.xscfunc",
		        type : "POST",
		        crossDomain: true,
		        beforeSend: function(request) {
		         request.setRequestHeader("X-CSRF-Token", token);
		        },
		        success : function(data, textStatus, XMLHttpRequest) {
		        	window.location.replace("/SurveyRocks/Initial/index.html");
		         //var mLayout = sap.ui.getCore().byId("mLayout"); 
                     //mLayout is the id of main layout. Change it accordingly
		         
		        // mLayout.destroy();
		         //sap.ui.getCore().applyChanges();
		        // jQuery(document.body).html("<span>"+msg+"</span><br><a href=\"javascript:window.location.reload()\">Login</a>");
		         //Logged out successfully.
		         //window.location.reload();		        	
		         
		        },
		        error : function(){
		        	//self.checkLogin();
		        	//location.href = "/JobPts/Initial/index.html";
		        	window.location.replace("/SurveyRocks/Initial/index.html");
		        }
		       });
		    }
		 });
	
	};
 
 
};

checkNumericRatingChange = function(idto){	
	/*if($("#cantSayCheckBoxNumericRating:checked").is(":checked")){
		currentQuestionObject.AllowCantSayValue(true);
		//document.getElementById("div_overlay_options").style.display="block";
		$(".photo_radios").addClass("photo_radios_inactive");
	}
	else{
		//document.getElementById("div_overlay_options").style.display="none";
		$(".photo_radios").removeClass("photo_radios_inactive");
		currentQuestionObject.AllowCantSayValue(false);
	}*/
	if(currentQuestionObject.PageQuestions().length>0){
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if (idto.indexOf(value.IdSurveyQuestions()) >= 0){
				if($("#"+idto).is(':checked')){ // prethodno bese !value.AllowCantSayValue()
					$(".DIV"+idto).addClass("photo_radios_inactive");
					value.AllowCantSayValue(true);
					return;
				}
				else{
					$(".DIV"+idto).removeClass("photo_radios_inactive");
					value.AllowCantSayValue(false);
					return;
				}
			}		
		});
	}
	else{
		if($("#"+idto).is(":checked")){
			$(".DIV"+idto).addClass("photo_radios_inactive");
			currentQuestionObject.AllowCantSayValue(true);
		}
		else{
			$(".DIV"+idto).removeClass("photo_radios_inactive");
			currentQuestionObject.AllowCantSayValue(false); 
		}
	}
	
};


checkOptionsChange = function(idto){	
	if(currentQuestionObject.PageQuestions().length>0){
		$.each(currentQuestionObject.PageQuestions(), function(index, value) {
			if (idto.indexOf(value.IdSurveyQuestions()) >= 0){
				if($("#"+idto).is(':checked')){ // prethodno bese !value.AllowCantSayValue() a pred toa $("input[id*="+idto).is(":checked")
					$(".DIV"+idto).addClass("photo_radios_inactive");
					value.AllowCantSayValue(true);
					return;
				}
				else{
					$(".DIV"+idto).removeClass("photo_radios_inactive");
					value.AllowCantSayValue(false);
					return;
				}
			}		
		});
	}
	else{
		if($("#"+idto).is(":checked")){
			currentQuestionObject.AllowCantSayValue(true);
			$(".DIV"+idto).addClass("photo_radios_inactive");
		}
		else{
			$(".DIV"+idto).removeClass("photo_radios_inactive");
			currentQuestionObject.AllowCantSayValue(false);
		}
	}
	
	
	
};

checkRatingChange = function(idto){	

	if($("#cantSayCheckBoxRating:checked").is(":checked")){
		currentQuestionObject.AllowCantSayValue(true);
		//document.getElementById("div_overlay_options").style.display="block";
		$("#content_feedback_rating").addClass("content_feedback_rating_inactive");
	}
	else{
		//document.getElementById("div_overlay_options").style.display="none";
		$("#content_feedback_rating").removeClass("content_feedback_rating_inactive");
		currentQuestionObject.AllowCantSayValue(false);
	}

	/*if($("#"+idto).is(":checked")){
		currentQuestionObject.AllowCantSayValue(true);
		$(".DIV"+idto).addClass("content_feedback_rating_inactive");
		//console.log(idto);
	}
	else{
		$(".DIV"+idto).removeClass("content_feedback_rating_inactive");
		currentQuestionObject.AllowCantSayValue(false);
		//console.log(idto);
	}
	console.log(idto);*/
	
};


var SurveyReportsDefinition = function () {
	var self = this;
	self.IdSurveyReports = ko.observable();
	self.IdSurveyQuestions = ko.observable();
	self.IdPageGroup = ko.observable();
	self.DisplayOrder = ko.observable();
	self.IdDisplayControl = ko.observable();
	self.IdQuestionType=ko.observable();
	self.QuestionType=ko.observable();
	
	self.Questions = ko.observableArray();
	self.QuestionType = ko.observable();
	
	
};

var SurveyReportObject = function () {
	var self = this;
	self.IdSurveyReports = ko.observable();
	self.IsMultiSurveyReport= ko.observable();
	self.IdSurvey = ko.observable();
	self.IsSurveyCompleted = ko.observable();
	self.Title = ko.observable('');	
	self.IdSurveyType = ko.observable();
	self.ReportDefinition = ko.observableArray();
	self.PagesGroupList = ko.observableArray();
	self.PagesNumberList = ko.observableArray();
	self.SurveyClones= ko.observable();
	self.NumberOfPages = ko.observable();
	
	self.TresholdCheck = ko.observable();
	self.TresholdValue = ko.observable();
	
	self.PageNoCurrent = ko.observable(0);
	self.PageNoNext = ko.observable(0);
	self.PageNoPrev = ko.observable(0);
	
	self.reportsPageNavigateNextPage=function(){
		
		var i;
		for(i=0;i<self.PagesNumberList().length;i++){
			console.log(i);
			console.log(self.PagesNumberList()[i]);
			if(self.PagesNumberList()[i]==self.PageNoCurrent()){
				self.PageNoCurrent(self.PagesNumberList()[i+1]);
				
				if(self.PagesNumberList()[i+2]){
					self.PageNoNext(self.PagesNumberList()[i+2]);
				}
				else{ self.PageNoNext(0); }
				if(self.PagesNumberList()[i]){
					self.PageNoPrev(self.PagesNumberList()[i]);
				}
				else{ self.PageNoPrev(0); }
//				surveyReports.GetPageGroupTitle(self.PageNoCurrent()).done(function(){
//					surveyReports.GetColors(self.PageNoCurrent()).done(function(){
						refreshResultsChartData();
//					});
//				});
				break;
			}
		}
	};
	
	self.reportsPageNavigatePrevPage=function(){
		var i;
		for(i=0;i<self.PagesNumberList().length;i++){

			if(self.PagesNumberList()[i]==self.PageNoCurrent()){
				self.PageNoNext(self.PagesNumberList()[i]);
				if(self.PagesNumberList()[i-1]){
					self.PageNoCurrent(self.PagesNumberList()[i-1]);
				}
				else{self.PageNoCurrent(0)}			
				if(self.PagesNumberList()[i-2]){
					self.PageNoPrev(self.PagesNumberList()[i-2]);
				}
				else{ self.PageNoPrev(0); }	
//				surveyReports.GetPageGroupTitle(self.PageNoCurrent()).done(function(){
//					surveyReports.GetColors(self.PageNoCurrent()).done(function(){
						refreshResultsChartData();
//					});
//				})
				break;
			}
		}
	};
	
	
};

var SurveyReports = function () {
	var self = this;
	self.SurveyReportsPagesList = ko.observableArray([]);
	self.IdSurveyReports = ko.observable();
	self.IdSurvey = ko.observable();
	self.IsMultiSurveyReport=ko.observable();
	self.IdSurveyType=ko.observable();
	self.IdOrgStructure = ko.observable();
	self.Title = ko.observable();
	self.ColorList = ko.observableArray([]);
	self.ReportFiltersList = ko.observableArray();
	self.ReportFiltersExist = ko.observable(false);	
	
	var ss = new SurveyReportObject();
	
	self.CurrentChartData = ko.observable(ss);	
	
	self.currentPageFilter = ko.observable();
	self.currentGroupFilter = ko.observable();
	
	self.SurveyReportsWhereClause = ko.observable('');
	
	self.filterGroupItems = ko.computed(function() {
        if(!self.currentPageFilter() || !self.currentGroupFilter()) {
            return self.CurrentChartData(); 
        } else {
            return ko.utils.arrayFilter(self.CurrentChartData().ReportDefinition(), function(item1) {
                return parseInt(item1.PageNumber) == parseInt(self.currentPageFilter()) && item1.PageGroup===self.currentGroupFilter();
            });
        }
    });
	
	self.GetSurveyReportsWhereClause = function(){
		if(reportResultOptions.IndividualOrCumulative()!==undefined){
			if(reportResultOptions.IndividualOrCumulative()===1){
				//self.SurveyReportsWhereClause("'" + reportResultOptions.OrgUnit() + "'");
	        		//$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
	        		self.GetCurrentChartDataFiltered(self.IdSurveyReports(),self.IsMultiSurveyReport()).done(function(){
	        			if(surveyReports.CurrentChartData().TresholdCheck()==1){
	        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
	        				
	        			}
	        			else{
	        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
	        				if(self.IsMultiSurveyReport()==1){
	        					$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
	        				}else{
		        				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");

	        				}
	                		
	        			}
	            		
	            	});
			}
			else if(reportResultOptions.IndividualOrCumulative()===2 || reportResultOptions.IndividualOrCumulative()===4 ){
				var org;
				if(reportResultOptions.IndividualOrCumulative()===2){
					org=reportResultOptions.SelectedOrgUnit();

				}else {
					org=reportResultOptions.SelectedOrgUnitAssignedToMng();
				}
					
				var params={};
				$.ajax({
			        dataType: "json",
			        data: JSON.stringify(params),
			        cache: false,
			        crossDomain: true,
			        url: urlString + "services/SurveyReportsGetWhereClause.xsjs?org=" + org + "&IdOrgStructure="+self.IdOrgStructure(),
			        type: 'POST',
			        error: function (x, s, m) {
			            
			        },
			        success: function (res) {
			        	
			        	console.log(res);
			        	self.SurveyReportsWhereClause(res);
			        	console.log(self.SurveyReportsWhereClause());
			        	
			        	//self.GetCurrentChartDataFiltered(self.IdSurveyReports(),self.IsMultiSurveyReport()).done(function(){
			        	$.when(self.GetCurrentChartDataFiltered(self.IdSurveyReports(),self.IsMultiSurveyReport())).done(function(){
		        			if(surveyReports.CurrentChartData().TresholdCheck()==1){
		        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
		        				
		        			}
		        			else{
		        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
		        				if(self.IsMultiSurveyReport()==1){
		        					$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
		        				}else{
			        				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");

		        				}		                		
		        			}
		            		
		            		});
			        	
			        }
				});
			}else if(reportResultOptions.IndividualOrCumulative()===3){
				//self.SurveyReportsWhereClause("'" + reportResultOptions.OrgUnit() + "'");
        		//$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
				self.GetCurrentChartDataFiltered(self.IdSurveyReports(),self.IsMultiSurveyReport()).done(function(){					
					if(surveyReports.CurrentChartData().TresholdCheck()==1){        	
        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });        			        			        			
        			}
        			else{
        				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
        				if(self.IsMultiSurveyReport()==1){
        					$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
        				}else{
	        				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");

        				}                		
        			}
            		
            	});
											
				
			}
		}
		if(reportResultOptions.selectedGeoGroup()!==undefined && reportResultOptions.GeoGroupValue()!==undefined){				
			self.GetCurrentChartDataFiltered(self.IdSurveyReports(),self.IsMultiSurveyReport()).done(function(){
				
				if(reportResultOptions.selectedGeoGroup()=="Country"){
					if(homeModelObject.IsBusinessPartner()){
						reportResultOptions.CountryName($("#ddl_geoDataByGroupList option:selected").text());						
					}else{
						reportResultOptions.CountryName(homeModelObject.Country());						
					}
				}
				
				if(surveyReports.CurrentChartData().TresholdCheck()==1){
					$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });					
				}
				else{
					$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
					if(self.IsMultiSurveyReport()==1){
						$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
					}else{
	    				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");	
					}	        		
				}	    		
	    	});			
		}
	};
	
	
	self.GetListSurveyReports=function(){
		
//		var token = localStorage.getItem('t');
//	   	 if(token){
	   		var r = $.Deferred();
	   		 var params={};
	   		 params.IsManager = homeModelObject.IsManager() == true ? "1" : "0";
	   		 params.IsBusinessPartner = homeModelObject.IsBusinessPartner() == true ? "1" : "0";
	   		 self.SurveyReportsPagesList([]);
	   		 self.CurrentChartData();
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/GetSurveyReportsModel.xsjs",
//	   		        		+"?token="+encodeURIComponent(token),
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		        success: function (res) {
	   		        	
	   		        	console.log(res);
	   		        	var surveyReportObject;
	   		        	$.each(res, function(index, value) {
	   		        		surveyReportObject = new SurveyReportObject();
	   		        		surveyReportObject.IdSurveyReports(value.IdSurveyReports);
	   		        		surveyReportObject.IdSurvey(value.IdSurvey);
	   		        		surveyReportObject.Title(value.Title);
	   		        		surveyReportObject.IsMultiSurveyReport(value.IsMultiSurveyReport);
	   		        		surveyReportObject.IdSurveyType(value.IdSurveyType);
	   		        		surveyReportObject.IsSurveyCompleted(value.IsSurveyCompleted);
	   		        		surveyReportObject.SurveyClones(value.SurveyClones);
	   		        		surveyReportObject.NumberOfPages(value.NumberOfPages);
	   		        		/*surveyReportObject.PagesGroupList(value.PagesGroupList);
	   		        		surveyReportObject.PagesNumberList(value.PagesNumberList);
	   		        		$.each(value.ReportDefinition, function(index, value) {
	   		        			surveyReportObject.ReportDefinition.push(value);
	   		        		});*/
	
	   		        		self.SurveyReportsPagesList.push(surveyReportObject);
	   		        	});
	   		        	//$("#counter_home_completed_surveys").html(res.length);	   	
	   		        	
	   		        	r.resolve(res);
	   		        	
	   		        }
	   		    });     
//	   	 }
		return r;
    };
    
    self.GetCurrentChartData=function(IdSurveyReports,IsMultiSurveyReport){
//		var token = localStorage.getItem('t');
		var urlXsjs=[];
		console.log("IsMultiSurveyReport  "+IsMultiSurveyReport);
		if(IsMultiSurveyReport==1){
			console.log("if");
			urlXsjs='services/GetMultiSurveyReportsModel.xsjs';
		}else{
			console.log("else");
			urlXsjs='services/GetSurveyReportsModel.xsjs';
		}
//	   	 if(token){
	   		var r = $.Deferred();
	   		 var params={};
	   		if(surveyReports.IdSurveyType()==5){
	   			 params.param1 = reportResultOptions.selectedPermType1();
	   			 params.param2 = reportResultOptions.selectedPermType2() != undefined ? reportResultOptions.selectedPermType2() : '';
	   			 params.dateFrom = moment($("#dateFrom").datepicker("getDate")).format("L");
	   			 params.dateUntil = moment($("#dateUntil").datepicker("getDate")).format("L");
	   			 params.FromPermTab = 1;
	   		 }
	   					   		
	   		 self.SurveyReportsPagesList([]);
	   		 self.CurrentChartData();
	   		 params.IdSurveyReports = IdSurveyReports;
	   		 params.IsTest = "0";
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + urlXsjs,
//	   		        +encodeURIComponent(token),
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		        success: function (res) {
	   		        	
	   		        	console.log(res);
	   		        	
	   		        	
	   		        	
	   		        	var surveyReportObject;
	   		        	$.each(res, function(index, value) {
	   		        		surveyReportObject = new SurveyReportObject();
	   		        		surveyReportObject.IdSurveyReports(value.IdSurveyReports);
	   		        		surveyReportObject.IdSurvey(value.IdSurvey);
	   		        		surveyReportObject.Title(value.Title);
	   		        		surveyReportObject.PagesGroupList(value.PagesGroupList);
	   		        		surveyReportObject.PagesNumberList(value.PagesNumberList);
	   		        		surveyReportObject.TresholdCheck(value.TresholdCheck);
	   		        		if(value.TresholdValue){
		   		        		surveyReportObject.TresholdValue(value.TresholdValue);
	   		        		}
	   		        		
	   		        		surveyReportObject.PageNoCurrent(value.PagesNumberList[0]);
	   		        		if(value.PagesNumberList[1]){
	   		        			surveyReportObject.PageNoNext(value.PagesNumberList[1]);
	   		        		}
	   		        		
	   		        		$.each(value.ReportDefinition, function(index, value) {
	   		        			surveyReportObject.ReportDefinition.push(value);
	   		        		});
	
	   		        		self.SurveyReportsPagesList.push(surveyReportObject);
	   		        		
	   		        	});
	   		        	self.CurrentChartData(surveyReportObject);
	   		        	
	   		        	r.resolve(res);
	   		        	
	   		        }
	   		    });     
//	   	 }
   		
		return r;
   };
   
   
   self.GetCurrentChartDataFiltered=function(IdSurveyReports,IsMultiSurveyReport){
//		var token = localStorage.getItem('t');
		
//	   	 if(token){	   
	   		var r = $.Deferred();
	   		 var params={};
	   		 self.SurveyReportsPagesList([]);
	   		 self.CurrentChartData();
	   		 params.IdSurveyReports = IdSurveyReports;
	   		 if(reportResultOptions.IndividualOrCumulative()==1){
	   			params.IndividualOrCumulative = "1";
	   			params.WhereClause = reportResultOptions.SelectedManagerByBusiness()!==undefined ? reportResultOptions.SelectedManagerByBusiness() : homeModelObject.Username();
	   		 }
	   		 else if(reportResultOptions.IndividualOrCumulative()==2){
	   			params.IndividualOrCumulative = "2";
	   			params.SelectedOrgUnit = reportResultOptions.SelectedOrgUnit();
	   			params.WhereClause = surveyReports.SurveyReportsWhereClause();
	   			params.SelectedManager = reportResultOptions.SelectedManagerByBusiness()!==undefined ? reportResultOptions.SelectedManagerByBusiness() : homeModelObject.Username();
	   		 }
	   		else if(reportResultOptions.IndividualOrCumulative()==3){
	   			params.IndividualOrCumulative = "3";
	   			params.SelectedManager = reportResultOptions.SelectedManagerByBusiness();
	   			params.WhereClause = surveyReports.SurveyReportsWhereClause();
	   		 }
	   		else if(reportResultOptions.IndividualOrCumulative()==4){
   	  			params.IndividualOrCumulative = "2";
   			 	params.SelectedOrgUnit = reportResultOptions.SelectedOrgUnitAssignedToMng();
	   			params.WhereClause = surveyReports.SurveyReportsWhereClause();
	   			params.SelectedManager = reportResultOptions.SelectedManagerByBusiness()!==undefined ? reportResultOptions.SelectedManagerByBusiness() : homeModelObject.Username();
   		 }
	   		else if(reportResultOptions.selectedGeoGroup() && reportResultOptions.GeoGroupValue()){
	   			params.selectedGeoGroup = reportResultOptions.selectedGeoGroup();
	   			params.GeoGroupValue = reportResultOptions.GeoGroupValue();
	   		}
 
	   		 
	   		 
	   		 params.From='app';
	   		params.IsTest = "0";
	   		var urlXsjs=[];
	   		console.log("IsMultiSurveyReport "+IsMultiSurveyReport);
			if(IsMultiSurveyReport==1){
				console.log("if");
				//Simona
				
	   			params.IdOrgStructure = reportResultOptions.IdOrgStructure();
				urlXsjs='services/GetMultiSurveyReportsModelFiltered.xsjs';
			}else{
				console.log("else");
	   			//params.WhereClause = surveyReports.SurveyReportsWhereClause();

				urlXsjs='services/GetSurveyReportsModelFiltered.xsjs';
			}
	   		 
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + urlXsjs,
//	   		        +encodeURIComponent(token),
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		        success: function (res) {
	   		        	
	   		        	console.log(res);
	   		        	
	   		        	
	   		        	
	   		        	var surveyReportObject;
	   		        	$.each(res, function(index, value) {
	   		        		surveyReportObject = new SurveyReportObject();
	   		        		surveyReportObject.IdSurveyReports(value.IdSurveyReports);
	   		        		surveyReportObject.IdSurvey(value.IdSurvey);
	   		        		surveyReportObject.Title(value.Title);
	   		        		surveyReportObject.PagesGroupList(value.PagesGroupList);
	   		        		surveyReportObject.PagesNumberList(value.PagesNumberList);
	   		        		surveyReportObject.TresholdCheck(value.TresholdCheck);
	   		        		if(value.TresholdValue){
		   		        		surveyReportObject.TresholdValue(value.TresholdValue);
	   		        		}
	   		        		surveyReportObject.PageNoCurrent(value.PagesNumberList[0]);
	   		        		if(value.PagesNumberList[1]){
	   		        			surveyReportObject.PageNoNext(value.PagesNumberList[1]);
	   		        		}
	   		        		
	   		        		$.each(value.ReportDefinition, function(index, value) {
	   		        			surveyReportObject.ReportDefinition.push(value);
	   		        		});
	
	   		        		self.SurveyReportsPagesList.push(surveyReportObject);
	   		        		
	   		        	});
	   		        	self.CurrentChartData(surveyReportObject);
	   		        	r.resolve(res);
	   		        	
	   		        }
	   		    });     
//	   	 }
  		
		return r;
  };
       
   
    self.showResultsChartData=function($data){
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
		    	participationRateViewModel.SelectedIdSurvey($data.IdSurvey());
		    	surveyReports.IdSurveyType($data.IdSurveyType());
		    	surveyReports.IsMultiSurveyReport($data.IsMultiSurveyReport());
		    	surveyReports.IdSurveyReports($data.IdSurveyReports());
				surveyReports.IdSurvey($data.IdSurvey());
				GetIdOrgStructure(surveyReports.IdSurvey(),surveyReports.IsMultiSurveyReport(),surveyReports.IdSurveyReports());
		    	if($data.IdSurveyType()==1){ 
		    		$.mobile.changePage($('#survey_results_options'), { allowSamePageTransition: true });
		    		reportResultOptions.GetOrgUnit($data.IdSurvey(), homeModelObject.Username());
		    	}
		    	else{
		    		if($data.IdSurveyType()==3 || $data.IdSurveyType()==5){
		    			$.mobile.changePage($('#survey_results_options'), { allowSamePageTransition: true });
		    		}
		    		
//		    		
//		    		self.GetCurrentChartData($data.IdSurveyReports(),$data.IsMultiSurveyReport()).done(function(){
//		    			if(surveyReports.CurrentChartData().TresholdCheck()==1){
//		    				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
//		    			}
//		    			else{
//		    				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
//		    				if(surveyReports.IsMultiSurveyReport()==1){
//	        					$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
//	        				}else{
//		        				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");
// 
//	        				}		            		
//		    			}
//		        		
//		        	});
		    		
		    		//v added
//		    		if($data.IdSurveyType()==3){
//			    		self.GetCurrentChartData($data.IdSurveyReports(),$data.IsMultiSurveyReport()).done(function(){
//			    			if(surveyReports.CurrentChartData().TresholdCheck()==1){
//			    				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
//			    			}
//			    			else{
//			    				$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
//			    				if(surveyReports.IsMultiSurveyReport()==1){
//		        					$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
//		        				}else{
//			        				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");
//	 
//		        				}		            		
//			    			}
//			        		
//			        	});
//		    		}
		    		
		    		
		    		
		    	}
		    	
			}else{
				window.onbeforeunload = null;
			}
		});
		    
    	
    	
    };
    
    
	self.checkFiltersForReport = function(){			
			var r = $.Deferred();
			
			var params = {};
			params.IdSurveyReports = surveyReports.IdSurveyReports();		
			$.ajax({
				dataType : "json",
				data : JSON.stringify(params),
				cache : false,
				crossDomain : true,
				url : urlString + "services/DemoFiltersForReport.xsjs?action=2",
				type : 'POST',
				error : function(x, s, m) {
	
				},
				success : function(res) {					
					surveyReports.ReportFiltersList(res);
					surveyReports.ReportFiltersExist(false);
					for (var i = 0; i < res.length; i++) {
						if(res[i].IsActive == 1){
							surveyReports.ReportFiltersExist(true);
							break;
						}
					}
					r.resolve(res);
				}
			});
			
			return r;
	};
	
	self.filterDemoGroups = function(array1, array2) {			
  		 return array1.filter(function(item) {
  			for (var i = 0; i < array2.length; i++) {
				if(array2[i].FilterName == item.FilterName){
					if(array2[i].IsActive == 1){
			            return item;							
					}
				}
			}    	         	
		 });
	};
    /*self.GetUserRanking=function(){
    	if(homeModelObject.Username()!==undefined){
    		var r = $.Deferred();
	   		 var params={};
	   		 params.Username=homeModelObject.Username();
	   		 var leaderboardSingleObject;
	   		 self.LeaderboardList([]);
	   			$.ajax({
	   		        dataType: "json",
	   		        data: JSON.stringify(params),
	   		        cache: false,
	   		        crossDomain: true,
	   		        url: urlString + "services/GetLeaderboardRankingList.xsjs",
	   		        type: 'POST',
	   		        error: function (x, s, m) {
	   		            
	   		        },
	   		     success: function (res) {
 		        	//console.log(res);
 		        	var checkR;
 		        	if(res[0]){
 		        		checkR = checkRankingByNumberSurveys(res[0].NumberTakenSurveys);
 		        		self.NumberTakenSurveys(res[0].NumberTakenSurveys);
 		        	} 
 		        	else{
 		        		console.log("NO surv taken");
 		        		checkR = checkRankingByNumberSurveys(0);
 		        		self.NumberTakenSurveys(0);
 		        	}
		        		self.RankText(checkR.RankText);
		        		self.NextRankNumberRemaining(checkR.NextRankNumberRemaining);
		        		self.NextRankText(checkR.NextRankText);
		        		self.Percentage(checkR.Percentage);
		        		self.PercentagePixels(checkR.PercentagePixels);
		        		self.RankImage(checkR.RankImage);
 		        	r.resolve(res);
 		        	
 		        }
	   		    });    	
			return r;
    	}
    	
    };*/
    
//    self.GetColors = function(pageNumber){
////	   	 debugger;
//	   	var r = $.Deferred();
//	   		var params={};
//	   		
//	   		params.IdSurveyReports = self.IdSurveyReports();  		
//	   		params.PageGroup = surveyReports.Title();
//	   		params.PageNumber = pageNumber;
////	   			surveyReports.currentPageFilter() ? surveyReports.currentPageFilter()+1 : 1;
//	   		console.log('PageNumber: '+params.PageNumber);
////	   		params.ColorList = surveyReport.ColorList();
//	   		
//		   	$.ajax({
//		   	        dataType: "json",
//		   	        data: JSON.stringify(params),
//		   	        cache: false,
//		   	        crossDomain: true,
//		   	      	contentType: "application/json; charset=utf-8",
//		   	        url: urlString + "services/SurveyReportDefinitionAdminColor.xsjs?action=GetColor",
//		   	        type: 'POST',
//		   	        error: function (x, s, m) {
//		   	            
//		   	        },
//		   	        success: function (res) {
//		   	        	surveyReports.ColorList([]);
//		   	        	surveyReports.ColorList(res);
//		   	        	console.log("ColorList: "+surveyReports.ColorList());
//		   	        	r.resolve();
//		   	        }
//		   	    });
//	   		return r;
//	    };
//	    
//	    self.GetPageGroupTitle = function(pageNumber) {
////	    	debugger;
//	    	var r = $.Deferred();
//	    	
//		    var params={};
//		    
//			    params.IdSurveyReports = self.IdSurveyReports();  		
//				params.PageNumber = pageNumber;
////					surveyReports.currentPageFilter() ? surveyReports.currentPageFilter()+1 : 1;
//				console.log('PageNumber: '+params.PageNumber);
//		  			$.ajax({
//		  		        dataType: "json",
//		  		        data: JSON.stringify(params),
//		  		        cache: false,
//		  		        crossDomain: true,
//		  		        url: urlString + "services/GetPageGroupTitle.xsjs",
//		  		        type: 'POST',
//		  		        error: function (x, s, m) {
//		  		            
//		  		        },
//		  		     success: function (res) {
//			        	//console.log(res);
//			        	self.Title(res);
//			        	console.log('pred resolve');
//			        	r.resolve();
//			        	
//			        }
//	  		    });    	
//			return r;
//		};
	
};

var ReportResultOptions = function() {
	var self = this;
	self.OrgUnitsList = ko.observableArray();
	self.OrgUnitsListAssignedToMng = ko.observableArray();
	
	self.OrgUnit = ko.observable();
	
	self.ManagersList = ko.observableArray();
	self.SelectedManagerByBusiness = ko.observable();
	
	self.IndividualOrCumulative = ko.observable(undefined);
	self.SelectedOrgUnit = ko.observable();
	self.SelectedOrgUnitAssignedToMng = ko.observable();
	
	
	self.CumulativeManagersList = ko.observableArray();
	self.SelectedCumulativeManager=ko.observable();
	self.SelectedCumulativeManagerFullName=ko.observable();
	
	self.ResultsList=ko.observableArray([]);
	self.SelectedUsername=ko.observable();
	self.FullName=ko.observable();
	
	self.IdOrgStructure = ko.observable();
	//self.IsBusinessPartner = ko.observable();
	//self.IsManager = ko.observable(); (homeModelObject.IsManager());
	self.selectedTempMngByBP = ko.observable();
	
	self.SelectedManagerUserObject = ko.observableArray([]);
	self.ReportType = ko.observable();
	self.SelectedOrgUnitType = ko.observable();
	self.goingBack = ko.observable(0);
	self.goBackForBP = ko.observable(0);
	self.DemoFilter = ko.observable();
	self.DemoGroups = ko.observableArray([
		{ group: "Country", 'optionName':localizationViewModel.momentLocalizaton().country, FilterName: "filter_country" },
	    { group: "Division", 'optionName':localizationViewModel.momentLocalizaton().division, FilterName: "filter_division" },
	    { group: "Region", 'optionName':"Region", FilterName: "filter_region" },
	    { group: "Board Area", 'optionName':localizationViewModel.momentLocalizaton().board_area, FilterName: "filter_boardArea" }
	    ]);
	
	self.selectedGeoGroup = ko.observable();
	//self.isGeographicalFilterSelected = ko.observable();
	self.GeoGroupList = ko.observableArray();
	self.GeoGroupValue = ko.observable();
	self.CountryName = ko.observable();
	self.getDynamicOptionsCaption = ko.observable();
	
	self.dynamicChooseFilterLocalization = ko.observable();
	
	self.permTypeList1 = ko.observableArray();
	self.permTypeList2 = ko.observableArray();
	self.selectedPermType1 = ko.observable();
	self.selectedPermType2 = ko.observable();
	self.dateFrom = ko.observable(moment(new Date()).format('L'));
	self.dateUntil = ko.observable(moment(new Date()).format('L'));

	self.ManagerByBusinessPartnList  = ko.observableArray();
	self.selectedMngUsername = ko.observable();
	self.IsBusinessPartner = ko.computed(function() {
		return homeModelObject.IsBusinessPartner();
	});
	
	self.IsManager = ko.computed(function() {
		return homeModelObject.IsManager();
	});
	
	self.selectCumulativeManager = function() {
		self.SelectedCumulativeManagerFullName($("#ddl_CumulativeManagersList option:selected").text());
//			console.log($data.CumulativeManagerFullName)
	}
	self.getPermanentTypesForUser = function(){
		var params={};
		params.IdSurvey = parseInt(surveyReports.IdSurvey());
		params.Username = homeModelObject.Username();
		$.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/GetPermanentTypesForUser.xsjs?action=1", //?token="+encodeURIComponent(token),
	        type: 'POST',
	        error: function (x, s, m) {
	            
	        },
	        success: function (res) {
	        	
	        	console.log(res);
	        	self.permTypeList1(res);
//	        	if(res.length>0){
//	        		self.OrgUnit(res[0].OrgUnit);
//	        	}
//	        	else{
//	        		self.OrgUnit(""); //undefined //homeModelObject.StreetAddress1().substring(0, 8)
//	        	}	
	        }
	    }); 
		
	}
	self.getPermanentTypesForUser2 = function(){
		var params={};
		params.IdSurvey = parseInt(surveyReports.IdSurvey());
		params.Username = homeModelObject.Username();
		params.Type = reportResultOptions.selectedPermType1();
		$.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/GetPermanentTypesForUser.xsjs?action=2", //?token="+encodeURIComponent(token),
	        type: 'POST',
	        error: function (x, s, m) {
	            
	        },
	        success: function (res) {
	        	
	        	console.log(res);
	        	self.permTypeList2(res);
//	        	if(res.length>0){
//	        		self.OrgUnit(res[0].OrgUnit);
//	        	}
//	        	else{
//	        		self.OrgUnit(""); //undefined //homeModelObject.StreetAddress1().substring(0, 8)
//	        	}	
	        }
	    }); 
		
	}
	self.GetOrgUnit = function(IdSurveyParam, Username) {
		var r = $.Deferred();
		//var token = localStorage.getItem('t');
   	 	//if(token){
			var params={};
			params.IdSurvey = IdSurveyParam;
			params.Username = Username;
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetOrgUnitForManagerBySurvey.xsjs", //?token="+encodeURIComponent(token),
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res);
		        	if(res.length>0){
		        		self.OrgUnit(res[0].OrgUnit);
		        	}
		        	else{
		        		self.OrgUnit(""); //undefined //homeModelObject.StreetAddress1().substring(0, 8)
		        	}	
		        	
		        	r.resolve(res);
		        }
		    }); 
			 //GetOrgUnitForManagerBySurvey
		//}
		/*else{
			if(homeModelObject.StreetAddress1()!=="" && homeModelObject.StreetAddress1()!==undefined && homeModelObject.StreetAddress1()!==null){
				self.OrgUnit(homeModelObject.StreetAddress1().substring(0, 8)); 
			}
			
		}*/
   	 	return r;
	}
	
	self.IndividualOrCumulative.subscribe(function (newValue) {
	      console.log("newnewnew" + newValue);
	      if(newValue==2 && self.OrgUnitsList().length===0){
	    	  self.GetOrgUnitsList();
	      }
	      else if(newValue==4 && self.OrgUnitsListAssignedToMng().length===0){
	    	  self.GetOrgUnitsListAssignedToMng();
	      }else{
	    	  if(newValue==3 ){  /* && self.OrgUnitsList().length===0 */
		    	  self.GetCumulativeMngsList();
		      }
	    	  //self.OrgUnitsList([]);
	      }
	      
	});
	
	
	self.GetCumulativeMngsList= function(){
		if(self.SelectedManagerByBusiness()!==undefined){
			var params={};
			params.mmmUsername = self.SelectedManagerByBusiness();
			params.IdSurveyReports = surveyReports.IdSurveyReports();
			params.lang = getCookie("lang");
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetCumulativeManagersList.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res);
		        	
		        	self.CumulativeManagersList(res);
		        	
		        }
		    });  
		}else if(homeModelObject.IsManager()){
			var params={};
			params.mmmUsername = homeModelObject.Username();
			params.IdSurveyReports = surveyReports.IdSurveyReports();
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetCumulativeManagersListAdmin.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res);
		        	
		        	self.CumulativeManagersList(res);
		        	
		        }
		    }); 
		}
	};
	
	
	self.GetOrgUnitsListAssignedToMng = function(){
		var params = {};
		
		if(self.SelectedManagerByBusiness()!==undefined){
			params.ManagerUsername=self.SelectedManagerByBusiness();
			params.IdSurveyReports=surveyReports.IdSurveyReports();
//				params.IdOrgStructure=surveyReports.IdOrgStructure();
					
					$.ajax({
				        dataType: "json",
				        data: JSON.stringify(params),
				        cache: false,
				        crossDomain: true,
				        url: urlString + "services/GetOrgUnitsAssignedToMng.xsjs",
				        type: 'POST',
				        error: function (x, s, m) {
				            
				        },
				        success: function (res) {
				        		
				        	console.log(res);
				        	
				        	self.OrgUnitsListAssignedToMng(res);
				        	$("#ddl_OrgUnitsListAssignedToMng").selectmenu();
				    		$("#ddl_OrgUnitsListAssignedToMng").selectmenu("refresh");
				        	
				        }
				    }); 
		}
		else{
			params.ManagerUsername=homeModelObject.Username();
			params.IdSurveyReports=surveyReports.IdSurveyReports();
//				params.IdOrgStructure=surveyReports.IdOrgStructure();
					
					$.ajax({
				        dataType: "json",
				        data: JSON.stringify(params),
				        cache: false,
				        crossDomain: true,
				        url: urlString + "services/GetOrgUnitsAssignedToMng.xsjs",
				        type: 'POST',
				        error: function (x, s, m) {
				            
				        },
				        success: function (res) {
				        		
				        	console.log(res);
				        	
				        	self.OrgUnitsListAssignedToMng(res);
				        	$("#ddl_OrgUnitsListAssignedToMng").selectmenu();
				    		$("#ddl_OrgUnitsListAssignedToMng").selectmenu("refresh");
				        	
				        }
				    }); 
		}
		
		
		
		
	};
	
	
	
	self.GetOrgUnitsList = function(){
		var params = {},orgParam;
		
		if(self.SelectedManagerByBusiness()!==undefined){
			//self.GetManagerOrgByHR
			self.GetManagerOrgByHR().done(function(){
				orgParam = self.OrgUnit();
				if(self.OrgUnit()!==undefined){
					
					$.ajax({
				        dataType: "json",
				        data: JSON.stringify(params),
				        cache: false,
				        crossDomain: true,
				        url: urlString + "services/SurveyReportGetOrgUnits.xsjs?org=" + orgParam + "&IdOrgStructure="+self.IdOrgStructure(),
				        type: 'POST',
				        error: function (x, s, m) {
				            
				        },
				        success: function (res) {
				        	
				        	console.log(res);
				        	
				        	self.OrgUnitsList(res);
				        	
				        	$("#ddl_OrgUnitsList").selectmenu();
				    		$("#ddl_OrgUnitsList").selectmenu("refresh");
				        	
				        }
				    }); 
				}
			});
		}
		else{
			orgParam = homeModelObject.StreetAddress1().substring(0, 8);
			
			if(self.OrgUnit()!==undefined){
				
				$.ajax({
			        dataType: "json",
			        data: JSON.stringify(params),
			        cache: false,
			        crossDomain: true,
			        url: urlString + "services/SurveyReportGetOrgUnits.xsjs?org=" + orgParam + "&IdOrgStructure="+self.IdOrgStructure(),
			        type: 'POST',
			        error: function (x, s, m) {
			            
			        },
			        success: function (res) {
			        	
			        	console.log(res);
			        	
			        	self.OrgUnitsList(res);
			        	
			        	$("#ddl_OrgUnitsList").selectmenu();
			    		$("#ddl_OrgUnitsList").selectmenu("refresh");
			        	
			        }
			    }); 
			}
		}
		
		
		
		
	};
	
	self.GetManagerOrgByHR = function(){
		var r = $.Deferred();
		var params={};
		if(homeModelObject.IsBusinessPartner()){
			params.SearchParam = self.SelectedManagerByBusiness();
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetUserByUsername.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res[0]);
		        	
		        	self.OrgUnit(res[0].StreetAddress1.substring(0, 8));
		        	
		        	r.resolve(res);
		        }
		    }); 
		}
		
		return r;
	};
	
	self.GetManagersList = function(){
		console.log("//GetManagersByBusinessPartner.xsjs");
		var params={};
		if(homeModelObject.IsBusinessPartner()){
			params.BpUsername = homeModelObject.Username();
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetManagersByBusinessPartner.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res);
		        	
		        	self.ManagersList(res);
		        	
		        	reportResultOptions.SelectedManagerByBusiness(undefined);
		        	$("#ddl_managersList").selectmenu();
		        	$("#ddl_managersList").selectmenu("refresh");
		        	
		        }
		    }); 
		}
	};
	
	self.setManagerByBusiness = function($data){
		console.log($data);
		
		self.IndividualOrCumulative(undefined);
    	self.SelectedOrgUnit(undefined);
    	self.SelectedOrgUnitAssignedToMng(undefined);
    	
    	$('input[name=radio_results_options]').checkboxradio();
    	$('input[name=radio_results_options]').attr("checked", false);
    	$('input[name=radio_results_options]').checkboxradio("refresh");
    	
    	if(self.SelectedManagerByBusiness()!==undefined){
    		self.GetOrgUnitsList();
    		self.GetOrgUnitsListAssignedToMng();
    		 self.GetCumulativeMngsList();
    	}
    	
	};
	
	
	self.SearchManager=function(){		
			var params={};
			self.SelectedManagerByBusiness(undefined);
			params.SearchParam=$('#searchParamInput').val();
			params.BpUsername = homeModelObject.Username();
			jQuery.support.cors = true;	
			//reportResultOptions.isGeographicalFilterSelected(0);
			reportResultOptions.selectedGeoGroup(undefined);
			reportResultOptions.GeoGroupValue(undefined);
			if(reportResultOptions.selectedTempMngByBP()){
				reportResultOptions.selectedTempMngByBP(undefined);			
				$("#ManagerByBP > option").eq(0).prop('selected', true).change();
				reportResultOptions.selectedMngUsername(undefined);
				reportResultOptions.goBackForBP(0);
			}
			
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        async: true,
		        url: urlString + "services/SearchManagers.xsjs",
		        type: 'post', 
		        error: function (x, s, m) {
		        	homeModelObject.checkIfSessionExpired();
		            // //alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
		        },
		        beforeSend:function(){
		        	$('.loading').hide();
			    	//$('.loading').css("width","0");
		        },
		        /*afterSend:function(){
		        	$('.loading').hide();
			    	//$('.loading').css("width","100%");
		        },
		        complete: function (data) {
		        	$('.loading').hide();
		        	//$('.loading').css("width","100%");
		        },*/
		        success: function (res) {
		           self.ResultsList([]);
		           self.ResultsList(res);
		           if($('#searchParamInput').val()==""){ 
		        	   $("#content_survey_results_options1").hide();
		        	   self.ResultsList([]);
		        	   }else {
		        		   $("#content_survey_results_options1").show();
		        	   }  
		        }
		    }).always(function() {
				 $('.loading').hide();
			});	
			
		};
		
		self.ManagerByBusinessPartn=function() {
			 var params={};
			 params.Username = homeModelObject.Username();
//			 params.BpUsername = homeModelObject.Username();
			 params.IdSurveyReports = surveyReports.IdSurveyReports();
			 params.lang = getCookie("lang");
			$.ajax({
			       dataType: "json",
			       data: JSON.stringify(params),
			       cache: false,
			       crossDomain: true,
			       url: urlString + "services/GetListOfManagerByBusinessPartn.xsjs",
			       type: 'POST',
			       error: function (x, s, m) {
			           
			       },
			       success: function (res) {
//			    	   for(var i = 0; i < res.length; i++) {
//			    		   if(res[i].isCheckThreshold === 0) {
//			    			   if(getCookie("lang")){
//			    				   res[i].MngFullNameShow = res[i].MngFullNameShow + " " + localizationViewModel.momentLocalizaton().below_threshold;
//			    			   }
//			    		   } else {
//			    			   res[i].MngFullName;
//			    		   }
//			    		   self.ManagerByBusinessPartnList(res);			    				    	   
//			    		   console.log(self.ManagerByBusinessPartnList());
//			    	   }
			    	   self.ManagerByBusinessPartnList(res);			    				    	   
			       	}
			     });
		};

		
		 self.selectedMngUsername.subscribe(function(item){
//			 $('#searchParamInput').val(item.MngFullName);			
			 
			 console.log(item);
			 if(item!==undefined){
				 $("#content_survey_results_options1").show();

					 var obj={};
					 obj.Username=item.MngUsername;
					 obj.FullName=item.MngFullName;
					 obj.OptionIndex = $("#ManagerByBP option:selected").index();
					 reportResultOptions.selectedTempMngByBP(obj);
					 reportResultOptions.SelectUser(obj);				 			
			}else{
				 //$("#content_survey_results_options1").hide();
				 if(reportResultOptions.selectedTempMngByBP()!=undefined){
					 var tempMngObj = {};
					 tempMngObj.Username = reportResultOptions.selectedTempMngByBP().Username;
					 tempMngObj.FullName = reportResultOptions.selectedTempMngByBP().FullName;
					 tempMngObj.OptionIndex = reportResultOptions.selectedTempMngByBP().OptionIndex;
					 $("#content_survey_results_options1").show();
					 
					 $("#ManagerByBP > option").eq(tempMngObj.OptionIndex).prop('selected', true).change()
					 
					 reportResultOptions.SelectUser(tempMngObj);
										
				 }else{
					 $("#content_survey_results_options1").hide();
				 }
			}
		 });
		 
		self.SelectUser=function($data){			
			self.SelectedManagerByBusiness($data.Username);
			self.SelectedUsername($data.Username); 
			console.log($data);
			
			self.FullName($data.FullName);
			$('#searchParamInput').val($data.FullName);
			 self.ResultsList([]);
			 
		    
		    if(reportResultOptions.goBackForBP() == 1){
		    	//reportResultOptions.goBackForBP(0);
		    }else{		    			   
		    	self.IndividualOrCumulative(undefined);
		    	self.SelectedOrgUnit(undefined);
		    	self.SelectedOrgUnitAssignedToMng(undefined);

		    
		    	reportResultOptions.GetOrgUnit(surveyReports.IdSurvey(), $data.Username).done(function(){
		    		
		    		$('input[name=radio_results_options]').checkboxradio();
		    		$('input[name=radio_results_options]').attr("checked", false);
		    		$('input[name=radio_results_options]').checkboxradio("refresh");
		    		
		    		if(self.SelectedManagerByBusiness()!==undefined){
		    			//set OrgUnit by GetOrgUnit
		    			
		    			self.GetOrgUnitsList();
		    			self.GetOrgUnitsListAssignedToMng();
		    			self.GetCumulativeMngsList();
		    		}
		    		
		    		
		    	});		    	
		    }		    
		};				

	clearBackForBP = function(){
		reportResultOptions.goBackForBP(0);
	}	
		
	backToSurvey_results_options = function(){
		//debugger;
		reportResultOptions.goingBack(1);		
		if(reportResultOptions.selectedTempMngByBP()){
			reportResultOptions.goBackForBP(1);			
		}
		$.mobile.changePage($('#survey_results_options'), { allowSamePageTransition: true });		
				
	};
	
	
	self.GetSingleEmployee=function(){
		 self.ResultsList([]);
			if($("#searchParamInput").val()!=""){
				
					var params={};
					params.Username=self.SelectedUsername();
					console.log(params);
					
					$.ajax({
			            dataType: "json",
			            data: JSON.stringify(params),
			            cache: false,
			            crossDomain: true,
			            url: urlString + "services/GetSelectedUserDetails.xsjs",
			            type: 'POST',
			            error: function (x, s, m) {
			                
			            },
			            success: function (res) {
			            	searchedListView.UsersList.push(res[0]);
			            	console.log(searchedListView.UsersList());
			            	searchedListView.TotalUsersNo(searchedListView.UsersList().length);
			            	$('#searchParamInput').val("");
			            }
			        });
				
		}
	};
	
	
};

var ParticipationRateView = function () {
    var self = this;
    self.ClonesList = ko.observableArray();
    self.SelectedIdClone= ko.observable();
    self.SelectedIdSurvey= ko.observable();
    self.selectedChartType = ko.observable("Basic Column");
    self.selectedCriteria = ko.observable();
    self.selectedSubCriteria = ko.observable(0);
    self.ResultsList = ko.observableArray();
    self.SubResultsList = ko.observableArray([]);
   self.selectedCriteria.subscribe(function(newValue) {
	   self.selectedSubCriteria(0);
}); 
   	self.GlobalOrIndividual = ko.observable();  
   	self.CloneSurveyThresholdStatus = ko.observable();   	
   	self.selectedCloneSurveyTitle = ko.observable();
	self.selectedCloneSurveyThreshold = ko.observable();
	self.inDrilldown = ko.observable(0);
   	
   self.getClonesForSurvey = function() {
	   var r = $.Deferred();
	   var params={};
	   params.IdMasterSurvey=self.SelectedIdSurvey();
	   params.IdSurveyReports=surveyReports.IdSurveyReports();

		$.ajax({
				
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetSurveyReportsAdmin.xsjs?action=4",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        console.log(res);
		        self.ClonesList([]);
		        		self.ClonesList(res);
		        		
		        		r.resolve(res);
		        }
		    }); 
	   return r;
   }
   self.previewParticipationRateForClone = function($data) {
	   self.SelectedIdClone($data.IdSurvey);
	   self.selectedCloneSurveyTitle($data.Title);
	   $.mobile.changePage($('#preview_participation_rate'), { allowSamePageTransition: true });
	   console.log($data);
   }
   

   self.EmptyData = function() {
//	   self.SelectedIdSurvey(0);
	   self.SelectedIdClone(0);
	   //self.selectedChartType(0);
	   self.selectedChartType("Basic Column");
	   self.selectedCriteria(0);
	    self.selectedSubCriteria(0); 
	    self.ResultsList(0)
	    self.SubResultsList(0);
	    self.selectedCriteria(0);
	    self.GlobalOrIndividual(0);
	   
   }
   
    self.LoadResultDrawChart = function() {
    	$("#id_DivForChart").html('');

    	if(self.GlobalOrIndividual()==="simpleIndividual"){
    		//debugger;     		  		    	
    		
    		participationRateViewModel.selectedCriteria(undefined);
    		participationRateViewModel.selectedSubCriteria(undefined);
    		$("#id_Criteria").val("0");
    		$("#id_SubCriteria").val("0");
//    		$("#div_Criteria").hide();
//    		$("#div_subCriteria").hide();
    		var params={};
        	if(surveyReports.IsMultiSurveyReport()==1){
        		params.IdSurvey=self.SelectedIdClone();
        	}else{
            	params.IdSurvey=self.SelectedIdSurvey();
        	}
        	params.SelectedManagerUserName=undefined;
        	
        	if(homeModelObject.IsBusinessPartner() == 1){
        		if(reportResultOptions.SelectedCumulativeManager()){
        			params.SelectedManagerUserName = reportResultOptions.SelectedCumulativeManager();
        		}else{
        			params.SelectedManagerUserName = reportResultOptions.SelectedUsername();
        		}
        		//params.SelectedManagerUserName = reportResultOptions.SelectedUsername();   
        	}else{
        		if(homeModelObject.IsManager() == 1){
        			params.SelectedManagerUserName = homeModelObject.Username();
        		}else{
        			params.SelectedManagerUserName='';
        		}
        	}
        	
        	if(params.SelectedManagerUserName!=undefined){
        		$.ajax({
    				dataType : "json",
    				data : JSON.stringify(params),
    				cache : false,
    				crossDomain : true,
    				url : urlString + "services/IndividualParticipationRate.xsjs",
    				type : 'POST',
    				error : function(x, s, m) {

    				},
    				success : function(res) {
    					
    					   Highcharts.setOptions({
   					        colors: ['#D05353', '#7C98B3'],
//    					        #1c80d9
    					    });
    					
    					
    					
    		       		$("#id_DivForChart").highcharts({


    		       		 chart: {
    		       	        type: 'pie'
    		       	    },
    		       	    title: {
    		       	        text: ''
    		       	    },
    		       	   
    		       	    plotOptions: {
    		       	        series: {
    		       	            dataLabels: {
    		       	                enabled: true,
    		       	                format: '{point.name}: {point.y:.1f}%'
    		       	            }
    		       	        }
    		       	    },
    		       	 tooltip: {
    		       	        enabled: false
    		       	    },
    		       	  
    		       	    series: [{
    		       	        name: '',
    		       	        colorByPoint: true,
    		       	        data: [{
    		       	            name: 'Participated ',
    		       	            y: res.PERCENTAGEPARTIPATEDRATE,
    		       	       
    		       	        }, {
    		       	            name: 'Not-participated',
    		       	            y: (100-res.PERCENTAGEPARTIPATEDRATE),
    		       	         
    		       	        }]
    		       	    }]
    			       			
    			       	});
    						
    					
    					

    					
    				}
        		});
        		
        	}else{
        		$("#id_DivForChart").html("<br><br><br><span data-localize='localizationViewModel.momentLocalizaton().select_manager_participationRate'>Please select manager to preview individual participation rate!</span>");
        	}

    		
    		
    		
    		
    	}else{
//    		$("#div_Criteria").show();
    		
//    		if(!$("#div_Criteria").children().first().hasClass('ui-select')){
//    			$("#id_Criteria").selectmenu();
//    		}
//    		$("#div_Criteria").children().children().removeClass("ui-btn-up-c").addClass("ui-btn-up-d");    		
    	}
    	
    	if(self.selectedChartType()==='Pie'){
    		self.selectedSubCriteria('0');
    	}
    	
    	//if(self.selectedChartType()!=0 &&self.selectedCriteria()!=0){
    	if(self.selectedCriteria()!=0 && self.selectedCriteria()!=undefined){
        	var param={};
        	if(surveyReports.IsMultiSurveyReport()==1){
        		param.IdSurvey=self.SelectedIdClone();
        	}else{
            	param.IdSurvey=self.SelectedIdSurvey();
        	}
        	param.Criteria=self.selectedCriteria(); // criteria can be one of "Board Area", "Region" or "Role"
        	param.SubCriteria=self.selectedSubCriteria();
        	param.ChartType=self.selectedChartType();
        	param.GlobalOrIndividual = self.GlobalOrIndividual();
        	
        	//if the user is a business partner, get the username of the inputed manager in the search bar 
        	if(homeModelObject.IsBusinessPartner() == 1){
        		param.SelectedManagerUserName = reportResultOptions.SelectedUsername();        		
        	}else{
        		if(homeModelObject.IsManager() == 1){
        			param.SelectedManagerUserName = homeModelObject.Username();
        		}
        	}
        	console.log(param);
        	$.ajax({
				dataType : "json",
				data : JSON.stringify(param),
				cache : false,
				crossDomain : true,
				url : urlString + "services/ParticipationRatePerCriteria1.xsjs",
				type : 'POST',
				error : function(x, s, m) {

				},
				success : function(res) {
					self.ResultsList(res.data);
					self.SubResultsList(res.drilldown);
					Highcharts.setOptions({
	            		colors: "#1AA0DE,#F0AB00,#B41A84,#BDCE40,#502273,#EA6922,#014185,#CADFF6,#7E7E7E,#D4D4D4,#F0AB00,#B41A84,#1AA0DE,#BDCE40,#502273,#EA6922,#014185,#CADFF6,#7E7E7E,#D4D4D4,#F0AB00,#B41A84,#1AA0DE,#BDCE40,#502273,#EA6922,#014185,#CADFF6,#7E7E7E,#D4D4D4".split(",")
	                });
		        	if(self.selectedChartType()==='Pie'){
		        		/* draw pie chart */
		        		$("#id_DivForChart").highcharts({
		        	        chart: {
		        	            plotBackgroundColor: null,
		        	            plotBorderWidth: null,
		        	            plotShadow: false,
		        	            type: 'pie'
		        	        },
		        	        title: {
		        	            text: 'Participation Rate per '+self.selectedCriteria()
		        	        },
		        	        tooltip: {
		        	            pointFormat: '<b>{point.percentage:.1f}%</b>'
		        	        },
		        	        plotOptions: {
		        	            pie: {
		        	                allowPointSelect: true,
		        	                cursor: 'pointer',
		        	                dataLabels: {
		        	                    enabled: true,
		        	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		        	                    style: {
		        	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		        	                    }
		        	                }
		        	            }
		        	        },
		        	        series: [{
		        	            name: self.selectedCriteria(),
		        	            colorByPoint: true,
		        	            data: self.ResultsList()
		        	        }]
		        	    });
		        	    /* end draw pie chart */
		        		
		        	}else if(self.selectedChartType()==='Basic Column'){
		        		

		        		
		        		/* draw basic column chart */
		        		$('#id_DivForChart').highcharts({
		        	        chart: {
		        	            type: 'column',
		        	            events: {
		        	            	// disable drilldown click functions (on columns and x-axis labels) 
		        	            	// for categories that are below threshold
		        	            	load: function(e) {		        	            		

		        	            		if(participationRateViewModel.selectedSubCriteria() == 0){
		        	            			participationRateViewModel.inDrilldown(0); 
		        	            		}
		        	            		
		        	            		$.each($(".highcharts-drilldown-data-label"), function(i,v) {		        	            			   	        	            				
		        	            			if($(v).text() == "below threshold"){
	        	            			       $('.highcharts-drilldown-axis-label')[i].onclick = null;
	        	            			       
	        	            			       // Show data labels in vertical direction	        	            			       
//	        	            			       var posX = parseInt($(this).attr("transform").match(/-?[\d\.]+/g)[0]) + 33;
//	        	            			       var posY = parseInt($(this).attr("transform").match(/-?[\d\.]+/g)[1]) + 17;
//	        	            			       var posValue = "translate(" + posX + "," + posY + ")";
//	        	            			       $(this).attr("transform",posValue);
//	        	            			       $(this).children().first().css("-ms-transform","rotate(-90deg)");
//	        	            			       $(this).children().first().css("transform","rotate(-90deg)");
	        	            			    }
	        	            			 });		        	            		 
		        	                 },		        	                 
		        	                 redraw: function() {
		        	                	 $.each($(".highcharts-drilldown-data-label"), function(i,v) {		        	            						        	            			    		        	                		
	        	            				if($(v).text() == "below threshold"){
	        	            			       $('.highcharts-drilldown-axis-label')[i].onclick = null;
	        	            			       
	        	            			       // Show data labels in vertical direction
//	        	            			       var posX = parseInt($(this).attr("transform").match(/-?[\d\.]+/g)[0]) + 33;
//	        	            			       var posY = parseInt($(this).attr("transform").match(/-?[\d\.]+/g)[1]) + 17;
//	        	            			       var posValue = "translate(" + posX + "," + posY + ")";
//	        	            			       $(this).attr("transform",posValue);
//	        	            			       $(this).children().first().css("-ms-transform","rotate(-90deg)");
//	        	            			       $(this).children().first().css("transform","rotate(-90deg)");
	        	            			    }
		        	            		});	
		        	                 },		        	                 
		        	                 drilldown: function(e){	
		        	                	 if(parseInt(participationRateViewModel.selectedSubCriteria()) != 0){
			        	                	 if(e.point.dataLabel.element.textContent == "below threshold"){
			        	                		 return false;
			        	                	 }else{
			        	                			 participationRateViewModel.inDrilldown(1);		        	                			
			        	                	 }
		        	                	 }
		        	                	 else
		        	                		 return false;
		        	                 },
		        	                 drillup: function(e) {
		        	                	 participationRateViewModel.inDrilldown(0);
		        	                 }
		        	            }
		        	        },
		        	        title: {
		        	            text: 'Participation Rate per '+self.selectedCriteria()
		        	        },
		        	        subtitle: {
		        	            text: 'Choose sub criteria then click one of the columns to preview Participation Rate per selected sub criteria.'
		        	        },
		        	        xAxis: {
		        	            type: 'category'
		        	        },
		        	        yAxis: {
		        	            title: {
		        	                text: 'The number of participants'
		        	            }
		        	        },
		        	        legend: {
		        	            enabled: false
		        	        },
		        	        plotOptions: {
		        	            series: {
		        	                borderWidth: 0,
		        	                dataLabels: {
		        	                    enabled: true,		        	                    
		        	                    style: {
		                                    textShadow: false	                                    	
		        	                    },		        	                    
//		        	                    format: '{point.y} participants'
		        	                    
		        	                    formatter: function () {
		        	                    	
		        	                    	if(participationRateViewModel.inDrilldown() == 0){		        	                    		
		        	                    		// working
		        	                    		if(this.point.total===undefined){
		        	                    			return this.point.y+ ' / '+this.point.series.userOptions.data[this.point.x][2]+' participants <br/>('+this.point.series.userOptions.data[this.point.x][3]+'%)';
		        	                    		}else{
		        	                    			if(this.point.y < participationRateViewModel.selectedCloneSurveyThreshold()){		        	                    				
		        	                    				return "below <br/>" + "threshold";
		        	                    			}else{
		        	                    				return this.point.y+ ' / '+this.point.total+' participants <br/>('+this.point.percentage+'%)';			                            			 
		        	                    			}   
		        	                    		}
		        	                    	}else{
		        	                    		if(this.series.options.data[this.point.index][3]===undefined){
		        	                    			return this.series.options.data[this.point.index][1]+ ' / '+this.point.series.userOptions.data[this.point.x][2]+' participants <br/>('+this.point.series.userOptions.data[this.point.x][3]+'%)';
		        	                    		}else{
		        	                    			if(this.series.options.data[this.point.index][1] < participationRateViewModel.selectedCloneSurveyThreshold()){
		        	                    				return "below <br/>" + "threshold";
		        	                    			}else{
		        	                    				return this.series.options.data[this.point.index][1] + ' / '+this.series.options.data[this.point.index][2]+' participants <br/>('+this.series.options.data[this.point.index][3]+'%)';			                            			 
		        	                    			}   
		        	                    		}		        	                    		
		        	                    	}	                            		     	                            		     
	                            		 }
		        	                }		        	                
		        	            }		        	           
		        	        },

		        	        tooltip: {
		        	            headerFormat: '',
//		        	            pointFormat: '<span style="color:{point.color}">{point.name}</span>:<br><b>{point.y}</b> participants<br/>'
		        	        	formatter: function () {
	        	                    if(this.point.dataLabel.element.textContent == "below threshold"){
	        	                    	return false;
	        	                    }else{
	        	                    	var s = '<span style="color:'+this.point.color+'">'+this.point.name+'</span>:<br><b>'+this.point.y+'</b> / ';
	        	                    	if(this.point.total===undefined){
	        	                    		s+= this.point.series.userOptions.data[this.point.x][2]+' participants ('+this.point.series.userOptions.data[this.point.x][3]+'%)';
	        	                    	}else{
	        	                    		s+= this.point.total+' participants ('+this.point.percentage+'%)';                       		    			
	        	                    	}	        	                    	
	        	                    	return s;	        	                    	
	        	                    }
	        	                } 	
		        	        },

		        	        series: [{
		        	            name: self.selectedCriteria(),
		        	            colorByPoint: true,
		        	            data: self.ResultsList()
		        	        }] ,
		        	        drilldown: {
		        	            series: self.SubResultsList()
		        	        } 
		        	    });
		        	}

				}
			});
        	
        	
    	}
    };
};

var EngagePulseSurveys = function(){
	var self = this;
	self.pulseSurveysList = ko.observableArray();
	self.isPulseSurvey = ko.observable(0);	
	
	self.getPulseSurveysList = function(){
		var r = $.Deferred();
		var params = {};
		params.Username = homeModelObject.Username();
		params.lang=getCookie("lang");
		$.ajax({
			dataType: "json",
			data: JSON.stringify(params),
			cache: false,
			crossDomain: true,
			url: urlString + "services/getPulseSurveys.xsjs",
			type: 'POST',
			error: function (x, s, m) {},
			success: function (res) {
				self.pulseSurveysList(res);
				r.resolve(res);
			}
		});
		
		return r;
	}
	
	self.goToPulseSurvey = function($data) {
    	homeModelObject.checkIfSessionExpired().done(function(data){	
			if(homeModelObject.IsLoggedIn()){
				engagePulseSurveys.isPulseSurvey(1);
				goToPulseSurveyRedirect($data.IdSurvey);
						
			}else{
				window.onbeforeunload = null;
			}
		});
    };
    
    self.goBackToPulseSurveyList = function(){
    	var msg = "You're about to return to the surveys list! Any filled survey data will be lost!";
    	if (confirm(msg)){
    		$.mobile.changePage($('#engage'), { allowSamePageTransition: true });
    		currentQuestionObject.IdQuestionType(undefined);
    	}
    };
};


navigateToReport = function(){
//	debugger;

	homeModelObject.checkIfSessionExpired().done(function(data){	
		if(homeModelObject.IsLoggedIn()){
			$('.loading').fadeIn();
//			surveyReports.GetPageGroupTitle(1).done(function(){
//				surveyReports.GetColors(1).done(function(){
			
					if((reportResultOptions.SelectedOrgUnit()!=="" || reportResultOptions.SelectedOrgUnitAssignedToMng()!=="") && reportResultOptions.IndividualOrCumulative()!=undefined){
						console.log("navigate > ");
						if(reportResultOptions.IndividualOrCumulative()==1){
							surveyReports.SurveyReportsWhereClause(homeModelObject.Username());
							surveyReports.GetSurveyReportsWhereClause();
						}
						else if(reportResultOptions.IndividualOrCumulative()==2||reportResultOptions.IndividualOrCumulative()==4){
				
							surveyReports.GetSurveyReportsWhereClause();
						}else if(reportResultOptions.IndividualOrCumulative()==3){
							surveyReports.SurveyReportsWhereClause(reportResultOptions.SelectedCumulativeManager());
							surveyReports.GetSurveyReportsWhereClause();
						}
					}
//				});			
//			});
	
					
		}
	});
	
	
	$('.loading').fadeIn();
//	surveyReports.GetPageGroupTitle(1).done(function(){
//		surveyReports.GetColors(1).done(function(){
			if((reportResultOptions.SelectedOrgUnit()!=="" || reportResultOptions.SelectedOrgUnitAssignedToMng()!=="")  && reportResultOptions.IndividualOrCumulative()!=undefined){
				console.log("navigate > ");
				if(reportResultOptions.IndividualOrCumulative()==1){
					surveyReports.SurveyReportsWhereClause(homeModelObject.Username());
					surveyReports.GetSurveyReportsWhereClause();
				}
				else if(reportResultOptions.IndividualOrCumulative()==2||reportResultOptions.IndividualOrCumulative()==4){
		
					surveyReports.GetSurveyReportsWhereClause();
				}else if(reportResultOptions.IndividualOrCumulative()==3){
					surveyReports.SurveyReportsWhereClause(reportResultOptions.SelectedCumulativeManager());
					surveyReports.GetSurveyReportsWhereClause();
				}
			}
			if(reportResultOptions.selectedGeoGroup() && reportResultOptions.GeoGroupValue()){
				surveyReports.GetSurveyReportsWhereClause();
			}
//		});			
//	});
};

SetIndividualOrCumulative = function(value) {
	reportResultOptions.IndividualOrCumulative(parseInt(value));
	reportResultOptions.ReportType(parseInt(value));
	console.log(value);
	if(value==2){
		$("#ddl_OrgUnitsList").selectmenu();
//		$("#ddl_OrgUnitsList").selectmenu('refresh');
		if(reportResultOptions.SelectedManagerByBusiness()!==undefined){
			reportResultOptions.GetOrgUnitsList();
    	}
	}else{
		reportResultOptions.SelectedOrgUnit(undefined);
	}
	if(value==4){
		$("#ddl_OrgUnitsListAssignedToMng").selectmenu();
//		$("#ddl_OrgUnitsList").selectmenu('refresh');
		if(reportResultOptions.SelectedManagerByBusiness()!==undefined){
			reportResultOptions.GetOrgUnitsListAssignedToMng();
    	}
	}else{
		reportResultOptions.SelectedOrgUnitAssignedToMng(undefined);
	}
	if(value==3){
		$("#ddl_CumulativeManagersList").selectmenu();
//		$("#ddl_CumulativeManagersList").selectmenu('refresh');
		if(reportResultOptions.SelectedManagerByBusiness()!==undefined){
			//reportResultOptions.GetOrgUnitsList();
    	}
	}else{
		reportResultOptions.SelectedCumulativeManager(undefined);
	}	
};


self.getDataForBPManagersByGeoGroup = function(){	
	
	if(reportResultOptions.selectedGeoGroup()){		
		var params = {};
		params.selectedGeoGroup = reportResultOptions.selectedGeoGroup();		
		params.isBusinessPartner = homeModelObject.IsBusinessPartner();
		
		$("#ddl_geoDataByGroupList").selectmenu();
		$("#ddl_geoDataByGroupList").selectmenu("refresh");
		
		//if(homeModelObject.IsBusinessPartner()==false && homeModelObject.IsManager()){			
		if(homeModelObject.IsBusinessPartner()==false){			
			switch (params.selectedGeoGroup) {
			case "Country":
				reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_country);
				reportResultOptions.GeoGroupValue(homeModelObject.IdCountry());
				break;
			case "Division":
				reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_division);
				reportResultOptions.GeoGroupValue(homeModelObject.Company());
				break;
			case "Region":
				reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_region);
				reportResultOptions.GeoGroupValue(homeModelObject.Region());
				break;
			case "Board Area":
				reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_boardArea);
				reportResultOptions.GeoGroupValue(homeModelObject.BoardArea());
				break;
			}
		}
					
		switch (params.selectedGeoGroup) {
		case "Country":
			reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_country);
			
			break;
		case "Division":
			reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_division);
			break;
		case "Region":
			reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_region);
			break;
		case "Board Area":
			reportResultOptions.getDynamicOptionsCaption(localizationViewModel.momentLocalizaton().select_boardArea);
			break;
		}
	
		
		if(homeModelObject.IsBusinessPartner()){
			$.ajax({
				dataType: "json",
				data: JSON.stringify(params),
				cache: false,
				crossDomain: true,
				url: urlString + "services/getDataForBPManagersByGeoGroup.xsjs",
				type: 'POST',
				error: function (x, s, m) {},
				success: function (res) {
					reportResultOptions.GeoGroupList([]);
					reportResultOptions.GeoGroupList(res); 	        		        	
	        		
	        		$("#ddl_geoDataByGroupList").selectmenu();
	        		$("#ddl_geoDataByGroupList").selectmenu("refresh");        		
				}
			});	
		}
	}
}


clearFlagsForMngTab = function(){
	
	reportResultOptions.IndividualOrCumulative(undefined);
	reportResultOptions.SelectedCumulativeManager(undefined);
	reportResultOptions.SelectedManagerByBusiness(undefined);
	reportResultOptions.SelectedOrgUnit(undefined);
	reportResultOptions.SelectedOrgUnitAssignedToMng(undefined);
	
	reportResultOptions.SelectedUsername(undefined);
	$("#searchParamInput").val(undefined);
	reportResultOptions.selectedTempMngByBP(undefined);
	reportResultOptions.selectedMngUsername(undefined);
	$("#ManagerByBP").eq(0).prop('selected', true).change();
	$('input[name=radio_results_options]').checkboxradio();
	$('input[name=radio_results_options]').attr("checked", false);
	$('input[name=radio_results_options]').checkboxradio('refresh');
	$("#mngFullName_or_OrgUnit").html("");
};

clearFlagsForGeoTab = function(){
	
	reportResultOptions.GeoGroupValue(undefined);
	reportResultOptions.selectedGeoGroup(undefined);
	$("#ddl_geoGroupList").val(undefined).change();
	reportResultOptions.CountryName(undefined);
	$("#mngFullName_or_OrgUnit").html("");
};


displayTabContent = function(item) {	
	var mngContent = $("#ManagersContent");
	var geoContent = $("#GeoContent");
	
	if(!$(item).hasClass("lb_clicked")) {
		$(".ov_lb").removeClass("lb_clicked");
		$(item).addClass("lb_clicked");
		//if($(item).text()=="Choose Managers" || $(item).text()=="Choose Option" || $(item).text()=="View Report") {
		if(item.id=="ChooseManagersTabBtn" || item.id=="ChooseOptionTabBtn" || item.id=="ViewOtherTabBtn") {
			clearFlagsForGeoTab();
			geoContent.hide();
			mngContent.show();
		} else {
			clearFlagsForMngTab();
			geoContent.show();
			mngContent.hide();
		}			
	}
	if(item.id=="GeographicBtn"){
			reportResultOptions.dynamicChooseFilterLocalization(localizationViewModel.momentLocalizaton().choose_filter);
			$("#ddl_geoGroupList option").eq(0).prop("selected","true").change();
	}
};


displayOtherReportResults = function(){
	$('.loading').fadeIn();
	//reset geo tab when previewing results for other survey type
	reportResultOptions.GeoGroupValue(undefined);
	reportResultOptions.selectedGeoGroup(undefined);
	$("#ddl_geoGroupList").selectmenu("refresh");
	$("#GeoContent").css("display","none");
	$("#GeographicBtn").removeClass("lb_clicked");
		surveyReports.GetCurrentChartData(surveyReports.IdSurveyReports(),surveyReports.IsMultiSurveyReport()).done(function(){
		if(surveyReports.CurrentChartData().TresholdCheck()==1){
			$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });			
		//	$("#mngFullName_or_OrgUnit").html("");
		}
		else{
			$.mobile.changePage($('#chart_results'), { allowSamePageTransition: true });
			//$("#mngFullName_or_OrgUnit").html("");
			if(surveyReports.IsMultiSurveyReport()==1){
				$("#full_container_results").html("<p>Total number of answers for all surveys are below surveys threshold.</p>");
			}else{
				$("#full_container_results").html("<p>Total number of answers is below survey threshold  of "+surveyReports.CurrentChartData().TresholdValue()+" answers.</p>");
	
			}		            		
		}		
	});
};

checkTextChange = function(idto){
	ResetValidation();
	var imaCantSay=false;
	console.log(idto);
	if ($('#message_txt_area_' + idto.replace("cantSayCheckBoxText_", "")).val().length > 1 && $("#" + idto).is(":checked")) {
		var str = '';
		if (getCookie("lang") == 'de') {
			str = "Ihre Eingaben werden verloren gehen, wollen Sie vorgehen?";
		} else if (getCookie("lang") == 'fr'){
			str = "Votre contribution sera perdue, voulez-vous procéder?";
		} else {
			str = "Your input will be lost, do you want to proceed?";
		}

		if (confirm(str)) {
			imaCantSay = false;
		} else {
			$("#" + idto).attr("checked", false).checkboxradio("refresh");
			return false;
		}

	}
	if(!imaCantSay){
		if(currentQuestionObject.PageQuestions().length>0){
			
			$.each(currentQuestionObject.PageQuestions(), function(index, value) {
				if (idto.indexOf(value.IdSurveyQuestions()) >= 0){
					if(!value.AllowCantSayValue()){ 
						$(".DIVmessage_txt_area_"+idto).addClass("message_txt_area_inactive");
						value.AllowCantSayValue(true);
						return;
					}
					else{
						$(".DIVmessage_txt_area_"+idto).removeClass("message_txt_area_inactive");
						value.AllowCantSayValue(false);
						return;
					}
				}		
			});
		}
		else{
			if($("#"+idto).is(":checked")){
				currentQuestionObject.AllowCantSayValue(true);
				$(".DIVmessage_txt_area_"+idto).addClass("message_txt_area_inactive");
			}
			else{
				$(".DIVmessage_txt_area_"+idto).removeClass("message_txt_area_inactive");
				currentQuestionObject.AllowCantSayValue(false);
			}
		}
	}
	
	
};

function getParameterByName(name) {
	url = window.location.href;
	console.log("url: "+url);
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	console.log("name: "+name);
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(url);
	console.log("regex: "+regex);
	console.log("results: "+results);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function stripQueryString() {
	var url1 = url;
	var start = url.slice(0, url.indexOf("?"));
	console.log("start: "+start);
	var end = url1.slice(url.indexOf("#"),url.length);
	console.log("end: "+end);
	var join = start+end;
	  return join;
	};

function stripQueryStringAndHash() {
	  return url.split("?")[0].split("#")[0];
	};

var CheckIfSelectedParticipants = function(){
//	debugger;
	if(homeModelObject.Username()){
	 var resultObj = {};
	 var params={};
	 params.IdSurvey = parseInt(getCookie('ids'));
	 params.Username = homeModelObject.Username();
		$.ajax({
	        dataType: "json",
	        data: JSON.stringify(params),
	        cache: false,
	        crossDomain: true,
	        url: urlString + "services/CheckIfSelectedParticipants.xsjs",
	        type: 'POST',
	        error: function (x, s, m) {
	            
	        },
	        success: function (res) {
//	        	console.log("User partcipated IdSurvey: " + res.IdSurvey);
	        	resultObj.IdSurvey = res.IdSurvey;
	        	resultObj.Username = res.Username;
	        	resultObj.OwnerUsername = res.OwnerUsername;
	        	resultObj.FirstName = res.FirstName;
	        	resultObj.LastName = res.LastName;
	        	resultObj.Email = res.Email;
//	        	console.log("User partcipated Username: " + res.Username);
	        	
	        	if(res.Username){
	        		surveysForUserObject.IdSurvey(res.IdSurvey);
	        		surveysForUserObject.GetActiveSurveysForUser().done(function(){
	        		var idSurvey = false;
//	        		console.log("res IdSurvey: " + res.IdSurvey);
	        		for(var i = 0; i < surveysForUserObject.currentActiveSurveysList().length; i++){
//	        			console.log("for IdSurvey: " + surveysForUserObject.currentActiveSurveysList()[i].IdSurvey);
	        			if(res.IdSurvey == surveysForUserObject.currentActiveSurveysList()[i].IdSurvey){
	        				goToSurveyRedirect(res.IdSurvey);
	        				idSurvey = true;
	        			}
	        		}
	        		if(idSurvey == false){

	        				
	        				if (getCookie("lang") == 'de') {
	        					str = "Alle deine Antworten werden gespeichert, außer jene auf der aktuellen Seite. Willst du fortsetzen?";
	        				} else if(getCookie("lang") == 'fr') {
	        					alert("'enquête est terminée ou vous avez déjà participé à la.");	        				
		        			}else {
		        				alert("The survey has finished or you have already participated in it.");	        				
		        			}
	        		  }
	        		})
	        	} else {
	        		alert("You are not in the participant list for the current survey. For additional information please contact the owner of the survey "+resultObj.FirstName+" "+resultObj.LastName+" ("+resultObj.OwnerUsername+") at "+resultObj.Email+".");
//	        		location.assign(stripQueryStringAndHash());
	        	}	
	        	deleteCookie('ids');
//	        	sessionStorage.removeItem('ids');
	        }
   }); 
	}else{
		homeModelObject.getUserHomeInfo();
	};
};


var setSurveySessionStorage = function(){
	if(getParameterByName("ids")){
		document.cookie = "ids="+getParameterByName("ids");
//		sessionStorage.setItem('ids',getParameterByName("ids"));
	}else if(getParameterByName("idMaster")){
		document.cookie = "idMaster="+getParameterByName("idMaster");

	}
	location.assign(stripQueryStringAndHash());
};

function GetIdOrgStructure(idSurvey, isMultiSurveyReport, idSurveyReports){
	var params = {};
	
	 params.IdSurvey = idSurvey;
	 params.IdSurveyReports = idSurveyReports;
	 params.IsMultiSurveyReport = isMultiSurveyReport;
	 console.log("params IdSurvey: "+params.IdSurvey);
	 console.log("params IsMultiSurveyReport: "+params.IsMultiSurveyReport);
	 console.log("params IdSurveyReports: "+params.IdSurveyReports);
	 
	   $.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/GetIdOrgStructure.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	
		        	console.log(res);
		        	surveyReports.IdOrgStructure(res);
		        	reportResultOptions.IdOrgStructure(res);
		        }
	   });
 };

 function showDescription() {
		var userAgent = window.navigator.userAgent;
		if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {   
			$('.container_desc').on('touchstart', function(){ //touchend
				
				var a = $(this).attr('name');
				
				$('#Desc_'+a).toggleClass('desc_show').toggleClass('desc_hide');	
				
			});
			$('.container_desc').on('touchend', function(){
				
				var a = $(this).attr('name');
				
				$('#Desc_'+a).toggleClass('desc_hide').toggleClass('desc_show');
//				$('#Desc_'+a);
			});
		}
		else{
			$('.container_desc').mouseenter(function(){
				
				var a = $(this).attr('name');
				
				$('#Desc_'+a).toggleClass('desc_show').toggleClass('desc_hide');	
//				$('#Desc_'+a)
			}).mouseleave(function(){
				
				var a = $(this).attr('name');
				
				$('#Desc_'+a).toggleClass('desc_hide').toggleClass('desc_show');
//				$('#Desc_'+a);
			});
		}
		
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 
function autosize(valval) {
//	$("textarea").on('change keyup paste drop', function() {
		var el = valval;
		  setTimeout(function(){
//			  controlResize = el.scrollHeight-82;
				el.style.cssText = 'min-height:150px';
				el.style.cssText = 'max-height:4500px';
			    el.style.cssText = 'height:auto;';	 
			    el.style.cssText = 'height:' + el.scrollHeight + 'px';
			    if($('textarea').val()==""){
			    	//el.style.cssText = 'height:150px';
			    	el.style.cssText = 'height:' + el.scrollHeight + 'px';
			    }
		},0);
//	});
}

// VALIDATION ************

var Fields = function(){
	var fields = [];
	
	if(currentQuestionObject.IsPage()=="1"){
		for(var i = 0; i < currentQuestionObject.PageQuestions().length; i++){
			if(currentQuestionObject.PageQuestions()[i].QuestionOptions().length > 0){
				fields.push("#feedback_rating_options_"+currentQuestionObject.PageQuestions()[i].QuestionOptions()[0].IdSurveyQuestions());
			} else {
				fields.push("#message_txt_area_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions());
			}
		}
	} else {
		if(currentQuestionObject.QuestionOptions().length > 0){
			fields.push("#feedback_rating_options_"+currentQuestionObject.QuestionOptions()[0].IdSurveyQuestions());	
		} else {
			fields.push("#message_txt_area_"+currentQuestionObject.IdSurveyQuestions());
		}
	}
	return fields;
}

var applyCall = function(func,arr){
	if($.isArray(arr)){
	for(var i = 0; i < arr.length; i++){
	func(arr[i]);
		}
	}
}
	
	var Validation = function(){
		var first = true;
		var result = true;
		var accessibility = location.pathname.indexOf('index_accessibility');
		
		if(currentQuestionObject.IsPage()=="1"){
			for(var i = 0; i < currentQuestionObject.PageQuestions().length; i++){
				
				
				if(currentQuestionObject.PageQuestions()[i].IdQuestionType() === "7" && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0" && (currentQuestionObject.PageQuestions()[i].NumericAnswerForMulti().length < currentQuestionObject.PageQuestions()[i].HowManyDropdowns())){
					$("#survey_page").find("#feedback_datapicker_options_" + currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css({border:"2px solid #a94442", padding:"0 15px"});
				}
				
				if(currentQuestionObject.PageQuestions()[i].IdQuestionType() !== "6" && currentQuestionObject.AllowCantSay()==="0" && !currentQuestionObject.PageQuestions()[i].NumericAnswer() && (currentQuestionObject.PageQuestions()[i].NumericAnswerForMulti().length==0 && currentQuestionObject.PageQuestions()[i].AllowCantSayValue()===false)){
					$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border","2px solid #a94442");
					if(accessibility > 0 && first){
						$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).prev().children().focus();
						first = false;
					}
				}
				else if(currentQuestionObject.PageQuestions()[i].IdQuestionType() !== "6" && currentQuestionObject.AllowCantSay()==="1" && (!currentQuestionObject.PageQuestions()[i].NumericAnswer() && currentQuestionObject.PageQuestions()[i].AllowCantSayValue()===false) && (currentQuestionObject.PageQuestions()[i].NumericAnswerForMulti().length==0 && currentQuestionObject.PageQuestions()[i].AllowCantSayValue()===false)){
					$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border","2px solid #a94442");
					if(accessibility > 0 && first){
						$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).prev().children().focus();
						first = false;
					}
				}
//				else if(currentQuestionObject.PageQuestions()[i].IdQuestionType() !== "6" && currentQuestionObject.AllowCantSay()==="0" && currentQuestionObject.PageQuestions()[i].NumericAnswer()) {
//					$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border","none");
//					$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border-bottom", "1px solid #DADADA");
//					if(accessibility > 0 && first){
//						$("#photo_question_cont_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).children().focus();
//						first = false;
//					}
//				} 
				else if(currentQuestionObject.PageQuestions()[i].IdQuestionType() === "6" && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0" && !currentQuestionObject.PageQuestions()[i].NumericAnswer()){
					var res = '#message_txt_area_'+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions();
					var text = $(res).text();
					var placeholder = $(res).attr('placeholder');
//					console.log("text before: "+text);
//					console.log("placeholder: "+placeholder);
					if(text === placeholder){
						text = "";
					} else {
						text = $(res).text();
					}
					if( ((!$(res).val() && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0") || ($(res).val() === "" && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0")) && ((!text && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0") || (text === "" && currentQuestionObject.PageQuestions()[i].AllowCantSay()==="0"))){
					$('#message_txt_area_box_'+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border","2px solid #a94442");
					if(accessibility > 0 && first){
						$("#message_txt_area_"+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).parent().prev().prev().children().focus();
						first = false;
					}
					result = false;
					}
				}
			}
		} 
		return result;
}
	
	var ResetValidation = function(){
		var fields = [];

		fields = Fields();

//		if(currentQuestionObject.IsPage()=="1"){
//			for(var i = 0; i < currentQuestionObject.PageQuestions().length; i++){
		var reset = function(fields){
			
			var name;
			var id;
			name = fields.slice(25);
			
			if(!$("[name='textarea-1']")[0] && currentQuestionObject.AllowCantSay()==="1"){
				id = fields.slice(18);
					$('#message_txt_area_box_'+id).css("border","1px solid #CCCACA");
//					$(fields).parent().parent().prev().children().first().trigger('click');
					

				} 
//				else if(currentQuestionObject.PageQuestions()[i].IdQuestionType() === "1" && currentQuestionObject.AllowCantSay()==="1"){
//					$('#message_txt_area_box_'+currentQuestionObject.PageQuestions()[i].IdSurveyQuestions()).css("border","none");
////					$(this).parent().parent().prev().children().children().first().trigger('click');
//				}
//				else if(currentQuestionObject.PageQuestions()[i].IdQuestionType() !== "6" && currentQuestionObject.AllowCantSay()==="1"){
					$("[name='"+name+"']").on("click focus", function(){

//						console.log("name in: "+name);
						$("#photo_question_cont_"+name).css("border","none");
//						$("#photo_question_cont_"+name).css("border-bottom", "1px solid #DADADA");
					})
//				}
					$(fields).on('keydown', function(r){
						if(!r.shiftKey && r.keyCode !== 9){
							id = fields.slice(18);
							// text area
							if(!$("[name='textarea-1']")[0]){
								if(location.pathname.indexOf('index_accessibility')>0){
									$('#message_txt_area_box_'+id).css("border","none");
								}else{
									$('#message_txt_area_box_'+id).css("border","1px solid #CCCACA");
								}
							// simple text area
							} else if($("[name='textarea-1']")[0]){
								$('#message_txt_area_box_'+id).css("border","1px solid #CCCACA");
							}
						}
					})

				}
			
		applyCall(reset,fields);
			
	};
			
// END VALIDATION ************	
	
	var GetReader = function(){
		var r = $.Deferred();
		 var params={};
		 params.action=1;
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/AccessibilityReader.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        	console.log("res: "+res);
		        	homeModelObject.ScreenReader(res);
		        	if(homeModelObject.IsAccessibility()){
		        		if(location.hash === "#account_settings"){
				        	if(homeModelObject.ScreenReader() === 1){
				        		$('#accessibility_reader1').prop('checked','true');
				        		$('#accessibility_reader1').attr('aria-checked','true');
				        		$('#accessibility_reader1').next().children().children().eq(1).removeClass('ui-icon-radio-off');
				    			$('#accessibility_reader1').next().children().children().eq(1).addClass('ui-icon-radio-on');
				        	}else if(homeModelObject.ScreenReader() === 2){
				        		$('#accessibility_reader2').prop('checked','true');
				        		$('#accessibility_reader2').attr('aria-checked','true');
				        		$('#accessibility_reader2').next().children().children().eq(1).removeClass('ui-icon-radio-off');
				    			$('#accessibility_reader2').next().children().children().eq(1).addClass('ui-icon-radio-on');
				        	}
		        		}
		        	}
		        	r.resolve();
		        }
		    });
			return r;
	};
	
	var chooseReader = function(par){
		
		if(par===1){
			$('#accessibility_reader1').prop('checked','true');
    		$('#accessibility_reader1').attr('aria-checked','true');
    		$('#accessibility_reader2').attr('aria-checked','false');
		}else if(par===2){
			$('#accessibility_reader2').prop('checked','true');
    		$('#accessibility_reader2').attr('aria-checked','true');
    		$('#accessibility_reader1').attr('aria-checked','false');
		}
		
		 var params={};
		 params.ScreenReader=par;
		 params.action=2;
			$.ajax({
		        dataType: "json",
		        data: JSON.stringify(params),
		        cache: false,
		        crossDomain: true,
		        url: urlString + "services/AccessibilityReader.xsjs",
		        type: 'POST',
		        error: function (x, s, m) {
		            
		        },
		        success: function (res) {
		        
		        }
		    });    	
	};
	
	var exitSurvey = function(nextHash){
//		debugger;
		var url = stripQueryStringAndHash(url);
		 var hash = location.hash;
		  switch(hash){
		  case "#survey_page":
		  case "#feedback_start":
		  case "#feedback_options":
		  case "#feedback_rating":
		  case "#feedback_text":
		  case "#feedback_numeric_rating":
		  case "#feedback_matrix":
		  case "#feedbackInfo":
		  case "#create_survey_questions":
		  case "#create_survey_participants":    
		  case "#no_back":
			  if(hash !== "#home_screen"){
				  var srt;
				  if(getCookie("lang")==="de"){
					  str = "Aktualisieren Sie das Fenster. Die ausgefüllten Fragebogens Daten gehen verloren!";
				  } else if(getCookie("lang")==="fr"){
					  str = "Vous êtes sur le point de mettre à jour la fenêtre ! Aucune enquête remplie Les données seront perdues !";
				  }else {
					  str = "You're about to refresh the window! Any filled survey data will be lost!";
				  }
				  if(confirm(str)){
					  if(nextHash === "#accessibility"){
						  homeModelObject.changeAccessibilityModeOn();
						  window.onbeforeunload = null;
					  }else if(nextHash === "#logout"){
						  homeModelObject.doLogout();
						  window.onbeforeunload = null;
					  }else{
						  document.cookie = "href="+url+nextHash;
//						  sessionStorage.setItem('href',url+nextHash);
	//					  $.mobile.changePage(nextHash, { allowSamePageTransition: true });
						  window.onbeforeunload = null;
						  location.reload();
					  }
				  }
			  }
			  break;
			  
		  default:
			  if(nextHash === "#accessibility"){
				  homeModelObject.changeAccessibilityModeOn();
			  }else if(nextHash === "#logout"){
				  homeModelObject.doLogout();
//			  }else if (nextHash === "#account_settings"){
//				  $.mobile.changePage(nextHash, { allowSamePageTransition: true }); 
			  }
			  else{
				  location.assign(url+nextHash);				 
			  	  $.mobile.changePage(nextHash, { allowSamePageTransition: true });
			  }
		  break;
		  }
	};
	
	var deleteCookie = function(name) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	var ColleaguesModel = function(){
		var self=this;
		self.IdUsers=ko.observable();
		self.FullName=ko.observable();
		self.FirstName = ko.observable();
		self.Username = ko.observable();
		self.ZipCode=ko.observable();
		self.City=ko.observable();
		self.Country=ko.observable();
		self.ProfilePicture=ko.observable('img/profile_pic.svg');
		self.Id=ko.observable();
		self.Email=ko.observable();
		self.JobTitle=ko.observable();
		self.OrgUnit=ko.observable();
		self.UserImage=ko.observable();
		self.EligiblePay=ko.observable();
	};

	var SelectedColleguesListView = function(){
		var self=this;
		self.SelectedColleguesContainer = ko.observableArray([]);
		
		
		self.RemoveSelected = function(data){
			//document.getElementById(data.IdUsers() + 'event').checked=false;
			$('#' + data.IdUsers() + 'event').removeAttr('checked').checkboxradio('refresh');
			self.SelectedColleguesContainer.remove(data);
			$.mobile.activePage.trigger('create');
		};

	};
	
	var ColleaguesListView = function(){
		var self = this;
		self.ColleaguesList = ko.observableArray([]);
		self.SelectColleguesList = ko.observableArray([]);
		
		self.SelectColleguesList=function(data){
			
			if(self.matchElement(data))
				selectedColleguesListView.SelectedColleguesContainer.remove(data);
			else{
				if(selectedColleguesListView.SelectedColleguesContainer().length < 10){
					selectedColleguesListView.SelectedColleguesContainer.push(data);
				}else{
					alert('Maximum number of participants is 10.');
					setTimeout(function(){
						$('#' + data.IdUsers() + 'event').attr("checked",false).checkboxradio("refresh");
					},0);
					return;
				}
			}
					
			$.mobile.activePage.trigger('create');
		};
		
		self.matchElement=function(data){
			var match = ko.utils.arrayFirst(selectedColleguesListView.SelectedColleguesContainer(), function(item) {
			    return data.IdUsers() === item.IdUsers();
			});
			
			return match;
		};
		self.matchElementForSelection=function(data){
			var match = ko.utils.arrayFirst(self.ColleaguesList(), function(item) {
			    return data.IdUsers() === item.IdUsers();
			});
			
			return match;
		};
		self.SelectUser=function(data){
			
		};
		self.getPhoto=function(entity){		
			//console.log(entity);
	    	$.ajax({
	            dataType: "json",
	            // async: false,
	            //data: JSON.stringify({}),
	            cache: false,
	            crossDomain: true,
                url: ssoSapUrl+ "GetUserPhoto64Dynamic?id="+entity.Id()+"&type=7", //urlString + "services/AccountManagement.xsjs?idAction=2",
	            type: 'GET',
	            error: function (x, s, m) {

	                // //alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + ((x.responseText) ? x.responseText : "Unknown"));
	            },
	            success: function (res) {
	            	
	            	//console.log("data:image/gif;base64,"+res.rezultat);
	            	//$('#profilePicture').prop('src',"data:image/gif;base64,"+res.rezultat);
	            	entity.ProfilePicture("data:image/gif;base64,"+res.rezultat);
	            	//console.log(entity.ProfilePicture());
	            	//return "data:image/gif;base64,"+res.rezultat;
	            }
	        });
	    };
		
	};
	
	var createSurveyModel = function () {
		 var self = this;
		 self.QuestionTitle = ko.observable('');
		 self.IdQuestionType = ko.observable();
		 self.imgId = ko.observable();
		 self.RatingValue = ko.observable();
		 self.OptionList = ko.observableArray([]);
	};
	
	var createSurveyView = function () {
		 var self = this;
		 self.createSurveyArray = ko.observableArray([]);
		 self.QuestionTypeList = ko.observableArray([]);
		 self.myStepsIndex = ko.observable(0);
		 self.maxQuestions = ko.observable(5);
		 self.Title = ko.observable('');
//		 self.QuestionTitle = ko.observable('');
		 self.IdQuestionType = ko.observable();
//		 self.imgId = ko.observable('');
		 self.QuestionNumber = ko.observable(1);
		 self.RatingValueUI = ko.observable(5);
//		 self.RatingValue = ko.observable();
		 self.CurrentOption = ko.observable(2);
		 self.Description = ko.observable();
		 self.detailsSurveyPopUp = ko.observable();
		 
		 self.insertNew = function () {
			
			 //model.RatingValue();
//			 if(self.createSurveyArray().length>0){
//				 var najdov=false;
				 for(var i=0;i<self.QuestionNumber();i++){
//					 if(self.createSurveyArray()[i].BehaviorName===behaveName){
//						 self.createSurveyArray.splice(i, 1);
//						 najdov = true;
//						 return;
					 var model = new createSurveyModel();
//					 model.Title = self.Title();
					 model.QuestionTitle('');
					 //model.IdQuestionType();
					 model.imgId('');
					 
					 self.createSurveyArray.push(model);
//					 }
				 }
//				 if(!najdov){
//					 createSurvey.GetQuestionTypes();
//					 self.createSurveyArray.push(model);
					 $('#questionType').selectmenu().selectmenu('refresh');
//				 }
//			 }
//			 else{
//				 self.createSurveyArray.push(model); 
//			 }
			 
			 
			 
		 };
		 self.setImg = function(val) {
//			 debugger;
//				val.attr("checked",true);
			 	console.log(val.value);
			 	self.createSurveyArray()[self.myStepsIndex()].imgId(val.value);
			 	
				if(val.value === "2"){
					self.createSurveyArray()[self.myStepsIndex()].RatingValue(5);
					self.RatingValueUI(5);
				}
				
				if(val.value === "1"){
					$('#ratingValue'+self.myStepsIndex()).slideDown('normal');
				} else{
					$('#ratingValue'+self.myStepsIndex()).slideUp('normal');
				}
//				$("input[name='"+val.name+"']").checkboxradio().checkboxradio("refresh");
		 };
	     
//	     self.CreateSurvey = function () {
//	    	 if(){
//					alert("Please fill in all the required fields.");
//			 }
//			 else{
				 /*if(recognizeInfoModel.AcceptFeedbackRequest()!==undefined){
						recognizeInfo.IdRequestsParam = recognizeInfoModel.AcceptFeedbackRequest().IdRequests;
					}
					if(awardReasonsView.SelectedAwardReason() !== undefined){
						recognizeInfo.AwardReason = awardReasonsView.SelectedAwardReason().Description;
					}else{
						recognizeInfo.AwardReason="";
					}
					
					
					
					if(recognizeInfoModel.IsFeedback()){ //za ask (IdRequestsParam) dodaj nov check
						recognizeInfo.IsFeedbackParam = 1;
						//recognizeInfo.StarsValueParam = recognizeInfoModel.RateStarsChecked();
						//recognizeInfo.StarsDescriptionParam = recognizeInfoModel.RatingSelectedDescription();
						recognizeInfo.MessageLikeParam = recognizeInfoModel.Msg_like();
						recognizeInfo.MessageWishParam = recognizeInfoModel.Msg_wish();
						//recognizeInfo.EventNameParam = recognizeInfoModel.EventName();
					}*/
//					recognizeInfo.IsFeedbackParam = 1;
					
//					var container = ko.mapping.toJS(selectedColleguesListView.SelectedColleguesContainer());
//					var behaveMap = ko.mapping.toJS(self.createSurveyArray());
//					processRecognitionMultiple(container, behaveMap);
//				 	console.log('yeah send');	
//			 }
	    	 
//	     };
		 
	     self.question_minus = function () {
	    	 if(self.QuestionNumber()>1){
		    	 self.QuestionNumber(self.QuestionNumber()-1);
	    	 }else if(self.QuestionNumber()===1){
	    		 $('#question_minus_btn').attr('disabled',true);
	    	 }
	     };
	     
	     self.question_plus = function () {
	    	 if(self.QuestionNumber()<5){
		    	 self.QuestionNumber(self.QuestionNumber()+1);
		    	 if(self.QuestionNumber()===5){
		    		 $('#question_plus_btn').attr('disabled',true);
		    	 }
	    	 }
	     };
	     
	     self.rating_minus = function () {
	    	 if(self.RatingValueUI()>5){
	    		 self.RatingValueUI(self.RatingValueUI()-1);
	    		 self.createSurveyArray()[self.myStepsIndex()].RatingValue(self.RatingValueUI());
	    	 }else if(self.RatingValueUI()===5){
	    		 $('#rating_minus_btn').attr('disabled',true);
	    	 }
	     };
	     
	     self.rating_plus = function () {
	    	 if(self.RatingValueUI()>=5 && self.RatingValueUI()<10){
	    		 self.RatingValueUI(self.RatingValueUI()+1);
	    		 self.createSurveyArray()[self.myStepsIndex()].RatingValue(self.RatingValueUI());
	    		 if(self.RatingValueUI()===10){
	    			 $('#rating_plus_btn').attr('disabled',true);
	    		 }
	    	 }
	     };
	     
	     self.next_survey_steps = function (page) {
//	    	 if(page !== 1){
//	    		 if(self.myStepsIndex()+1===self.createSurveyArray().length){
//	    			 $.mobile.changePage($('#create_survey_participants'));
////	    			 return;
//	    		 }
//	    		 else{
//	    			 self.myStepsIndex(self.myStepsIndex()+1);
//	    		 }
//			 }
	    	 //if()
	    	 if(self.myStepsIndex()===self.createSurveyArray().length){
	    	 
	    	 }else{
	 				$(".loading1").fadeIn();
	 				if(page !== 1){
		 				if(self.createSurveyArray()[self.myStepsIndex()].QuestionTitle() === ""){
		 					alert('Please insert question title.');
							return;
		 				}
		 				if(self.createSurveyArray()[self.myStepsIndex()].IdQuestionType()){
			 				if(self.createSurveyArray()[self.myStepsIndex()].IdQuestionType() === 5){
				 				var list;
			 					for(var i=0;i<self.createSurveyArray()[self.myStepsIndex()].OptionList().length;i++){
		//		 						console.log("list: "+createSurvey.createSurveyArray()[createSurvey.myStepsIndex()].OptionList()[i]);
				 						list = self.createSurveyArray()[self.myStepsIndex()].OptionList()[i];
				 						if(list === undefined || list.trim() === ""){
				 							alert('Please insert value for all defined options.');
				 							return;
				 						}
				 						
				 					}
			 				} else if(self.createSurveyArray()[self.myStepsIndex()].IdQuestionType() === 2){
			 					if(!self.createSurveyArray()[self.myStepsIndex()].imgId() || self.createSurveyArray()[self.myStepsIndex()].imgId() === ""){
			 						alert('Please select rating image.');
		 							return;
			 					}
			 				}
		 				} else {
		 					alert('Please select question type.');
 							return;
		 				}
	 				}
	 				
	 		// next page
	 				
	 				if(page !== 1){
	 		    		 if(self.myStepsIndex()+1===self.createSurveyArray().length){
	 		    			 $.mobile.changePage($('#create_survey_participants'));
//	 		    			 return;
	 		    		 } else {
	 		    			 self.myStepsIndex(self.myStepsIndex()+1);
	 		    		 }
	 				}
	 				for(var i=0;i<self.createSurveyArray().length;i++){
	 					if(i!=self.myStepsIndex()){
	 						$("#div_to_hide"+i).hide();
	 					}
	 					else{
	 						$("#div_to_hide"+i).show();
	 					}
	 				}
	 				if(self.createSurveyArray()[self.myStepsIndex()].OptionList().length > 2){
	 					self.CurrentOption(self.createSurveyArray()[self.myStepsIndex()].OptionList().length);
	 				}else{
	 					self.CurrentOption(2);
	 				}
	 				$('#questionType'+createSurvey.myStepsIndex()).off().on('change', function(){
	 					createSurvey.TypeChange();
	 				});
	 				$('#questionType'+self.myStepsIndex()).selectmenu().selectmenu('refresh');
	 				$(".loading1").fadeOut();
	 		}
	     };
	     
	     self.back_survey_steps = function () {
	    	 if(self.myStepsIndex()==0){
	    		self.createSurveyArray([]);
	 			$.mobile.changePage($('#create_survey'));
	 		}
	 		else{
	 			$(".loading1").fadeIn();
	 			self.myStepsIndex(self.myStepsIndex()-1);
//	 			ko.applyBindings(createSurvey, document.getElementById('question_steps'));
//	 			self.createSurveyArray().pop();
	 			//ko.applyBindings(behaveMap, document.getElementById("h1_feedback_steps_controls"));
	 			//ko.applyBindings(behaveMap, document.getElementById("h1_feedback_steps_controls_mobile"));
	 			for(var i=0;i<self.createSurveyArray().length;i++){
	 				if(i!=self.myStepsIndex()){
	 					$("#div_to_hide"+i).hide();
	 				}
	 				else{
	 					$("#div_to_hide"+i).show();
	 				}
	 			}
	 			console.log("myStepsIndex(): "+self.myStepsIndex());
 				if(self.createSurveyArray()[self.myStepsIndex()].OptionList().length > 2){
 					self.CurrentOption(self.createSurveyArray()[self.myStepsIndex()].OptionList().length);
 				}else{
 					self.CurrentOption(2);
 				}
	 			$(".loading1").fadeOut();
	 		}
	     };
	     
	     self.GetQuestionTypes=function(){
	     	 var r = $.Deferred();
	    	 var params = {};
	     	 params.action=1;
	    	 $.ajax({
	             dataType: "json",
	             data: JSON.stringify(params),
	             cache: false,
	             crossDomain: true,
	             url: urlString + "services/GetQuestionTypes.xsjs",
	             type: 'POST',
	             error: function (x, s, m) {
	                 
	             },
	             success: function (res) {
	             	self.QuestionTypeList([]);
	             	res[2].Description = res[2].Description.slice(7,14); 
	             	self.QuestionTypeList(res); 
	             	r.resolve();
	             }
	         });
	    	 return r;
	     };
	     
	     self.AddOption=function(val){
	    	 var maxOptions = 5;	    	
//	    	console.log('val id: '+val.id);
//	    	 $('#options_plus_btn').off().on('click', function(){
//	    			debugger;
	    	 	var minusImg = new Image();
	    		minusImg.src = "img/options_minus.png";
	    			if(self.CurrentOption()<maxOptions){
	    				$('#options_minus_btn'+self.myStepsIndex()+self.CurrentOption()).hide();
	    				self.CurrentOption(self.CurrentOption()+1);
	    				var option = '<div style="position: relative;"><input id="options'+self.myStepsIndex()+self.CurrentOption()+'" name="options'+self.myStepsIndex()+'" onkeyup="createSurvey.AddOptionVal(this)" class="invite_check"/><a href="#" id="options_minus_btn'+self.myStepsIndex()+self.CurrentOption()+'" onclick="createSurvey.RemoveOption(this)" style="display:none;position: absolute;left: 102%;bottom: 5px;" class="ui-link"><img src='+minusImg.src+' width="25" heigth="25" style="vertical-align:middle"></a></div>'
	    				$(option).hide().appendTo('#add_option'+self.myStepsIndex()).show('fast');
	    				$('#options_minus_btn'+self.myStepsIndex()+self.CurrentOption()).show();
	    				self.createSurveyArray()[self.myStepsIndex()].OptionList().push(self.Description());
//	    				$('#add_option').appendTo('<div style="position: relative;"><input id="options'+createSurvey.myStepsIndex()+self.CurrentOption()+'" class="invite_check"/><a href="#" id="options_minus_btn'+createSurvey.myStepsIndex()+self.CurrentOption()+'" onclick="createSurvey.RemoveOption(this)" style="display:none;position: absolute;left: 300px;bottom: 5px;" class="ui-link"><img src="img/options_minus.png" width="25" heigth="25" style="vertical-align:middle"></a></div>').show('normal');
	    				
	    				if(self.CurrentOption()===maxOptions){
	    					$('#'+val.id).hide();
	    				}
	    				$.mobile.activePage.trigger('create');
	    			}
//	    		});
	     };
	     
	     self.RemoveOption=function(opt){
	    	 var maxOptions = 5;
	    	 var visible = $('#options_plus_btn'+self.myStepsIndex()).is(":visible");
	    	 self.createSurveyArray()[self.myStepsIndex()].OptionList().pop();
	    	 $('#'+opt.id).parent().hide('normal').promise().done(function() {
	    		 $('#'+opt.id).parent().remove();
	    	 });
	    	 self.CurrentOption(self.CurrentOption()-1);
	    	 $('#options_minus_btn'+self.myStepsIndex()+self.CurrentOption()).show();
	    	 if(!visible){
	    		 $('#options_plus_btn'+self.myStepsIndex()).show();
	    	 }
	     };
	     
	     self.TypeChange=function(){
	    	 self.createSurveyArray()[self.myStepsIndex()].IdQuestionType(parseInt($('#questionType'+createSurvey.myStepsIndex()).val(),10));
	    	 $('#questionType'+createSurvey.myStepsIndex()).selectmenu('refresh');
	    	 if(self.createSurveyArray()[self.myStepsIndex()].IdQuestionType() === 2){
	 			$('#create_questions_options'+self.myStepsIndex()).hide();
				$('#create_questions_rating'+self.myStepsIndex()).slideDown('normal');
				self.createSurveyArray()[self.myStepsIndex()].RatingValue(self.RatingValueUI());
				$("input[name='imageCheckBox"+self.myStepsIndex()+"']").checkboxradio().checkboxradio("refresh");
				if(self.createSurveyArray()[self.myStepsIndex()].imgId() === "1"){
					$('#ratingValue'+self.myStepsIndex()).slideDown('normal');
				}
				$('input[name=options'+self.myStepsIndex()+']').val('')
				self.createSurveyArray()[self.myStepsIndex()].OptionList([]);
			}else if(self.createSurveyArray()[self.myStepsIndex()].IdQuestionType() === 5){
//				$('#option_plus').remove();
//				$('#create_questions_options'+createSurvey.myStepsIndex()).append('<img id="option_plus" src="img/options_plus.png" width="30" heigth="30">')
				self.createSurveyArray()[self.myStepsIndex()].OptionList().push(self.Description());
	 			self.createSurveyArray()[self.myStepsIndex()].OptionList().push(self.Description());
	 			$("input[name='imageCheckBox"+self.myStepsIndex()+"']").attr('checked',false);
				$("input[name='imageCheckBox"+self.myStepsIndex()+"']").checkboxradio().checkboxradio("refresh");
	 			self.createSurveyArray()[self.myStepsIndex()].imgId(undefined);
				self.createSurveyArray()[self.myStepsIndex()].RatingValue(undefined);
				self.RatingValueUI(5);
				$('#create_questions_rating'+self.myStepsIndex()).hide();
				$('#ratingValue'+self.myStepsIndex()).hide();
				$('#create_questions_options'+self.myStepsIndex()).slideDown('normal');
			}else {
				self.createSurveyArray()[self.myStepsIndex()].OptionList([]);
				$('#create_questions_options'+self.myStepsIndex()).slideUp('normal');
				$("input[name='imageCheckBox"+self.myStepsIndex()+"']").attr('checked',false);
				$("input[name='imageCheckBox"+self.myStepsIndex()+"']").checkboxradio().checkboxradio("refresh");
				self.createSurveyArray()[self.myStepsIndex()].imgId(undefined);
				self.createSurveyArray()[self.myStepsIndex()].RatingValue(undefined);
				self.RatingValueUI(5);
				$('#create_questions_rating'+self.myStepsIndex()).slideUp('normal');
				$('#ratingValue'+self.myStepsIndex()).slideUp('normal');
			}
	    	 
	     };
	     
	     self.AddOptionVal = function(prop){
//	    	 console.log("prop: "+prop.id);
//	    	 console.log("prop: "+prop.value);
	    	 var id = prop.id;
	    	 var calc = id.substring(id.length - 1);
	    	 var IdOpt = parseInt(calc,10) - 1;
	    	 self.createSurveyArray()[self.myStepsIndex()].OptionList()[IdOpt] = prop.value;	    	 
	     };

};
