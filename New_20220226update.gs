function bitget_all_data(apikey,secretkey,passphrase,start,end,detail = []) {
 //var apikey = SpreadsheetApp.getActive().getSheetByName('bitget設定').getRange('B8').getValue();
 //var secretkey = SpreadsheetApp.getActive().getSheetByName('bitget設定').getRange('B9').getValue();
 //var passphrase = SpreadsheetApp.getActive().getSheetByName('bitget設定').getRange('B10').getValue();
 //var start = 1641916800000
 //var end = 1655141662000
 var counter = 100
 var method = 'GET'
 var requestPath = "/api/mix/v1/order/fills"
 var url = "https://api.bitget.com"
 var midtradeId = ""
 var trade_symbol = ""
 var tradelist = [];
 var trade_list_order = 10;
 detail.push([
              "Unix時間(GMT+0)",
              "開/關倉 做多/空",
              "交易對",
              "價格",
              "數量",
              "手續費",
              "tradeId",
              "純利潤"
            ]);

while(true){
  trade_symbol = SpreadsheetApp.getActive().getSheetByName('bitget(主)').getRange('B'+String(trade_list_order)).getValue();
  //Logger.log(trade_symbol);
  if (trade_symbol == ""){
    break
  }
  trade_list_order++;
  trade_symbol = trade_symbol + "_UMCBL"/*他的交易對名字很奇怪 要加UMCBL */
  tradelist.push(trade_symbol);/*等價於python的somethinglist.append("text") */
}
Logger.log(tradelist);
Logger.log(tradelist.length);/*等價於python的len(tradelist)*/

for (var i=0 ; i<tradelist.length ; i++){
  while(counter != 0){
    counter = 0
    var date = new Date();
    var time = Math.floor((date.getTime())).toString();
    var queryString = "symbol=" + tradelist[i] + "&startTime=" + start +"&endTime=" + end + "&lastEndId=" + midtradeId//注意時間是毫秒
    var unsign = (time + method + requestPath + "?" + queryString);
    Logger.log("URL:" + unsign)
    var signed_sha256 = Utilities.computeHmacSha256Signature(unsign,secretkey);
    var blob = Utilities.newBlob(signed_sha256);
    var signed_sha256_base64 = Utilities.base64Encode(blob.getBytes());
    var options = {
       'headers': {
        'ACCESS-KEY' : apikey,
        'ACCESS-SIGN' : signed_sha256_base64,
        'ACCESS-TIMESTAMP' : time,
        'ACCESS-PASSPHRASE' : passphrase,
        'Content-Type' : 'application/json',
        'locale' : 'zh-CN'
       }
     };
     data = UrlFetchApp.fetch(url + requestPath + "?" +queryString ,options);
     Logger.log(data);
     var json = JSON.parse(data);
     Logger.log(json.data);
     if (json.data == []){
       continue;
     }
     else{
      for(var nData in json.data){
                detail.push([
                  json.data[nData].cTime,
                  json.data[nData].side,
                  json.data[nData].symbol,
                  json.data[nData].price,
                  json.data[nData].sizeQty,
                  json.data[nData].fee,
                  json.data[nData].tradeId,
                  Number(json.data[nData].profit) + Number(json.data[nData].fee)
                ]);
              counter++
      }
     }
     Logger.log(counter);
     //Logger.log(json.data[nData].tradeId);
     if (counter == 100){
      midtradeId = json.data[nData].tradeId
      continue;
       }
     else{
      midtradeId = ""
      counter = 1 //為了不要讓他再遇到沒有交易紀錄的交易對的時候跳脫while迴圈 故將它設為1 不為0
      break;
       }
    }
  }
  return detail
}

