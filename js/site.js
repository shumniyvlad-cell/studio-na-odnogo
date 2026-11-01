// Все кнопки ведут в бота с меткой: site_<где кнопка>[_<откуда пришёл>].
// Пока бот не заведён, ссылки остаются на личку Влада.
const CONFIG = {
  bot: '',          // юзернейм бота без @, например studio_na_odnogo_bot
  seatsLeft: 12,    // поменять, когда места начнут заканчиваться
};

(() => {
  const params = new URLSearchParams(location.search);
  if (params.get('motion') === '1') document.documentElement.classList.add('motion');

  // ?src=th или utm_source=threads превращаются в хвост метки, Telegram пускает только [A-Za-z0-9_-] и до 64 символов
  const from = (params.get('src') || params.get('utm_source') || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 20);
  if (CONFIG.bot) {
    document.querySelectorAll('[data-bot]').forEach((a) => {
      const payload = ['site', a.dataset.bot, from].filter(Boolean).join('_').slice(0, 64);
      a.href = `https://t.me/${CONFIG.bot}?start=${payload}`;
    });
  }
  document.querySelectorAll('[data-seats]').forEach((el) => { el.textContent = CONFIG.seatsLeft; });
})();
