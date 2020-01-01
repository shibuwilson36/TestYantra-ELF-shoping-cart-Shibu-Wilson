import Axios from "axios";

let deleteList= async (selected) => {

    console.log("accToDelete", selected);
    let id = selected.id
    const url = `https://react-shoping-cart-66dac.firebaseio.com/wish-list/${id}/.json`
    try {
        const response = await Axios.delete(url)
        console.log("response hggfh", response);
        
    } catch (error) {
        console.log(error);

    }
}
export default deleteList