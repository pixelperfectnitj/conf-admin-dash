import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

const Navbar = () => {
    const params = useParams();
    const IdConf = params.confid;
    const initialData = {
        "confId": IdConf,
        "heading": "",
        "subHeading": "",
        "url": "",
        "name": "",
        "feature": true,
        "sequence": 0,
    }

    const [formData, setFormData] = useState(initialData);

    const [editID, setEditID] = useState("");
    const [data, setData] = useState({});
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const { heading, subHeading, url, name } = formData;

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

        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/navbar`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data);
                setFormData(initialData);
                setRefresh(refresh + 1);
            })
            .catch(err => {
                console.log(err);
                console.log(formData);
            });
    };

    const handleUpdate = () => {
        axios.put(`${import.meta.env.VITE_API_URL}/navbar/${editID}`, formData, {
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
        axios.delete(`${import.meta.env.VITE_API_URL}/navbar/${deleteID}`, {
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
        axios.get(`${import.meta.env.VITE_API_URL}/navbar/${editIDNotState}`, {
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
        axios.get(`${import.meta.env.VITE_API_URL}/navbar/conf/${IdConf}`, {
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
                <div className="block box-border" >
                    <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10 " onSubmit={handleSubmit} autoComplete="off">
                        <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >About Navbar</div>
                        <label className="block text-gray-700 text-lg ml-1  font-bold " >Heading</label>
                        <input type="text" name="heading"required value={heading} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Subheading</label>
                        <input type="text" name="subHeading" required value={subHeading} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Name</label>
                        <input type="text" name="name" required value={name} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />
                        <label className="block text-gray-700 text-lg ml-1 font-bold ">URL</label>
                        <input type="text" name="url" required value={url} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />
                                                    <label className="block text-gray-700 text-lg ml-1 font-bold ">Sequence</label>

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
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
                            <button type="submit" onClick={() => { handleUpdate() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                        </div>
                    </form>

                    <hr />

                    <div className="shadow-md   m-10 ali">
                        <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >Added Information</div>
                        {loading ? (
                            <div>
                                <LoadingIcon />
                            </div>
                        ) : (
                            <table className="min-w-full border-collapse box-border " >
                                <thead>
                                    <tr className="border-[2px] bg-blue-100  border-blue-500">
                                        <th className="p-1 text-center">Heading</th>
                                        <th className="p-1 text-center">Subheading</th>
                                        <th className="p-1 text-center">Name</th>
                                        <th className="p-1 text-center">URL</th>
                                        <th className="p-1 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && Object.keys(data).length !== 0 ? (
                                        <tr className="border-[1px] font-serif border-blue-500">
                                            <td className="p-1 text-center">{data.heading}</td>
                                            <td className="p-1 text-center">{data.subHeading}</td>
                                            <td className="p-1 text-center">{data.name}</td>
                                            <td className="p-1 text-center">{data.url}</td>
                                            <td className="p-1 text-center  flex justify-evenly">
                                                <button onClick={() => { handleEdit(data._id); setEditID(data._id); }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"> Edit </button>{" "}
                                                <button onClick={() => handleDelete(data._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"> Delete </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-1 text-center">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Navbar;
