const fetchBase = async (uri, accessToken) => {
  const res = await fetch(`https://api.spotify.com/v1/me/top/${uri}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return res.json();
};

export const fetchAll = async (accessToken) => {
  const result = {
    artistDataShortTerm: null,
    artistDataMediumTerm: null,
    artistDataLongTerm: null,
    trackDataShortTerm: null,
    trackDataMediumTerm: null,
    trackDataLongTerm: null,
  };

  const artistDataShortTerm = await fetchBase(
    "artists?time_range=short_term",
    accessToken
  );
  result.artistDataShortTerm = getNames(artistDataShortTerm);

  const artistDataMediumTerm = await fetchBase(
    "artists?time_range=medium_term",
    accessToken
  );
  result.artistDataMediumTerm = getNames(artistDataMediumTerm);

  const artistDataLongTerm = await fetchBase(
    "artists?time_range=long_term",
    accessToken
  );
  result.artistDataLongTerm = getNames(artistDataLongTerm);

  const trackDataShortTerm = await fetchBase(
    "tracks?time_range=short_term",
    accessToken
  );
  result.trackDataShortTerm = getNames(trackDataShortTerm);

  const trackDataMediumTerm = await fetchBase(
    "tracks?time_range=medium_term",
    accessToken
  );
  result.trackDataMediumTerm = getNames(trackDataMediumTerm);

  const trackDataLongTerm = await fetchBase(
    "tracks?time_range=long_term",
    accessToken
  );
  result.trackDataLongTerm = getNames(trackDataLongTerm);

  return result;
};

const getNames = (res) => {
  return res.items.map((item) => {
    if (item.external_urls && item.external_urls.spotify) {
      return {
        name: item.name,
        url: item.external_urls.spotify,
      };
    }
    return {
      name: item.name,
      url: null,
    };
  });
};
