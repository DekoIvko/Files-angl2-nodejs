/*global escape: true */
$.import(".services","utils");
var obj,body,action,action1,action2;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
//var username = $.session.getUsername();
// action = $.request.parameters.get("action");
//action1 = $.request.parameters.get("param1");
//action2 = $.request.parameters.get("param2");
//obj.param1 = action1;
//obj.param2 = action2;
$.trace.error(obj.param1)
 
var callFunction=function(){
	var connection = $.hdb.getConnection({sqlcc:".services.api::services"});
	var code = 0;		

	try{					
			var fnSell   = connection.loadProcedure('SURVEYROCKS','SendorPopUp');
			var result = fnSell(obj);

			connection.commit();			
			$.response.contentType = "application/json";
			$.response.headers.set('access-control-allow-origin','*');    
			$.response.headers.set('access-control-allow-methods','POST,GET, OPTIONS');
			$.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");  
		    $.response.status = $.net.http.OK;
		    $.response.setBody(JSON.stringify(result));	
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
};



callFunction();
 
