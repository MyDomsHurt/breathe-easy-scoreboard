(function(){
const TECH_ORDER=['Matthew','Tiago','Nick','Alun','Iggi'];
const LETTER={Matthew:'M',Tiago:'T',Nick:'N',Alun:'A',Iggi:'I'};
const TECH_COLORS={Matthew:'#2563eb',Tiago:'#0ea5e9',Nick:'#22c55e',Alun:'#a855f7',Iggi:'#f97316'};
let DATA=null,TEAM_SCALE='week',charts=[];
function fmt(n,d=0){if(n==null||isNaN(n))return'\u2014';return Number(n).toLocaleString('en-HK',{maximumFractionDigits:d,minimumFractionDigits:d});}
function techNames(){return TECH_ORDER.filter(n=>DATA.technicians[n]);}
function destroyCharts(){charts.forEach(c=>c.destroy());charts=[];}
function weekMonth(w){return(w||'').slice(0,7);}
function latestWeekKey(){const w=DATA.weeks||[];return w.length?w[w.length-1]:null;}
function currentMonthKey(){const lw=latestWeekKey();return lw?weekMonth(lw):null;}
function weekQuarter(w){if(!w)return null;const m=parseInt(w.slice(5,7),10),y=w.slice(0,4),q=Math.ceil(m/3);return y+'-Q'+q;}
function currentQuarterKey(){const lw=latestWeekKey();return lw?weekQuarter(lw):null;}
function monthLabel(k){if(!k)return'This month';const[y,m]=k.split('-');const n=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return n[parseInt(m,10)-1]+' '+y;}
function quarterLabel(k){return k?k.replace('-',' '):'This quarter';}
function techWeekRow(name,weekKey){const weeks=(DATA.technicians[name]&&DATA.technicians[name].weeks)||[];return weeks.find(x=>x.week===weekKey)||null;}
function teamWeekly(){return(DATA.weeks||[]).map((week,i)=>{let points=0,units=0,days=0,returns=0;techNames().forEach(n=>{const r=techWeekRow(n,week);if(r){points+=r.points||0;units+=r.totalUnits||0;days+=r.workday||0;returns+=r.returns||0;}});return{week,label:(DATA.weekLabels&&DATA.weekLabels[i])||week,points,units,days,returns,pointsDay:days?points/days:0};});}
function teamScaleStats(scale){const tw=teamWeekly();if(scale==='month'){const mk=currentMonthKey();const rows=tw.filter(r=>weekMonth(r.week)===mk);const points=rows.reduce((s,r)=>s+r.points,0),days=rows.reduce((s,r)=>s+r.days,0),units=rows.reduce((s,r)=>s+r.units,0),returns=rows.reduce((s,r)=>s+r.returns,0);return{points,days,units,returns,pointsDay:days?points/days:0,label:monthLabel(mk),prevPoints:null};}
if(scale==='quarter'){const qk=currentQuarterKey();const rows=tw.filter(r=>weekQuarter(r.week)===qk);const points=rows.reduce((s,r)=>s+r.points,0),days=rows.reduce((s,r)=>s+r.days,0),units=rows.reduce((s,r)=>s+r.units,0),returns=rows.reduce((s,r)=>s+r.returns,0);return{points,days,units,returns,pointsDay:days?points/days:0,label:quarterLabel(qk),prevPoints:null};}
const latest=tw[tw.length-1]||{points:0,days:0,units:0,returns:0,pointsDay:0};const prev=tw.length>1?tw[tw.length-2]:null;return{points:latest.points,days:latest.days,units:latest.units,returns:latest.returns,pointsDay:latest.pointsDay,label:latest.label||'This week',prevPoints:prev?prev.points:null};}
function techMonthPts(name){const mk=currentMonthKey();return ((DATA.technicians[name].weeks||[]).filter(w=>weekMonth(w.week)===mk).reduce((s,w)=>s+(w.points||0),0));}
function techQuarterPts(name){const qk=currentQuarterKey();return ((DATA.technicians[name].weeks||[]).filter(w=>weekQuarter(w.week)===qk).reduce((s,w)=>s+(w.points||0),0));}
function techWeekPts(name){const r=techWeekRow(name,latestWeekKey());return r?(r.points||0):0;}
function techPtsPerWeek(name, scope){
  const weeks=(DATA.technicians[name].weeks||[]);
  if(scope==='month'){const mk=currentMonthKey();const rows=weeks.filter(w=>weekMonth(w.week)===mk);const n=rows.length||1;return rows.reduce((s,w)=>s+(w.points||0),0)/n;}
  if(scope==='quarter'){const qk=currentQuarterKey();const rows=weeks.filter(w=>weekQuarter(w.week)===qk);const n=rows.length||1;return rows.reduce((s,w)=>s+(w.points||0),0)/n;}
  const n=weeks.length||1;
  return (DATA.technicians[name].totalPoints||0)/n;
}
function rankBy(mode){
  const names=techNames();
  const rows=names.map(name=>{
    const t=DATA.technicians[name];
    let value=0;
    if(mode==='month') value=techMonthPts(name);
    else if(mode==='quarter') value=techQuarterPts(name);
    else if(mode==='day') value=t.pointsDay||0;
    else if(mode==='ptsWeek') value=techPtsPerWeek(name,'all');
    else value=techWeekPts(name);
    return {name, value, color:TECH_COLORS[name], letter:LETTER[name], trend:t.trend||'Stable'};
  });
  rows.sort((a,b)=>b.value-a.value);
  return rows;
}
function badge(trend){
  const x=(trend||'Stable').toLowerCase();
  const cls=x.includes('improv')?'up':x.includes('declin')?'down':'flat';
  return `<span class="trend-badge ${cls}">${trend||'Stable'}</span>`;
}
function pct(n){if(n==null||isNaN(n))return'\u2014';return (n>=0?'+':'')+fmt(n*100,0)+'%';}
function setNav(active){document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===active));}
function assetUrl(key){const A=window.SCOREBOARD_ASSETS||{};return A[key]||'';}
function renderTeam(){destroyCharts();setNav('#/team');const scale=TEAM_SCALE||'week';const stats=teamScaleStats(scale);const tw=teamWeekly();const labels=DATA.weekLabels||tw.map(r=>r.label);const names=techNames();const ranked=rankBy(scale==='month'?'month':scale==='quarter'?'quarter':'week');const metricLabel=scale==='month'?monthLabel(currentMonthKey()):scale==='quarter'?quarterLabel(currentQuarterKey()):'This week';
let deltaClass='flat',deltaText='';if(scale==='week'&&stats.prevPoints!=null){const d=stats.points-stats.prevPoints;if(d>0.5){deltaClass='up';deltaText='\u2191 Up vs last week';}else if(d<-0.5){deltaClass='down';deltaText='\u2193 Down vs last week';}else{deltaClass='flat';deltaText='\u2192 Flat vs last week';}}
const chips=[];if(deltaText)chips.push(`<span class="hero-chip ${deltaClass}">${deltaText}</span>`);if(stats.returns===0)chips.push('<span class="hero-chip clean">Zero returns</span>');else chips.push(`<span class="hero-chip">${fmt(stats.returns)} returns</span>`);
const sky=assetUrl('skyline'),rays=assetUrl('light_rays'),splash=assetUrl('water_splash');
const scaleBtn=(id,label)=>`<button type="button" class="rank-mode-btn ${scale===id?'active':''}" data-scale="${id}">${label}</button>`;
document.getElementById('app').innerHTML=`<div class="team-grid"><div class="hero-stage"><div class="hero-stage__skyline" style="${sky?`background-image:url('${sky}')`:''}"></div><div class="hero-stage__rays" style="${rays?`background-image:url('${rays}')`:''}"></div><div class="hero-top"><div><div class="hero-brand">Breathe-Easy</div><div class="hero-brand-sub">AC CLEANING CREW \u00b7 HONG KONG</div></div></div><div class="hero-body"><div><div class="hero-chips">${chips.join('')}</div></div><div class="hero-number-col"><div class="hero-kicker">\u2726 TEAM POINTS \u00b7 ${metricLabel.toUpperCase()}</div><div class="hero-number-wrap"><div class="metric-metal metric-metal--lg">${fmt(stats.points,1)}</div>${splash?`<div class="hero-splash"><img src="${splash}" alt="" /></div>`:''}</div></div></div><div class="hero-metrics"><div class="hero-metric"><div class="hero-metric__val">${fmt(stats.pointsDay,2)}</div><div class="hero-metric__lab">Pts / day</div></div><div class="hero-metric"><div class="hero-metric__val">${fmt(stats.days)}</div><div class="hero-metric__lab">Workdays</div></div><div class="hero-metric"><div class="hero-metric__val">${fmt(stats.units)}</div><div class="hero-metric__lab">Units</div></div><div class="hero-metric"><div class="hero-metric__val">${fmt(stats.returns)}</div><div class="hero-metric__lab">Returns</div></div></div></div><div class="crew-board"><div class="crew-board__title">\uD83C\uDFC6 LEADERBOARD</div><div class="crew-board__sub">crew standings \u00b7 ${metricLabel}</div><ol class="crew-list">${ranked.map((t,i)=>`<li class="crew-row"><span class="crew-letter" style="background:${t.color}">${LETTER[t.name]||t.name[0]}</span><span class="crew-rank">${i+1}</span><a class="crew-name" href="#/tech/${t.name}">${t.name.toUpperCase()}</a><span class="crew-pts">${fmt(t.value,1)}</span></li>`).join('')}</ol><div class="crew-total"><span>TEAM TOTAL</span><span>${fmt(ranked.reduce((s,t)=>s+t.value,0),1)}</span></div></div></div><div class="rank-modes" id="team-scales">${scaleBtn('week','This Week')}${scaleBtn('month',monthLabel(currentMonthKey()))}${scaleBtn('quarter',quarterLabel(currentQuarterKey()))}</div><div class="section"><div class="section-title">Weekly performance</div><div class="chart-grid"><div class="chart-card full"><h3>What we put up each week</h3><div class="chart-wrap hero"><canvas id="c1"></canvas></div></div><div class="chart-card"><h3>This week vs last week</h3><div class="chart-wrap"><canvas id="c0"></canvas></div></div><div class="chart-card"><h3>Pts / day vs team average</h3><div class="chart-wrap"><canvas id="c2"></canvas></div></div></div></div><div class="section"><div class="section-title">Week by week</div><div class="scroll-hint">Swipe for more \u2192</div><div class="table-wrap"><table class="wide"><thead><tr><th>Week</th><th class="num">Points</th><th class="num">Pts/Day</th><th class="num">Units</th><th class="num">Workdays</th><th class="num">Returns</th></tr></thead><tbody>${tw.map(w=>`<tr><td>${w.label}</td><td class="num"><strong>${fmt(w.points,1)}</strong></td><td class="num">${fmt(w.pointsDay,2)}</td><td class="num">${fmt(w.units)}</td><td class="num">${fmt(w.days)}</td><td class="num">${fmt(w.returns)}</td></tr>`).join('')}<tr class="total-row"><td>All weeks</td><td class="num">${fmt(DATA.team.totalPoints,1)}</td><td class="num">${fmt(DATA.team.avgPointsDay,2)}</td><td class="num">${fmt(DATA.team.totalUnits)}</td><td class="num">${fmt(DATA.team.totalDays)}</td><td class="num">${fmt(tw.reduce((s,w)=>s+w.returns,0))}</td></tr></tbody></table></div></div>`;
document.getElementById('team-scales').addEventListener('click',e=>{const btn=e.target.closest('[data-scale]');if(!btn)return;TEAM_SCALE=btn.getAttribute('data-scale');renderTeam();});
const latest=tw.length-1,prev=latest>0?latest-1:-1;
charts.push(new Chart(document.getElementById('c0'),{type:'bar',data:{labels:prev>=0?[labels[prev],labels[latest]]:[labels[latest]],datasets:[{data:prev>=0?[tw[prev].points,tw[latest].points]:[tw[latest].points],backgroundColor:prev>=0?['#94a3b8','#0082C8']:['#0082C8'],borderRadius:8,barThickness:40}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(31,63,136,0.07)'}}}}}));
const avgPD=DATA.team.avgPointsDay;
charts.push(new Chart(document.getElementById('c2'),{type:'line',data:{labels,datasets:[{label:'Pts/day',data:tw.map(w=>w.pointsDay),borderColor:'#0082C8',backgroundColor:'rgba(0,130,200,0.15)',fill:true,tension:0.35,pointRadius:4,borderWidth:2.5},{label:'Avg',data:labels.map(()=>avgPD),borderColor:'#8aa0b8',borderDash:[6,4],pointRadius:0,borderWidth:1.5,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:12,font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(31,63,136,0.07)'}}}}}));
charts.push(new Chart(document.getElementById('c1'),{type:'bar',data:{labels,datasets:names.map(n=>({label:n,data:(DATA.weeks||[]).map(week=>{const r=techWeekRow(n,week);return r?r.points:0;}),backgroundColor:TECH_COLORS[n],borderRadius:4,stack:'p'}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:14}}},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,grid:{color:'rgba(31,63,136,0.07)'}}}}}));}
function renderTech(name){
  destroyCharts();
  const t=DATA.technicians[name];
  if(!t){document.getElementById('app').innerHTML='<div class="loading">Technician not found.</div>';setNav('#/team');return;}
  setNav('#/tech/'+name);
  const color=TECH_COLORS[name]||'#0082C8';
  const letter=LETTER[name]||name[0];
  const weeks=t.weeks||[];
  const unitOrder=['S','W','B','C','UC','SwG','TV','OU','EF','PAU'];
  const unitTotals=t.unitTotals||{};
  const ranked=rankBy('day');
  const rank=ranked.findIndex(x=>x.name===name)+1;
  const lead=ranked[0];
  const gap=rank===1?null:(lead.value-(t.pointsDay||0));
  const weekPts=techWeekPts(name);
  const monthPts=techMonthPts(name);
  const quarterPts=techQuarterPts(name);
  const ptsWeek=techPtsPerWeek(name,'all');
  const monthShort=monthLabel(currentMonthKey());
  const quarterShort=quarterLabel(currentQuarterKey());
  const ownAvg=t.ownAvgPointsDay!=null?t.ownAvgPointsDay:(t.pointsDay||0);
  const teamAvg=DATA.team.avgPointsDay||0;
  const labels=weeks.map(w=>w.weekLabel||w.week);
  const unitChips=unitOrder.filter(u=>(unitTotals[u]||0)>0).map(u=>`<div class="unit-chip"><div class="ut">${u}</div><div class="uv">${fmt(unitTotals[u])}</div></div>`).join('');
  document.getElementById('app').innerHTML=`
  <div class="tech-page">
    <div class="tech-hero" style="--accent:${color}">
      <div class="tech-hero-top">
        <span class="tech-letter" style="background:${color}">${letter}</span>
        <div>
          <h1 class="tech-name">${name}</h1>
          <div class="tech-rank-line">#${rank} on pts/day · ${badge(t.trend)}</div>
        </div>
      </div>
      <div class="tech-kpi-grid">
        <div class="tech-kpi"><div class="tk-val">${fmt(t.pointsDay,2)}</div><div class="tk-lab">Pts / day</div></div>
        <div class="tech-kpi"><div class="tk-val">${fmt(ptsWeek,1)}</div><div class="tk-lab">Pts / week</div></div>
        <div class="tech-kpi"><div class="tk-val">${fmt(weekPts,1)}</div><div class="tk-lab">This week</div></div>
        <div class="tech-kpi"><div class="tk-val">${fmt(monthPts,1)}</div><div class="tk-lab">${monthShort}</div></div>
        <div class="tech-kpi"><div class="tk-val">${fmt(t.totalPoints,1)}</div><div class="tk-lab">All points</div></div>
        <div class="tech-kpi"><div class="tk-val">${fmt(t.totalDays)}</div><div class="tk-lab">Workdays</div></div>
      </div>
    </div>
    <div class="section"><div class="section-title">Unit mix</div><div class="unit-chips">${unitChips||'<span class="muted">No units logged</span>'}</div></div>
    <div class="section"><div class="section-title">Weekly points</div><div class="chart-card"><div class="chart-wrap hero"><canvas id="techPts"></canvas></div></div></div>
    <div class="section"><div class="section-title">Pts / day by week</div><div class="chart-card"><div class="chart-wrap"><canvas id="techPd"></canvas></div></div></div>
    <div class="section"><div class="section-title">Week by week</div><div class="table-wrap"><table class="wide"><thead><tr><th>Week</th><th class="num">Points</th><th class="num">Pts/Day</th><th class="num">Units</th><th class="num">Days</th><th class="num">Returns</th></tr></thead><tbody>
    ${weeks.map(w=>`<tr><td>${w.weekLabel||w.week}</td><td class="num"><strong>${fmt(w.points,1)}</strong></td><td class="num">${fmt(w.pointsDay,2)}</td><td class="num">${fmt(w.totalUnits)}</td><td class="num">${fmt(w.workday)}</td><td class="num">${fmt(w.returns||0)}</td></tr>`).join('')}
    </tbody></table></div></div>
  </div>`;
  charts.push(new Chart(document.getElementById('techPts'),{type:'bar',data:{labels,datasets:[{data:weeks.map(w=>w.points||0),backgroundColor:color,borderRadius:6,barThickness:28}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(31,63,136,0.07)'}}}}}));
  charts.push(new Chart(document.getElementById('techPd'),{type:'line',data:{labels,datasets:[{label:'Pts/day',data:weeks.map(w=>w.pointsDay||0),borderColor:color,backgroundColor:color+'22',fill:true,tension:0.35,pointRadius:5,borderWidth:2.5},{label:'Own avg',data:labels.map(()=>ownAvg),borderColor:'#8aa0b8',borderDash:[6,4],pointRadius:0,borderWidth:1.5,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:12,font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(31,63,136,0.07)'}}}}}));
}
function renderCompete(){
  destroyCharts();
  setNav('#/compete');
  const boards=[
    {id:'day',title:'Pts / Day',mode:'day',fmt:(v)=>fmt(v,2)},
    {id:'ptsWeek',title:'Pts / Week',mode:'ptsWeek',fmt:(v)=>fmt(v,1)},
    {id:'week',title:'This Week',mode:'week',fmt:(v)=>fmt(v,1)},
    {id:'month',title:monthLabel(currentMonthKey()),mode:'month',fmt:(v)=>fmt(v,1)},
    {id:'quarter',title:quarterLabel(currentQuarterKey()),mode:'quarter',fmt:(v)=>fmt(v,1)}
  ];
  const weekRanked=rankBy('week');
  document.getElementById('app').innerHTML=`
  <div class="compete-page">
    <header class="compete-header">
      <div><h1 class="compete-title">Competition</h1>
      <p class="compete-sub">Rankings by efficiency and output</p></div>
    </header>
    <div class="compete-boards">
      ${boards.map(b=>{
        const ranked=rankBy(b.mode);
        return `<div class="compete-board"><h2>${b.title}</h2><ol class="crew-list">${ranked.map((t,i)=>`
          <li class="crew-row"><span class="crew-letter" style="background:${t.color}">${t.letter}</span>
          <span class="crew-rank">${i+1}</span>
          <a class="crew-name" href="#/tech/${t.name}" style="color:#0c1a33">${t.name}</a>
          <span class="crew-pts" style="color:#0c1a33">${b.fmt(t.value)}</span></li>`).join('')}</ol></div>`;
      }).join('')}
    </div>
  </div>`;
}
function route(){
  const hash=location.hash||'#/team';
  if(hash.startsWith('#/tech/')){
    const name=decodeURIComponent(hash.slice(7));
    renderTech(name);
    return;
  }
  if(hash==='#/compete'){renderCompete();return;}
  renderTeam();
}
function buildNav(){
  const links=document.getElementById('nav-links');
  const items=[['#/team','Full Team'],...TECH_ORDER.map(n=>[`#/tech/${n}`,n]),['sep'],['#/compete','Competition']];
  links.innerHTML=items.map(it=>it[0]==='sep'?'<span class="nav-sep"></span>':`<a href="${it[0]}">${it[1]}</a>`).join('');
}
async function boot(){
  buildNav();
  document.getElementById('app').innerHTML='<div class="loading">Loading scoreboard\u2026</div>';
  const res=await fetch('data/data.json?v=7');
  DATA=await res.json();
  window.addEventListener('hashchange',route);
  route();
}
window.startDashboard=function(){
  boot().catch(err=>{console.error(err);document.getElementById('app').innerHTML='<div class="loading">Failed to load data.</div>';});
};
})();
