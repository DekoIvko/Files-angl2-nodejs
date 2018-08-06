/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}

var procedureCallStatement = "select * from \"Codes.QuestionType\"";
var createSurveyApplication = 'select * from "Codes.QuestionType" where "IdQuestionType" in(1,4,5)';

var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultList=[],resultObject={};		
		try{			
				if(obj.action){
					statement = connection.prepareStatement(createSurveyApplication);
				}else{
					statement = connection.prepareStatement(procedureCallStatement);
				}
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.IdQuestionType=resultSet.getInteger(1);
					resultObject.Description=resultSet.getNString(2);
					resultObject.Code=resultSet.getString(3);
					resultObject.IsActive=resultSet.getString(4)==="1"?true:false;
					resultList.push(resultObject);				
				}
				connection.commit();			
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultList));								
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