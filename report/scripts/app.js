function start() {
  queryCRMData();
}

var queryConfig = {
  object: "Call2_vod__c",
  fields: ["Account_vod__c", "Call_Date_vod__c", "Call_Type_vod__c"],
  where: 'Account_vod__c="001J000001PRhdyIAD"',
  sort: ['Call_Date_vod__c DESC'],
  limit: "5"
}

ds.runQuery(queryConfig).then(
  function(resp) {
    console.log(resp);
    printToScreen(resp);
  },
  function(err) {
    console.log(err);
  }
);

function printToScreen(jsonObj) {
  var test = document.getElementById("test");
  test.innerHTML = JSON.stringify(jsonObj);
}

document.addEventListener("DOMContentLoaded", function(event) {
  start();
});
