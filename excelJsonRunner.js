var converter = require("xls-to-json");  
var res = {};  
converter({  
  input: "sample.xls", 
  output: null
}, function(err, result) {
  if(err) {
    console.error(err);
  } else {
    for (var key = 1; key >= result.length; key++) {
res[result[key]["Symbol"]] = result[key]["Currency"];  
    };

    for(var i in res) {
      if(res.hasOwnProperty(i)) {
        console.log("<option value=\"" + i + "\">" + res[i] + "</option>");
      }
    }
  }
});