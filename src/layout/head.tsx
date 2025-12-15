import Script from 'next/script'

export default function Head() {
	return (
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />
			<meta name='theme-color' content='#ffffff' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='default' />
			<meta name='apple-mobile-web-app-title' content='Feng' />
			<link rel='apple-touch-icon' href='/images/avatar.png' />

			<link rel='icon' href='/favicon.png' />

			<link rel='preconnect' href='https://fonts.googleapis.cn' />
			<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='anonymous' />

			<link href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap' rel='stylesheet' />

			<Script src='https://www.googletagmanager.com/gtag/js?id=G-ZNSFR7C9PM' />
			<Script id='google-analytics'>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZNSFR7C9PM');
        `}
			</Script>
			<Script id='service-worker-registration'>
				{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                  console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                  console.error('Service Worker registration failed:', error);
                });
            });
          }
        `}
			</Script>
		</head>
	)
}
