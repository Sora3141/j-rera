// 3 ページ共通。ページにない部品は飛ばす

// ももの角度
const $ = id => document.getElementById(id), deg = Math.PI / 180;
function draw(a) {
  const hip = [180, 160];
  const lean = a > 82 ? (a - 82) * 0.9 : a < 50 ? -(50 - a) * 0.2 : 0;           // 後ろに反る（度）
  const sh = [hip[0] - 88 * Math.sin(lean * deg) + 14, hip[1] - 88 * Math.cos(lean * deg)];
  $('torso').setAttribute('x1', hip[0]); $('torso').setAttribute('y1', hip[1]);
  $('torso').setAttribute('x2', sh[0]); $('torso').setAttribute('y2', sh[1]);
  $('head').setAttribute('cx', sh[0] - 12 * Math.sin(lean * deg) + 4); $('head').setAttribute('cy', sh[1] - 26);
  const knee = [hip[0] + 64 * Math.sin(a * deg), hip[1] + 64 * Math.cos(a * deg)];
  const foot = [knee[0] - 8, Math.min(knee[1] + 58, 270)];
  $('frontLeg').setAttribute('points', `${hip} ${knee} ${foot}`);
  $('frontArm').setAttribute('points', `${sh} ${sh[0] - 30},${sh[1] + 40} ${sh[0] - 12},${sh[1] + 72}`);
  $('backArm').setAttribute('points', `${sh} ${sh[0] + 34},${sh[1] + 30} ${sh[0] + 54},${sh[1] + 4}`);
  const power = Math.max(24, 220 - Math.abs(a - 68) * 3.2 - Math.max(0, lean) * 4);
  $('arrowLine').setAttribute('x2', 40 + power);
  const x = 40 + power + 4;
  $('arrowHead').setAttribute('d', `M${x} 40 l-14 -10 v20 z`);
  const [v, n] = a > 88 ? ['上げすぎ', '体が後ろに反って、前に進まない'] : a < 48 ? ['低すぎ', '一歩が小さく、スピードに乗らない'] : ['ちょうどいい', '体がまっすぐ、力が前に向かう'];
  $('verdict').textContent = v; $('verdictNote').textContent = n;
}
if ($('angle')) { $('angle').addEventListener('input', e => draw(+e.target.value)); draw(+$('angle').value); }

// 活動日の参加
document.querySelectorAll('.join').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') !== 'true';
  b.setAttribute('aria-pressed', on); b.textContent = on ? '参加予定' : '参加する';
}));

// 料金タブ
const tabs = [...document.querySelectorAll('[role=tab]')];
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => { x.setAttribute('aria-selected', x === t); document.getElementById(x.getAttribute('aria-controls')).hidden = x !== t; });
}));

// 申し込み（試作）
$('trial')?.addEventListener('submit', e => { e.preventDefault(); $('trialDone').style.display = 'block'; });
$('book')?.addEventListener('click', e => { e.preventDefault(); alert('試作です。本番では Square の予約画面が開きます。'); });
