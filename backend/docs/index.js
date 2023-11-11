const routes = require('./routes');
const basicInfo = require('./basicInfo');
const tags = require('./tags');

module.exports = {
    ...basicInfo,
    ...tags,
    ...routes,
}