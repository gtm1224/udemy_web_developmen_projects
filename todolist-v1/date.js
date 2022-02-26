// module.exports=getDate;
// function getDate(){
//     let today = new Date();
//     let options={
//         weekday:"long",
//         day:"numeric",
//         month:"long"
//     };
//     return today.toLocaleDateString("en-US",options)
// }



//a better way to write the function above
exports.getDate = function(){
    let today = new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return today.toLocaleDateString("en-US",options)
}