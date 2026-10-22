// フォームの中身をメール本文にして、メールアプリを開く（サーバーなしで動く）
document.querySelectorAll('form.contact').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const body = [...new FormData(f)].map(([k, v]) => `【${k}】\n${v}`).join('\n\n');
  location.href = `mailto:${f.dataset.to}?subject=${encodeURIComponent(f.dataset.subject)}&body=${encodeURIComponent(body)}`;
}));
