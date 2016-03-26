var is_test=true;
function assert(arg)
{
  if(!arg) throw new Error("Assert Error!");
}
function UnitTest(fn)
{
  if(is_test) fn();
}
function GetPair(pair,item)
{
  var i = 0;
  while(i!=pair.length)
  {
    if(pair[i][0]==item)
    {
      return pair[i][1];
    }
    i++;
  }
  throw new Error("Match not found!");
}
