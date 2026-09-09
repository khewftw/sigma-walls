"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

const apartments = [
  { title: "Детская", note: "Целый мир на одной стене", image: "/images/gallery/child-room-interior.png", alt: "Визуализация детской с натяжной стеной", cost: "214 000 ₽", install: "1 день", material: "Печать по текстильной основе", solution: "Полотно с изображением" },
  { title: "Спальня", note: "Тихий фон за изголовьем", image: "/images/gallery/bedroom-interior.png", alt: "Визуализация спальни с натяжной стеной", cost: "248 000 ₽", install: "1 день", material: "Мягкое объёмное переплетение", solution: "Фактурная ткань" },
  { title: "Гостиная", note: "Свет, воздух и простота", image: "/images/gallery/living-room-interior.png", alt: "Визуализация гостиной с натяжными стенами", cost: "312 000 ₽", install: "2 дня", material: "Мелкое ровное переплетение", solution: "Однотонное полотно" },
  { title: "Кабинет", note: "Спокойная рабочая плоскость", image: "/images/gallery/office-interior.png", alt: "Визуализация кабинета с натяжной стеной", cost: "196 000 ₽", install: "1 день", material: "Льняное переплетение", solution: "Акцентная стена" },
  { title: "Гостиная", note: "Мягкий свет по периметру", image: "/images/living-room-v2.webp", alt: "Светлая гостиная с натяжными стенами — визуализация", cost: "287 000 ₽", install: "2 дня", material: "Мелкое ровное переплетение", solution: "Однотонное полотно" },
  { title: "Спальня", note: "Спокойная текстильная плоскость", image: "/images/bedroom.webp", alt: "Спальня с текстильной стеной — визуализация", cost: "236 000 ₽", install: "1 день", material: "Мягкое объёмное переплетение", solution: "Фактурная ткань" },
  { title: "Детская", note: "Сюжет и фактура на одной стене", image: "/images/child-room.webp", alt: "Детская с натяжной стеной — визуализация", cost: "228 000 ₽", install: "1 день", material: "Печать по текстильной основе", solution: "Полотно с изображением" },
  { title: "Гостиная", note: "Ровная светлая поверхность", image: "/images/living-room.webp", alt: "Гостиная с текстильными стенами — визуализация", cost: "274 000 ₽", install: "2 дня", material: "Мелкое ровное переплетение", solution: "Однотонное полотно" },
];

const rooms = [
  { tab: "Детская", tabNote: "Целый мир на одной стене", title: "Целый маленький мир на одной стене", image: "/images/gallery/child-room-interior.png", material: "/images/gallery/child-room-material.png", tone: "Пастельный голубой и шалфей", texture: "Печать по текстильной основе", type: "Полотно с изображением", desc: "Нежный лесной сюжет задаёт настроение комнаты и сохраняет тактильную фактуру ткани." },
  { tab: "Спальня", tabNote: "Тихий фон за изголовьем", title: "Тихая палитра для личного пространства", image: "/images/gallery/bedroom-interior.png", material: "/images/gallery/bedroom-material.png", tone: "Тёплый песочный", texture: "Мягкое объёмное переплетение", type: "Фактурная ткань", desc: "Мягкий оттенок за изголовьем объединяет текстиль, дерево и дневной свет." },
  { tab: "Гостиная", tabNote: "Свет, воздух и простота", title: "Свет, воздух и ничего лишнего", image: "/images/gallery/living-room-interior.png", material: "/images/gallery/living-room-material.png", tone: "Молочный белый", texture: "Мелкое ровное переплетение", type: "Однотонное полотно", desc: "Светлая поверхность становится спокойным фоном для мебели и деталей интерьера." },
  { tab: "Кабинет", tabNote: "Спокойная рабочая плоскость", title: "Одна выразительная плоскость", image: "/images/gallery/office-interior.png", material: "/images/gallery/office-material.png", tone: "Светлый натуральный", texture: "Льняное переплетение", type: "Акцентная стена", desc: "Натуральная фактура собирает рабочую зону и делает интерьер визуально теплее." },
];

const wallLayers = [
  {
    tab: "Бетон",
    tabDetail: "Существующая стена",
    eyebrow: "Слой 01 / бетонная стена",
    title: "Основание остаётся внутри конструкции",
    description: "Кирпичная, бетонная или оштукатуренная стена становится основой для монтажа. Перед установкой специалист оценивает её состояние и места крепления профиля.",
    preview: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_00_27 (1).png",
    image: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_27_44 (1).png",
    alt: "Фрагмент бетонной стены — визуализация слоя основания",
  },
  {
    tab: "Основание",
    tabDetail: "Металлический профиль",
    eyebrow: "Слой 02 / металлический профиль",
    title: "Профиль задаёт точную плоскость стены",
    description: "Тонкий алюминиевый профиль крепится по периметру и формирует ровный контур. В нём фиксируется полотно, поэтому геометрия результата не зависит от мелких неровностей основания.",
    preview: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_00_29 (2).png",
    image: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_27_44 (2).png",
    alt: "Алюминиевый монтажный профиль — визуализация слоя конструкции",
  },
  {
    tab: "Утеплитель",
    tabDetail: "Изоляция и проводка",
    eyebrow: "Слой 03 / проводка и утеплитель",
    title: "Внутри можно предусмотреть дополнительный слой",
    description: "В зависимости от задачи за полотном размещают согласованный материал. Его назначение и характеристики определяются проектом — точный состав системы фиксируется до монтажа.",
    preview: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_00_29 (3).png",
    image: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_27_44 (3).png",
    alt: "Утеплитель и проводка — визуализация внутреннего слоя",
  },
  {
    tab: "Ткань",
    tabDetail: "Декоративное полотно",
    eyebrow: "Слой 04 / видимая поверхность",
    title: "Ткань отвечает за цвет, фактуру и ощущение",
    description: "Декоративное полотно натягивается в профиль и создаёт цельную ровную поверхность. Финальный оттенок и переплетение выбирают по реальным образцам материала.",
    preview: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_00_29 (4).png",
    image: "/images/layers/ChatGPT Image 8 сент. 2026 г., 20_27_44 (4).png",
    alt: "Крупное переплетение светлой ткани — визуализация декоративного слоя",
  },
];
const everyday = [
  { q: "Что происходит, если нажать на стену?", a: "Ткань — отдельный слой перед основанием. Её поведение при нажатии нужно оценить на образце выбранной системы. Попросите показать нажатие и восстановление поверхности вживую.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_09 (1).png" },
  { q: "Можно ли её поцарапать или повредить?", a: "Стойкость зависит от конкретной ткани. Перед выбором обсудите возможный контакт с острыми предметами, мебелью и когтями животных — универсальной защиты от повреждений мы не обещаем.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_10 (2).png" },
  { q: "Как убрать пятно?", a: "Способ очистки выбирают по инструкции к материалу. До согласования ткани нельзя рекомендовать воду, моющее средство или щётку для всей системы.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_10 (3).png" },
  { q: "Как установить розетки и выключатели?", a: "Расположение и узлы розеток согласовывают до монтажа. Попросите показать готовое примыкание на образце и включить эти работы в расчёт.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_11 (4).png" },
  { q: "Можно ли повесить телевизор, полку или картину?", a: "Крепление и нагрузку нужно обсудить заранее. Сама декоративная ткань не должна рассматриваться как несущая основа; способ крепления определяют для конкретной стены и предмета.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_11 (5).png" },
  { q: "Сколько места занимает конструкция?", a: "Фактический отступ зависит от профиля, состояния основания и комплектации. Его нужно измерить и указать в решении для вашей комнаты.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_12 (6).png" },
  { q: "Что делать при повреждении?", a: "Сначала оценивают участок и материал. Возможность локального ремонта или замены ткани, а также состав и стоимость работ согласовывают отдельно.", image: "/images/faq/ChatGPT Image 9 сент. 2026 г., 13_57_13 (7).png" },
];
const faq = [
  ["На какое основание можно устанавливать систему?", "Возможность монтажа определяют после оценки основания и подбора крепежа. При обращении можно начать с фотографий стен."],
  ["Нужно ли снимать старую отделку?", "Это зависит от её состояния. Необходимость демонтажа и подготовки нужно определить до составления окончательной сметы."],
  ["Подойдёт ли система для кухни и влажных помещений?", "Нужна проверка характеристик выбранной ткани и всей комплектации для конкретной зоны. Универсальную пригодность для влажных помещений не заявляем."],
  ["Как ухаживать за выбранной тканью?", "Запросите инструкцию производителя именно к выбранному артикулу: допустимые средства и способы очистки могут различаться."],
  ["Есть ли ограничения для квартир с животными?", "Расскажите о животных при подборе. Устойчивость к когтям и загрязнениям нужно оценивать по конкретному материалу, а не по названию технологии."],
  ["Чем подтверждены свойства материала?", "Свойства подтверждаются техническими документами на выбранный материал. Документы и применимость к вашей комплектации нужно проверить до заказа."],
  ["Какой срок службы и что покрывает гарантия?", "Срок службы и гарантия — разные условия. Их длительность, покрытие и исключения необходимо получить в документах на материал и монтаж до заключения договора."],
  ["В каких городах доступен монтаж?", "Сообщите ваш город по телефону +7 986 723 18 84. География монтажа пока уточняется индивидуально."],
];
function NextArrow() { return <span aria-hidden="true">↗</span>; }
function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agree) return;
    setSent(true);
  }
  if (sent) {
    return (
      <div className="lead-form">
        <a className="primary section-cta lead-form-button" href="tel:+79867231884">+7 986 723 18 84 <NextArrow /></a>
        <small>Автоматическая отправка заявок пока не подключена. Позвоните — обсудим расчёт.</small>
      </div>
    );
  }
  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <label><span className="visually-hidden">Ваше имя</span><input name="name" autoComplete="name" placeholder="Ваше имя" value={name} onChange={event => setName(event.target.value)} required/></label>
      <label><span className="visually-hidden">Номер телефона</span><input name="phone" type="tel" autoComplete="tel" placeholder="Номер телефона" value={phone} onChange={event => setPhone(event.target.value)} required/></label>
      <button className="primary section-cta lead-form-button" type="submit">Получить расчёт <NextArrow /></button>
      <label className="lead-consent">
        <input type="checkbox" name="consent" checked={agree} onChange={event => setAgree(event.target.checked)} required/>
        <span>Я согласен с <a href="/privacy">политикой конфиденциальности</a> и обработкой персональных данных для обратной связи.</span>
      </label>
    </form>
  );
}
function Questions({ items }: { items: string[][] }) {
  const [open, setOpen] = useState(0);
  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];
  return (
    <div className="faq-grid">
      {columns.map((column, columnIndex) => (
        <div className="faq-col" key={columnIndex}>
          {column.map(([q, a], localIndex) => {
            const i = columnIndex * mid + localIndex;
            const isOpen = open === i;
            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={q}>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="question-number">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                  <span className="question-plus" aria-hidden="true" />
                </button>
                <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={!isOpen}>
                  <div className="faq-answer-inner"><p>{a}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}
function ApartmentSlider() {
  const [active, setActive] = useState(0);
  const count = apartments.length;
  function move(delta: number) {
    setActive(current => (current + delta + count) % count);
  }
  function slotClass(index: number) {
    const rel = (index - active + count) % count;
    if (rel === 0) return "is-center";
    if (rel === 1) return "is-next";
    if (rel === count - 1) return "is-prev";
    return "is-away";
  }
  return <div className="apartment-slider" aria-roledescription="карусель">
    <div className="apartment-track">
      {apartments.map((item, i) => {
        const slot = slotClass(i);
        const isCenter = slot === "is-center";
        return <article key={`${item.image}-${i}`} className={`apartment-card ${slot}`} aria-hidden={!isCenter} onClick={() => { if (!isCenter) setActive(i); }}>
          <div className="apartment-card-photo"><Image src={item.image} alt={isCenter ? item.alt : ""} fill sizes="(max-width:700px) 92vw, (max-width:1200px) 58vw, 820px"/></div>
          <div className="apartment-card-body">
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            <dl className="apartment-card-facts">
              <div><dt>Стоимость ремонта</dt><dd>{item.cost}</dd></div>
              <div><dt>Монтаж</dt><dd>{item.install}</dd></div>
              <div><dt>Материал</dt><dd>{item.material}</dd></div>
              <div><dt>Решение</dt><dd>{item.solution}</dd></div>
            </dl>
            {isCenter && <a className="primary apartment-card-cta" href="tel:+79867231884" onClick={event => event.stopPropagation()}>Обсудить свой интерьер <NextArrow /></a>}
          </div>
        </article>;
      })}
    </div>
    <div className="apartment-navs">
      <button type="button" className="apartment-nav apartment-nav--prev" aria-label="Предыдущий проект" onClick={() => move(-1)}>←</button>
      <button type="button" className="apartment-nav apartment-nav--next" aria-label="Следующий проект" onClick={() => move(1)}>→</button>
    </div>
  </div>;
}

function EverydayStories() {
  const [active, setActive] = useState(0);
  const item = everyday[active];
  function selectTopic(index: number) {
    setActive(index);
  }
  return <div className="everyday-stage">
    <div className="everyday-visual" id="everyday-visual">
      {everyday.map((entry, i) => <div key={entry.q} className={`everyday-visual-frame${active === i ? " is-active" : ""}`}><Image src={entry.image} alt="" fill sizes="(max-width:700px) 100vw, 50vw"/></div>)}
    </div>
    <div className="everyday-copy">
      <h3>{item.q}</h3>
      <p>{item.a}</p>
      <div className="everyday-topics" role="tablist" aria-label="Вопросы о жизни со стенами">
        {everyday.map((entry, i) => <button key={entry.q} type="button" role="tab" aria-selected={active === i} aria-controls="everyday-visual" id={`everyday-tab-${i}`} className={active === i ? "is-active" : ""} onClick={() => selectTopic(i)} onKeyDown={event => { const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (i + 1) % everyday.length : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (i + everyday.length - 1) % everyday.length : event.key === "Home" ? 0 : event.key === "End" ? everyday.length - 1 : null; if (next === null) return; event.preventDefault(); selectTopic(next); document.getElementById(`everyday-tab-${next}`)?.focus(); }}>{entry.q}</button>)}
      </div>
    </div>
  </div>;
}

export default function LandingSections() {
  const installVideo = useRef<HTMLDialogElement>(null);
  const [room, setRoom] = useState(0);
  const [layer, setLayer] = useState(0);
  const [copyLayer, setCopyLayer] = useState(0);
  const [copyVisible, setCopyVisible] = useState(true);
  const selected = rooms[room];
  const selectedLayer = wallLayers[copyLayer];
  function selectLayer(next: number) {
    if (next === layer) return;
    setCopyVisible(false);
    setLayer(next);
  }
  function selectRoom(next: number) {
    setRoom(next);
  }
  function onRoomTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % rooms.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index + rooms.length - 1) % rooms.length : event.key === "Home" ? 0 : event.key === "End" ? rooms.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    selectRoom(next);
    document.getElementById(`room-tab-${next}`)?.focus();
  }
  useEffect(() => {
    if (layer === copyLayer) {
      setCopyVisible(true);
      return;
    }
    const swap = window.setTimeout(() => setCopyLayer(layer), 180);
    return () => window.clearTimeout(swap);
  }, [layer, copyLayer]);
  return <div className="landing-sections">
    <section className="section wrap technology-section" id="technology">
      <div className="technology-heading">
        <h2>Что такое натяжные стены?<br /><strong>Показываем изнутри.</strong></h2>
        <p>Четыре слоя одной системы — от существующего основания до поверхности, которую вы видите в интерьере.</p>
      </div>
      <div className="layer-tabs" role="tablist" aria-label="Слои натяжной стены">
        {wallLayers.map((item, i) => <button key={item.tab} type="button" role="tab" id={`layer-tab-${i}`} aria-controls="layer-panel" aria-selected={layer === i} tabIndex={layer === i ? 0 : -1} onClick={() => selectLayer(i)} onKeyDown={e => { const next = e.key === "ArrowRight" ? (i + 1) % wallLayers.length : e.key === "ArrowLeft" ? (i + wallLayers.length - 1) % wallLayers.length : e.key === "Home" ? 0 : e.key === "End" ? wallLayers.length - 1 : null; if (next !== null) { e.preventDefault(); selectLayer(next); document.getElementById(`layer-tab-${next}`)?.focus(); } }}><Image className="layer-tab-image" src={item.preview} alt="" width={72} height={72} /><span className="layer-tab-copy"><small>0{i + 1}</small><strong>{item.tab}</strong><em>{item.tabDetail}</em></span></button>)}
      </div>
      <div id="layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${layer}`} className="layer-panel">
        <div className={`layer-panel-copy${copyVisible ? "" : " is-fading"}`}>
          <span className="layer-eyebrow">{selectedLayer.eyebrow}</span>
          <h3>{selectedLayer.title}</h3>
          <p>{selectedLayer.description}</p>
          <a className="primary layer-more" href="#material">Узнать подробнее про материал <NextArrow /></a>
        </div>
        <div className="layer-panel-visual">
          {wallLayers.map((item, i) => <div key={item.tab} className={`layer-panel-image${layer === i ? " is-active" : ""}`} aria-hidden={layer !== i}><Image src={item.image} alt={layer === i ? item.alt : ""} fill sizes="(max-width:700px) 100vw, 48vw" /></div>)}
        </div>
      </div>
    </section>

    <section className="section scenarios-section" id="scenarios"><div className="wrap">
      <h2>Для комнаты, которую<br /><strong>давно хочется обновить.</strong></h2>
      <div className="scenario-grid">{[
        ["/images/living-room-v2.webp", "Делаете ремонт в новой квартире", "Рассматриваете альтернативу выравниванию стен и привычной финишной отделке."],
        ["/images/bedroom.webp", "Обновляете спальню или гостиную", "Хотите изменить цвет и фактуру стен, сделать пространство уютнее."],
        ["/images/living-room.webp", "Оформляете акцентную стену", "Нужен выразительный участок за кроватью, диваном или в домашнем кабинете."],
      ].map(([src, title, description], i) => <article className="scenario" key={title}><div className="scenario-image"><Image src={src} alt={title + " — визуализация"} fill sizes="(max-width:700px) 100vw, 33vw"/><span>0{i + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>

    <section className="section wrap gallery-section" id="material">
      <div className="section-heading-row">
        <h2>Выберите, как будут<br /><strong>выглядеть ваши стены.</strong></h2>
        <p>Детская, спальня, гостиная или кабинет — ткань может остаться тихим фоном или стать главным акцентом комнаты. Листайте интерьеры и выбирайте настроение: цвет и фактуру подберём по реальным образцам.</p>
      </div>
      <div className="gallery-stage">
        <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${room}`} className="gallery-photo">
          <Image src={selected.image} alt={selected.title + " — визуализация"} width={1536} height={1024} sizes="(max-width:700px) calc(100vw - 36px), min(1080px, 58vw)" style={{ width: "100%", height: "auto" }}/>
          <div className="gallery-glaze">
            <div className="gallery-glaze-copy">
              <span className="gallery-glaze-kicker">{selected.tab}</span>
              <h3>{selected.title}</h3>
              <p>{selected.desc}</p>
            </div>
            <div className="gallery-glaze-material">
              <a className="gallery-material-link" href="tel:+79867231884" aria-label="Обсудить похожий вариант">
                <Image src={selected.material} alt={`Фактура материала для варианта «${selected.tab}»`} width={140} height={180}/>
                <span className="gallery-material-arrow" aria-hidden="true">↗</span>
              </a>
              <dl>
                <div><dt>Оттенок</dt><dd>{selected.tone}</dd></div>
                <div><dt>Фактура</dt><dd>{selected.texture}</dd></div>
                <div><dt>Тип решения</dt><dd>{selected.type}</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <div className="gallery-previews" role="tablist" aria-label="Тип интерьера">
          {rooms.map((item, i) => (
            <button key={item.tab} type="button" role="tab" id={`room-tab-${i}`} aria-controls="room-panel" aria-selected={room === i} tabIndex={room === i ? 0 : -1} className="gallery-preview" onClick={() => selectRoom(i)} onKeyDown={event => onRoomTabKeyDown(event, i)}>
              <span className="gallery-preview-thumb"><Image src={item.image} alt="" fill sizes="120px"/></span>
              <span className="gallery-preview-copy">
                <strong>{item.tab}</strong>
                <em>{item.tabNote}</em>
                <span className="gallery-preview-action">Посмотреть <span aria-hidden="true">→</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="section value-section" id="benefits"><div className="wrap"><h2>Что меняется<br /><strong>вместе со стенами.</strong></h2><div className="value-grid">{[
      { image: "/images/name-block/time.png", title: "Меньше ожидания между этапами отделки", text: "Новая видимая плоскость формируется тканью на каркасе. Срок подготовки и монтажа рассчитывается для конкретной комнаты.", note: "Срок — в индивидуальной смете" },
      { image: "/images/name-block/hz.png", title: "Ровная видимая поверхность", text: "Оцените фактуру при боковом освещении и рассмотрите углы и примыкания. Именно детали помогают выбрать отделку осознанно.", note: "Рассмотреть материал крупным планом", href: "#material" },
      { image: "/images/name-block/noise.png", title: "Акустический комфорт", text: "Влияние системы на эхо зависит от её состава. Это отдельный вопрос от изоляции шума соседей; эффект нужно подтверждать для выбранной комплектации.", note: "Характеристики — по документам" },
      { image: "/images/name-block/layers.png", title: "Новый интерьер с заменой ткани", text: "Цвет и фактуру можно обновить заменой декоративного слоя. Какие элементы сохраняются и сколько стоит замена, согласовывают после оценки системы.", note: "Условия замены — до заказа" },
    ].map(item => <article key={item.title}><span className="value-icon"><Image src={item.image} alt="" width={240} height={240} /></span><div><h3>{item.title}</h3><p>{item.text}</p>{item.href ? <a href={item.href}>{item.note} ↗</a> : <small>{item.note}</small>}</div></article>)}</div></div></section>

    <section className="section everyday-section" id="everyday">
      <div className="wrap">
        <div className="everyday-heading">
          <h2>Красиво на фото.<br /><strong>А как это в жизни?</strong></h2>
          <p>Нажатие, пятно, розетка, телевизор — то, что обычно выясняют уже на объекте.</p>
        </div>
        <EverydayStories />
      </div>
    </section>

    <section className="catalog-cta-section" id="catalog">
      <div className="catalog-cta-bg">
        <Image className="catalog-cta-photo catalog-cta-photo--desktop" src="/images/cta.png" alt="" fill sizes="100vw"/>
        <Image className="catalog-cta-photo catalog-cta-photo--mobile" src="/images/cta-mobile.png" alt="" fill sizes="100vw"/>
      </div>
      <div className="wrap">
        <div className="catalog-cta-copy">
          <h2>— Получите каталог<br />натяжных стен<br /><strong>для вашего интерьера</strong></h2>
          <p>Посмотрите оттенки, фактуры и готовые комнаты — и решите, какие стены хотите увидеть у себя. Каталог бесплатный, без обязательств.</p>
          <a className="primary section-cta catalog-cta-button" href="tel:+79867231884">Получить каталог бесплатно <NextArrow /></a>
        </div>
      </div>
    </section>

    <section className="section install-section" id="install">
      <div className="wrap">
        <div className="section-heading-row">
          <h2>Как установить<br /><strong>натяжные стены.</strong></h2>
          <p>Рассказываем, как установить готовые стены за 1 день.</p>
        </div>
        <div className="install-layout">
          <div className="install-visual">
            <Image src="/images/tutorial-preview.png" alt="Монтаж натяжной стены: полотно заправляют в профиль" width={1672} height={941} sizes="(max-width:700px) 100vw, 68vw" style={{width:"100%",height:"auto"}}/>
            <button type="button" className="video-orbit" aria-label="Смотреть инструкцию, как установить натяжные стены" onClick={() => installVideo.current?.showModal()}>
              <svg className="orbit-text" viewBox="0 0 180 180" aria-hidden="true"><defs><path id="install-text-circle" d="M90,90 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"/></defs><text><textPath href="#install-text-circle" textLength="382" lengthAdjust="spacing">ИНСТРУКЦИЯ, КАК ЭТО УСТАНОВИТЬ · SIGMA · </textPath></text></svg>
              <span className="orbit-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg></span>
            </button>
          </div>
          <div className="install-copy">
            <h3>Как всё собирается по понятной схеме</h3>
            <p>Всё собирается по понятной схеме: легко, быстро и без долгой подготовки стен. Ошибиться сложно — с системой разберётся даже тот, кто видит натяжные стены впервые.</p>
            <a className="primary section-cta install-cta" href="tel:+79867231884">Рассчитать стоимость стен <NextArrow /></a>
          </div>
        </div>
      </div>
      <dialog className="video-dialog" ref={installVideo} aria-labelledby="install-video-title" onClick={event => { if (event.target === event.currentTarget) installVideo.current?.close(); }}>
        <button className="close" type="button" aria-label="Закрыть видео" onClick={() => installVideo.current?.close()}>×</button>
        <h2 id="install-video-title">Как установить натяжные стены</h2>
        <div className="video-placeholder"><span>▷</span><p>Видео скоро появится</p></div>
        <p>Каркас задаёт плоскость, полотно заправляется в профиль. Последовательность простая — её как раз показывает эта инструкция.</p>
        <a className="header-cta" href="tel:+79867231884" onClick={() => installVideo.current?.close()}>Рассчитать стоимость стен</a>
      </dialog>
    </section>

    <section className="section projects-slider-section" id="projects">
      <div className="wrap projects-slider-heading">
        <h2>Как натяжные стены выглядят<br /><strong>в готовых квартирах.</strong></h2>
        <p>Интерьеры на фото — визуализации. Живые объекты появятся здесь с разрешением владельцев.</p>
      </div>
      <ApartmentSlider />
    </section>

    <section className="section faq-section" id="faq">
      <div className="wrap">
        <div className="faq-heading">
          <h2>Что ещё важно знать<br /><strong>перед установкой.</strong></h2>
          <p>Каждый интерьер индивидуален. Если вопроса нет в списке — задайте его по телефону.</p>
        </div>
        <Questions items={faq}/>
        <a className="text-link faq-ask" href="tel:+79867231884">Задать свой вопрос <NextArrow /></a>
      </div>
    </section>
    <section className="lead-section" id="contact">
      <div className="lead-bg">
        <Image src="/images/intro.png" alt="" fill sizes="100vw" />
      </div>
      <div className="wrap lead-layout">
        <div className="lead-copy">
          <h2>Оставьте заявку<br />и получите расчёт<br /><strong>стоимости ваших стен.</strong></h2>
          <LeadForm />
        </div>
        <div className="lead-founder">
          <Image src="/images/founder.png" alt="Основатель Sigma с образцом профиля натяжной стены" fill sizes="(max-width:700px) 90vw, 55vw"/>
        </div>
      </div>
    </section>
  </div>;
}
