/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var procedureCallStatement = "call \"AdminTranslatePage\"(?,?,?)";
var get_SurveyPageTitle = "select \"Title\" from \"Survey.Translation\" where \"IdSurveyPage\"=? and \"LangLocale\"='en'";
var get_SurveyPageTitleTranslate = "select \"Title\" from \"Survey.Translation\" where \"IdSurveyPage\"=? and \"LangLocale\"=?";

var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultObject={};		
		try{
			switch(parseInt(obj.action,10)){
			
			case 1:
				statement = connection.prepareCall(procedureCallStatement);	
				
				statement.setInteger(1,parseInt(obj.IdSurveyPage,10));
				statement.setNString(2,obj.Title);
				statement.setNString(3,obj.LanguageLocale);		
				statement.execute();								
				connection.commit();			
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(obj));
			    break;
			case 2:
				statement = connection.prepareStatement(get_SurveyPageTitle);
				statement.setInteger(1,parseInt(obj.IdSurveyPage,10));
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.Title=resultSet.getNString(1);
				}
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
			case 3:
				statement = connection.prepareStatement(get_SurveyPageTitleTranslate);
				statement.setInteger(1,parseInt(obj.IdSurveyPage,10));
				statement.setNString(2,obj.LanguageLocale);
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.Title=resultSet.getNString(1);
				}
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
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