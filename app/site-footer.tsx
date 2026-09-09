import { MessengerIcons } from "./messengers";
import { legalDocs, PHONE_DISPLAY, PHONE_TEL, siteNav } from "./site-nav";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <a href="/#home" className="footer-brand">
          <img src="/images/Vector.svg" alt="Sigma"/>
          <small>Натяжные стены для вашего дома</small>
        </a>
        <div className="footer-col">
          <h3>Навигация</h3>
          <nav aria-label="Навигация в подвале">
            {siteNav.map(item => <a key={item.href} href={`/${item.href}`}>{item.label}</a>)}
          </nav>
        </div>
        <div className="footer-col">
          <h3>Документы</h3>
          <nav aria-label="Документы">
            {legalDocs.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <p className="footer-note">Реквизиты и оферта появятся здесь после публикации.</p>
        </div>
        <div className="footer-col footer-contacts">
          <h3>Контакты</h3>
          <a className="footer-phone" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <MessengerIcons />
          <p>Географию монтажа уточняйте по телефону.</p>
          <p>Рабочие ссылки Telegram и WhatsApp появятся, как только их подтвердят.</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Sigma</span>
        <span>Изображения интерьеров — визуализации</span>
        <a href="/#home">Наверх ↑</a>
      </div>
    </footer>
  );
}
