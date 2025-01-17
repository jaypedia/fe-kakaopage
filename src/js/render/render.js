import { $, displayTodayTab, setDefaultCategory } from '../utils/util.js';
import { TITLE, today, VAL } from '../utils/constants.js';
import { SNB } from '../components/SNB.js';
import { MainBanner } from '../components/MainBanner.js';
import { DayBar } from '../components/DayBar.js';
import { WebtoonList } from '../components/WebtoonList.js';
import { ThemeBox } from '../components/ThemeBox.js';
import { ScrollBanner } from '../components/ScrollBanner.js';

const $main = $('.main');

const render = {
  webtoonPage([webtoon, category]) {
    $main.innerHTML = '';
    $main.append(SNB(category));
    setDefaultCategory({ cateName: '홈' });
    const $mainContents = document.createElement('div');
    $mainContents.classList.add('main-contents');
    $main.append($mainContents);
    this.contents(webtoon, { cateName: '홈' });
  },

  otherPage(tabName) {
    $main.innerHTML = `<div style="padding: 30px; text-align: center; font-size: 30px;">${tabName}</div>`;
  },

  webtoonList(data) {
    const $mainContents = $('.main-contents');
    const webtoonBox = $('.webtoon-box');
    $mainContents.replaceChild(WebtoonList(data), webtoonBox);
  },

  contents(data, { cateName }) {
    const content = {
      홈: data => renderContent.home(data),
      요일연재: data => renderContent.day(data),
      웹툰: data => renderContent.webtoon(data),
      소년: data => renderContent.boy(data),
      드라마: data => renderContent.drama(data),
      로맨스: data => renderContent.romance(data),
      로판: data => renderContent.roFan(data),
      액션무협: data => renderContent.action(data),
      BL: data => renderContent.BL(data),
    };

    content[cateName](data);
  },
};

const renderContent = {
  home(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  day(data) {
    renderComponent.mainBanner(data);
    renderComponent.dayBar();
  },
  webtoon(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    renderComponent.dayBar();
    $mainContents.append(displayWebtoon(data));
    $mainContents.append(displayWebtoon(data, 'promotion'));
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  boy(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  drama(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  romance(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  roFan(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  action(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
  BL(data) {
    const $mainContents = $('.main-contents');
    renderComponent.mainBanner(data);
    $mainContents.append(ThemeBox());
    $mainContents.append(ScrollBanner());
  },
};

const renderComponent = {
  mainBanner(data) {
    const $mainContents = $('.main-contents');
    $mainContents.innerHTML = '';
    const randomNum = Math.floor(Math.random() * VAL.MAX_BANNER_COUNT);
    const bannerArr = [...data];
    const pickedBanner = [];

    while (pickedBanner.length <= randomNum) {
      pickedBanner.push(
        bannerArr.splice(Math.floor(Math.random() * bannerArr.length), 1)[0]
      );
    }

    $mainContents.append(MainBanner(pickedBanner));
  },

  dayBar() {
    const $mainContents = $('.main-contents');
    $mainContents.append(DayBar());
    displayTodayTab();
  },
};

function displayWebtoon(data, header) {
  if (!header) {
    return WebtoonList(data.filter(v => v.day.includes(today)));
  }
  return WebtoonList(
    data.filter(v => v[header]),
    header,
    TITLE[header]
  );
}

export { render };
