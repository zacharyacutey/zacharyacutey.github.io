function Dictionary()
{
  this.contents=[];
  this.keys=function(){
    return this.contents.map(function(i){return i[0];});
  };
  this.values=function(){
    return this.contents.map(function(i){return i[1];});
  };
  this.access=function(key){
    var i = 0;
    while(i != this.contents.length)
    {
      if(this.keys()[i]==key)
      {
        return this.values()[i];
      }
      i++;
    }
    throw Error("Key not in Object!");
  };
  this.define=function(key,value){
    var i = 0;
    while(i != this.contents.length)
    {
      if(this.keys()[i]==key)
      {
        this.contents[i][1]=value;
        return;
      }
    }
    this.contents[this.contents.length]=[key,value];
  };
  this.del=function(key)
  {
    this.define(key,undefined);
  }
}
var Folder=Dictionary;
