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

changeColor = (e) => {
    if (element.style.backgroundColor != "#f1939c") {
        element.style.backgroundColor == "#f1939c"
    } else {
        element.style.backgroundColor == "#ffffff"
    }
}

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

CMAP = {"#ffffff":0,"#f1939c":1}
CMAP_B = {0:"#ffffff",1:"#f1939c"}

// initialize color for every tr
for (let i =0; i < tds.length; i ++){
  tds[i].style.backgroundColor = CMAP_B[hltTd[i]]
  tds[i].dataset.index = i
}

for (let i =0; i < tds.length; i ++){
    tds[i].addEventListener("click",(e) => {
      element = e.target
      color = hltTd[i]
      if (element.style.backgroundColor != 'rgb(241, 147, 156)') {
        color = "#f1939c"
      } else {
        color = "#ffffff" 
      }
      element.style.backgroundColor = color
      hltTd.splice(element.dataset.index,1,CMAP[color])
      console.log(hltTd)
      setCookie("hltTd",'[' + hltTd.toString() + ']',1800)
    })
}
