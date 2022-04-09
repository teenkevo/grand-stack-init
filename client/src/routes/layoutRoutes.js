import PageA from "../pages/pageA/pageA";
import PageB from "../pages/pageB/pageB";

const appRoutes = [
    {
      id: 1,
      path: "/pageA",
      exact: false,
      name: "Page A",
      //icon: Page A sidebarIcon,
      component: PageA,
      // the layouts that will have this route
      layout: {
        layoutA: "/layoutA",
        layoutB: "/layoutB",
      },
    },

    {
        id: 1,
        path: "/pageB",
        exact: false,
        name: "Page B",
        //icon: Page B sidebarIcon,
        component: PageB,
        // the layouts that will have this route
        layout: {
          layoutA: "/layoutA",
          layoutB: "/layoutB",
        },
      },
    
  ];
  
  export default appRoutes;