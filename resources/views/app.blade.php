<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Библиотека</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <script src="{{ asset('js/app.js')  }}" defer></script>
        <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
