import { NavbarConfig } from "case-web-app-core/build/types/navbarConfig";

export const navbarConfig: NavbarConfig = {
  breakpoint: 'xl',
  leftItems: [
    {
      type: 'internal',
      hideWhen: 'auth',
      itemKey: 'home',
      url: '/welcome',
      iconClass: "fas fa-home"
    },
    {
      type: 'internal',
      hideWhen: 'unauth',
      itemKey: 'authhome',
      url: '/home',
      iconClass: "fas fa-home",
    },
    {
      type: 'internal',
      itemKey: 'about',
      url: '/about',
    },
    {
      type: 'internal',
      itemKey: 'faq',
      url: '/faq',
    },
    {
      type: 'internal',
      itemKey: 'results',
      url: '/results',
    },
  ],
  rightItems: [
    {
      "type": "internal",
      "url": "/settings",
      "itemKey": "settings",
      "iconClass": "fas fa-cog"
    }
  ]
}
