/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body,action,r;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var username = $.session.getUsername();
action = $.request.parameters.get("action");

//var procedureCallStatement = "select * from \"Survey.Survey\" order by \"IdSurvey\" desc";
//var procedureCallStatement = "select s.* from \"Survey.Survey\" as s left join \"Survey.UserAccess\" as ua on s.\"IdSurvey\" = ua.\"IdSurvey\" where s.\"Username\"=? or ua.\"Username\"=? order by \"IdSurvey\" desc";
var procedureCallStatement = "call \"AdminGetSurveyList\" (?)";
var procedureCallStatement2 = "select \"IdSurvey\", \"IdSurveyType\", \"Description\", \"DateFrom\", \"DateUntil\", \"IsAnonymous\", \"IsPublic\", \"IsActive\", \"Title\", \"SurveyTreshold\", \"IsTest\", \"Username\", \"IsArchived\", \"IdOrgStructure\", \"TextTreshold\", \"EndSurveyDescription\", \"IsMasterOrClone\", \"DisableInvitationMails\", \"Disclaimer\" from \"Survey.Survey\" where \"IdSurvey\"=?";
var procedureCallStatement3 = "call \"AdminSurveys\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var procedureCallStatmentPermanent = "call \"AdminSurveysPermanent\"(?,?,?,?,?,?)";
var procedureCallStatement4 = "call \"InsertSingleSelectedParticipant\"(?,?)";
var procedureCallStatement5 = "call \"AdminGetDraftSurveyList\" (?)";
var procedureCallStatement6 = "call \"AdminGetPublishedSurveyList\" (?)";
var procedureCallStatement7 = "call \"AdminGetCompletedSurveyList\" (?)";
var procedureCallStatement15 = "call \"AdminGetPermanentSurveyList\" (?)";
var getMasterSurveys = "call \"AdminGetMasterSurveyList\" (?)";
var deleteFromClonedSurveysTable="delete from \"SURVEYROCKS\".\"Survey.ClonedSurveys\" where \"IdSurveyClone\"=?";

//var procedureCallStatementSurveyParticipants = "select count(*) as numberParticipated from \"SURVEYROCKS\".\"Survey.SurveyParticipants\"  sp inner join \"Users.Users\" u on sp.\"Username\"=u.\"Username\" where \"IdSurvey\"=?";
var procedureCallStatementSurveyParticipants = "select count(distinct(sud.\"IdSurveyUserDefinition\")) from \"Survey.SurveyUserDefinition\" sud inner join \"Survey.SurveyAnswers\" sa on sud.\"IdSurveyUserDefinition\"=sa.\"IdSurveyUserDefinition\" where \"IdSurvey\"=? and \"IsTest\"=0";

//var procedureCallStatementSelectedParticipants = "select count(*) as numberParticipated from \"SURVEYROCKS\".\"Survey.SelectedParticipants\" sp inner join \"Users.Users\" u on sp.\"Username\"=u.\"Username\" where \"IdSurvey\"=?";
var procedureCallStatementSelectedParticipants = "select count(*) as numberParticipated from \"SURVEYROCKS\".\"Survey.SelectedParticipants\" where \"IdSurvey\"=?";

var procedureCallStatement8= "update \"Survey.Survey\" set \"IsArchived\"=1, \"IsActive\"=0, \"IsTest\"=0  where \"IdSurvey\"=?";
var procedureCallCountQuestionsForSurvey="select count(*) as \"numberQuestions\" from \"SURVEYROCKS\".\"Survey.SurveyQuestions\" where \"IdSurvey\"=?";

var procedureCallCountInvitationMail="call \"GetNotificationMail\" (?,?)";

var checkIfSurveyIsMasterOrClone = "select \"IsMasterOrClone\" from \"Survey.Survey\" where \"IdSurvey\"=?";

var checkNotificationScheduleAndUsers = "call \"CheckNotificationsForPublish\" (?)";

var CallStatementCheckInvitationMails = "select \"DisableInvitationMails\" from \"Survey.Survey\" where \"IdSurvey\"=?";

var CallStatementGetInvitationsSent = 'select count("Username") "InvitationsSent" from "Survey.SurveyNotificationsUsers" snu left join "Survey.SurveyNotifications" sn on sn."IdSurveyNotifications" = snu."IdSurveyNotifications" where "IdSurvey"=? and "IdSurveyNotificationsType" = 1 and "NotificationSent" = 1 and "IsSampleMail" = 0';

var deleteFromClonedSurvey=function(){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();
	var statement = null;
	var pom="empty";
	try{
		statement = connection.prepareStatement(deleteFromClonedSurveysTable);
		statement.setInteger(1,parseInt(obj.IdSurvey,10));
		
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

var GetNumberInvited=function(IdSurvey){	
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(procedureCallStatementSelectedParticipants);
		statement.setInteger(1, parseInt(IdSurvey,0));
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




var GetNumberParticipated=function(IdSurvey){	
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(procedureCallStatementSurveyParticipants);
		statement.setInteger(1, parseInt(IdSurvey,0));
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


var isInvitationMailChecked = function(IdSurvey){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(CallStatementCheckInvitationMails);
		statement.setInteger(1, parseInt(IdSurvey,0));
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

var GetInvitationsSent = function(IdSurvey){
	var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
	connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
	var statement = null,resultSet = null,resultObject={},resultList=[];
	try{			
		
		statement = connection.prepareStatement(CallStatementGetInvitationsSent);
		statement.setInteger(1, parseInt(IdSurvey,0));
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

var CallService=function(){			
	
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultList=[],resultObject={};		
		try{
			switch(parseInt(action,10)){
			case 1:
				statement = connection.prepareCall(procedureCallStatement);	
				statement.setNString(1,username);
				//statement.setNString(2,r.u);
				/*resultSet = statement.executeQuery();				
				while (resultSet.next()) {
					resultObject={};
					resultObject.IdSurvey=resultSet.getNString(1);
					resultObject.IdSurveyType=resultSet.getNString(2);
					resultObject.Description=resultSet.getNString(3);
					resultObject.DateFrom=resultSet.getNString(4);
					resultObject.DateUntil=resultSet.getNString(5);
					resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
					resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
					resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
					resultObject.Title=resultSet.getNString(9);
					resultObject.SurveyTreshold=resultSet.getNString(10);
					resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;					
					resultList.push(resultObject);				
				}*/
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;					
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
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
				statement = connection.prepareStatement(procedureCallStatement2);
				statement.setNString(1,obj.id);
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.IdSurvey=resultSet.getNString(1);
					resultObject.IdSurveyType=resultSet.getNString(2);
					resultObject.Description=resultSet.getNString(3);
					resultObject.DateFrom=resultSet.getNString(4);
					resultObject.DateUntil=resultSet.getNString(5);
					resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
					resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
					resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;	
					resultObject.Title=resultSet.getNString(9);
					resultObject.SurveyTreshold=resultSet.getNString(10);
					resultObject.TextTreshold=resultSet.getNString(15);
					resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;
					resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
					resultObject.EndSurveyDescription=resultSet.getNString(16);
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
				var IsAnonymousParam=0,IsPublicParam=0,IsActiveParam=0,IsTestParam=0,SurveyTresholdParam=0,TextTresholdParam=0,IsMasterOrCloneParam=0;
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
				if(obj.SurveyTreshold){
					SurveyTresholdParam=parseInt(obj.SurveyTreshold,10);
				}
				if(obj.TextTreshold){
					TextTresholdParam=parseInt(obj.TextTreshold,10);
				}
				if(obj.IsMasterOrClone){
					IsMasterOrCloneParam=parseInt(obj.IsMasterOrClone,10);
				}
				statement = connection.prepareCall(procedureCallStatement3);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				statement.setNString(2,obj.Description);
				statement.setNString(3,obj.DateFrom);
				statement.setNString(4,obj.DateUntil);
				statement.setInteger(5,IsAnonymousParam);
				statement.setInteger(6,IsPublicParam);
				statement.setInteger(7,IsActiveParam);
				statement.setNString(8,obj.Title);
				statement.setInteger(9,SurveyTresholdParam);
				statement.setInteger(10,TextTresholdParam);
				statement.setInteger(11,IsTestParam);
				statement.setNString(12,username);
				statement.setInteger(13,parseInt(obj.IdSurveyType,10));
				statement.setNString(14,obj.EndSurveyDescription);
				statement.setInteger(15,IsMasterOrCloneParam);
				if(obj.DiscriptionForDisclaimer === null || obj.IdSurveyType === 3){
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
				statement = connection.prepareCall(procedureCallStatement4);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				statement.setNString(2,username);
				resultSet = statement.execute();
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify("Admin has been inserted successfully like participant."));
				break;
			case 5:
				statement = connection.prepareCall(procedureCallStatement5);	
				statement.setNString(1,username);
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;	
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
							resultObject.EndSurveyDescription=resultSet.getNString(16);
							resultObject.IsMasterOrClone=resultSet.getInteger(17);
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
			case 6:
				statement = connection.prepareCall(procedureCallStatement6);	
				statement.setNString(1,username);
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
							resultObject.numScheduleReminders=resultSet.getInteger(18)===null?0:resultSet.getInteger(18);
							resultObject.NumberParticipated=GetNumberParticipated(resultObject.IdSurvey);
							resultObject.NumberInvited=GetNumberInvited(resultObject.IdSurvey);
							resultObject.EndSurveyDescription=resultSet.getNString(16);
							resultObject.IsMasterOrClone=resultSet.getInteger(17);
							resultObject.InvitationMails=isInvitationMailChecked(resultObject.IdSurvey);
							resultObject.InvitationsSent=GetInvitationsSent(resultObject.IdSurvey);
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
			case 7:
				statement = connection.prepareCall(procedureCallStatement7);	
				statement.setNString(1,username);
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
							resultObject.numSentReminders=resultSet.getInteger(18)===null?0:resultSet.getInteger(18);
							resultObject.counterReports=resultSet.getInteger(19)===null?0:resultSet.getInteger(19);
							resultObject.NumberParticipated=GetNumberParticipated(resultObject.IdSurvey);
							resultObject.NumberInvited=GetNumberInvited(resultObject.IdSurvey);
							resultObject.EndSurveyDescription=resultSet.getNString(16);
							resultObject.IsMasterOrClone=resultSet.getInteger(17);
							resultObject.InvitationMails=isInvitationMailChecked(resultObject.IdSurvey);
							resultObject.InvitationsSent=GetInvitationsSent(resultObject.IdSurvey);
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
			case 8:
				statement = connection.prepareStatement(procedureCallStatement8);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				var pom={};
				if(statement.execute()){  pom.archived="OK";}
				else { pom.archived="Faild";}
				if(parseInt(obj.IsMasterOrClone,10)===2&&obj.IsTest===true){
					pom.deleteClonedSurvey=deleteFromClonedSurvey();
				}
				
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(pom));
				break;
				
			case 9:
				statement = connection.prepareStatement(procedureCallStatementSelectedParticipants);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.NumberInvited=resultSet.getNString(1);
				}
				
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
				
			case 10:
				statement = connection.prepareStatement(procedureCallCountQuestionsForSurvey);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.NumberOfQuestions=resultSet.getNString(1);
				}
				
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
			case 11:
				statement = connection.prepareCall(procedureCallCountInvitationMail);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				statement.setInteger(2,parseInt(obj.IdSurveyType,10));

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
				//get master surveys
			case 12:
				statement = connection.prepareCall(getMasterSurveys);	
				statement.setNString(1,username);
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;	
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
							resultObject.EndSurveyDescription=resultSet.getNString(16);
							resultObject.IsMasterOrClone=resultSet.getInteger(17);
							resultObject.NumberOfQuestions=resultSet.getInteger(18);
							resultObject.Disclaimer=resultSet.getNString(19);
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
			case 13:
				statement = connection.prepareStatement(checkIfSurveyIsMasterOrClone);
				statement.setInteger(1,parseInt(obj.IdSurvey,10));
				
				resultSet = statement.executeQuery();
				while (resultSet.next()) {
					resultObject={};
					resultObject.IsMasterOrClone=resultSet.getInteger(1);
				}
				
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				break;
			case 14:
				var IdSurvey=0, IsActiveParamP=0, IsTestParamP=0, IsPublicParamP=0;
				statement = connection.prepareCall(procedureCallStatmentPermanent);
				statement.setNString(1, username);
				statement.setNString(2, obj.Title);
				if(obj.IdSurvey) {
					statement.setInteger(3,parseInt(obj.IdSurvey,10));
				}else {
					statement.setInteger(3,IdSurvey);
				}
				if(obj.IsActive){
					IsActiveParamP=obj.IsActive===true?1:0;
				}
				if(obj.IsTest){
					IsTestParamP=obj.IsTest===true?1:0;
				}
				if(obj.IsPublic){
					IsPublicParamP=obj.IsPublic===true?1:0;
				}
				statement.setInteger(4, IsActiveParamP);
				statement.setInteger(5, IsTestParamP);
				statement.setInteger(6, IsPublicParamP);
				
				$.trace.error('IdSurvey'+IdSurvey);
				$.trace.error('IsActiveParamP'+IsActiveParamP);
				$.trace.error('IsTestParamP'+ IsTestParamP);
				$.trace.error('IsPublicParamP'+ IsPublicParamP);
				$.trace.error('IsPublicParamP'+IsPublicParamP);

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
			case 15:
				statement = connection.prepareCall(procedureCallStatement15);	
				statement.setNString(1,username);
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
							resultObject.IsAnonymous=resultSet.getNString(6)==="1"?true:false;
							resultObject.IsPublic=resultSet.getNString(7)==="1"?true:false;
							resultObject.IsActive=resultSet.getNString(8)==="1"?true:false;
							resultObject.Title=resultSet.getNString(9);
							resultObject.SurveyTreshold=resultSet.getNString(10);
							resultObject.TextTreshold=resultSet.getNString(15);
							resultObject.IsTest=resultSet.getNString(11)==="1"?true:false;
							resultObject.IsArchived=resultSet.getNString(13)==="1"?true:false;
							resultObject.numScheduleReminders=resultSet.getInteger(18)===null?0:resultSet.getInteger(18);
							resultObject.NumberParticipated=GetNumberParticipated(resultObject.IdSurvey);
							resultObject.NumberInvited=GetNumberInvited(resultObject.IdSurvey);
							resultObject.EndSurveyDescription=resultSet.getNString(16);
							resultObject.IsMasterOrClone=resultSet.getInteger(17);
							resultObject.InvitationMails=isInvitationMailChecked(resultObject.IdSurvey);
							resultObject.InvitationsSent=GetInvitationsSent(resultObject.IdSurvey);
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
			case 16:
			statement = connection.prepareCall(checkNotificationScheduleAndUsers);	
			statement.setInteger(1,parseInt(obj.IdSurvey,10));
			if(statement.execute()) { 
		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
						resultObject.InvationEmail=resultSet.getInteger(1);
						resultObject.CountMailSchedule=resultSet.getInteger(2);
						resultObject.NotificationUser=resultSet.getInteger(3);
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