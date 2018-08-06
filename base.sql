

select * from "SURVEYROCKS"."Survey.SurveyUserDefinition"


select * from "Survey.Survey" where "IdSurvey"= 12369

--update "Survey.Survey"
set "IsTest"=1
where "IdSurvey"= 12369

select * from "Survey.Survey" where "IdSurvey"= 12348

--CREATE PROCEDURE "SURVEYROCKS"."AdminGetPermanentSurveyList" (
IN Username nvarchar(50)
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER 
	--DEFAULT SCHEMA <default_schema_name>
	 AS
BEGIN
CREATE LOCAL TEMPORARY TABLE "#temp_scheduleReminders" ("IdSurvey" INTEGER,"numScheduleReminders" INTEGER);

insert into "#temp_scheduleReminders"
select sn."IdSurvey",count(*) as "numScheduleReminders"
from "Survey.SurveyNotificationsUsers" snu 
left join "Survey.SurveyNotifications" sn 
on sn."IdSurveyNotifications"=snu."IdSurveyNotifications" 
where sn."IdSurveyNotificationsType"=2 and snu."NotificationSent"=0 and snu."IsSampleMail"=0
group by sn."IdSurvey"; 

with c as (
select s.* 
from "Survey.Survey" as s 
where s."Username"='P1942475749' and s."IsActive"=0 and s."IsTest"=0 and  s."IdSurveyType"=5 and s."IsArchived"=0

union

select s.* 
from "Survey.Survey" as s 
inner join "Survey.UserAccess" as ua on s."IdSurvey" = ua."IdSurvey" 
where ua."Username"=Username and s."IsActive"=0 and s."IsTest"=0 and  s."IdSurveyType"=5 and s."IsArchived"=0
and ua."IdSurvey" not in 
	(
	select s."IdSurvey" 
	from "Survey.Survey" as s 
	where s."Username"=Username and s."IsTest"=1 and s."IsArchived"=0
	)
)

select 
c."IdSurvey" --1
,c."IdSurveyType" --2
,c."Description" --3
,c."DateFrom" --4
,c."DateUntil" --5
,c."IsAnonymous" --6
,c."IsPublic" --7
,c."IsActive" --8
,c."Title" --9
,c."SurveyTreshold" --10
,c."IsTest" --11
,c."Username" --12
,c."IsArchived" --13
,c."IdOrgStructure" --14
,c."TextTreshold" --15
,c."EndSurveyDescription" --16
,c."IsMasterOrClone" --17
,sr."numScheduleReminders"
from c  left join "#temp_scheduleReminders" sr on c."IdSurvey"=sr."IdSurvey"
order by c."IdSurvey" desc;

DROP TABLE "#temp_scheduleReminders";


end;

call "AdminGetPermanentSurveyList"('P1942475749');



call "AdminGetPublishedSurveyList"('P1942475749')



drop PROCEDURE "SURVEYROCKS"."AdminGetPublishedSurveyList";
CREATE PROCEDURE "SURVEYROCKS"."AdminGetPublishedSurveyList" (
IN Username nvarchar(50)
)
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER 
	--DEFAULT SCHEMA <default_schema_name>
	 AS
BEGIN
CREATE LOCAL TEMPORARY TABLE "#temp_scheduleReminders" ("IdSurvey" INTEGER,"numScheduleReminders" INTEGER);

insert into "#temp_scheduleReminders"
select sn."IdSurvey",count(*) as "numScheduleReminders"
from "Survey.SurveyNotificationsUsers" snu 
left join "Survey.SurveyNotifications" sn 
on sn."IdSurveyNotifications"=snu."IdSurveyNotifications" 
where sn."IdSurveyNotificationsType"=2 and snu."NotificationSent"=0 and snu."IsSampleMail" = 0
group by sn."IdSurvey"; 

with c as (
select s.* 
from "Survey.Survey" as s 
where s."Username"=Username and (s."IsActive"=1 or(s."IsActive"=0 and s."IsTest"=0 and s."IdSurveyType"!=5)) and (s."DateUntil">= CURDATE() or s."IdSurveyType"=5)  and s."IsArchived"=0  and s."IsMasterOrClone"<>1

union

select s.* 
from "Survey.Survey" as s 
inner join "Survey.UserAccess" as ua on s."IdSurvey" = ua."IdSurvey" 
where ua."Username"=Username and (s."IsActive"=1 or(s."IsActive"=0 and s."IsTest"=0 and s."IdSurveyType"!=5)) and (s."DateUntil">= CURDATE() or s."IdSurveyType"=5)  and s."IsArchived"=0  and s."IsMasterOrClone"<>1
and ua."IdSurvey" not in 
	(
	select s."IdSurvey" 
	from "Survey.Survey" as s 
	where s."Username"=Username and s."IsTest"=1 and s."IsArchived"=0  and s."IsMasterOrClone"<>1
	)
)

select 
c."IdSurvey" --1
,c."IdSurveyType" --2
,c."Description" --3
,c."DateFrom" --4
,c."DateUntil" --5
,c."IsAnonymous" --6
,c."IsPublic" --7
,c."IsActive" --8
,c."Title" --9
,c."SurveyTreshold" --10
,c."IsTest" --11
,c."Username" --12
,c."IsArchived" --13
,c."IdOrgStructure" --14
,c."TextTreshold" --15
,c."EndSurveyDescription" --16
,c."IsMasterOrClone" --17
,sr."numScheduleReminders"
from c  left join "#temp_scheduleReminders" sr on c."IdSurvey"=sr."IdSurvey"
order by c."IdSurvey" desc;

DROP TABLE "#temp_scheduleReminders";


end;




drop PROCEDURE "SURVEYROCKS"."GetSurveyInfo";
CREATE PROCEDURE "SURVEYROCKS"."GetSurveyInfo" (
IN IdSurvey INT,
in LangLocale NVARCHAR(100))
	LANGUAGE SQLSCRIPT
	SQL SECURITY INVOKER 
	--DEFAULT SCHEMA "SURVEYROCKS"
	 AS
	 counter int;
BEGIN

	--select count(*) into counter from "Survey.Translation" where "IdSurvey"=IdSurvey and "LangLocale"=LangLocale;
	--select count(*) into counter from "Survey.ActiveTranslate" where "IdSurvey"=IdSurvey and "LanguageLocale"=LangLocale;

select case when "IsTest"=0 then (select count(*) from "Survey.ActiveTranslate" where "IdSurvey"=IdSurvey and "LanguageLocale"=LangLocale) 
else (select count(*)  from "Survey.Translation" where "IdSurvey"=IdSurvey and "LangLocale"=LangLocale) end into counter  from "SURVEYROCKS"."Survey.Survey" where "IdSurvey"=IdSurvey;

if counter = 1 then
	select s."IdSurvey",
			s."IdSurveyType",
			t."Description",
			s."DateFrom",
			s."DateUntil",
			s."IsAnonymous",
			s."IsPublic",
			s."IsActive",
			t."Title",
			s."IsTest" ,
			t."EndDescription",
			t."Disclaimer",
			s."SurveyTreshold",
			s."TextTreshold"

	from "Survey.Survey" s 
	left join "Survey.Translation" t on s."IdSurvey"=t."IdSurvey" and t."LangLocale"=LangLocale
	where s."IdSurvey"=IdSurvey;
	
	else
	
	select s."IdSurvey",
			s."IdSurveyType",
			s."Description",
			s."DateFrom",
			s."DateUntil",
			s."IsAnonymous",
			s."IsPublic",
			s."IsActive",
			s."Title",
			s."IsTest" ,
			s."EndSurveyDescription",
			s."Disclaimer",
			s."SurveyTreshold",
			s."TextTreshold"

	from "Survey.Survey" s
	where s."IdSurvey"=IdSurvey;
	
	end if;
	
	END;