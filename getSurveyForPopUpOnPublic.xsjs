/*global escape: true */
/*jslint nomen: true*/
var method = $.request.headers["1"].value;
$.import("SurveyRocks.services","utils");
var obj,body,IdSurvey;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}



var schemaName = "SURVEYROCKS";
var IdSurvey = $.request.parameters.get("id");
//$.trace.error("id survey of headerot "+IdSurvey);



var Respond = function(msg){
	 $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
	 $.response.contentType = "application/json";
	    $.response.status = $.net.http.OK;
	    $.response.setBody(JSON.stringify(msg));
	    return false;
}

//var procedureCallStatementt = "call \"GetDetailsSurvey\"(?)";
//var procedureCallStatement12 = "call \"GetSurveyQuestionsDetails\"(?)";
//var procedureCallStatement2 = "call \"GetOptionsByIdSurveyQuestionsDetails\"(?)";
//
//var GetQuestionsOptions=function(IdSurveyQuestions){	
//	var connection = $.db.getConnection("SurveyRocks.services.api::services");  
//	connection.prepareStatement("SET SCHEMA "  + "SURVEYROCKS").execute();   
//	var statement = null,resultSet = null,resultObject={},resultList=[];
//	try{			
//			statement = connection.prepareCall(procedureCallStatement2);	
//			statement.setInteger(1, parseInt(IdSurveyQuestions,10));
////			$.trace.error("GetQuestionsOptions IdSurveyQuestions"+IdSurveyQuestions);
//
//			if(statement.execute()) { 		         
//		        do { 
//		        	resultSet  = statement.getResultSet(); 
//		            while(resultSet.next()) { 
//		            	resultObject={};
//		            	resultObject.IdSurveyOptions=resultSet.getNString(1);
//		            	resultObject.IdSurveyImages=resultSet.getNString(2);
//		            	resultObject.Description=resultSet.getNString(3);
//		            	resultObject.Value=resultSet.getNString(4);		            	
//		            	resultObject.TextDescription=resultSet.getNString(5);		            	
//		            	resultList.push(resultObject);		            
////		            	$.trace.error("GetQuestionsOptions resultList"+resultList.IdSurveyOptions);
//		            } 		            
//		        } while (statement.getMoreResults());	       	  
//				}
//			}
//			catch(e){
//				resultList.push("1:" + e.message);
//			}
//			finally{
//				connection.commit();
//			}
////			$.trace.error("GetQuestionsOptions"+resultList);
//			return resultList;
//};
//
//
//var GetQuestionsList=function(IdSurvey){
//	var connection = $.db.getConnection("SurveyRocks.services.api::services");  
//	connection.prepareStatement("SET SCHEMA "  + "SURVEYROCKS").execute();   
//	var statement = null,resultSet = null,resultObject={},resultList=[];
//	try{			
//			statement = connection.prepareCall(procedureCallStatement12);	
//			statement.setInteger(1, parseInt(IdSurvey,10));
//
//			if(statement.execute()) { 		         
//		        do { 
//		        	resultSet  = statement.getResultSet(); 
//		            while(resultSet.next()) { 
//		            	resultObject={};
//		            	resultObject.IdSurveyQuestions=resultSet.getNString(1);
//		            	resultObject.IdQuestionType=resultSet.getNString(2);
//		            	resultObject.Title=resultSet.getNString(3);
//		            	resultObject.RateFrom=resultSet.getNString(4);
//		            	resultObject.RateTo=resultSet.getNString(5);
//		            	resultObject.RateStep=resultSet.getNString(6);
//		            	resultObject.QuestionOptions=GetQuestionsOptions(resultObject.IdSurveyQuestions);
//		            	resultList.push(resultObject);
//
//		            } 		            
//		        } while (statement.getMoreResults());	       	  
//				}
//			}
//			catch(e){
//				
//				resultList.push("3:" + e.message);
//			}
//			finally{
//				connection.commit();
//			}
////			$.trace.error("GetQuestionsList"+resultList[0]);
//			return resultList;
//};
//
//var CallService=function(){			
//		var connection = $.db.getConnection("SurveyRocks.services.api::services");  
//		connection.prepareStatement("SET SCHEMA "  + "SURVEYROCKS").execute();   
//		var statement = null,resultSet = null,code = 0,resultObject={};		
//		try{		
//			if(method==="POST"){
//				
//				
//				statement = connection.prepareCall(procedureCallStatementt);	
//				statement.setInteger(1,parseInt(obj.IdSurvey,10));
//				statement.execute();
//				resultSet  = statement.getResultSet();
//				
//				while (resultSet.next()) {
//					
//					resultObject={};			            				            				            	
//	            	resultObject.IdSurvey=resultSet.getNString(1);
//	            	resultObject.SurveyTitle=resultSet.getNString(2);
//	            	
//	            	resultObject.Questions=GetQuestionsList(resultObject.IdSurvey);	
//				}
//				
//				connection.commit();	
////				$.response.contentType = "application/json";			   
//			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
//			    var body ;
//			    
//			    body = {
//			    		"Survey": [{
//			    			"SurveyId": resultObject.IdSurvey,
//			    			"SurveyTitle": resultObject.SurveyTitle,
//			    			 "Questions":resultObject.Questions    				
//			    		}]
//			    };
////			    $.trace.error(resultObject.Questions);
//			    $.response.contentType = "application/json";
//			    $.response.status = $.net.http.OK;
//			    $.response.setBody(JSON.stringify(resultObject));
//			    
//			}
//			else{
//				$.response.contentType = "application/json";
//				$.response.headers.set('access-control-allow-origin', '*');
//				$.response.headers.set('access-control-allow-methods', 'POST, GET, OPTIONS');
//				$.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
//				$.response.status = $.net.http.METHOD_NOT_ALLOWED;
//				$.response.setBody(JSON.stringify({"status":$.net.http.METHOD_NOT_ALLOWED,"message":"Only POST Method is Allowed!"}));
//			}
//
//				
//		}
//		 catch (e) {
//			 	$.response.contentType = "application/json";
//			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
//			    code = $.SurveyRocks.services.utils.SurveyRocksUtils.getStatusCode(e.message);
//			    if (code && code === 301) {
//			        $.response.setBody('unique constraint violated');
//			    } else {
//			        $.response.setBody(" "+e);
//			    }
//			    $.response.status = $.net.http.BAD_REQUEST;
//
//			}
//		finally{
//			$.SurveyRocks.services.utils.SurveyRocksUtils.close([resultSet, statement, connection]);  
//		}				  		
//};
//

//CallService();	


var GetQuestionsOptions = function(idSurveyQuestion){
	var rs = null,connection=null,statement=null, tempObj={}, resultObj;
	connection = $.hdb.getConnection({sqlcc:"SurveyRocks.services.api::services"});
	statement = connection.loadProcedure(schemaName,"GetOptionsByIdSurveyQuestionsDetails");
	rs=statement(idSurveyQuestion);
	resultObj = rs['$resultSets'][0];
	var tempArr=[];
	for (var key in resultObj){
		tempArr.push(resultObj[key])
	}
	return tempArr;
	
};


var GetQuestionsList = function(idSurvey){
	var rs = null,connection=null,statement=null, tempObj={}, resultObj,i=0,o={};
	connection = $.hdb.getConnection({sqlcc:"SurveyRocks.services.api::services"});
	statement = connection.loadProcedure(schemaName,"GetSurveyQuestionsDetails");
	rs=statement(idSurvey);
	resultObj = rs['$resultSets'][0];
	
	var retArr=[];
	for (var key in resultObj){
		tempObj={};
		tempObj.IdSurveyQuestions = resultObj[key].IdSurveyQuestions;
		tempObj.QuestionType = resultObj[key].QuestionType;
		tempObj.Title = resultObj[key].Title;
		tempObj.RateFrom = resultObj[key].RateFrom;
		tempObj.RateTo = resultObj[key].RateTo;
		tempObj.RateStep = resultObj[key].RateStep;
		tempObj.IsMultiChoice = resultObj[key].IsMultiChoice;
		tempObj.AllowCantSay = resultObj[key].AllowCantSay;
		tempObj.HowManyDropdowns = resultObj[key].HowManyDropdowns;
		if(tempObj.HowManyDropdowns == 0){
			tempObj.QuestionOptions = GetQuestionsOptions(resultObj[key].IdSurveyQuestions)	
			tempObj.DropdownsOptions=[];
		}else {
			tempObj.QuestionOptions = [];
				
			tempObj.DropdownsOptions=[];
	    	for(i=0;i<tempObj.HowManyDropdowns;i++){
	    		o={};
	    		o.ddlOrderNumber= i;
	    		tempObj.QuestionOptions.IsSelected=false;
	    		o.ddlQuestionOptions=GetQuestionsOptions(resultObj[key].IdSurveyQuestions);
	    		tempObj.DropdownsOptions.push(o);
	    	}
		}
		retArr.push(tempObj)
	}
	return retArr;
	
};


var getSurveyData = function(idSurvey){
	var rs = null,connection=null,statement=null;
	connection = $.hdb.getConnection({sqlcc:"SurveyRocks.services.api::services"});
	statement = connection.loadProcedure(schemaName,"GetDetailsSurvey");
	rs=statement(idSurvey);
		
	var retObject = {
		"Survey":{
			"SurveyId": rs['$resultSets'][0][0].IdSurvey,
			"SurveyTitle": rs['$resultSets'][0][0].SurveyTitle,
			"Questions": GetQuestionsList(rs['$resultSets'][0][0].IdSurvey)
		}	
	}

	return retObject;
};

var callXS = function(){
try{
	var data = getSurveyData(IdSurvey);
	$.response.contentType = "application/json";
	//$.response.contentType = "text/plain";
	$.response.headers.set('Access-Control-Allow-Origin','*');    
	$.response.headers.set('access-control-allow-methods','POST,GET, OPTIONS');
	$.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");  
    $.response.status = $.net.http.OK;
    $.response.setBody(JSON.stringify(data));
	
}catch(e){
    $.response.contentType = "application/json";
	//$.response.contentType = "text/plain";
	$.response.headers.set('access-control-allow-origin','*');    
	$.response.headers.set('access-control-allow-methods','POST,GET, OPTIONS');
	$.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");  
    $.response.status = $.net.http.OK;
    $.response.setBody(JSON.stringify(getSurveyData));
//	$.trace.error(e.toString())
}
};

callXS();