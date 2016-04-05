module.exports = function (ctx) {
    var SCRIPT_SRC_ATTR = "script-src";
    var ENV_ATTR = "env";
    var TAG = "optional-script";
    var FILE_REPLACE_CFG = "config/fileReplaceConfig.json";

    var cheerio = ctx.requireCordovaModule("cheerio");
    var fs = ctx.requireCordovaModule('fs');
    var util = ctx.requireCordovaModule('util');
    var path = ctx.requireCordovaModule('path');

    var log = console.log;

    log("Substitution hook run");

    function findEnv() {
        var probablyEnv = process.argv[process.argv.length -1];
        var index = probablyEnv.lastIndexOf("-");

        if (index < 0) {
            throw "Enviroment name not present";
        }

        return probablyEnv.substr(probablyEnv.lastIndexOf("-") + 1, probablyEnv.length);
    }

    function getPath(file) {
        return path.join(ctx.opts.projectRoot, file);
    }

    function readDataFromRoot(file) {
        var fileToRead = getPath(file);
        console.log("Reading to file:" + fileToRead);
        return fs.readFileSync(fileToRead);
    }

    function writeDataToRoot(file, data) {
        var fileToWrite = getPath(file);
        console.log("Writing to file:" + fileToWrite);
        fs.writeFileSync(fileToWrite, data);
    }



    var currentEnv = findEnv();
    log("Env set to:" + currentEnv);
    log("Project root is:" + ctx.opts.projectRoot);

    var filestoreplace = JSON.parse(readDataFromRoot(FILE_REPLACE_CFG));




    for (var i in filestoreplace) {
        var file = filestoreplace[i];
        var data = readDataFromRoot(file);

        if (data == null) {
            throw util.format("File:%s is not readable", file);
        }

        var $ = cheerio.load(data.toString());
        var tags = $(TAG).get();
        var total = tags.length;

        for (var n = 0; n < total; n++) {
            var tag = tags[n];
            var scriptPath = tag.attribs[SCRIPT_SRC_ATTR];
            var env = tag.attribs[ENV_ATTR];

            if (env == null) {
                throw util.format("attribute:%s must be present", ENV_ATTR);
            }

            if (scriptPath == null) {
                throw util.format("attribute:%s must be present", SCRIPT_SRC_ATTR);
            }

            var node = $(util.format("%s[%s='%s'][%s='%s']", TAG, SCRIPT_SRC_ATTR, scriptPath, ENV_ATTR, env));

            if (currentEnv != env) {
                node.remove();
                continue;
            }

            node.replaceWith(util.format("<script type='text/javascript' src='%s'></script>", scriptPath));
        }

        writeDataToRoot(file, $.html());
    }

};