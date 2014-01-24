<?php
use \Symfony\Component\HttpFoundation\Response;
use \Symfony\Component\HttpFoundation\Request;

$startTime = microtime(true);
require_once __DIR__.'/../vendor/autoload.php';

$config = array(
    'starttime' => $startTime,
    'debug' => true,
    'tmp_path' => '../tmp',
    'view_path' => realpath(__DIR__ . '/../src/views'),
    'application_path' => realpath(__DIR__ . '/..'),
    'config' => array(
        'db' => array(
            'db.options' => array(
                'driver' => 'pdo_pgsql',
                'host' => 'localhost',
                'dbname' => 'romanov',
                'user' => 'romanov',
                'password' => 'romanov',
            ),
        ),
    ),
);

/** @var \Doctrine\DBAL\Connection[]|\Doctrine\Common\Cache\Cache[]|\Symfony\Component\Form\FormFactory[]|Twig_Environment[]|Pimple|Monolog\Logger[]|\Whale\App|Request[]|\Symfony\Component\Serializer\Serializer[] $app  */
$app = new Whale\App($config);


$app->register(new \Silex\Provider\SerializerServiceProvider());


$app->get('/', function() use($app) {
    return $app['twig']->render('index.twig');
});


$app->get("/api/v1/test", function () use ($app) {
    $result = array ('success' => true);

    return new Response($app['serializer']->serialize($result, 'json'), 200, array("Content-Type" => $app['request']->getMimeType('json')));
});


$app->get("/api/v1/users", function () use ($app) {
    $result = array (
        array('id' => 1, 'first_name' => 'Vera', 'last_name' => 'Gzhel'),
        array('id' => 2, 'first_name' => 'Dmitry', 'last_name' => 'Groza'),
        array('id' => 3, 'first_name' => 'Nadja', 'last_name' => 'Gimmer'),
    );

    $result = array();

    foreach ($result as &$user) {
        $user['full_name'] = $user['first_name'] . ' ' . $user['last_name'];
        $user['created_at'] = '2013/12/29';
    }

    return new Response($app['serializer']->serialize($result, 'json'), 200, array("Content-Type" => $app['request']->getMimeType('json')));
});

$app->run();