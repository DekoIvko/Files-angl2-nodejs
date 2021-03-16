/*global escape: true */
$.import("services","");
var obj,body,action,r;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var username = $.session.getUsername();
action = $.request.parameters.get("action");

;

v
var deleteFromClonwhere \"Ilone\"=?";


var procedureCa = "select count(distinct(sud.\"I sud inner join \\" sa on sud.\"Definition\"=sa.\"rDefinition\" where \ and \"IsTest\"=0";


var procedureCallStatementSelectedParticipants = "select count(*) as numberParticipated from \"ectedParticipants\" where =?";




var procedureCallCountInvitationMail="call \"GetNotificationMail\" (?,?)";

var checksterOrClone = "select \"IsMasterOrClone\" from \"

var checkNotificationScheduleAndUsers = "call \"CheckNotificationsForPublish\" (?)";

var CaltionMails = "select \"DisableInvitationMails\" from;

var CallStatementGetInvitationsSent = 'select count("") "InvitationsSent" froicationsUsers" snu left joifications" sn on sfications" = snu."ificationsType" = 1 and "NotificationSent" = 1 and "IsSampleMail" = 0';

var deleteFrom=function(){
	var connection = $.db.getConnection($..utils.Utils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $...utils..SchemaName).execute();
	var statement = null;
	var pom="empty";
	try{
		statement = connection.prepareStatement(delnedTable);
		statement.setInteger(1,parseInt(obj.,10));
		
		if(statement.executeQuery()){  pom="OK";}
		else { pom="Faild";}
	}
	catch(e){
		pom=e.message;
	}
	finally{
		connection.commit();
	}
	
	return pom;
	
};

var GetNumberInvited=function(){	
	var connection = $.db.getConnection($.....ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.....SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(procedureCalpants);
		statement.setInteger(1, parseInt(,0));
		resultSet = statement.executeQuery();
		while (resultSet.next()) {
			resultObject={};
			resultObject=resultSet.getInteger(1);
		
		}
			}
			catch(e){
				resultList.push(e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultObject;
};




var GetNumbrticipated=function(){	
	var connection = $.db.getConnection($.....ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.....SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(procrticipants);
		statement.setInteger(1, parseInt(,0));
		resultSet = statement.executeQuery();
		while (resultSet.next()) {
			resultObject={};
			resultObject=resultSet.getInteger(1);
		
		}
			}
			catch(e){
				resultList.push(e.message);
			}
			finally{
				connection.commit();
			}
			
			return resultObject;
};


var isInilChecked = function(){
	var connection = $.db.getConnection($.....ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.....SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(CallStatemeionMails);
		statement.setInteger(1, parseInt(,0));
		resultSet = statement.executeQuery();
		while (resultSet.next()) {
			resultObject={};
			resultObject=resultSet.getInteger(1);		
		}
	}
	catch(e){
		resultList.push(e.message);
	}
	finally{
		connection.commit();
	}
	
	return resultObject;
};

var GetInvsSent = function(){
	var connection = $.db.getConnection($.....ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.....SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(CallStateionsSent);
		statement.setInteger(1, parseInt(,0));
		resultSet = statement.executeQuery();
		while (resultSet.next()) {
			resultObject={};
			resultObject=resultSet.getInteger(1);		
		}
	}
	catch(e){
		resultList.push(e.message);
	}
	finally{
		connection.commit();
	}
	
	return resultObject;
};

var CallSce=function(){			
	
		var connection = $.db.getConnection($..services.utils..ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $..services.utils..SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultList=[],resultObject={};		
		try{
			switch(parseInt(action,10)){
			case 1:
				statement = connection.prepareCall(protement);	
				statement.setNString(1,);
				//statement.setNString(2,r.u);
				/*resultSet = statement.executeQuery();				
				while (resultSet.next()) {
					resultObject={};
					resultObject.Id=resultSet.getNString(1);
					resultObject.IdType=resultSet.getNString(2);
					resultObject.Description=resultSet.getNString(3);
					resultObject.DateFrom=resultSet.getNString(4);
					resultObject.DateUntil=resultSet.getNString(5);
					
					resultList.push(resultObject);				
				}*/
				if(statement.execute()) { 
			         
			        do { 
			        	resultSet  = statement.getResultSet(); 
			            while(resultSet.next()) { 
			            	resultObject={};

							resultObject.Description=resultSet.getNString(3);
							resultObject.DateFrom=resultSet.getNString(4);
							resultObject.DateUntil=resultSet.getNString(5);
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);;
							resultList.push(resultObject);							
			            } 		            
			        } while (statement.getMoreResults());	       	  
			 }
				connection.commit();			
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultList));
				break;
			case 2:
				statement = connection.prepareStatement(proceduement2);
				statement.setNString(1,obj.id);
				resultSet = statement.executeQuery();
				while (resultSet.next()) {

					resultObject.Description=resultSet.getNString(3);
					resultObject.DateFrom=resultSet.getNString(4);
					resultObject.DateUntil=resultSet.getNString(5);
					resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
					resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
					resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;	

					resultObject.IsMasterOrClone=resultSet.getInteger(17);
					resultObject.DisableInvitationMails=resultSet.getInteger(18);
					resultObject.Disclaimer=resultSet.getNString(19);

				}
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
			case 3:
				var IsAnonymousParam=0,IsPublicParam=0,IsActiveParam=0,IsTestParam=0,=0,TextTresholdParam=0,IsMasterOrCloneParam=0;
				if(obj.IsAnonymous){
					IsAnonymousParam=obj.IsAnonymous===true?1:0;
				}
				if(obj.IsPublic){
					IsPublicParam=obj.IsPublic===true?1:0;
				}
				if(obj.IsActive){
					IsActiveParam=obj.IsActive===true?1:0;
				}
				if(obj.IsTest){
					IsTestParam=obj.IsTest===true?1:0;
				}

				if(obj.TextTreshold){
					TextTresholdParam=parseInt(obj.TextTreshold,10);
				}
				if(obj.IsMasterOrClone){
					IsMasterOrCloneParam=parseInt(obj.IsMasterOrClone,10);
				}
				statement = connection.prepareCall(procement3);
				statement.setNString(2,obj.Description);
				statement.setNString(3,obj.DateFrom);
				statement.setNString(4,obj.DateUntil);
				statement.setInteger(5,IsAnonymousParam);
				statement.setInteger(6,IsPublicParam);
				statement.setInteger(7,IsActiveParam);
				statement.setNString(8,obj.Title);

				statement.setInteger(10,TextTresholdParam);
				statement.setInteger(11,IsTestParam);
				statement.setNString(12,username);

				statement.setInteger(15,IsMasterOrCloneParam);
				if(obj.DiscriptionForDisclaimer === null || obj.Id === 3){
					statement.setNString(16,' ');
				}else {
					statement.setNString(16,obj.DiscriptionForDisclaimer);					
				}
				 if(statement.execute()) { 
					 do {
					 resultSet  = statement.getResultSet(); 
				            while(resultSet.next()) { 
				            	resultObject={};
								resultObject=resultSet.getInteger(1);
				            } 		            
					 } while (statement.getMoreResults());
				 }

				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
			case 4:
				statement = connection.prepareCall(protement4);
				statement.setInteger(1,parseInt(obj.Id,10));
				statement.setNString(2,username);
				resultSet = statement.execute();
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify("Admin has been inserted successfully like participant."));
				break;
			case 5:
				statement = connection.prepareCall(pement5);	
				statement.setNString(1,username);
				if(statement.execute()) { 
			         
			        do { 
			        	resultSet  = statement.getResultSet(); 
			            while(resultSet.next()) { 
			            	resultObject={};
							resultObject.Id=resultSet.getNString(1);
							resultObject.IdType=resultSet.getNString(2);
							resultObject.Description=resultSet.getNString(3);
							resultObject.DateFrom=resultSet.getNString(4);
							resultObject.DateUntil=resultSet.getNString(5);
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultList.push(resultObject); 		
			            } 		             
			        } while (statement.getMoreResults());	       	  
			 }
				connection.commit();			
				$.response.contentType = "application/json";			   
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultList));
				break;


CallService();
