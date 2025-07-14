const PIXABAY_API_KEY = '51313661-5b8349626041b9aaf7e6be6a0'; // <-- Replace with your actual API key
const PIXABAY_API_URL = 'https://pixabay.com/api/';

export async function fetchPixabayImages(query: string, perPage: number = 5): Promise<string[]> {
  const response = await fetch(
    `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}`
  );
  if (!response.ok) {
    console.error('Failed to fetch images from Pixabay:', response.statusText);
    return [];
  }
  const data = await response.json();
  // Return array of image URLs (medium size)
  return data.hits?.map((hit: any) => hit.webformatURL) || [];
} 