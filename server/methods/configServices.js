Meteor.methods({
    getConfig: function () {
        var basePath = process.env.PWD;
        var fs = Npm.require('fs');
        data = fs.readFileSync(basePath+'/waxConfig.json', 'utf8');

        data = JSON.parse(data);
        return data.config;
    }
});
