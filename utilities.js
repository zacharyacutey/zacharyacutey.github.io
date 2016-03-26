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
