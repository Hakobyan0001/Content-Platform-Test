import { createClient, Photos, ErrorResponse } from 'pexels';
import { createApi } from 'unsplash-js';
import { IPhoto } from '../types';
import { APP_CONFIG } from '../config';

interface IUseFetchPhotos {
  setPhotos: React.Dispatch<React.SetStateAction<IPhoto[]>>;
  query: string;
  page: number;
}
const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);
const api = createApi({ accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY });

const perPage = APP_CONFIG.PER_PAGE;

export default async function useFetchPhotos({
  setPhotos,
  query,
  page
}: IUseFetchPhotos): Promise<void> {
  try {
    let newPhotos: IPhoto[] = [];
    if (query) {
      const unsplashResponse = await api.search.getPhotos({
        query,
        perPage,
        page
      });
      if (unsplashResponse.type === 'success') {
        newPhotos = unsplashResponse.response.results.map((photo) => ({
          id: photo.id,
          src: { medium: photo.urls.small, large: photo.urls.regular },
          alt: photo.alt_description,
          width: photo.width,
          height: photo.height,
          title: '',
          dateTaken: photo.created_at,
          photographer: photo.user.name,
          top: 0,
          left: 0,
          renderedHeight: 0
        }));
      } else {
        throw new Error(unsplashResponse.errors.join(', '));
      }
    } else {
      const response: Photos | ErrorResponse = await client.photos.curated({
        per_page: perPage,
        page
      });
      if ('photos' in response) {
        newPhotos = response.photos.map((photo) => ({
          id: photo.id,
          src: { medium: photo.src.medium, large: photo.src.large },
          alt: photo.alt,
          width: photo.width,
          height: photo.height,
          title: '',
          dateTaken: '',
          photographer: photo.photographer,
          top: 0,
          left: 0,
          renderedHeight: 0
        }));
      } else {
        throw new Error(response.error);
      }
    }
    setPhotos((prev: IPhoto[]) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const uniqueNewPhotos = newPhotos.filter((photo) => !existingIds.has(photo.id));
      return [...prev, ...uniqueNewPhotos];
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}
