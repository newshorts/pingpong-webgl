<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_GET['hangout'])) {
    $index = file_get_contents('data/index.html');
    
    $three = file_get_contents('data/js/Three.js');
    
    $ball = file_get_contents('data/js/ball.js');
    
    $replace = array('<script src="js/Three.js"></script>' => $three, '<script src="js/ball.js"></script>' => $ball);
    
    foreach($replace as $key => $value) {
        $index = str_replace($key, '<script>'.$value.'</script>', $index);
    }
    
    header ("Content-Type:text/xml");
    
    $here = <<<PINGPONG_XML
    
        <?xml version="1.0" encoding="UTF-8" ?>
        <Module>
            <ModulePrefs title="Round Robin">
                <Require feature="rpc"/>
                <Require feature="views"/>
            </ModulePrefs>
            <Content type="html">
                <![CDATA[
                <script src="//hangoutsapi.talkgadget.google.com/hangouts/_/api/hangout.js?v=1.1"></script>
                
                $index
    
                ]]>
            </Content>
        </Module>
    
PINGPONG_XML;
    
    echo $here;
    
}
?>
