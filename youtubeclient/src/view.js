export default class Search {
  constructor() {
    this.htmlDocument = document.getElementsByTagName('html');
    this.bodyDocument = document.getElementsByTagName('body');
    this.htmlDocument.className = 'html';
    this.bodyDocument.className = 'body';
    this.headerBody = document.createElement('header');
    document.body.appendChild(this.headerBody);
    this.headerBody.innerHTML = '<h1>Youtube Client</h1>';
    this.headerBody.className = 'header';
    this.mainContent = document.createElement('main-content');
    this.mainContent.className = 'main-content';
    document.body.appendChild(this.mainContent);
    this.search = document.createElement('div');
    this.mainContent.appendChild(this.search);
    this.contentSearch = document.createElement('input');
    this.buttonSearch = document.createElement('button');
    this.items = document.createElement('div');
    this.mainContent.appendChild(this.items);
    this.search.appendChild(this.contentSearch);
    this.search.appendChild(this.buttonSearch);
    this.footer = document.createElement('footer');
    this.footer.className = 'footer';
    document.body.appendChild(this.footer);
    this.buttonSearch.className = 'button';
    this.buttonSearch.innerText = 'Search';
    this.items.className = 'items';
    this.contentSearch.className = 'input';
    this.search.className = 'searchForm';
    this.removeEl = (arr, number) => {
      for (let i = 0; i < number; i += 1) {
        arr[i].remove();
      }
    };
    this.numberOfPages = () => {
      // const pages = document.createElement('div');
      const left = document.createElement('img');
      const right = document.createElement('img');
      right.src = 'src/images/arrowRight.png';
      left.src = 'src/images/arrowLeft.png';
      const navigation = document.createElement('div');
      left.className = 'left';
      right.className = 'right';
      navigation.appendChild(left);
      this.footer.appendChild(navigation);
      navigation.className = 'navigation';
      for (let i = 0; i < 4; i += 1) {
        const page = document.createElement('div');
        page.className = 'circle';
        navigation.appendChild(page);
      }
      navigation.appendChild(right);
      const elems = document.getElementsByClassName('circle');
      const first = elems[0];
      first.innerText = '1';
      first.style.background = 'orange';
    };
  }

  createEl(obj) {
    const picture = document.createElement('div');
    picture.setAttribute('visible', false);
    picture.className = 'item';
    picture.innerHTML = `<img src=${obj.picture}>`;
    const signatureTitle = document.createElement('div');
    signatureTitle.className = 'signature';
    signatureTitle.innerHTML = `<p><a href=https://www.youtube.com/watch?v=${obj.id}>${obj.title}</a></p>`;
    const signatureAuthor = document.createElement('div');
    signatureAuthor.className = 'signatureAuthor';
    signatureAuthor.innerHTML = `<img alt="author" src=" src/images/author.png" style="position:relative;display: inline-block;top:6px;left: -10px"><span>${obj.author}</span>`;
    const signatureDate = document.createElement('div');
    signatureDate.className = 'signatureDate';
    signatureDate.innerHTML = `<img alt="date" src=" src/images/calendar.png" style="position:relative;display: inline-block;top:6px;left: -10px"><span>${obj.uploadDate.substring(0, 10)}</span>`;
    const signatureViewCount = document.createElement('div');
    signatureViewCount.className = 'signatViewCount';
    signatureViewCount.innerHTML = `<img alt="view count" src=" src/images/eye.png" style="position:relative;display: inline-block;top:14px;left: -10px"><span>${obj.viewCount}</span>`;
    const signatureVideoDescr = document.createElement('div');
    signatureVideoDescr.className = 'signatVideoDescr';
    signatureVideoDescr.innerHTML = `<span>${obj.videoDescr}</span>`;
    this.items.appendChild(picture);
    picture.appendChild(signatureTitle);
    picture.appendChild(signatureAuthor);
    picture.appendChild(signatureDate);
    picture.appendChild(signatureViewCount);
    picture.appendChild(signatureVideoDescr);
  }
}
