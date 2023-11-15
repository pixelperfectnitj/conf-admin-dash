import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";
const ConferencePage = () => {
    const naviagate = useNavigate();
    const [formData, setFormData] = useState({
        "email": "",
        "name": ""

    });

    const [editID, setEditID] = useState()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    const { email, name } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/conf`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData([...data, res.data]);
                setFormData({
                    "email": "",
                    "name": ""
                });
                setRefresh(refresh - 1)

            })
            .catch(err => console.log(err));

    };

    const handleUpdate = () => {

        axios.put(`${import.meta.env.VITE_API_URL}/conf/${editID}`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData({

                    email: "",
                    name: "",
                });
                setRefresh(refresh + 1)
            })
            .catch(err => {
                console.log(formData);
                console.log(err)
            }
            )


    };

    const handleDelete = (deleteID) => {

        axios.delete(`${import.meta.env.VITE_API_URL}/conf/${deleteID}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                console.log('DELETD RECORD::::', res)
                setRefresh(refresh + 1)


            })
            .catch(err => console.log(err))
    };

    const handleEdit = (editIDNotState) => {

        axios.get(`${import.meta.env.VITE_API_URL}/conf/${editIDNotState}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })

            .then(res => {
                setFormData(res.data)

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/conf`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
        // console.log(data);
    }, [refresh]);

    return (

        <div className="block box-border" >
            <form className=" bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10 " autocomplete="off" onSubmit={handleSubmit}>
                <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >Create a new Conference</div>
                <label className="block text-gray-700 text-lg ml-1  font-bold " >Email</label>
                <input type="text" name="email" value={email} onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                <label className="block text-gray-700 text-lg ml-1 font-bold ">Name of Conference</label>
                <input type="text" name="name" value={name} onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />




                <div className="flex justify-evenly">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Conference</button>
                    <button type="submit" onClick={() => {
                        handleUpdate()
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update Conference
                    </button>

                </div>

            </form>

            <hr />

            <div>
                <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >Existing Conferences</div>

                {!loading ? (
                    <div className=" flex flex-wrap justify-evenly items-center">
                        {data.length>0?data.map((item, index) => (
                            <Link key={item._id} to={`info/${item._id}`}>

                                <div className="w-[350px] h-[200px] flex flex-col justify-evenly   bg-blue-100 border-collapse rounded-lg box-border m-5 hover:bg-blue-300 hover:shadow-lg border-solid"  >

                                    <table className="min-w-full border-collapse box-border " >
                                        <tbody>
                                            <tr >
                                                <td className="p-1 font-bold text-center">Email</td>
                                                <td className=" font-bold">:</td>
                                                <td className="p-1 text-center">{item.email}</td>

                                            </tr>
                                            <tr >
                                                <td className="p-1 font-bold text-center">Name</td>
                                                <td className=" font-bold">:</td>
                                                <td className="p-1 text-center">{item.name}</td>


                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link to="/">
                                        <div className="p-1 text-center  flex justify-evenly">
                                            <button type="button" onClick={() => {
                                                handleEdit(item._id)
                                                setEditID(item._id)
                                            }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"> Edit  </button>{" "}
                                            <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline"> Delete </button>
                                            {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => naviagate(`info/${item._id}`)}>Add More</button> */}

                                        </div>  </Link>                      </div>

                            </Link>

                        )): (
                                <div className="p-1 text-center">No Conference data available</div>

                        )}
                    </div>) : (<div>
                        <LoadingIcon />
                    </div>)}
            </div>
        </div>

    );
};

export default ConferencePage;