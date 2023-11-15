import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

const Images = () => {
    const params = useParams();
    const IdConf = params.confid;
    const initialData={
        "confId": IdConf,
        "name": "",
        "imgLink": "",
        "feature": true,
        "sequence": 0,
    }

    const [formData, setFormData] = useState(initialData);

    const [editID, setEditID] = useState("");
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const { name, imgLink } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "sequence") {
            setFormData({
                ...formData,
                [name]: parseInt(value),
            });
        }
        else if (name === "feature") {
            setFormData({
                ...formData,
                [name]: value==="true",
            });
        }
    
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/images`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData([...data, res.data]);
                setFormData(initialData);
                setRefresh(refresh + 1);

            })
            .catch(err => {console.log(formData)
                console.log(err)});
    };

    const handleUpdate = () => {
        axios.put(`${import.meta.env.VITE_API_URL}/images/${editID}`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(initialData);
                setRefresh(refresh + 1);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (deleteID) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/images/${deleteID}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                console.log('DELETED RECORD::::', res);
                setRefresh(refresh + 1);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`${import.meta.env.VITE_API_URL}/images/${editIDNotState}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => {
                console.log(data);
                console.log(err);
            });
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/images/${IdConf}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [refresh]);

    return (
        <main className='py-10 bg-gray-100 lg:pl-72 min-h-screen'>
            <div className='px-4 sm:px-6 lg:px-8'>
                <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Add a New Image</div>
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Description</label>
                    <input type="text" name="name" value={name} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Image Link</label>
                    <input type="text" name="imgLink" required value={imgLink} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Sequence</label>
                    <input
                        type="number"
                        name="sequence"
                        value={formData.sequence}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                       <label className="block text-gray-700 text-lg ml-1 font-bold">Feature</label>
                    <select name="feature" className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" onChange={handleChange}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>

                    </select>

                    <div className="flex justify-evenly">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Image</button>
                        <button type="submit" onClick={() => { handleUpdate() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Image</button>
                    </div>
                </form>

                <hr />

                <div className="shadow-md m-10 ali">
                    <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Existing Images</div>
                    {loading ? (
                        <div>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <table className="min-w-full border-collapse box-border color-indi">
                            <thead>
                                <tr className="border-[2px] bg-blue-100  border-blue-500">
                                    <th className="p-1 text-center">Description</th>
                                    <th className="p-1 text-center">Image Link</th>
                                    <th className="p-1 text-center">Sequence</th>
                                    <th className="p-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length?data.map((item, index) => (
                                    <tr key={index} className="border-[1px] font-serif border-blue-500">
                                        <td className="p-1 text-center">{item.name}</td>
                                        <td className="p-1 text-center">{item.imgLink}</td>
                                        <td className="p-1 text-center">{item.sequence}</td>

                                        <td className="p-1 text-center  flex justify-evenly">
                                            <button onClick={() => { handleEdit(item.id); setEditID(item.id) }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 mx-2 rounded focus:outline-none focus:shadow-outline"> Edit </button>{" "}
                                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 px-4 rounded focus:outline-none focus:shadow-outline"> Delete </button>
                                        </td>
                                    </tr>
                                )): (
                                    <tr>                                        
                                        <td colSpan="5" className="p-1 text-center">No data available</td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Images;
