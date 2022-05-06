const BASE_API = "https://hn.algolia.com/api/v1/";

/**
 * function to filter only items in the api response that has a value in the following properties:
 * author, story_title, story_url, created_at
 */
const filterFunction = ({ author, story_title, story_url, created_at }) =>
  ![author, story_title, story_url, created_at].includes(null);

/**
 * function that makes the request for the news to the API
 * @param {*} keyWord the filter word that the API has to search for
 * @param {*} page the page we want to retrieve from the API
 * @returns a promise with the data from the API
 */
const searchNews = (keyWord, page) => {
  const APIresponse = fetch(
    `${BASE_API}search_by_date?query=${keyWord}&page=${page}`
  )
    .then((response) => {
      /**
       * if the response is not Ok we throw an error
       */
      if (!response.ok) {
        throw new Error("Error retrieving information from the server");
      }

      return response.json();
    })
    .then((data) => {
      const { hits, nbPages } = data;
      /**
       * we filter the only allowed data
       */
      const filtered = hits.filter(filterFunction);
      return { data: filtered, nbPages, isError: false };
    })
    .catch((error) => ({ isError: true, error: error.message }));
  return APIresponse;
};

export default searchNews;
