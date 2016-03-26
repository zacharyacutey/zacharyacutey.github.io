function Folder()
{
  this.contents=[];
  this.keys=function(){
    return this.contents.map(function(i){return i[0];});
  };
  this.values=function(){
    return this.contents.map(function(i){return i[1];});
  };
}
