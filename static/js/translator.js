$.getScript("//cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.js")

var lastQuery = ""
CMAP = {"#ffffff":0,"#f1939c":1}
CMAP_B = {0:"#ffffff",1:"#f1939c"}

function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

changeColor = (element) => {
  color = hltTd[i]
  if (element.style.backgroundColor != 'rgb(241, 147, 156)') {
    color = "#f1939c"
  } else {
    color = "#ffffff" 
  }
  element.style.backgroundColor = color
  hltTd.splice(element.dataset.index,1,CMAP[color])
  setCookie("hltTd",'[' + hltTd.toString() + ']',1800)
}


function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
}

translate = (e) => {
var element = e.target
var appKey = '533ff092d653a3cf';
var key = 'YDYKsi9nYTp51OAsUpV8WcOZdmJlCpsZ';//注意：暴露appSecret，有被盗用造成损失的风险
var salt = (new Date).getTime();
var curtime = Math.round(new Date().getTime()/1000);
// var query = 'happy';
var query = element.innerText
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'en';
var to = 'zh-CHS';
var str1 = appKey + truncate(query) + salt + curtime + key;
// var vocabId =  '您的用户词表ID';
//console.log('---',str1);
var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

$.ajax({
    url: 'https://openapi.youdao.com/api',
    type: 'post',
    dataType: 'jsonp',
    data: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        // vocabId: vocabId,
    },
    success: function (data) {
      changeColor(element)
      showTrans(element,data)
    } 
});
}


function insertAfter(newNode,curNode){
    curNode.parentNode.insertBefore(newNode,curNode.nextElementSibling);
}


showTrans = (element,data) => {
  transObj = document.getElementById("tmpTransPrompt")
  if (transObj != null){
    transObj.parentNode.removeChild(transObj)
  }
  if (lastQuery == data["query"] && element.style["background-color"] == "rgb(255, 255, 255)"){ // because color change earlier than this func
    lastQuery = ""
    return 0
  }
  lastQuery = data["query"]

  var prompt = document.createElement("tr")
  prompt.setAttribute("id","tmpTransPrompt")
  prompt.style["background-color"] = "#f8f5ec"
  prompt.style["padding"] = "0.3em 0.3em"

  prompt.innerHTML = ""
  if (!data.hasOwnProperty("basic")) {
    prompt.innerHTML += `<div class="trans-container">${data["translation"].slice(0,1)}</div>`
  } else {
    pronounce = `英<span>[${data["basic"]["uk-phonetic"]}]</span>美<span>[${data["basic"]["us-phonetic"]}]</span>`
    trans_container = "<ul>"
    for (var i = 0; i < data["basic"]["explains"].length; i++){
      trans_container += `<li>${data["basic"]["explains"][i]}</li>`
    }
    trans_container += "</ul>"
    prompt.innerHTML += `<div class="pronounce">${pronounce}</div><div class="trans-container">${trans_container}</div>`
  }
  prompt.innerHTML += `<a class="transDetails" href="https://dict.youdao.com/search?q=${data["query"]}&keyfrom=new-fanyi.smartResult" target="blank"> >>>more details </a>`

  colspan = element.parentNode.childElementCount
  prompt.innerHTML = `<td colspan="${colspan}">${prompt.innerHTML}</td>`

  prompt.width = element.parentNode.clientWidth
  insertAfter(prompt,element.parentNode)
}


// main

tds = document.getElementsByTagName("td")
hltTdStr = getCookie("hltTd")
if (hltTdStr == ""){
  var hltTd = new Array()
  for (var i =0; i < tds.length; i++){
    hltTd.push(0)
  }
} else {
  hltTd = eval(hltTdStr)
}


// initialize color for every tr
for (let i =0; i < tds.length; i ++){
  tds[i].style.backgroundColor = CMAP_B[hltTd[i]]
  tds[i].dataset.index = i
}

for (let i =0; i < tds.length; i ++){
  if (tds[i].className == ""){
    tds[i].addEventListener("click",translate)
  }
}
