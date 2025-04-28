    import axios  from "axios";

    const instance = axios.create({
        baseURL: "https://hotelapp-2.onrender.com",
        withCredentials:true
    })

    export default instance;