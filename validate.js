let permissions = {
    getUsers : {
        all : ['head-Trainer'],
        read : ['Trainer', 'Trainee'],
        write : ['Trainer'],
        delete : []
    }
}

function permission(mod, operation, role) {
    console.log("permission", mod, operation, role)
    let mods = Object.keys(permissions)
    let operations = Object.keys(permissions[mod])
    let roles = permissions[mod][operation]
    return linearSearch(mods, mod) && linearSearch(operations, operation) &&  linearSearch(roles, role) 
}

function linearSearch(arr, target) {
    for(element of arr) {
        if(element === target) {
            return true;
        }
    }
    return false;
}

let result = permission('getUsers' ,'write','Trainer')
console.log(result)




