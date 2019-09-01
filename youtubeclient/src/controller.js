import getArrOFClips from './model';
import Search from './view';

export default class Controller {
  constructor() {
    const search = new Search();
    let arrClips;
    let firstInitializationEvents = true;
    const numberOnPage = () => {
      let number;
      if (document.body.clientWidth >= 1550) {
        number = 4;
      } else if (
        document.body.clientWidth > 1159 && document.body.clientWidth < 1550) {
        number = 3;
      } else if (document.body.clientWidth < 1159 && document.body.clientWidth > 770) {
        number = 2;
      } else {
        number = 1;
      }
      return number;
    };
    const nextPageBottom = (arr) => {
      const arrPages = [...document.getElementsByClassName('circle')];
      let j = 0;
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].getAttribute('visible') === 'false') {
          j += 1;
        } else {
          break;
        }
      }
      const page = Math.ceil(j / 4 + 1);
      let indexPage;
      if (page <= 4) {
        indexPage = page - 1;
      } else {
        indexPage = (page % 4) - 1;
      }
      if (indexPage < 0) {
        indexPage = 3;
      }
      if (indexPage === 0) {
        arrPages[3].innerHTML = '';
        arrPages[3].style.background = '';
      } else {
        arrPages[indexPage - 1].innerHTML = '';
        arrPages[indexPage - 1].style.background = '';
      }
      arrPages[indexPage].innerText = page;
      arrPages[indexPage].style.background = 'orange';
    };
    const prevPageBottom = (arr) => {
      const arrPages = [...document.getElementsByClassName('circle')];
      let j = 0;
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].getAttribute('visible') === 'false') {
          j += 1;
        } else {
          break;
        }
      }
      const page = Math.ceil(j / 4 + 1);
      let indexPage;
      if (page <= 4) {
        indexPage = page - 1;
      } else {
        indexPage = (page % 4) - 1;
      }
      if (indexPage < 0) {
        indexPage = 3;
      }
      if (indexPage === 3) {
        arrPages[0].innerHTML = '';
        arrPages[0].style.background = '';
      } else {
        arrPages[indexPage + 1].innerHTML = '';
        arrPages[indexPage + 1].style.background = '';
      }
      arrPages[indexPage].innerText = page;
      arrPages[indexPage].style.background = 'orange';
    };
    const loader = () => {
      arrClips = [...search.items.getElementsByClassName('item')];
      getArrOFClips(search.contentSearch.value, search.buttonSearch.getAttribute('nextPage'))
        .then((result1) => {
          search.buttonSearch.setAttribute('nextPage', result1[0].nextPage1);
          result1.forEach((item) => {
            search.createEl(item);
          });
        });
    };
    const visibleClips = (count, clips) => {
      clips.map((elem, key, arr) => {
        if (elem.getAttribute('visible') === 'true') {
          if (arr[key + numberOnPage()]) {
            elem.setAttribute('visible', 'false');
            count += 1;// eslint-disable-line no-param-reassign
          }
        } else if (count > 0 && count <= numberOnPage()) {
          elem.setAttribute('visible', 'true');
          count += 1;// eslint-disable-line no-param-reassign
        }
        return true;
      });
    };
    const slider = () => {
      const itemsCss = getComputedStyle(search.items);
      let isDown = false;
      let startX;
      let scrollLeft;
      let startScrollLeft;
      let count = 0;
      const right = document.getElementsByClassName('right')[0];
      const left = document.getElementsByClassName('left')[0];
      const mouseDown = (e) => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = search.items.scrollLeft;// eslint-disable-line prefer-destructuring
      };
      const mouseLeave = () => {
        isDown = false;
      };
      const mouseUp = (e) => {
        const i = 0;
        isDown = false;
        arrClips = [...search.items.getElementsByClassName('item')];
        if (startX > e.pageX) {
          loader();
          visibleClips(i, arrClips);
          count += 1;
          const residue = (search.items.scrollLeft % parseInt(itemsCss.width, 10));
          startScrollLeft = search.items.scrollLeft - residue;
          const moveLeft = setInterval(() => {
            search.items.scrollLeft += 7;
            if (search.items.scrollLeft >= startScrollLeft + parseInt(itemsCss.width, 10)) {
              clearInterval(moveLeft);
              search.items.scrollLeft = parseInt(itemsCss.width, 10) * count;
            }
          }, 1);
          nextPageBottom(arrClips);
        } else {
          count -= 1;
          if (count < 0) {
            count = 0;
          }
          const reverse = arrClips;
          visibleClips(i, reverse.reverse());
          const residue1 = (search.items.scrollLeft % parseInt(itemsCss.width, 10));
          const residue = (parseInt(itemsCss.width, 10) - residue1);
          startScrollLeft = search.items.scrollLeft + residue;
          const moveRight = setInterval(() => {
            search.items.scrollLeft -= 7;
            if (search.items.scrollLeft <= startScrollLeft - parseInt(itemsCss.width, 10)) {
              clearInterval(moveRight);
              search.items.scrollLeft = parseInt(itemsCss.width, 10) * count;
            }
          }, 1);
          prevPageBottom(reverse.reverse());
        }
      };
      const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = startX - x;
        search.items.scrollLeft = scrollLeft + walk;
      };
      right.addEventListener('click', () => {
        const allClips = [...search.items.getElementsByClassName('item')];
        const i = 0;
        let clipsToInvisible = 0; // eslint-disable-line no-unused-vars
        visibleClips(i, allClips);
        loader();
        for (let k = 0; k < allClips.length; k += 1) {
          if (allClips[k].getAttribute('visible') === 'false') {
            clipsToInvisible += 1;
          } else {
            break;
          }
        }
        count += 1;
        const moveLeft = setInterval(() => {
          const inScrollLeft = search.items.scrollLeft + 7;
          search.items.scrollLeft += 7;
          if (inScrollLeft >= count * parseInt(itemsCss.width, 10)) {
            clearInterval(moveLeft);
            search.items.scrollLeft = count * parseInt(itemsCss.width, 10);
            if (search.items.scrollLeft !== count * parseInt(itemsCss.width, 10)) {
              search.items.scrollLeft = search.items.scrollWidth;
            }
          }
        }, 1);
        nextPageBottom(arrClips);
      });
      left.addEventListener('click', () => {
        const allClips = [...search.items.getElementsByClassName('item')];
        const i = 0;
        const clipsToInvisible = 0; // eslint-disable-line no-unused-vars
        count -= 1;
        if (count < 0) {
          count = 0;
          return true;
        }
        const reverseArr = allClips;
        visibleClips(i, reverseArr.reverse());
        const moveRight = setInterval(() => {
          search.items.scrollLeft -= 7;
          if (search.items.scrollLeft <= count * parseInt(itemsCss.width, 10)) {
            clearInterval(moveRight);
            search.items.scrollLeft = count * parseInt(itemsCss.width, 10);
          }
        }, 1);
        prevPageBottom(arrClips);
        return true;
      });
      if (firstInitializationEvents) {
        search.items.addEventListener('mousedown', mouseDown);
        search.items.addEventListener('mouseleave', mouseLeave);
        search.items.addEventListener('mouseup', mouseUp);
        search.items.addEventListener('mousemove', mouseMove);
        // search.items.addEventListener('wheel');
        firstInitializationEvents = false;
      }
    };
    const clips = () => {
      if (search.contentSearch.value === '') {
        return;
      }
      getArrOFClips(search.contentSearch.value)
        .then((result) => {
          // pending = false;
          search.buttonSearch.setAttribute('nextPage', result[0].nextPage1);
          result.forEach((item) => {
            search.createEl(item);
          });
          search.numberOfPages();
          arrClips = [...search.items.getElementsByClassName('item')];
          for (let i = 0; i < numberOnPage(); i += 1) {
            arrClips[i].setAttribute('visible', 'true');
          }
          slider();
          return result;
        });
    };
    const clear = () => {
      const navigation = document.getElementsByClassName('navigation');
      if (navigation[0]) {
        navigation[0].remove();
      }
      search.buttonSearch.removeAttribute('nextPage');
      [...search.items.getElementsByClassName('item')].forEach((item) => {
        item.remove();
      });
    };
    search.buttonSearch.addEventListener('click', () => {
      clear();
      clips();
    });
  }
}
