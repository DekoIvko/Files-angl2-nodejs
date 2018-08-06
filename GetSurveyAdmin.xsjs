/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var username = $.session.getUsername();
//var procedureCallStatement = "call \"GetSurveyById\"(?)";
var procedureCallStatement = "select \"IdSurvey\",\"IdSurveyType\",\"Description\",\"DateFrom\",\"DateUntil\",\"IsAnonymous\",\"IsPublic\",\"IsActive\",\"Title\",\"IsTest\" from \"Survey.Survey\" where \"IdSurvey\"=?";
var procedureCallStatement1 = "call \"GetQuestionsWithAnswersByIdSurveyAdmin\"(?,?)";
var procedureCallStatement2 = "call \"GetOptionsByIdSurveyQuestionsAdmin\"(?)";
var procedureCallStatement3 = "call \"GetQuestionsWithAnswersByIdSurveyPageAdmin\"(?,?)";
var statementSkippingReference="select (select count(*) from \"SURVEYROCKS\".\"Survey.SurveyOptions\" where \"SkipToIdPage\"=?) + (select count(*) from \"SURVEYROCKS\".\"Survey.SurveyQuestions\" where \"SkipToIdPage\"=?) + (select count(*) from \"SURVEYROCKS\".\"Survey.SurveyImages\" where \"SkipToIdPage\"=?) from dummy";

//	"select count(*) from \"SURVEYROCKS\".\"Survey.SurveyOptions\" where \"SkipToIdPage\"=?";



var checkIsSkippingReference=function(IdSurveyPage){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();
	var statement = null,resultSet = null,temp;
	try{	
				
				statement = connection.prepareCall(statementSkippingReference);
//				statement.setInteger(1, parseInt(obj.IdSurvey,10));
				statement.setInteger(1, parseInt(IdSurveyPage,10));
				statement.setInteger(2, parseInt(IdSurveyPage,10));
				statement.setInteger(3, parseInt(IdSurveyPage,10));
				statement.execute(); 			         
				resultSet  = statement.getResultSet(); 
//					while (
							resultSet.next();
//							) { 
							temp=resultSet.getInteger(1);
			            	            		            	
//			            } 		            
			      
			 
				connection.commit();	
					
										
		} catch (e) {
		 	return e.message();

		}
	return temp;
};


var GetQuestionsOptions=function(IdSurveyQuestions){	
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
			statement = connection.prepareCall(procedureCallStatement2);	
			statement.setInteger(1, parseInt(IdSurveyQuestions,0));
			
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.IdSurveyOptions=resultSet.getString(1);
		            	resultObject.IdSurveyQuestions=resultSet.getString(2);
		            	resultObject.Description=resultSet.getNString(3);
		            	resultObject.Value=resultSet.getString(4);		            	
		            	resultObject.OptionEndSurvey=resultSet.getString(5);
		            	resultObject.ImageUrl=resultSet.getNString(6);
		            	resultObject.TextDescription=resultSet.getNString(7);
		            	
		            	resultList.push(resultObject);		            
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				resultList.push(e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};

var GetQuestionsListBySurveyPage=function(IdSurveyPage){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[],index=1;
	try{			
			statement = connection.prepareCall(procedureCallStatement3);	
			statement.setInteger(1, parseInt(IdSurveyPage,0));			
			statement.setString(2, username);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.QuestionNo=index;
		            	resultObject.IdSurveyQuestions=resultSet.getString(1);
		            	resultObject.IdSurvey=resultSet.getString(2);
		            	resultObject.IdQuestionType=resultSet.getString(3);
		            	resultObject.Title=resultSet.getNString(4);
		            	resultObject.Description=resultSet.getNString(5);
		            	resultObject.NumberOfOptions=resultSet.getString(6);
		            	resultObject.ValueSameAsDescription=resultSet.getString(7);
		            	resultObject.RateFrom=resultSet.getString(8);
		            	resultObject.RateTo=resultSet.getString(9);
		            	resultObject.RateStep=resultSet.getString(10);
		            	resultObject.AllowCantSay=resultSet.getString(11);
		            	resultObject.Username=resultSet.getString(12);
		            	resultObject.TextAnswer=resultSet.getNString(13);
		            	resultObject.NumericAnswer=resultSet.getString(14);
		            	resultObject.QuestionsCount=resultSet.getString(15);
		            	resultObject.IsPage=resultSet.getString(16);
		            	resultObject.IdSurveyPage=resultSet.getString(17);
		            	resultObject.IsEnabled=resultSet.getInteger(19)===1?true:false;
		            	resultObject.IsSkippingQuestion=resultSet.getInteger(20)===1?true:false;
		            	resultObject.QuestionOptions=GetQuestionsOptions(resultObject.IdSurveyQuestions);
		            	resultList.push(resultObject);
		            	index++;
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				$.trace.debug(e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultList;
};

var GetQuestionsList=function(IdSurveyTypeTemp){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[],index=1;
	try{			
			statement = connection.prepareCall(procedureCallStatement1);	
			statement.setInteger(1, parseInt(obj.IdSurvey,0));
			statement.setString(2, username);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	resultObject.QuestionNo=index;
		            	resultObject.IdSurveyQuestions=resultSet.getString(1);
		            	resultObject.IdSurvey=resultSet.getString(2);
		            	resultObject.IdQuestionType=resultSet.getString(3);
		            	resultObject.Title=resultSet.getNString(4);
		            	resultObject.Description=resultSet.getNString(5);
		            	resultObject.NumberOfOptions=resultSet.getString(6);
		            	resultObject.ValueSameAsDescription=resultSet.getString(7);
		            	resultObject.RateFrom=resultSet.getString(8);
		            	resultObject.RateTo=resultSet.getString(9);
		            	resultObject.RateStep=resultSet.getString(10);
		            	resultObject.AllowCantSay=resultSet.getString(11);
		            	resultObject.Username=resultSet.getString(12);
		            	resultObject.TextAnswer=resultSet.getNString(13);
		            	resultObject.NumericAnswer=resultSet.getString(14);
		            	resultObject.QuestionsCount=resultSet.getString(15);
		            	resultObject.IsPage=resultSet.getString(16);
		            	resultObject.IdSurveyPage=resultSet.getString(17);
		            	resultObject.TypeText=resultSet.getString(18);
		            	resultObject.QuestionOrder=resultSet.getInteger(19);
		            	resultObject.IsEnabled=resultSet.getInteger(21)===1?true:false;
		            	resultObject.IsSkippingQuestion=resultSet.getInteger(22)===1?true:false;
		            	resultObject.IdSurveyType = IdSurveyTypeTemp;
		            	resultObject.QuestionOptions=GetQuestionsOptions(resultObject.IdSurveyQuestions);
		            	if(resultObject.IsPage==="1"){
		            		resultObject.PageQuestions=	GetQuestionsListBySurveyPage(resultObject.IdSurveyPage);
		            	}
		            	resultObject.IsSkippingReference = checkIsSkippingReference(resultObject.IdSurveyPage);
		            	resultList.push(resultObject);
		            	index++;
		            } 		            
		        } while (statement.getMoreResults());	       	  
				}
			}
			catch(e){
				$.trace.debug(e.message);
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
			            	resultObject.IdSurvey=resultSet.getString(1);
			            	resultObject.IdSurveyType=resultSet.getString(2);
			            	resultObject.Description=resultSet.getString(3);
			            	resultObject.DateFrom=resultSet.getString(4);
			            	resultObject.DateUntil=resultSet.getString(5);
			            	resultObject.IsAnonymous=resultSet.getString(6);
			            	resultObject.IsPublic=resultSet.getString(7);
			            	resultObject.IsActive=resultSet.getString(8);
			            	resultObject.Title=resultSet.getString(9);
			            	resultObject.IsTest=resultSet.getString(10);
			            	resultObject.Questions=GetQuestionsList();
			            } 		            
			        } while (statement.getMoreResults());	       	  
			 }
				connection.commit();	*/		
				statement = connection.prepareStatement(procedureCallStatement);	
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};			            				            				            	
	            	resultObject.IdSurvey=resultSet.getString(1);
	            	resultObject.IdSurveyType=resultSet.getString(2);
	            	resultObject.Description=resultSet.getNString(3);
	            	resultObject.DateFrom=resultSet.getString(4);
	            	resultObject.DateUntil=resultSet.getString(5);
	            	resultObject.IsAnonymous=resultSet.getString(6);
	            	resultObject.IsPublic=resultSet.getString(7);
	            	resultObject.IsActive=resultSet.getString(8);
	            	resultObject.Title=resultSet.getNString(9);
	            	resultObject.IsTest=resultSet.getString(10);
	            	resultObject.Questions=GetQuestionsList(resultObject.IdSurveyType);			
				}
				//resultObject=GetQuestionsList();	
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
			        $.response.setBody(e.toString());
			    }
			    $.response.status = $.net.http.BAD_REQUEST;

			}
		finally{
			$.SurveyRocks.services.utils.SurveyRocksUtils.close([resultSet, statement, connection]);  
		}				  		
};

CallService();