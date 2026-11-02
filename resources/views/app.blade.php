<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Электронная библиотека</title>

        <meta name="theme-color" content="#eef2f9" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)">

        <script>
            // Apply the stored/system theme before the first paint, so the page
            // does not flash light when the user prefers the dark palette.
            (function () {
                try {
                    var stored = localStorage.getItem('libraryiatu.color-mode');
                    var dark = stored ? stored === 'dark'
                        : window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var mode = dark ? 'dark' : 'light';

                    document.documentElement.dataset.theme = mode;
                    document.documentElement.style.colorScheme = mode;
                } catch (error) {
                    // Ignore: the React theme provider will pick a mode anyway.
                }
            })();
        </script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
