import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

const Announcement = () => {
    const params = useParams();

    const IdConf = params.confid;
    const initialData = {
        "confId": IdConf,
        "title": "",
        "metaDescription": "",
        "description": "",
        "sequence": 0,
        "feature": true,
        "new": true,
        "hidden": true,
        "link": ""
    };
    const [formData, setFormData] = useState(initialData);
    const [editID, setEditID] = useState();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const { title, metaDescription, description, link } = formData;


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
                [name]: value === "true",
            });
        }
        else if (name === "new") {
            setFormData({
                ...formData,
                [name]: value === "true",
            });
        } else if (name === "hidden") {
            setFormData({
                ...formData,
                [name]: value === "true",
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/announcements`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData([...data, res.data]);

                setFormData(initialData);
                setRefresh(refresh + 1);
            })
            .catch(err => {
                console.log(err);
                console.log(formData);
            });
    };

    const handleUpdate = () => {
        axios.put(`${import.meta.env.VITE_API_URL}/announcements/${editID}`, formData, {
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
        setLoading(true)
        axios.delete(`${import.meta.env.VITE_API_URL}/announcements/${deleteID}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                console.log('DELETED RECORD::::', res);
                setRefresh(refresh + 1);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`${import.meta.env.VITE_API_URL}/announcements/${editIDNotState}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/announcements/conf/${IdConf}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data);
                console.log(res.data);

            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [refresh]);

    return (
        <main className='py-10 bg-gray-100 lg:pl-72 min-h-screen'>
            <div className='px-4 sm:px-6 lg:px-8'>
                <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Add a New Announcement</div>
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Title</label>
                    <input type="text" name="title" required value={title} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Meta Description</label>
                    <input type="text" name="metaDescription" value={metaDescription} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1  font-bold">Description</label>
                    <input type="text" name="description" required value={description} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Link</label>
                    <input type="text" name="link" value={link} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Feature</label>
                    <select name="feature" className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" onChange={handleChange}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>

                    </select>
                    <label className="block text-gray-700 text-lg ml-1 font-bold">New</label>
                    <select name="new" className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" onChange={handleChange}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>

                    </select>
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Hidden</label>
                    <select name="hidden" className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" onChange={handleChange}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>

                    </select>


                    <label className="block text-gray-700 text-lg ml-1 font-bold">Sequence<input
                        type="number"
                        name="sequence"
                        value={formData.sequence}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline"
                    /></label>


                    <div className="flex justify-evenly">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Announcement</button>
                        <button type="submit" onClick={() => handleUpdate()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Announcement</button>
                    </div>
                </form>

                <hr />

                <div className="shadow-md m-10 ali">
                    <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Added Announcements</div>
                    {!loading ? (
                        <table className="min-w-full border-collapse box-border">
                            <thead>
                                <tr className="border-[2px] bg-blue-100  border-blue-500">
                                    <th className="p-1 text-center">Title</th>
                                    <th className="p-1 text-center">Meta Description</th>
                                    <th className="p-1 text-center">Description</th>
                                    <th className="p-1 text-center">Link</th>
                                    <th className="p-1 text-center">Sequence</th>
                                    <th className="p-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map((item, index) => (
                                    <tr key={index} className="border-[1px] font-serif border-blue-500">
                                        <td className="p-1 text-center">{item.title}</td>
                                        <td className="p-1 text-center">{item.metaDescription}</td>
                                        <td className="p-1 text-center">{item.description}</td>
                                        <td className="p-1 text-center">{item.link}</td>
                                        <td className="p-1 text-center">{item.sequence}</td>
                                        <td className="p-1 text-center flex justify-evenly">
                                            <button onClick={() => {
                                                handleEdit(item._id);
                                                setEditID(item._id);
                                            }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 mx-2 rounded focus:outline-none focus:shadow-outline">Edit</button>{" "}
                                            <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>                                        
                                        <td colSpan="5" className="p-1 text-center">No data available</td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            <LoadingIcon />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Announcement;
