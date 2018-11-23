module.exports = function Response(success, msg , result){
    return {
        success  : success ,
        message : msg ,
        result : result
    }
}