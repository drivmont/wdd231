// Fetches the technology data from the local JSON file
export async function getTechnologies(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Could not load technologies:', error);
    return [];
  }
}
