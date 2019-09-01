class Clip {
  constructor(item) {
    this.title = item.title;
    this.pictureImg = item.picture;
    this.videoDescr = item.videoDescr;
    this.author = item.author;
    this.uploadDate = item.uploadDate;
    this.viewCount = item.viewCount;
    this.id = item.id;
  }
}

export default function getArrOfClips(searchText, Page) {
  const arrOfClips = [];
  const objectOfClips = [];
  const idClips = [];
  const viewArrCount = [];
  let nextPage;
  if (!Page) {
    nextPage = '';
  } else {
    nextPage = `&pageToken=${Page}`;
  }
  return fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCXa7eVpDoaz736A6lkI55N3kn0iUXF708&part=snippet&type=video&maxResults=15&q=${searchText}${nextPage}`)
    .then(
      (response) => { // eslint-disable-line arrow-body-style
        return response.json();
      } // eslint-disable-line comma-dangle
    )
    .then((data) => {
      nextPage = data.nextPageToken;
      data.items.forEach((item) => {
        arrOfClips.push({
          title: item.snippet.title,
          picture: item.snippet.thumbnails.medium.url,
          videoDescr: item.snippet.description,
          author: item.snippet.channelTitle,
          uploadDate: item.snippet.publishedAt,
          id: item.id.videoId,
          viewCount: '',
          nextPage1: nextPage// eslint-disable-line comma-dangle
        });
      });
      arrOfClips.forEach((item) => {
        idClips.push(item.id);
      });
      const ids = idClips.join();
      return fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCXa7eVpDoaz736A6lkI55N3kn0iUXF708&id=${ids}&part=snippet,statistics`)
        .then(
          (response) => { // eslint-disable-line arrow-body-style
            return response.json();
          } // eslint-disable-line comma-dangle
        )
        .then((data1) => {
          const arr = [];
          data1.items.forEach(item => arr.push(item.statistics));
          arr.forEach(item => viewArrCount.push(item.viewCount));
          arrOfClips.forEach((elem, index) => {
            elem.viewCount = viewArrCount[index];// eslint-disable-line no-param-reassign
          });
          arrOfClips.forEach((item) => {
            objectOfClips.push(new Clip(item));
          });
          return arrOfClips;
        });
    });
}
