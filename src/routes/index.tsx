import { Home, PhotoDetailsView } from '../view/pages';

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/PhotoInfo/:id',
    element: <PhotoDetailsView />
  }
];

export default routes;
