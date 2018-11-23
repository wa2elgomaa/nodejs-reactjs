import axios from 'axios';

export default  {

    post(endpoint, data , headers ) {
        return new Promise((resolve,reject)=>{
            axios.post(endpoint, data || {} , headers || {})
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });

        });
    },
    get(endpoint){
        return new Promise((resolve,reject)=> {
            axios.get(endpoint)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });


    } ,
    delete(endpoint){
        return new Promise((resolve,reject)=> {
            axios.delete(endpoint)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });


    } ,
    all (ajaxCalls , callback){
        axios.all(ajaxCalls)
            .then(axios.spread(function (acct, perms) {
                // Both requests are now complete
                callback(acct, perms);
            }));
    }
};


