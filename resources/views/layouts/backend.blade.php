<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{ asset('assets/img/favicon.ico') }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">




    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script>
        window.Laravel = <?php echo json_encode([
	'csrfToken' => csrf_token(),
	'user' => [
		'id' => Auth::check() ? Auth::user()->id : null
	],
]);
?>
    </script>

</head>

<body>
    <div class="app-main">
        @include('backend.partials.navigation.main')
        <div id="root" class="app-grow"></div>
        @include('partials.footer')
    </div>

</body>

</html>