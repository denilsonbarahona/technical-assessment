const BASE_API = "http://hn.algolia.com/api/v1/";

const filterFunction = ({
  author, story_title, story_url, created_at,
}) => ![author, story_title, story_url, created_at].includes(null);

const searchNews = (keyWord, page) => {
  const APIresponse = fetch(`${BASE_API}search_by_date?query=${keyWord}&page=${page}`)
    .then((response) => {
      if (!response.ok) { throw new Error("Error retrieving information from the server"); }

      return response.json();
    })
    .then((data) => {
      const { hits, nbPages } = data;
      const filtered = hits.filter(filterFunction);
      return { data: filtered, nbPages, isError: false };
    })
    .catch((error) => ({ isError: true, error }));
  return APIresponse;
};

export default searchNews;
