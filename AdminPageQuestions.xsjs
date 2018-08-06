/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var action = $.request.parameters.get("action");
var procedureCallStatement = "call \"AdminPageQuestions\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var procedureCallStatement2 = "call \"AdminSurveyQuestionsUpdate\"(?,?,?,?,?,?,?,?,?)";
//var procedureCallStatement3 = "call \"AdminSurveys\"(?,?,?,?,?,?,?)";

var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,isQuestionOptionSkipping;		
		try{
				if(obj.IdSurveyQuestions===0){
					statement = connection.prepareCall(procedureCallStatement);
					statement.setInteger(2,parseInt(obj.IdSurvey,0));			
					statement.setInteger(3,parseInt(obj.IdQuestionType,0));
					statement.setString(4,obj.Title);
					statement.setString(5,obj.Description);
					statement.setInteger(6,parseInt(obj.RateFrom,0));
					statement.setInteger(7,parseInt(obj.RateTo,0));
					statement.setInteger(8,parseInt(obj.RateStep,0));
					statement.setInteger(9,parseInt(obj.AllowCantSay,0));
					statement.setInteger(10,parseInt(obj.IdSurveyPage,0));
					statement.setInteger(11,parseInt(obj.IsMultiChoice,0));
					statement.setInteger(12,parseInt(obj.howManyDropdowns,0));
					if(obj.DateFrom===null){
						statement.setNull(13);
					}else{
						statement.setString(13,obj.DateFrom);
					}
					if(obj.DateTo===null){
						statement.setNull(14);

					}else{
						statement.setString(14,obj.DateTo);
					}
					statement.setInteger(15, parseInt(obj.TextareaSmall,0));
					var id_output=-1;
					statement.execute();				
					id_output = statement.getInteger(1); 
					obj.IdSurveyQuestions = id_output;
					
					connection.commit();			
					$.response.contentType = "application/json";			   
				    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
				    $.response.status = $.net.http.OK;
				    $.response.setBody(JSON.stringify(obj));
				}
				else{
					statement = connection.prepareCall(procedureCallStatement2);
					statement.setInteger(1,parseInt(obj.IdSurveyQuestions,0));
					statement.setString(2,obj.Title);
					statement.setString(3,obj.Description);
					statement.setInteger(4,parseInt(obj.AllowCantSay,0));
					if(obj.IdPageToSkip){
						statement.setInteger(5,parseInt(obj.IdPageToSkip,0));
					}else{
						statement.setInteger(5,0);
					}
					statement.setInteger(6,parseInt(obj.IsMultiChoice,0));
					statement.setInteger(7,parseInt(obj.howManyDropdowns,0));	
					statement.setInteger(9, parseInt(obj.TextareaSmall,0));
					statement.execute();
					
					isQuestionOptionSkipping = statement.getInteger(8);
					
					connection.commit();								
		            $.response.contentType = "application/json";			   
		            $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
		            $.response.status = $.net.http.OK;
		            $.response.setBody(JSON.stringify(isQuestionOptionSkipping));
				}				
							
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