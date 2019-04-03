// osfipin.replace(/(^\s*)|(\s*$)/g, "");
module.exports = {
    /*
        删除首尾空格
        @params {string} str
        @return {string} str
    */
    delSpace (str){ 
        return str.replace(/(^\s*)|(\s*$)/g, "")
    }
}