const getStoredReadList = () =>{
    const storedList = localStorage.getItem("read-list")
    if(storedList){
        const storedListArr = JSON.parse(storedList)
        return storedListArr
    }
    else{
        return []
    }
}

const addToStoredReadList = (id) =>{
    const storedList = getStoredReadList()
    if(storedList.includes(id)){
        console.log(id, "already exists in the read list")
    }
    else{
        storedList.push(id)
        const storedListStr = JSON.stringify(storedList)
        localStorage.setItem("read-list", storedListStr)
        toast("This book is added to your read-list")
    }
}

export {addToStoredReadList, getStoredReadList}