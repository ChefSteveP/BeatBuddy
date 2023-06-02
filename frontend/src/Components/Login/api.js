export async function getUserTopTracks(token) {
  const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await result.json();
  return data.items.map(item => ({name: item.name, artist: item.artists[0].name}));
}

export async function getUserTopArtists(token) {
  const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await result.json();
  return data.items.map(item => ({name: item.name}));
}

  export async function getUserProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await result.json();
    return data;
  }
  