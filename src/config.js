const dashargs = require("..");
const util = require('./util.js');

var config = {
    unique: true
};

module.exports.set = (given = {}) => {

    if ((typeof given != 'object')) throw new TypeError('ERR: dashargs#config - given config must be an object');

    config = this.merge(given);

}

module.exports.merge = (given = {}) => {

    if ((typeof given != 'object')) throw new TypeError('ERR: dashargs#config(merge) - given config to merge with base must be an object');

    let mergedConfig = Object.assign({}, config);
    const points = Object.keys(mergedConfig);

    Object.keys(given).map(key => ({ point: key.toString().toLowerCase(), value: given[key] }))
            .filter(p => points.includes(p.point))
            .forEach(p => {
                mergedConfig[p.point] = util.typeFix(p.value.toString())
            });

    return mergedConfig;

};

module.exports.get = () => config;