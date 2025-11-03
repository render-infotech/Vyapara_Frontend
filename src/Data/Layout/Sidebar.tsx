import { MenuItem } from "../../Type/Layout/Sidebar";

export const MenuList: MenuItem[] = [
  {
    title: "Admin",
    Items: [
      {
        title: "Dashboard",
        id: 1,
        icon: "Home",
        type: "link",
        path: `${process.env.PUBLIC_URL}/dashboard`,
      },
      {
        title: "Users",
        id: 2,
        icon: "Profile",
        type: "sub",
        active: false,  
        children: [
          {
            path: `${process.env.PUBLIC_URL}/user-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Digital Purchases",
        id: 3,
        icon: "Tick-square",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/purchases`,
            type: "link",
            title: "Manage"
          },
        ],
      },
      {
        title: "Orders",
        id: 4,
        icon: "Bag",
        type: "link",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/order-management`,
            title: "Manage",
            type: "link",
          },
        ],
      },
      {
        title: "Deposits",
        id: 5,
        icon: "Bookmark",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/deposit-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Transactions",
        id: 6,
        icon: "Swap",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/transactions`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Vendors",
        id: 7,
        icon: "Add-user",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/vendor-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Products",
        id: 8,
        icon: "Category",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/product-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Pricing & Commission",
        id: 9,
        icon: "Pie",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/pricing-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "Reports",
        id: 10,
        icon: "Chart",
        type: "link",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/report-management`,
            type: "link",
            title: "Manage",
          },
        ],
      },
      {
        title: "System Settings",
        id: 11,
        icon: "Setting",
        type: "sub",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/settings/category-management`,
            title: "Category",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/settings/commission-management`,
            title: "Commision",
            type: "link",
          },
          // {
          //   // path: `roles-and-permission`,
          //   title: "Roles & Permission",
          //   type: "link",
          // },
        ],
      },
    ],
  },
  // {
  //   title: "General",
  //   Items: [
  //     {
  //       title: "Dashboard",
  //       id: 1,
  //       icon: "Home",
  //       type: "sub",
  //       badge:"3",
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: "Default", type: "link"},
  //         { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`, title: "Ecommerce", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/dashboard/project`, title: "Project", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Widgets",
  //       id: 2,
  //       icon: "Pie",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/widgets/general`, title: "General", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/widgets/chart`, title: "Chart", type: "link" },
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: "Applications",
  //   lanClass: "lan-8",
  //   Items: [
  //     {
  //       title: "Project",
  //       id: 3,
  //       icon: "Info-circle",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/project/projectlist`, type: "link", title: "Project-List" },
  //         { path: `${process.env.PUBLIC_URL}/project/createnew`, type: "link", title: "Create New" },
  //       ],
  //     },
  //     { path: `${process.env.PUBLIC_URL}/app/filemanager`, icon: "Paper", title: "File Manager", type: "link" },
  //     {
  //       title: "Ecommerce",
  //       id: 6,
  //       icon: "Bag",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/products`, title: "Products", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/productpage`, title: "Product Page", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/addproduct`, title: "Add Products", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/productlist`, title: "Product List", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/paymentdetails`, title: "Payment Details", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/orderhistory`, title: "OrderHistory", type: "link" },
  //         {
  //           title: "Invoice",
  //           type: "sub",
  //           children: [
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice1`, title: "Invoice-1", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice2`, title: "Invoice-2", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice3`, title: "Invoice-3", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice4`, title: "Invoice-4", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice5`, title: "Invoice-5", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice6`, title: "Invoice-6", type: "link" },
  //           ],
  //         },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/cart`, title: "Cart", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/wishlist`, title: "Wishlist", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/checkout`, title: "Checkout", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/ecommerce/pricing`, title: "Pricing", type: "link" },
  //       ],
  //     },
  //     { path: `${process.env.PUBLIC_URL}/email/letterbox`, icon: "Message", title: "Letter Box", type: "link", id: 7 },
  //     {
  //       title: "Chat",
  //       id: 8,
  //       icon: "Chat",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/chat/privatechats`, type: "link", title: "Private Chat" },
  //         { path: `${process.env.PUBLIC_URL}/chat/groupchat`, type: "link", title: "Group Chat" },
  //       ],
  //     },
  //     {
  //       title: "Users",
  //       icon: "Profile",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/users/userprofile`, type: "link", title: "User Profile" },
  //         { path: `${process.env.PUBLIC_URL}/users/useredit`, type: "link", title: "User Edit" },
  //         { path: `${process.env.PUBLIC_URL}/users/cards`, type: "link", title: "User Cards" },
  //       ],
  //     },
  //     { path: `${process.env.PUBLIC_URL}/app/bookmark`, icon: "Bookmark", type: "link", title: "Bookmark", id: 10 },
  //     { path: `${process.env.PUBLIC_URL}/app/contacts`, title: "Contact", icon: "Contacts", type: "link", id: 11, active: false },
  //     { path: `${process.env.PUBLIC_URL}/app/task`, icon: "Tick-square", type: "link", title: "Task" },
  //     { path: `${process.env.PUBLIC_URL}/app/calendar`, icon: "Calendar", type: "link", title: "Calendar" },
  //     { path: `${process.env.PUBLIC_URL}/app/socialapp`, icon: "Camera", type: "link", title: "Social App" },
  //     { path: `${process.env.PUBLIC_URL}/app/todo`, icon: "Edit", type: "link", title: "Todo" },
  //     { path: `${process.env.PUBLIC_URL}/app/searchresult`, icon: "Search", type: "link", title: "Search Result" },
  //   ],
  // },
  // {
  //   title: "Components",
  //   Items: [
  //     {
  //       title: "Buttons",
  //       icon: "More-box",
  //       id: 22,
  //       type: "link",
  //       active: false,
  //       path:`${process.env.PUBLIC_URL}/buttons`
  //     },
  //     {
  //       title: "Ui-Kits",
  //       icon: "Folder",
  //       id: 19,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/uikits/typography`, title: "Typography", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/avatars`, title: "Avatars", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/grid`, title: "Grid", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/helperclass`, title: "Helper Classes", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/tagpills`, title: "Tag & Pills", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/progress`, title: "Progress", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/popover`, title: "Popover", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/tooltip`, title: "Tooltip", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/alert`, title: "Alert", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/modal`, title: "Modal", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/dropdown`, title: "Dropdown", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/accordion`, title: "Accordion", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/tabs`, title: "Tabs", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/uikits/list`, title: "Lists", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Bonus-Ui",
  //       icon: "Ticket-star",
  //       id: 20,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/bonusui/scrollable`, title: "Scrollable", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/breadcrumb`, title: "Breadcrumb", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/pagination`, title: "Pagination", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/ribbons`, title: "Ribbons", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/treeview`, title: "Tree View", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/toasts`, title: "Toasts", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/rating`, title: "Rating", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/dropzone`, title: "Dropzone", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/tour`, title: "Tour ", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/sweetalert2`, title: "SweetAlert2", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/owlcarousel`, title: "Owl Carousel", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/rangeslider`, title: "RangeSlider", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/imagecropper`, title: "ImageCropper", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/basiccards`, title: "Basic Card", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/creativecards`, title: "Creative Card", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/bonusui/timeline`, title: "Timeline", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Icons",
  //       icon: "Activity",
  //       id: 21,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/icons/flagicons`, title: "Flag Icon", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/icons/fontawesomeicon`, title: "Fontawesome Icon", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/icons/feathericon`, title: "Feather Icon", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/icons/iconlysprite`, title: "Iconly Sprite", type: "link"},
  //         { path: `${process.env.PUBLIC_URL}/icons/icoicon`, title: "Ico Icon", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/icons/themifyicon`, title: "Themify Icon", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/icons/wheathericon`, title: "Weather Icon", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Charts",
  //       icon: "Chart",
  //       type: "sub",
  //       id: 23,
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/charts/apexchart`, type: "link", title: "Apex Chart" },
  //         { path: `${process.env.PUBLIC_URL}/charts/chartjschart`, type: "link", title: "Chartjs Chart" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Forms & Table",
  //   Items: [
  //         {
  //           title: "Form Controls",
  //           active: false,
  //           icon:"Filter",
  //           type: "sub",
  //           children: [
  //             { title: "Base Inputs", type: "link", path: `${process.env.PUBLIC_URL}/forms/formscontrols/baseinput` },
  //             { title: "Checkbox & Radio", type: "link", path: `${process.env.PUBLIC_URL}/forms/formscontrols/radiocheckbox` },
  //             { title: "Input Groups", type: "link", path: `${process.env.PUBLIC_URL}/forms/formscontrols/inputgroups` },
  //             { title: "Mega Option", type: "link", path: `${process.env.PUBLIC_URL}/forms/formscontrols/megaoption` },
  //             { title: "Form Validation", type: "link", path: `${process.env.PUBLIC_URL}/forms/formscontrols/formvalidation`,bookmark: true },
  //           ],
  //         },
  //         {
  //           title: "Form Widget",
  //           active: false,
  //           icon:"Scan",
  //           type: "sub",
  //           children: [
  //             { title: "Datepicker", type: "link", path: `${process.env.PUBLIC_URL}/forms/formswidget/datepicker` },
  //             { title: "Touchspin", type: "link", path: `${process.env.PUBLIC_URL}/forms/formswidget/touchspin` },
  //             { title: "Switch", type: "link", path: `${process.env.PUBLIC_URL}/forms/formswidget/switch` },
  //             { title: "Typeahead", type: "link", path: `${process.env.PUBLIC_URL}/forms/formswidget/typeahead` },
  //             { title: "Clipboard", type: "link", path: `${process.env.PUBLIC_URL}/forms/formswidget/clipboard` },
  //           ],
  //         },
  //         {
  //           title: "Form Layout",
  //           active: false,
  //           icon:"Icon-plus",
  //           type: "sub",
  //           children: [
  //             { path: `${process.env.PUBLIC_URL}/forms/formslayout/formwizard1`, title: "Form Wizard 1", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/forms/formslayout/formwizard2`, title: "Form Wizard 2", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/forms/formslayout/twofactor`, title: "Two factor", type: "link" },
  //           ],
  //         },
  //     {
  //       title: "Table",
  //       icon: "Edit-line",
  //       id: 18,
  //       type: "sub",
  //       children: [
  //         {
  //           title: "Bootstrap Tables",
  //           type: "sub",
  //           children: [
  //             {
  //               title: "Basic Tables",
  //               type: "link",
  //               path: `${process.env.PUBLIC_URL}/table/reactstraptable/basictable`,
  //             },
  //             {
  //               title: "Table Components",
  //               type: "link",
  //               path: `${process.env.PUBLIC_URL}/table/reactstraptable/tablecomponent`,
  //             },
  //           ],
  //         },
  //         {
  //           title: "Data Tables",
  //           type: "sub",
  //           children: [
  //             { path: `${process.env.PUBLIC_URL}/table/datatable/basicinit`, title: "Basic Init", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/table/datatable/advanceinit`, title: "Advance Init", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/table/datatable/api`, title: "API", type: "link" },
  //             { path: `${process.env.PUBLIC_URL}/table/datatable/datasources`, title: "Data Source", type: "link" },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Pages",
  //   Items: [
  //     {
  //       icon: "Paper-plus",
  //       id: 24,
  //       active: false,
  //       path: `${process.env.PUBLIC_URL}/pages/samplepage`,
  //       title: "Sample Page",
  //       type: "link",
  //     },
  //     {
  //       title: "Others",
  //       icon: "Password",
  //       id: 25,
  //       type: "sub",
  //       children: [
  //         {
  //           title: "Error Pages",
  //           type: "sub",
  //           children: [
  //             { title: "Error 400", type: "link", path: `${process.env.PUBLIC_URL}/errors/error400` },
  //             { title: "Error 401", type: "link", path: `${process.env.PUBLIC_URL}/errors/error401` },
  //             { title: "Error 403", type: "link", path: `${process.env.PUBLIC_URL}/errors/error403` },
  //             { title: "Error 404", type: "link", path: `${process.env.PUBLIC_URL}/errors/error404` },
  //             { title: "Error 500", type: "link", path: `${process.env.PUBLIC_URL}/errors/error500` },
  //             { title: "Error 503", type: "link", path: `${process.env.PUBLIC_URL}/errors/error503` },
  //           ],
  //         },
  //         {
  //           title: "Authentication",
  //           type: "sub",
  //           children: [
  //             { title: "Login Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/loginsimple` },
  //             { title: "Login with bg image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/loginbgimage` },
  //             { title: "Login with image two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/loginwithimagetwo` },
  //             { title: "Login with validation", type: "link", path: `${process.env.PUBLIC_URL}/authentication/loginvalidation` },
  //             { title: "Login with tooltip", type: "link", path: `${process.env.PUBLIC_URL}/authentication/logintooltip` },
  //             { title: "Login with sweetalert", type: "link", path: `${process.env.PUBLIC_URL}/authentication/loginsweetalert` },
  //             { title: "Register Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/registersimple` },
  //             { title: "Register with Bg Image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/registerbgimage` },
  //             { title: "Register with Bg Two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/registerwithimagetwo` },
  //             { title: "Register Wizard", type: "link", path: `${process.env.PUBLIC_URL}/authentication/registerwizard` },
  //             { title: "Unloack User", type: "link", path: `${process.env.PUBLIC_URL}/authentication/unlockuser` },
  //             { title: "Forget Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/forgetpassword` },
  //             { title: "Reset Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/resetpassword` },
  //             { title: "Maintenance", type: "link", path: `${process.env.PUBLIC_URL}/authentication/maintenance` },
  //           ],
  //         },
  //         {
  //           title: "Coming Soon",
  //           type: "sub",
  //           children: [
  //             { title: "Coming Simple", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/comingsoonsimple` },
  //             { title: "Coming with Bg Video", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/comingbgvideo` },
  //             { title: "Coming with bg Image", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/comingbgimg` },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Miscellaneous",
  //   Items: [
  //     {
  //       title: "Gallery",
  //       icon: "Gallery",
  //       id: 26,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/gallery/gallerygrids`, title: "Gallery Grids", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/gallery/gallerygriddesc`, title: "Gallery Grid Desc", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/gallery/masonrygallery`, title: "Masonry Gallery", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/gallery/masonrywithdesc`, title: "Masonry With Desc", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/gallery/hovereffect`, title: "Hover Effect", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Blog",
  //       icon: "Game",
  //       id: 27,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/blog/blogdetails`, title: "Blog Details", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/blog/blogsingle`, title: "Blog Single", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/blog/addpost`, title: "Add Post", type: "link" },
  //       ],
  //     },
  //     { path: `${process.env.PUBLIC_URL}/faq/faq`, icon: "Danger", type: "link", active: false, title: "FAQ" },
  //     {
  //       title: "JobSearch",
  //       icon: "Filter-2",
  //       id: 28,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/jobsearch/cardview`, title: "Cards View", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/jobsearch/listview`, title: "List View", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/jobsearch/jobdetail`, title: "Job Detail", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/jobsearch/jobapply`, title: "Job Apply", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Learning",
  //       icon: "Work",
  //       id: 29,
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/learning/learninglist`, title: "Learning List", type: "link" },
  //         { path: `${process.env.PUBLIC_URL}/learning/detailcourse`, title: "Detailed Course", type: "link" },
  //       ],
  //     },
  //     {
  //       title: "Map",
  //       icon: "Discovery",
  //       type: "sub",
  //       id: 30,
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/map/googlemap`, type: "link", title: "Google Map" },
  //         { path: `${process.env.PUBLIC_URL}/map/leafletmap`, type: "link", title: "Leaflet Map" },
  //       ],
  //     },
  //     {
  //       title: "Editor",
  //       id: 31,
  //       icon: "Shield",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         { path: `${process.env.PUBLIC_URL}/editor/ckeditor`, type: "link", title: "CK Editor" },
  //         { path: `${process.env.PUBLIC_URL}/editor/mdeeditor`, type: "link", title: "MDE Editor" },
  //         { path: `${process.env.PUBLIC_URL}/editor/aceeditor`, type: "link", title: "ACE Editor" },
  //       ],
  //     },
  //     { id: 32, path: `${process.env.PUBLIC_URL}/knowledgebase/knowledgebase`, icon: "Setting", type: "link", active: false, title: "Knowledgebase" },
  //     { id: 33, path: `${process.env.PUBLIC_URL}/supportticket/supportticket`, icon: "Ticket", type: "link", active: false, title: "SupportTicket" },
  //   ],
  // },
];
