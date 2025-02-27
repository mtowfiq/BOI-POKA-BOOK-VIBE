import { toast } from "react-toastify"

const getStoredWishlist = () =>{
    const wishlist = localStorage.getItem("wish-list")
    if(wishlist){
        const wishlistArr = JSON.parse(wishlist)
        return wishlistArr
    }
    else{
        return []
    }
}

const addToWishlist = (id) =>{
    const storedWishlist = getStoredWishlist()
    if(storedWishlist.includes(id)){
        console.log(id, "already exists")
    }
    else{
        storedWishlist.push(id)
        const wishListStr = JSON.stringify(storedWishlist)
        localStorage.setItem("wish-list", wishListStr)
        toast("This book is added to your wishlist")
    }
}

export {addToWishlist, getStoredWishlist}