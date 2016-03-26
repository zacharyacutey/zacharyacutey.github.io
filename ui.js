function ListDirectory()
{
  var r="",t;
  for(var i in t=fs.map(function(arg){return arg[0];}))
  {
    r+=t[i]+"<br>";
  }
  WriteToUI( r );
}
