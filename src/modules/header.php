<?
$pagepart = explode("/",$_SERVER['REQUEST_URI']);
$sect = array();
foreach($pagepart as $val){
    if($val) $sect[] = $val;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <header>            
        //= ../modules/navbar.php
        //= ../modules/sidebar.php
    </header>
    <main>
        <div class="row">
            <div class="col s12 m12 l12">
                //= ../modules/content.php
            </div>
        </div>
    </main>    
