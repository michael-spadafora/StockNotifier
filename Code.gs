function hourlyUpdate() {
  
      var d = new Date();
  
  if (d.getDay()<1 || d.getDay()>5){
    return;
  }
  
  if (d.getMinutes()!= 30){
    return;
  }
  
  var hrs = d.getHours();
  if (hrs <12 || hrs > 17){
    return;
  }

  
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R9neXUOwrbDw1RC1Qbl5MiTyzNWQqr0dTAQFwa0nKU0/edit#gid=1968575639")
  var sheet = SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  var data = sheet.getDataRange().getValues();
  var col = 6; //change this number to the column with the number you are comparing to the threshold
  var threshold = 5; //change this number the threshold itself
  
  var emailedNames = [];
  
  var columnDesired = 3;
  
  for (var i = 0; i < data.length; i++){
    if (data[i][col] >=threshold){
      emailedNames.push(data[i][columnDesired] + "\n");
    }
  }
    
//    var email = Session.getActiveUser().getEmail();
//  var email = "Enter your email here";
  var email = "ron@stonewoodhops.com";
    var subject = "information for " + (d.getMonth()+1) + "/" + d.getDate() + " " +d.toLocaleTimeString();
    
    var body = emailedNames;
    
    GmailApp.sendEmail(email, subject, body);
}



function newPassThreshold() {
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R9neXUOwrbDw1RC1Qbl5MiTyzNWQqr0dTAQFwa0nKU0/edit#gid=1968575639")
  var sheet = SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  var data = sheet.getDataRange().getValues();
  var col = 6; //change this number to the column with the number you are comparing to the threshold
  var colChecked = 20; //this will mark something as checked or not
  var threshold = 5; //change this number the threshold itself
  
  var emailedNames = [];
  
  var columnDesired = 3;
  
  for (var i = 0; i < data.length; i++){
    if (data[i][col] >=threshold && data[i][colChecked] != 'y'){
      emailedNames.push(data[i][columnDesired] + "\n");
      sheet.getRange(i+1,colChecked+1).setValue('y');
    }
  }
    
//    var email = Session.getActiveUser().getEmail();
//    var email = "michael.spadafora@stonybrook.edu";
  var email = "ron@stonewoodhops.com" //enter your desired email here
  
  var d = new Date();
  var subject = "information for " + (d.getMonth()+1) + "/" + d.getDate() + " " +d.toLocaleTimeString();
    
  var body = emailedNames;
  
  if (emailedNames.length>0){
    GmailApp.sendEmail(email, subject, body);
  }
    
}

function clearRecent(){
    var colChecked = 20; //this will mark something as checked or not

  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R9neXUOwrbDw1RC1Qbl5MiTyzNWQqr0dTAQFwa0nKU0/edit#gid=1968575639")
  var sheet = SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) 
    sheet.getRange(i+1,colChecked+1).setValue('');
  
  
}

