/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}

var procedureCallStatement = "select * from \"Codes.Country\" order by \"FullName\"";

var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultList=[],resultObject={};		
		try{			
				statement = connection.prepareStatement(procedureCallStatement);	
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.IdCountry=resultSet.getInteger(1);
					resultObject.Description=resultSet.getNString(2);
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