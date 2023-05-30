const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//generates random points
const generatePoints = (count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.round(Math.random() * canvas.width),
      y: Math.round(Math.random() * canvas.height),
      id: i,
    });
  }

  return points;
};
//calculates distance between two points
const distance = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};
const points = generatePoints(POINT_COUNT);

//making distance matrix
const distMatrix = [];
for (let i = 0; i < points.length; i++) {
  distMatrix[i] = [];
  for (let j = 0; j < points.length; j++) {
    distMatrix[i][j] = distance(points[i][j]);
  }
}
//making time matrix by dividing each distance with speed
let time=[];
let speed=10;
for (let i = 0; i < points.length; i++) {
  time[i] = [];
  for (let j = 0; j < points.length; j++) {
    time[i][j] = distance(points[i][j])/speed;
  }
}
//implementing knapsack dp 
  let enjoy = [0, 5, 15, 20];
  let vis = [0, 0, 0, 0];
  let dp = [];
  
  function func(i, pre, t) {
    if (t < 0) return -Infinity;
    if (dp[i] && dp[i][pre] !== undefined) return dp[i][pre];
    if (i === 4) {
      if (t - time[pre][0] >= 0) return 0;
      return -Infinity;
    }
    
    let took = enjoy[i] + func(i + 1, i, t - time[pre][i]);
    let noTook = func(i + 1, pre, t);
    dp[i] = dp[i] || [];
    return (dp[i][pre] = Math.max(took, noTook));
  }
  
  function main() {
    let timeLimit = 15;
    console.log(func(1, 0, timeLimit));
  }
  
  main();