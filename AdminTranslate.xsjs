/*global escape: true */
$.import(".services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var procedureCallStatement = "call \"AdminTranslatePage\"(?,?,?)";
var  = "select \"Title\" from \".Translation\" where \"\"=? and \"LangLocale\"='en'";
var  = "select \"Title\" from \".Translation\" where \"\"=? and \"LangLocale\"=?";

var CallService=function(){			
		var connection = $.db.getConnection($..services.utils..ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $..services.utils..SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultObject={};		
		try{
			switch(parseInt(obj.action,10)){
			
			case 1:
				statement = connection.prepareCall(procedureCallStatement);	
				
				statement.setInteger(1,parseInt(obj.,10));
				statement.setNString(2,obj.Title);		
				statement.execute();								
				connection.commit();			
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(obj));
			    break;
			case 2:
				statement = connection.prepareStatement(jkjj);
				statement.setInteger(1,parseInt(obj.,10));
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
				statement = connection.prepareStatement(get_Translate);
				statement.setInteger(1,parseInt(obj.IdPage,10));
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
			    code = $..services.utils..getStatusCode(e.message);
			    if (code && code === 301) {
			        $.response.setBody('unique constraint violated');
			    } else {
			        $.response.setBody(e.toString());
			    }
			    $.response.status = $.net.http.BAD_REQUEST;

			}
		finally{
			$..services.utils..close([resultSet, statement, connection]);  
		}				  		
};

CallService();
