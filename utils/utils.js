// Helper module


// MergeObject is the helper function to merge 2 objects.
exports.mergeObject = function(obj1, obj2){
    return Object.assign({}, obj1, obj2);
};

exports.rejectResponse = function (err){
    return {status: 0, err: err};
};

exports.resolveResponse = function (result){
    return {status: 1, result: result};
};
