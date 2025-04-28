    import axios  from "axios";

    const instance = axios.create({
        baseURL: "https://hotelapp-1-38xj.onrender.com/api",
        withCredentials:true
    })

    export default instance;