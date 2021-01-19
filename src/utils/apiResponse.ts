export const apiResponse = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, '\t'),
    };
  },
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, '\t'),
    };
  },
  _404: (body: { [key: string]: any }) => {
    return {
      statusCode: 404,
      body: JSON.stringify(body, null, '\t'),
    };
  },
  _403: (body: { [key: string]: any }) => {
    return {
      statusCode: 404,
      body: JSON.stringify(body, null, '\t'),
    };
  },
};
