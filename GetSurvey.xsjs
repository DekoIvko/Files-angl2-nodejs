/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var username = $.session.getUsername();
//var procedureCallStatement = "call \"GetSurveyById\"(?)";
//var procedureCallStatement = "select \"IdSurvey\",\"IdSurveyType\",\"Description\",\"DateFrom\",\"DateUntil\",\"IsAnonymous\",\"IsPublic\",\"IsActive\",\"Title\",\"IsTest\", \"Disclaimer\" from \"Survey.Survey\" where \"IdSurvey\"=?";
var procedureCallStatement1 = "call \"GetQuestionsWithAnswersByIdSurvey\"(?,?)";
var procedureCallStatement2 = "call \"GetOptionsByIdSurveyQuestions\"(?)";
var procedureCallStatement3 = "call \"GetQuestionsWithAnswersByIdSurveyPage\"(?,?)";
var procedureCallStatementWithLang = "call \"GetSurveyInfo\"(?,?)";
var procedureCallStatement1WithLang = "call \"GetQuestionsWithAnswersByIdSurveyAndLang\"(?,?,?)";
var procedureCallStatement2WithLang = "call \"GetOptionsByIdSurveyQuestionsAndLang\"(?,?)";
var procedureCallStatement4WithLang = "call \"GetRatingsByIdSurveyQuestionsAndLang\"(?,?)";
var procedureCallStatement3WithLang = "call \"GetQuestionsWithAnswersByIdSurveyPageAndLang\"(?,?,?)";
var GetQuestionsOptions=function(IdSurveyQuestions){	
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
			statement = connection.prepareCall(procedureCallStatement2WithLang);	
			statement.setInteger(1, parseInt(IdSurveyQuestions,0));
			statement.setString(2,obj.lang);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.IdSurveyOptions=resultSet.getNString(1);
		            	resultObject.IdSurveyQuestions=resultSet.getNString(2);
		            	resultObject.Description=resultSet.getNString(3);
		            	resultObject.Value=resultSet.getNString(4);		            	
		            	resultObject.OptionEndSurvey=resultSet.getNString(5);
		            	resultObject.ImageUrl=resultSet.getNString(6);
		            	resultObject.TextDescription=resultSet.getNString(7);
		            	resultObject.SkipToIdPage=resultSet.getInteger(8);
//		            	resultObject.SkipToPageNumber=resultSet.getInteger(9);
		            	resultObject.SkipToPageNumber=resultObject.SkipToIdPage===-1?-1:resultSet.getInteger(9);
		            	
		            	resultList.push(resultObject);		            
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				resultList.push("1:" + e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};
var GetQuestionsRatings=function(IdSurveyQuestions){	
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
			statement = connection.prepareCall(procedureCallStatement4WithLang);	
			statement.setInteger(1, parseInt(IdSurveyQuestions,0));
			statement.setString(2,obj.lang);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.IdSurveyRatings=resultSet.getNString(1);
		            	resultObject.IdSurveyQuestions=resultSet.getNString(2);
		            	resultObject.Description=resultSet.getNString(3);
		            	resultObject.Value=resultSet.getNString(4);		            	
		            	resultObject.OptionEndSurvey=resultSet.getNString(5);
		            	resultObject.ImageUrl=resultSet.getNString(6);
		            	resultObject.TextDescription=resultSet.getNString(7).trim()!=''?resultSet.getNString(7):resultObject.Value;
		            	resultObject.SkipToIdPage=resultSet.getInteger(8);
//		            	resultObject.SkipToPageNumber=resultSet.getInteger(9);
		            	resultObject.SkipToPageNumber=resultObject.SkipToIdPage===-1?-1:resultSet.getInteger(9);
		            	
		            	resultList.push(resultObject);		            
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				resultList.push("1:" + e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};

var GetQuestionsListBySurveyPage=function(IdSurveyPage){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[],index=1,i=0,o={};
	try{			
			statement = connection.prepareCall(procedureCallStatement3WithLang);	
			statement.setInteger(1, parseInt(IdSurveyPage,0));			
			statement.setString(2, username);
			statement.setString(3,obj.lang);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.QuestionNo=index;
		            	resultObject.IdSurveyQuestions=resultSet.getNString(1);
		            	resultObject.IdSurvey=resultSet.getNString(2);
		            	resultObject.IdQuestionType=resultSet.getNString(3);
		            	resultObject.Title=resultSet.getNString(4);
		            	resultObject.Description=resultSet.getNString(5);
		            	resultObject.NumberOfOptions=resultSet.getNString(6);
		            	resultObject.ValueSameAsDescription=resultSet.getNString(7);
		            	resultObject.RateFrom=resultSet.getNString(8);
		            	resultObject.RateTo=resultSet.getNString(9);
		            	resultObject.RateStep=resultSet.getNString(10);
		            	resultObject.AllowCantSay=resultSet.getNString(11);
		            	resultObject.Username=resultSet.getNString(12);
		            	resultObject.TextAnswer=resultSet.getNString(13);
		            	resultObject.NumericAnswer=resultSet.getNString(14);
		            	resultObject.QuestionsCount=resultSet.getNString(15);
		            	resultObject.IsPage=resultSet.getNString(16);
		            	resultObject.IdSurveyPage=resultSet.getNString(17);
		            	resultObject.SkipToIdPage=resultSet.getInteger(19);
		            	resultObject.SkipToPageNumber=resultObject.SkipToIdPage===-1?-1:resultSet.getInteger(20);
		            	resultObject.IsMultiChoice=resultSet.getInteger(21);
		            	resultObject.HowManyDropdowns=resultSet.getInteger(22);
		            	resultObject.DateFrom=resultSet.getNString(23);
		            	resultObject.DateTo=resultSet.getNString(24); 
		            	resultObject.TextareaSmall=resultSet.getInteger(25); 
		            	resultObject.QuestionOptions=GetQuestionsOptions(resultObject.IdSurveyQuestions);
		            	resultObject.QuestionRatings=GetQuestionsRatings(resultObject.IdSurveyQuestions);
		            	resultObject.DropdownsOptions=[];
		            	for(i=0;i<resultObject.HowManyDropdowns;i++){
		            		o={};
		            		o.ddlOrderNumber= parseInt(i,0);
		            		resultObject.QuestionOptions.IsSelected=false;
		            		o.ddlQuestionOptions=resultObject.QuestionOptions;
		            		resultObject.DropdownsOptions.push(o);
		            	}
		            	resultList.push(resultObject);
		            	index++;
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				resultList.push("2:" + e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};

var GetQuestionsList=function(){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[],index=1,i=0,o=0;
	try{			
			statement = connection.prepareCall(procedureCallStatement1WithLang);	
			statement.setInteger(1, parseInt(obj.IdSurvey,0));
			statement.setString(2, username);
			statement.setString(3,obj.lang);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.QuestionNo=index;
		            	resultObject.IdSurveyQuestions=resultSet.getNString(1);
		            	resultObject.IdSurvey=resultSet.getNString(2);
		            	resultObject.IdQuestionType=resultSet.getNString(3);
		            	resultObject.Title=resultSet.getNString(4);
		            	resultObject.Description=resultSet.getNString(5);
		            	resultObject.NumberOfOptions=resultSet.getNString(6);
		            	resultObject.ValueSameAsDescription=resultSet.getNString(7);
		            	resultObject.RateFrom=resultSet.getNString(8);
		            	resultObject.RateTo=resultSet.getNString(9);
		            	resultObject.RateStep=resultSet.getNString(10);
		            	resultObject.AllowCantSay=resultSet.getNString(11);
		            	resultObject.Username=resultSet.getNString(12);
		            	resultObject.TextAnswer=resultSet.getNString(13);
		            	resultObject.NumericAnswer=resultSet.getNString(14);
		            	resultObject.QuestionsCount=resultSet.getNString(15);
		            	resultObject.IsPage=resultSet.getNString(16);
		            	resultObject.IdSurveyPage=resultSet.getNString(17);
		            	resultObject.SkipToIdPage=resultSet.getInteger(20);
//		            	resultObject.SkipToPageNumber=resultSet.getInteger(21);
		            	resultObject.SkipToPageNumber=resultObject.SkipToIdPage===-1?-1:resultSet.getInteger(21);
		            	resultObject.IsMultiChoice=resultSet.getInteger(22);
		            	resultObject.HowManyDropdowns=resultSet.getInteger(23);
		            	resultObject.DateFrom=resultSet.getNString(24);
		            	resultObject.DateTo=resultSet.getNString(25);
		            	resultObject.TextareaSmall=resultSet.getInteger(26);
		            	resultObject.QuestionOptions=GetQuestionsOptions(resultObject.IdSurveyQuestions);
		            	resultObject.QuestionRatings=GetQuestionsRatings(resultObject.IdSurveyQuestions);
		            	if(resultObject.IsPage==="1"){
		            		resultObject.PageQuestions=	GetQuestionsListBySurveyPage(resultObject.IdSurveyPage);
		            	}	
		            	resultObject.DropdownsOptions=[];
		            	for(i=0;i<resultObject.HowManyDropdowns;i++){
		            		o={};
		            		o.ddlOrderNumber= parseInt(i,0);
		            		o.ddlQuestionOptions=resultObject.QuestionOptions;
		            		resultObject.DropdownsOptions.push(o);
		            	}
		            	resultList.push(resultObject);
		            	index++;
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				
				resultList.push("3:" + e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};

var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultObject={};		
		try{			
				/*statement = connection.prepareCall(procedureCallStatement);	
				statement.setInteger(1, parseInt(obj.IdSurvey,0));
				if(statement.execute()) { 
			         
			        do { 
			        	resultSet  = statement.getResultSet(); 
			            while(resultSet.next()) { 
			            	resultObject={};			            				            				            	
			            	resultObject.IdSurvey=resultSet.getNString(1);
			            	resultObject.IdSurveyType=resultSet.getNString(2);
			            	resultObject.Description=resultSet.getNString(3);
			            	resultObject.DateFrom=resultSet.getNString(4);
			            	resultObject.DateUntil=resultSet.getNString(5);
			            	resultObject.IsAnonymous=resultSet.getNString(6);
			            	resultObject.IsPublic=resultSet.getNString(7);
			            	resultObject.IsActive=resultSet.getNString(8);
			            	resultObject.Title=resultSet.getNString(9);
			            	resultObject.IsTest=resultSet.getNString(10);
							resultObject.Disclaimer=resultSet.getNString(11);
			            	resultObject.Questions=GetQuestionsList();
			            } 		            
			        } while (statement.getMoreResults());	       	  
			 }
				connection.commit();	*/		
//			
//			statement = connection.prepareStatement(procedureCallStatement);	
//			statement.setInteger(1,parseInt(obj.IdSurvey,10));
//			resultSet = statement.executeQuery();
//			while (resultSet.next()) {
//				resultObject={};			            				            				            	
//            	resultObject.IdSurvey=resultSet.getNString(1);
//            	resultObject.IdSurveyType=resultSet.getNString(2);
//            	resultObject.Description=resultSet.getNString(3);
//            	resultObject.DateFrom=resultSet.getNString(4);
//            	resultObject.DateUntil=resultSet.getNString(5);
//            	resultObject.IsAnonymous=resultSet.getNString(6);
//            	resultObject.IsPublic=resultSet.getNString(7);
//            	resultObject.IsActive=resultSet.getNString(8);
//            	resultObject.Title=resultSet.getNString(9);
//            	resultObject.IsTest=resultSet.getNString(10);
//            	resultObject.Questions=GetQuestionsList();			
//			}
//			
			
			
			
				statement = connection.prepareCall(procedureCallStatementWithLang);	
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				statement.setString(2,obj.lang);
				statement.execute();
				resultSet  = statement.getResultSet();
				while (resultSet.next()) {
					resultObject={};			            				            				            	
	            	resultObject.IdSurvey=resultSet.getNString(1);
	            	resultObject.IdSurveyType=resultSet.getNString(2);
	            	resultObject.Description=resultSet.getNString(3);
	            	resultObject.DateFrom=resultSet.getNString(4);
	            	resultObject.DateUntil=resultSet.getNString(5);
	            	resultObject.IsAnonymous=resultSet.getNString(6);
	            	resultObject.IsPublic=resultSet.getNString(7);
	            	resultObject.IsActive=resultSet.getNString(8);
	            	resultObject.Title=resultSet.getNString(9);
	            	resultObject.IsTest=resultSet.getNString(10);
	            	resultObject.EndSurveyDescription=resultSet.getNString(11);
	            	resultObject.Disclaimer=resultSet.getNString(12);
	            	resultObject.SurveyTreshold=resultSet.getNString(13);
	            	resultObject.TextTreshold=resultSet.getNString(14);
	            	resultObject.Questions=GetQuestionsList();		
	            
				}
				connection.commit();	
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));								
		}
		 catch (e) {
			 	$.response.contentType = "application/json";
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    code = $.SurveyRocks.services.utils.SurveyRocksUtils.getStatusCode(e.message);
			    if (code && code === 301) {
			        $.response.setBody('unique constraint violated');
			    } else {
			        $.response.setBody("4:" + e.toString());
			    }
			    $.response.status = $.net.http.BAD_REQUEST;

			}
		finally{
			$.SurveyRocks.services.utils.SurveyRocksUtils.close([resultSet, statement, connection]);  
		}				  		
};

CallService();