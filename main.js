var fs=[]; //the root object;

var append=function(this_,item){
  if(item in this_.map(function(arg){return arg[0];}))
  {
    var i=this_.map(function(arg){return arg[0];}).indexOf(item[0]);
    this_[i]=item;
  }
  else
  {
   this_[this_.length]=item;
  }
};

function WriteToFile(name,text)
{
  append(fs,[name,text]);
}

function GetFileText(name)
{
  return String(fs[fs.map(function(arg){return arg[0];}).indexOf(name)]);
}

function AppendToFile(name,text)
{
  WriteToFile(GetFileText(name)+text);
}

function DeleteFile(name)
{
  fs.splice(fs.map(function(arg){return arg[0];}).indexOf(name) , 1);
}

function WriteToUI(text)
{
  document.getElementById("ui").innerHTML=text;
}

function SaveFileEvalString(name)
{
  return "WriteToFile('"+name+"','"+GetFileText(name)+"');";
}

function SaveEvalString()
{
  var r="";
  for(var i in fs)
  {
    r+=SaveFileEvalString(fs[i][0]);
  }
  return r;
}

function CookieString()
{
  return 'eval='+SaveEvalString()+'';
}

function Save()
{
  document.cookie="expires=Wed, 1 Jan 2020 00:00:00 EST;"+CookieString();
}

function Load()
{
  if(document.cookie.length!=37&&document.cookie.length!=36)
  eval(document.cookie.substring(42,document.cookie.length-2));
}
