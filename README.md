# cordova-filter-resources-hook
This script is for attaching some resources conditionally, depending on environment ex. dev, prod etc. 


How to use it:<br>
1.Clone from git<br>
2.Copy to ex. <YOUR_CORDOVA_PROJECT>/scripts<br>
3.Make sure you have this node modules installed:<br>
+cheerio<br>
+fs<br>
+util<br>
+path<br>
3.Add platform to your cordova app ex.<br>

    cordova platform add android<br>

4.Put reference to script in config.xml ex:<br>

<?xml version='1.0' encoding='utf-8'?>
<widget id="io.cordova.hellocordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>HelloCordova</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
    ......
    <hook type="after_build" src="scripts/filterResource.js" />
    ......
</widget>

5.Put your custom tags for ex. www/index.html

<html>
        .......
        <optional-script script-src="c"  env="dev"></optional-script>
        
        ........
</html>

This mean that tag "optional-script" will be replaced by tag "script" with "src" attribute set to "js/script.js" for environment "dev". For all other environments this tag will be removed.

6.Configure which files to filter:

config/fileReplaceConfig.json

 ex.:
 [
   "platforms/android/assets/www/index.html"
 ]

7.Run for example for atribute dev will be:
    cordova build android --dev

for prod:
    cordova build android --prod

which removes tag

8.Because cordova overwrites files after hook if it is run like ex.:
    cordova run browser --dev

It may be desirable to prepare scripts for starting.:
    #!/bin/bash
    cordova run browser &
    sleep 5
    cordova build browser --dev

And stopping built in server:
    #!/bin/bash
    kill -n 9 $(pgrep node)







