class Utility
{
    initObject(obj) {
        Object.keys(obj).forEach(item=>{
            if (typeof obj[item] === "number") obj[item] = 0
            else obj[item] = ''
        })
    }
    assginObject(obj1, obj2){
        Object.keys(obj1).forEach(item =>{
            obj1[item] = obj2[item]
        })
    }
}

export default new Utility()