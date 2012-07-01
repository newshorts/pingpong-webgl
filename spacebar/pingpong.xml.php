<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_GET['hangout'])) {
    $index = file_get_contents('three/index.html');
    
    $style = file_get_contents('three/css/style.css');
    
    $three = file_get_contents('three/js/three.js');
    $class = file_get_contents('three/js/class.js');
    $game = file_get_contents('three/js/game.js');
    $scene = file_get_contents('three/js/scene.js');
    $ball = file_get_contents('three/js/ball.js');
    
    $replace = array(   '<link rel="stylesheet" type="text/css" href="css/style.css" />' => $style, 
                        '<script src="js/three.js"></script>' => $three, 
                        '<script src="js/class.js"></script>' => $class, 
                        '<script src="js/game.js"></script>' => $game, 
                        '<script src="js/scene.js"></script>' => $scene,
                        '<script src="js/ball.js"></script>' => $ball
                    );
    
    foreach($replace as $key => $value) {
        
        if(strpos($key, '.css')) {
            $index = str_replace($key, '<style>'.$value.'</style>', $index);
        }
        
        if(strpos($key, '.js')) {
            $index = str_replace($key, '<script>'.$value.'</script>', $index);
        }
        
    }
    
    header ("Content-Type:text/xml");
    
    $here = <<<PINGPONG_XML
    
        <?xml version="1.0" encoding="UTF-8" ?>
        <Module>
            <ModulePrefs title="pingpong">
                <Require feature="rpc"/>
                <Require feature="views"/>
            </ModulePrefs>
            <Content type="html">
                <![CDATA[
                <script src="//talkgadget.google.com/hangouts/_/api/hangout.js?v=1.1"></script>
                
                $index
    
                ]]>
            </Content>
        </Module>
    
PINGPONG_XML;
    
    echo $here;
    
}
?>
