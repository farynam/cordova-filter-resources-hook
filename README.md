# cordova-filter-resources-hook
This script is for attaching some resources conditionally, depending on environment ex. dev, prod etc. 


How to use it:
1.Clone from git
2.Copy to ex. <YOUR_CORDOVA_PROJECT>/scripts
3.Make sure you have this node modules installed:
+cheerio
+fs
+util
+path
3.Put reference to script in config.xml ex:

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

4.Put your custom tags for ex. www/index.html

<html>
        .......
        <optional-script script-src="c"  env="dev"></optional-script>
        
        ........
</html>

This mean that tag "optional-script" will be replaced by tag "script" with "src" attribute set to "js/script.js" for environment "dev". For all other environments this tag will be removed.

5.Run for example for atribute dev will be:
cordova build android --dev


+for prod:
cordova build android --prod

which removes tag

6.Use well




