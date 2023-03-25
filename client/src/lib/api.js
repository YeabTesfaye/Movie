import axios from "axios";
import BASE_URL from "./BASEURL";
export const getAllMovies = async() => {
    const {data} = await axios.get(`${BASE_URL}/movie`)
    return data
}