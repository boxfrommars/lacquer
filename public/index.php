
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Tux</title>

    <link href="/css/vendor.css" rel="stylesheet">
    <style>
        body {
            padding-top: 50px;
        }
    </style>

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Tux</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container">
    <div>
        <div class="row">
            <div class="col-md-8">
                <h3>main section</h3>
                <div id="main-region">
                    <p>Here is static content in the web page. You'll notice that it gets replaced by our app as soon as we start it.</p>
                </div>
            </div>
            <div class="col-md-4">
                <h3>side section</h3>
            </div>
        </div>
    </div>
</div>

<div id="dialog-region"></div>
<script src="/js/vendor.js"></script>
<script src="/js/scripts.js"></script>
</body>
</html>