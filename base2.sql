

select * from "Survey.Survey" where "IdSurvey"=12431

call "GetActiveSurveysForUser"('P1942475749','en');


call "GetSurveyInfo"('12457','de');


select * from  "SURVEYROCKS"."Survey.SurveyNotificationsPermanentSurvey" where "IdSurvey"=12431

select * as "CountMailSchedule" from "SURVEYROCKS"."Survey.PermanentSurveyMailSchedule" where "IdSurvey"=12431


select  count(*)  as "CountMailSchedule",  (select count("DisableInvitationMails") from "Survey.Survey" where "IdSurvey"=12431) as "InvationEmail", (select count(*) from  "SURVEYROCKS"."Survey.SurveyNotificationsPermanentSurvey" where "IdSurvey"=12431) as "notificationUser" from "SURVEYROCKS"."Survey.PermanentSurveyMailSchedule" where "IdSurvey"=12431


do
begin

declare InvationEmail int;
declare CountMailSchedule int;
declare NotificationUser int;

select "DisableInvitationMails" into InvationEmail from "Survey.Survey" where "IdSurvey"=12431;

select  count(*) into CountMailSchedule from "SURVEYROCKS"."Survey.PermanentSurveyMailSchedule" where "IdSurvey"=12431;

select count(*)  into NotificationUser from  "SURVEYROCKS"."Survey.SurveyNotificationsPermanentSurvey" where "IdSurvey"=12431;

select InvationEmail as "InvationEmail", CountMailSchedule as "CountMailSchedule", NotificationUser as "NotificationUser" from dummy;

end;





--drop procedure "SURVEYROCKS"."CheckNotificationsForPublish";

--create procedure "SURVEYROCKS"."CheckNotificationsForPublish" (
	in IdSurvey int
	)
as
InvationEmail int;
CountMailSchedule int;
NotificationUser int;

begin

select "DisableInvitationMails" into InvationEmail from "SURVEYROCKS"."Survey.Survey" where "IdSurvey"=IdSurvey;

select  count(*) into CountMailSchedule from "SURVEYROCKS"."Survey.PermanentSurveyMailSchedule" where "IdSurvey"=IdSurvey;

select count(*)  into NotificationUser from  "SURVEYROCKS"."Survey.SurveyNotificationsPermanentSurvey" where "IdSurvey"=IdSurvey;

select InvationEmail as "InvationEmail", CountMailSchedule as "CountMailSchedule", NotificationUser as "NotificationUser" from dummy;

end;






select  count(ss.*)  as "DisableInvitationMails", 
from "Survey.Survey" ss 
inner join "SURVEYROCKS"."Survey.PermanentSurveyMailSchedule" psms on ss."IdSurvey"=psms."IdSurvey"
inner join "SURVEYROCKS"."Survey.SurveyNotificationsPermanentSurvey" snps on psms."IdSurvey"=snps."IdSurvey"
where ss."IdSurvey"=12431


count psms.* as "CountMailSchedule", count snps.* as "NotificationUser" 
