
const getNumberOfGroupes = (data) => {

let arr=[]
    data.map((item,index)=> {
        if(index===0){arr.push(item.skupina)}
          if(index>0){
            if(item.skupina!== (data[index-1].skupina)){
              arr.push(item.skupina)
                }
            }
        }
    )
    // console.log('GET NUMBER OF GROUPES: ', arr)
    // console.log('DATA: ', data)
    return arr
}
    
const fillArrToCountFor = (arr) =>{
    // console.log('FILL: ', arr)
    if(arr.length>=4){
        return arr
      }else{
        let tmp_arr=[]

        switch(arr.length){
            case 1: 
                tmp_arr.push(
                ...arr,
                {skupina:arr[0].skupina,datum:arr[0],datum,jmeno:arr[0].jmeno,idZak:arr[0].idZak},
                {skupina:arr[0].skupina,datum:arr[0].datum,jmeno:'-',idZak: 0},
                {skupina:arr[0].skupina,datum:arr[0].datum,jmeno:'-',idZak: 0}
                );
            break;
        
            case 2: 
                tmp_arr.push(
                ...arr,
                {skupina:arr[0].skupina,datum:arr[0].datum,jmeno:'-',idZak: 0},
                {skupina:arr[0].skupina,datum:arr[0].datum,jmeno:'-',idZak: 0}
                );
            break;
        
            case 3: 
                tmp_arr.push(
                ...arr,
                {skupina:arr[0].skupina,datum:arr[0].datum,jmeno:'-',idZak: 0}
                );
            break;
        
            default:
                tmp_arr.push(...arr);
            break;
        }
        // console.log('FILL COUNT TO 4: ',tmp_arr)
        return tmp_arr
    }
}
    
const createGroups = (getNumberOfGroupes, fillArrToCountFor,data) => {
let arr=[]
    for(let i=0;i<getNumberOfGroupes(data).length;i++){
      arr.push(fillArrToCountFor(data.filter(item=> item.skupina===getNumberOfGroupes(data)[i])))
    }
    // console.log('CREATE GROUPS: ', arr)
    return arr
}

const createFinalArrData = (data) => {
    
let finalArr=[]
    data.map(pole=>
    finalArr.push(
        {
            skupina:pole[0].skupina,
            datum:pole[0].datum,
            jmeno_1:{jmeno:pole[0].jmeno, idZak:pole[0].idZak},
            jmeno_2:{jmeno:pole[1].jmeno, idZak:pole[1].idZak},
            jmeno_3:{jmeno:pole[2].jmeno, idZak:pole[2].idZak},
            jmeno_4:{jmeno:pole[3].jmeno, idZak:pole[3].idZak},
        }
    )
    )
return finalArr
}

module.exports.getNumberOfGroupes=getNumberOfGroupes
module.exports.fillArrToCountFor=fillArrToCountFor
module.exports.createGroups=createGroups
module.exports.createFinalArrData=createFinalArrData