/*global escape: true */
$.import("SurveyRocks.services","utils");
var obj,body;
if($.request.body){
	body = $.request.body.asString();
	obj = JSON.parse(body);
}
var username = $.session.getUsername();
var action = $.request.parameters.get("action");
var procedureCallStatement1 = "call \"GetExistingSurveysForUser\"(?)";
var procedureCallStatement2="call \"InsertCopyOfSurvey\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var procedureCallStatement3="select \"Title\" from \"Survey.Survey\" where \"Title\" like ?||'%' and \"IsArchived\"=0";
var getMasterSurveys = "call \"GetExistingMasterSurveysForUser\"(?)";




var CallService=function(){			
		var connection = $.db.getConnection($.SurveyRocks.services.utils.SurveyRocksUtils.ConnectionName);  
		connection.prepareStatement("SET SCHEMA "  + $.SurveyRocks.services.utils.SurveyRocksUtils.SchemaName).execute();  
		var statement = null,resultSet = null,code = 0,resultList=[],resultObject={};		
		try{	
			
			switch(parseInt(action,10)){
			case 1:
			statement = connection.prepareCall(procedureCallStatement1);	
			statement.setNString(1, username);
			if(statement.execute()) { 		         
		        do { 
		        	resultSet  = statement.getResultSet(); 
		            while(resultSet.next()) { 
		            	resultObject={};
		            	
		            	resultObject.IdSurvey=resultSet.getInteger(1);
		            	resultObject.IdSurveyType=resultSet.getInteger(2);
		            	resultObject.Description=resultSet.getNString(3);
		            	resultObject.IsAnonymous=resultSet.getInteger(6);
		            	resultObject.IsPublic=resultSet.getInteger(7);
		            	resultObject.Title=resultSet.getNString(9);
		            	resultObject.SurveyTreshold=resultSet.getInteger(10);
		            	resultObject.IsArchived=resultSet.getInteger(13);
		            	resultObject.TextTreshold=resultSet.getInteger(15);
		            	resultObject.EndDescription=resultSet.getNString(16);
						resultObject.Disclaimer=resultSet.getNString(17);
		            	
		            	
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
				var IsAnonymousParam=0,IsArchivedParam=0,IsPublicParam=0,IsActiveParam=0,
				IsTestParam=0,SurveyTresholdParam=0,TextTresholdParam=0,Disclaimer='';
				statement = connection.prepareCall(procedureCallStatement2);
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
				if(obj.IsArchived){
					IsArchivedParam=parseInt(obj.IsArchived,10);
				}
				if(obj.IdSurveyType === 5){
					//statement.setInteger(1,parseInt(obj.IdSurvey,10));
					
					statement.setNull(2);
					statement.setNull(3);
					statement.setNull(4);
					statement.setInteger(5,IsAnonymousParam);
					statement.setInteger(6,IsPublicParam);
					statement.setInteger(7,IsActiveParam);
					statement.setNString(8,obj.Title);
					statement.setInteger(9,SurveyTresholdParam);
					statement.setInteger(10,IsTestParam);
					statement.setNString(11,username);
					statement.setInteger(12,IsArchivedParam);
					statement.setInteger(13,parseInt(obj.SelectedIdSurvey,10));
					statement.setInteger(14,TextTresholdParam);
					statement.setInteger(15,parseInt(obj.IdSurveyType,10));
					statement.setNull(16);
					statement.setInteger(17,parseInt(obj.IsMasterOrClone,10));
					statement.setNull(18);
				} else {					
					//statement.setInteger(1,parseInt(obj.IdSurvey,10));
					statement.setNString(2,obj.Description);
					statement.setNString(3,obj.DateFrom);
					statement.setNString(4,obj.DateUntil);
					statement.setInteger(5,IsAnonymousParam);
					statement.setInteger(6,IsPublicParam);
					statement.setInteger(7,IsActiveParam);
					statement.setNString(8,obj.Title);
					statement.setInteger(9,SurveyTresholdParam);
					statement.setInteger(10,IsTestParam);
					statement.setNString(11,username);
					statement.setInteger(12,IsArchivedParam);
					statement.setInteger(13,parseInt(obj.SelectedIdSurvey,10));
					statement.setInteger(14,TextTresholdParam);
					statement.setInteger(15,parseInt(obj.IdSurveyType,10));
					if(obj.EndDescription===null){
						statement.setNull(16);
					}else{
							statement.setNString(16,obj.EndDescription);
					}
					statement.setInteger(17,parseInt(obj.IsMasterOrClone,10));
					if(obj.Disclaimer !== null) {
						statement.setNString(18,obj.Disclaimer); 
					} else {
						statement.setNString(18,Disclaimer);
					}
				}
				statement.execute(); 
				var idsurvey=statement.getInteger(1);
					 resultObject={};
					resultObject.IdSurvey=idsurvey;
				connection.commit();			
				$.response.contentType = "application/json";			    
			    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
			    $.response.status = $.net.http.OK;
			    $.response.setBody(JSON.stringify(resultObject));
				
				break;
			case 3:
				statement = connection.prepareStatement(procedureCallStatement3);
				statement.setNString(1,obj.Title);
				
					resultSet = statement.executeQuery();
					while (resultSet.next()) {  
					
						resultObject={};
						resultObject.Title=resultSet.getNString(1);
						resultList.push(resultObject);
					}
				
					connection.commit();	
					$.response.contentType = "application/json";			   
				    $.response.headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
				    $.response.status = $.net.http.OK;
				    $.response.setBody(JSON.stringify(resultList));	
					break;
					
			case 4:
				statement = connection.prepareCall(getMasterSurveys);	
				statement.setString(1, username);
				if(statement.execute()) { 		         
			        do { 
			        	resultSet  = statement.getResultSet(); 
			            while(resultSet.next()) { 
			            	resultObject={};
			            	
			            	resultObject.IdSurvey=resultSet.getInteger(1);
			            	resultObject.IdSurveyType=resultSet.getInteger(2);
			            	resultObject.Description=resultSet.getNString(3);
			            	resultObject.IsAnonymous=resultSet.getInteger(6);
			            	resultObject.IsPublic=resultSet.getInteger(7);
			            	resultObject.Title=resultSet.getNString(9);
			            	resultObject.SurveyTreshold=resultSet.getInteger(10);
			            	resultObject.IsArchived=resultSet.getInteger(13);
			            	resultObject.TextTreshold=resultSet.getInteger(15);
			            	resultObject.EndDescription=resultSet.getNString(16);
							resultObject.Disclaimer=resultSet.getNString(18);
			            	
			            	
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