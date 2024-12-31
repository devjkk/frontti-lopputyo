const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`failed to fetch data from ${url}: ${response.status} ${response.statusText}`); 
    }

    const result = await response.json();
    return result;
}

export default fetchJson;