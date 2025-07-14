// Pexels API integration will be added below. Google API code removed.

class HotelImageService {
  // Get a single hotel image
  async getHotelImage(hotelName: string, location: string = 'Munnar'): Promise<string | null> {
    const images = await this.getHotelImages(hotelName, location, 1);
    return images[0] || null;
  }

  // Placeholder for getHotelImages (to be implemented for Pexels)
  async getHotelImages(hotelName: string, location: string = 'Munnar', count: number = 3): Promise<string[]> {
    return [this.getPlaceholderImage(hotelName)];
  }

  // Get placeholder image based on hotel name
  private getPlaceholderImage(hotelName: string): string {
    const encodedName = encodeURIComponent(hotelName);
    return `https://via.placeholder.com/400x300/3498db/ffffff?text=${encodedName}`;
  }
}

// Export a singleton instance
export const hotelImageService = new HotelImageService();
export default HotelImageService; 