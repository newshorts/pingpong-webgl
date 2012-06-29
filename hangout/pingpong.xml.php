<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_GET['hangout'])) {
    $index = file_get_contents('three/index.html');
    
    $style = file_get_contents('three/css/style.css');
    
    $app = file_get_contents('three/js/app.js');
    
    $three = file_get_contents('three/js/Three.js');
    
    $ball = file_get_contents('three/js/ball.js');
    
    $replace = array(   '<link rel="stylesheet" type="text/css" href="css/style.css" />' => $style, 
                        '<script src="js/app.js"></script>' => $app, 
                        '<script src="js/Three.js"></script>' => $three, 
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
