import NavigationBar from './components/navigation-bar/navigation-bar'; 

const navigationItems = [
    {
        url: './hello-world-page',
        title: 'hello world page'
    },
    {
        url: './kiwi-page',
        title: 'kwi page'
    }
]

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;

if(url === '/hello-world-page') {
    import ('HelloWorldApp/HelloWorldPage')   
    .then(HelloWorldPageModule => {
        const HelloWorldPage = HelloWorldPageModule.default;
        const helloWorldPage = new HelloWorldPage();
        helloWorldPage.render();
    })
}

else if (url === '/kiwi-page') {
    import ('KiwiApp/KiwiPage')
    .then(KiwiPageModule => {
        const KiwiPage = KiwiPageModule.default;
        const kiwiPage = new KiwiPage();
        kiwiPage.render();
    })
}

console.log('dashboard');
