import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Services',
    group: true,
  },
  {
    title: 'User',
    icon: 'nb-keypad',
    link: '/pages/user',
    children: [
      {
        title: 'User',
        link: '/pages/user/grid',
      },
      {
        title: 'User Feedback',
        link: '/pages/user/feedback',
      },
      // {
      //   title: 'User Invoice',
      //   link: '/pages/user/icons',
      // }
    ],
  },
  {
    title: 'Stock Updates',
    icon: 'nb-compose',
    children: [
      {
        title: 'Stock Master',
        link: '/pages/forms/stock-master',
      },
    ],
  },
  {
    title: 'News',
    icon: 'nb-list',
    children: [
      {
        title: 'Other News',
        link: '/pages/components/news',
      },
        {
            title: 'Mojo News',
            link: '/pages/components/mojo-news',
        }
    ],
  }
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
 
  
];
